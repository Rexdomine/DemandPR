import { afterEach, describe, expect, it, vi } from "vitest";

import {
  brevoFetchTransport,
  createContactPostHandler,
  createContactRateLimiter,
  type ContactApiDependencies,
} from "./contact-api";

const now = Date.parse("2026-07-22T12:00:00.000Z");
const validBody = {
  fullName: "  Ada <Okafor>  ",
  organisation: " Meridian & Partners ",
  workEmail: " ADA@EXAMPLE.COM ",
  phone: " +44 20 1234 5678 ",
  country: " United Kingdom ",
  interest: "market-entry",
  targetMarkets: " Ghana and Kenya ",
  contactMethod: "email",
  message: " We are assessing a <regional> expansion programme. ",
  consent: true,
  website: "",
  startedAt: now - 10_000,
};
const env = {
  BREVO_API_KEY: "test-api-key-not-real",
  BREVO_SENDER_EMAIL: "verified-sender@example.test",
  BREVO_SENDER_NAME: "Demand PR",
  DEMANDPR_CONTACT_RECIPIENT: "inbox@example.test",
};

afterEach(() => vi.unstubAllGlobals());

function request(body: unknown = validBody, init: RequestInit = {}) {
  return new Request("https://demandpr.org/api/contact", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      origin: "https://demandpr.org",
      "x-forwarded-for": "198.51.100.20",
      ...init.headers,
    },
    body: typeof body === "string" ? body : JSON.stringify(body),
    ...init,
  });
}

function setup(overrides: Partial<ContactApiDependencies> = {}) {
  const transport = vi.fn().mockResolvedValue({ ok: true, status: 201 });
  const handler = createContactPostHandler({
    env,
    transport,
    now: () => now,
    rateLimiter: createContactRateLimiter({
      maxClients: 100,
      maxRequests: 3,
      windowMs: 60_000,
    }),
    ...overrides,
  });
  return { handler, transport };
}

async function json(response: Response) {
  return { status: response.status, body: await response.json() };
}

describe("contact API boundary", () => {
  it("bounds the provider request and sends the API key only in the server request header", async () => {
    const fetcher = vi
      .fn()
      .mockResolvedValue(new Response(null, { status: 201 }));
    vi.stubGlobal("fetch", fetcher);
    await brevoFetchTransport({
      apiKey: "test-api-key-not-real",
      message: {
        sender: { email: "sender@example.test", name: "Demand PR Ltd" },
        to: [{ email: "recipient@example.test", name: "Recipient" }],
        subject: "Test",
        htmlContent: "<p>Test</p>",
        textContent: "Test",
      },
    });
    expect(fetcher).toHaveBeenCalledWith(
      "https://api.brevo.com/v3/smtp/email",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          "api-key": "test-api-key-not-real",
        }),
        signal: expect.any(AbortSignal),
      }),
    );
  });

  it("revalidates and normalises input, then sends internal and acknowledgement messages", async () => {
    const { handler, transport } = setup();
    expect(await json(await handler(request()))).toEqual({
      status: 200,
      body: {
        ok: true,
        message:
          "Your enquiry has been sent to Demand PR. A confirmation email is on its way.",
      },
    });
    expect(transport).toHaveBeenCalledTimes(2);

    const internal = transport.mock.calls[0]?.[0];
    expect(internal).toMatchObject({
      apiKey: "test-api-key-not-real",
      message: {
        sender: { email: "verified-sender@example.test", name: "Demand PR" },
        to: [{ email: "inbox@example.test", name: "Demand PR enquiries" }],
        replyTo: { email: "ada@example.com", name: "Ada <Okafor>" },
      },
    });
    expect(internal.message.subject).toContain("Africa market entry");
    expect(internal.message.textContent).toContain("Full name: Ada <Okafor>");
    expect(internal.message.textContent).toContain("Phone: +44 20 1234 5678");
    expect(internal.message.textContent).toContain(
      "Received (UTC): 2026-07-22T12:00:00.000Z",
    );
    expect(internal.message.htmlContent).toContain("Demand PR");
    expect(internal.message.htmlContent).toContain(
      "Connecting Business. Enabling Growth. Delivering Opportunities.",
    );
    expect(internal.message.htmlContent).toContain("#32141b");
    expect(internal.message.htmlContent).toContain("#6a1b2d");
    expect(internal.message.htmlContent).toContain("#d4b16a");
    expect(internal.message.htmlContent).toContain("Ada &lt;Okafor&gt;");
    expect(internal.message.htmlContent).toContain("Meridian &amp; Partners");
    expect(internal.message.htmlContent).not.toContain("<regional>");

    const acknowledgement = transport.mock.calls[1]?.[0];
    expect(acknowledgement.message.to).toEqual([
      { email: "ada@example.com", name: "Ada <Okafor>" },
    ]);
    expect(acknowledgement.message.subject).toMatch(/Demand PR.*enquiry/i);
    expect(acknowledgement.message.textContent).toContain("Hello Ada");
    expect(acknowledgement.message.textContent).toContain(
      "Africa market entry",
    );
    expect(acknowledgement.message.textContent).toMatch(
      /do not reply.*sensitive/i,
    );
    expect(acknowledgement.message.textContent).not.toMatch(
      /within \d+|24 hours|response time/i,
    );
    expect(acknowledgement.message.htmlContent).toContain(
      "Connecting Business. Enabling Growth. Delivering Opportunities.",
    );
    expect((await handler(request())).headers.get("cache-control")).toBe(
      "no-store",
    );
  });

  it.each([
    [
      "wrong content type",
      request(validBody, {
        headers: {
          "content-type": "text/plain",
          origin: "https://demandpr.org",
        },
      }),
      415,
      "invalid_request",
    ],
    ["malformed JSON", request("{bad"), 400, "invalid_request"],
    [
      "invalid payload",
      request({ ...validBody, workEmail: "bad", interest: "invented" }),
      400,
      "validation_error",
    ],
    [
      "populated honeypot",
      request({ ...validBody, website: "spam" }),
      429,
      "spam_detected",
    ],
    [
      "completed too quickly",
      request({ ...validBody, startedAt: now - 500 }),
      429,
      "spam_detected",
    ],
    [
      "cross-origin",
      request(validBody, {
        headers: {
          "content-type": "application/json",
          origin: "https://evil.example",
        },
      }),
      403,
      "origin_rejected",
    ],
  ])(
    "rejects %s without contacting Brevo",
    async (_name, req, status, code) => {
      const { handler, transport } = setup();
      const result = await json(await handler(req));
      expect(result.status).toBe(status);
      expect(result.body).toMatchObject({ ok: false, code });
      expect(transport).not.toHaveBeenCalled();
    },
  );

  it("accepts the public origin when a trusted reverse proxy rewrites the internal request URL", async () => {
    const proxied = new Request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        origin: "https://preview.demandpr.org",
        host: "preview.demandpr.org",
        "x-forwarded-proto": "https",
        "x-forwarded-for": "198.51.100.21",
      },
      body: JSON.stringify(validBody),
    });
    const { handler, transport } = setup();
    expect((await handler(proxied)).status).toBe(200);
    expect(transport).toHaveBeenCalledTimes(2);
  });

  it("enforces declared and actual JSON body size limits", async () => {
    for (const req of [
      request(validBody, {
        headers: {
          "content-type": "application/json",
          origin: "https://demandpr.org",
          "content-length": "20000",
        },
      }),
      request(`{"padding":"${"x".repeat(17_000)}"}`),
    ]) {
      const { handler, transport } = setup();
      expect((await handler(req)).status).toBe(413);
      expect(transport).not.toHaveBeenCalled();
    }
  });

  it("requires complete server configuration without exposing which value is absent", async () => {
    const { handler, transport } = setup({
      env: { ...env, BREVO_API_KEY: undefined },
    });
    const result = await json(await handler(request()));
    expect(result).toEqual({
      status: 503,
      body: {
        ok: false,
        code: "configuration_error",
        message: "The enquiry service is temporarily unavailable.",
      },
    });
    expect(transport).not.toHaveBeenCalled();
    expect(JSON.stringify(result)).not.toContain("BREVO");
  });

  it("does not acknowledge when the internal notification fails", async () => {
    const transport = vi.fn().mockResolvedValue({ ok: false, status: 400 });
    const { handler } = setup({ transport });
    const result = await json(await handler(request()));
    expect(result.status).toBe(502);
    expect(result.body.code).toBe("provider_error");
    expect(transport).toHaveBeenCalledTimes(1);
  });

  it("does not return success when acknowledgement fails or provider transport throws", async () => {
    const confirmationFailure = vi
      .fn()
      .mockResolvedValueOnce({ ok: true, status: 201 })
      .mockResolvedValueOnce({ ok: false, status: 500 });
    expect(
      (await setup({ transport: confirmationFailure }).handler(request()))
        .status,
    ).toBe(502);
    expect(confirmationFailure).toHaveBeenCalledTimes(2);

    const thrown = vi
      .fn()
      .mockRejectedValue(
        new Error("provider response containing private data"),
      );
    expect((await setup({ transport: thrown }).handler(request())).status).toBe(
      502,
    );
  });

  it("applies a bounded per-client rate limit", async () => {
    const rateLimiter = createContactRateLimiter({
      maxClients: 2,
      maxRequests: 1,
      windowMs: 60_000,
    });
    const first = setup({ rateLimiter });
    expect((await first.handler(request())).status).toBe(200);
    expect((await first.handler(request())).status).toBe(429);
    expect(first.transport).toHaveBeenCalledTimes(2);

    rateLimiter.check("client-b", now);
    rateLimiter.check("client-c", now);
    expect(rateLimiter.size()).toBeLessThanOrEqual(2);
  });
});
