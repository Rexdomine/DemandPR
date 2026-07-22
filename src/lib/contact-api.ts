import {
  CONTACT_INTERESTS,
  validateContactForm,
  type ContactFormInput,
  type ContactPayload,
} from "./contact-form";

const MAX_BODY_BYTES = 16_384;
const MIN_COMPLETION_MS = 3_000;
const BREVO_ENDPOINT = "https://api.brevo.com/v3/smtp/email";
const interestLabels = new Map<string, string>(CONTACT_INTERESTS);

export type BrevoMessage = {
  sender: { email: string; name: string };
  to: { email: string; name: string }[];
  replyTo?: { email: string; name: string };
  subject: string;
  htmlContent: string;
  textContent: string;
};
export type BrevoTransport = (input: {
  apiKey: string;
  message: BrevoMessage;
}) => Promise<{ ok: boolean; status: number }>;
export type ContactEnvironment = {
  BREVO_API_KEY?: string;
  BREVO_SENDER_EMAIL?: string;
  BREVO_SENDER_NAME?: string;
  DEMANDPR_CONTACT_RECIPIENT?: string;
};
export type ContactRateLimiter = {
  check(client: string, now: number): boolean;
  size(): number;
};
export type ContactApiDependencies = {
  env: ContactEnvironment;
  transport: BrevoTransport;
  now: () => number;
  rateLimiter: ContactRateLimiter;
};

type RateEntry = { startedAt: number; count: number };

export function createContactRateLimiter(options: {
  maxClients: number;
  maxRequests: number;
  windowMs: number;
}): ContactRateLimiter {
  const clients = new Map<string, RateEntry>();
  return {
    check(client, now) {
      const current = clients.get(client);
      if (!current || now - current.startedAt >= options.windowMs) {
        if (!current && clients.size >= options.maxClients) {
          const oldest = clients.keys().next().value as string | undefined;
          if (oldest) clients.delete(oldest);
        }
        clients.set(client, { startedAt: now, count: 1 });
        return true;
      }
      clients.delete(client);
      clients.set(client, current);
      current.count += 1;
      return current.count <= options.maxRequests;
    },
    size: () => clients.size,
  };
}

export const brevoFetchTransport: BrevoTransport = async ({
  apiKey,
  message,
}) => {
  const response = await fetch(BREVO_ENDPOINT, {
    method: "POST",
    headers: {
      accept: "application/json",
      "api-key": apiKey,
      "content-type": "application/json",
    },
    body: JSON.stringify(message),
    signal: AbortSignal.timeout(10_000),
  });
  return { ok: response.ok, status: response.status };
};

export function createContactPostHandler(dependencies: ContactApiDependencies) {
  return async function POST(request: Request): Promise<Response> {
    const contentType = request.headers
      .get("content-type")
      ?.split(";", 1)[0]
      ?.trim()
      .toLowerCase();
    if (contentType !== "application/json")
      return failure(415, "invalid_request", "Send the enquiry as JSON.");

    const origin = request.headers.get("origin");
    if (!origin || !isAllowedOrigin(request, origin))
      return failure(
        403,
        "origin_rejected",
        "The enquiry request was rejected.",
      );

    const declaredLength = Number(request.headers.get("content-length") ?? 0);
    if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES)
      return failure(413, "invalid_request", "The enquiry is too large.");

    let raw: string;
    try {
      raw = await request.text();
    } catch {
      return failure(
        400,
        "invalid_request",
        "The enquiry request could not be read.",
      );
    }
    if (new TextEncoder().encode(raw).byteLength > MAX_BODY_BYTES)
      return failure(413, "invalid_request", "The enquiry is too large.");

    let parsed: unknown;
    try {
      parsed = JSON.parse(raw);
    } catch {
      return failure(400, "invalid_request", "The enquiry request is invalid.");
    }

    const input = parseInput(parsed);
    if (!input)
      return failure(
        400,
        "validation_error",
        "Check the enquiry information and try again.",
      );
    if (
      input.website.trim() ||
      dependencies.now() - input.startedAt < MIN_COMPLETION_MS
    )
      return failure(
        429,
        "spam_detected",
        "The enquiry could not be accepted.",
      );

    const validation = validateContactForm(input);
    if (!validation.ok)
      return failure(
        400,
        "validation_error",
        "Check the enquiry information and try again.",
      );

    const client = clientIdentifier(request);
    if (!dependencies.rateLimiter.check(client, dependencies.now()))
      return failure(
        429,
        "rate_limited",
        "Too many enquiries were submitted. Please wait and try again.",
      );

    const configuration = readConfiguration(dependencies.env);
    if (!configuration)
      return failure(
        503,
        "configuration_error",
        "The enquiry service is temporarily unavailable.",
      );

    const messages = buildMessages(
      validation.payload,
      configuration,
      new Date(dependencies.now()),
    );
    try {
      const internal = await dependencies.transport({
        apiKey: configuration.apiKey,
        message: messages.internal,
      });
      if (!internal.ok) return providerFailure();
      const acknowledgement = await dependencies.transport({
        apiKey: configuration.apiKey,
        message: messages.acknowledgement,
      });
      if (!acknowledgement.ok) return providerFailure();
    } catch {
      return providerFailure();
    }

    return jsonResponse(200, {
      ok: true,
      message:
        "Your enquiry has been sent to Demand PR. A confirmation email is on its way.",
    });
  };
}

function isAllowedOrigin(request: Request, origin: string) {
  try {
    const requestUrl = new URL(request.url);
    if (origin === requestUrl.origin) return true;
    const host = request.headers.get("host")?.trim();
    if (!host) return false;
    const forwardedProtocol = request.headers
      .get("x-forwarded-proto")
      ?.split(",", 1)[0]
      ?.trim()
      .toLowerCase();
    const protocol =
      forwardedProtocol === "http" || forwardedProtocol === "https"
        ? `${forwardedProtocol}:`
        : requestUrl.protocol;
    return origin === `${protocol}//${host}`;
  } catch {
    return false;
  }
}

function parseInput(
  value: unknown,
): (ContactFormInput & { startedAt: number }) | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const record = value as Record<string, unknown>;
  const strings = [
    "fullName",
    "organisation",
    "workEmail",
    "phone",
    "country",
    "interest",
    "targetMarkets",
    "contactMethod",
    "message",
    "website",
  ] as const;
  if (strings.some((key) => typeof record[key] !== "string")) return null;
  if (
    typeof record.consent !== "boolean" ||
    typeof record.startedAt !== "number" ||
    !Number.isFinite(record.startedAt)
  )
    return null;
  if (
    record.startedAt < 0 ||
    strings.some((key) =>
      hasUnsafeControls(record[key] as string, key === "message"),
    )
  )
    return null;
  return record as ContactFormInput & { startedAt: number };
}

function hasUnsafeControls(value: string, allowLineBreaks: boolean) {
  return allowLineBreaks
    ? /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(value)
    : /[\u0000-\u001f\u007f]/.test(value);
}

function readConfiguration(env: ContactEnvironment) {
  const apiKey = env.BREVO_API_KEY?.trim();
  const senderEmail = env.BREVO_SENDER_EMAIL?.trim();
  const senderName = env.BREVO_SENDER_NAME?.trim();
  const recipient = env.DEMANDPR_CONTACT_RECIPIENT?.trim();
  if (!apiKey || !senderEmail || !senderName || !recipient) return null;
  return { apiKey, senderEmail, senderName, recipient };
}

function clientIdentifier(request: Request) {
  const forwarded = request.headers
    .get("x-forwarded-for")
    ?.split(",", 1)[0]
    ?.trim();
  return forwarded || request.headers.get("x-real-ip")?.trim() || "unknown";
}

function failure(status: number, code: string, message: string) {
  return jsonResponse(status, { ok: false, code, message });
}

function jsonResponse(status: number, body: object) {
  return Response.json(body, {
    status,
    headers: { "cache-control": "no-store" },
  });
}
function providerFailure() {
  return failure(
    502,
    "provider_error",
    "The enquiry service could not confirm delivery. Please try again.",
  );
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function brandedHtml(title: string, content: string) {
  return `<!doctype html><html><head><meta name="viewport" content="width=device-width"><style>@media(max-width:600px){.card{padding:24px!important}.brand{font-size:18px!important}}</style></head><body style="margin:0;background:#f4f7f8;font-family:Arial,Helvetica,sans-serif;color:#071a2b"><div style="display:none;max-height:0;overflow:hidden">Demand PR Ltd — ${escapeHtml(title)}</div><table role="presentation" width="100%" cellspacing="0" cellpadding="0"><tr><td align="center" style="padding:24px 12px"><table role="presentation" width="100%" style="max-width:640px;background:#ffffff;border-top:6px solid #007c7c"><tr><td class="card" style="padding:36px"><div class="brand" style="color:#071a2b;font-size:20px;font-weight:800;letter-spacing:.08em">Demand <span style="color:#007c7c">PR</span> <span style="color:#c9a45c">Ltd</span></div><h1 style="color:#071a2b;font-size:26px;line-height:1.25">${escapeHtml(title)}</h1>${content}<p style="margin-top:32px;border-top:1px solid #d8e1e5;padding-top:20px;color:#007c7c;font-weight:700">Connecting Business. Enabling Growth. Delivering Opportunities.</p></td></tr></table></td></tr></table></body></html>`;
}

function buildMessages(
  payload: ContactPayload,
  config: NonNullable<ReturnType<typeof readConfiguration>>,
  received: Date,
) {
  const interest = interestLabels.get(payload.interest) ?? payload.interest;
  const method =
    payload.contactMethod === "email"
      ? "Email"
      : payload.contactMethod === "telephone"
        ? "Telephone"
        : "WhatsApp";
  const rows: [string, string][] = [
    ["Full name", payload.fullName],
    ["Organisation", payload.organisation],
    ["Work email", payload.workEmail],
    ["Phone", payload.phone || "Not supplied"],
    ["Country / region", payload.country],
    ["Area of interest", interest],
    ["Target markets", payload.targetMarkets],
    ["Preferred contact method", method],
    ["Objectives", payload.message],
    ["Received (UTC)", received.toISOString()],
  ];
  const internalText = `Demand PR — new consultation enquiry\n\n${rows.map(([label, value]) => `${label}: ${value}`).join("\n")}`;
  const internalRows = rows
    .map(
      ([label, value]) =>
        `<tr><th align="left" valign="top" style="padding:8px;color:#007c7c">${escapeHtml(label)}</th><td style="padding:8px;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`,
    )
    .join("");
  const firstName = payload.fullName.split(/\s+/)[0] || payload.fullName;
  const acknowledgementText = `Hello ${firstName},\n\nThank you for contacting Demand PR. We confirm receipt of your enquiry about ${interest}, with target-market context: ${payload.targetMarkets}.\n\nFor your privacy, do not reply to this acknowledgement with sensitive information.\n\nDemand PR Ltd\nConnecting Business. Enabling Growth. Delivering Opportunities.`;
  const acknowledgementContent = `<p>Hello ${escapeHtml(firstName)},</p><p>Thank you for contacting Demand PR. We confirm receipt of your enquiry about <strong>${escapeHtml(interest)}</strong>, with target-market context: ${escapeHtml(payload.targetMarkets)}.</p><p>For your privacy, do not reply to this acknowledgement with sensitive information.</p>`;
  const sender = { email: config.senderEmail, name: config.senderName };
  return {
    internal: {
      sender,
      to: [{ email: config.recipient, name: "Demand PR enquiries" }],
      replyTo: { email: payload.workEmail, name: payload.fullName },
      subject: `New Demand PR enquiry — ${interest}`,
      textContent: internalText,
      htmlContent: brandedHtml(
        "New consultation enquiry",
        `<table role="presentation" width="100%">${internalRows}</table>`,
      ),
    },
    acknowledgement: {
      sender,
      to: [{ email: payload.workEmail, name: payload.fullName }],
      subject: "Demand PR — we received your enquiry",
      textContent: acknowledgementText,
      htmlContent: brandedHtml(
        "We received your enquiry",
        acknowledgementContent,
      ),
    },
  };
}
