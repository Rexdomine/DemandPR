export const CONTACT_FIELD_LIMITS = {
  fullName: 120,
  organisation: 160,
  workEmail: 254,
  phone: 50,
  country: 100,
  targetMarkets: 500,
  message: 2000,
} as const;

export const CONTACT_INTERESTS = [
  ["market-entry", "Africa market entry"],
  ["investor-advisory", "Investor advisory and representation"],
  ["government-stakeholders", "Government and stakeholder engagement"],
  ["missions-events", "Trade missions, forums and executive events"],
  ["corporate-support", "Executive and corporate support"],
  ["other", "Other / Not sure yet"],
] as const;

export type ContactMethod = "email" | "telephone" | "whatsapp";
export type ContactFormInput = {
  fullName: string;
  organisation: string;
  workEmail: string;
  phone: string;
  country: string;
  interest: string;
  targetMarkets: string;
  contactMethod: ContactMethod | "";
  message: string;
  consent: boolean;
  website: string;
};

export type ContactPayload = Omit<
  ContactFormInput,
  "website" | "interest" | "contactMethod"
> & {
  interest: (typeof CONTACT_INTERESTS)[number][0];
  contactMethod: ContactMethod;
};
export type ContactFieldErrors = Partial<
  Record<keyof ContactFormInput, string>
>;
export type ContactValidationResult =
  | { ok: true; payload: ContactPayload }
  | { ok: false; errors: ContactFieldErrors };
export type ContactSubmitResult =
  | { status: "success"; receiptMessage: string }
  | {
      status: "error";
      code:
        | "not_configured"
        | "validation_error"
        | "spam_detected"
        | "rate_limited"
        | "configuration_error"
        | "provider_error"
        | "network_error";
      message: string;
    };
export type ContactSubmitter = (
  payload: ContactPayload,
) => Promise<ContactSubmitResult>;

const interestValues = new Set(CONTACT_INTERESTS.map(([value]) => value));
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactForm(
  input: ContactFormInput,
): ContactValidationResult {
  const values = {
    fullName: input.fullName.trim(),
    organisation: input.organisation.trim(),
    workEmail: input.workEmail.trim().toLowerCase(),
    phone: input.phone.trim(),
    country: input.country.trim(),
    interest: input.interest.trim(),
    targetMarkets: input.targetMarkets.trim(),
    contactMethod: input.contactMethod,
    message: input.message.trim(),
  };
  const errors: ContactFieldErrors = {};

  validateRequiredLength("fullName", values.fullName, 2, "full name", errors);
  validateRequiredLength(
    "organisation",
    values.organisation,
    2,
    "organisation",
    errors,
  );
  if (!values.workEmail) errors.workEmail = "Enter your work email address.";
  else if (values.workEmail.length > CONTACT_FIELD_LIMITS.workEmail)
    errors.workEmail = `Use ${CONTACT_FIELD_LIMITS.workEmail} characters or fewer.`;
  else if (!emailPattern.test(values.workEmail))
    errors.workEmail = "Enter a valid work email address.";

  if (
    (values.contactMethod === "telephone" ||
      values.contactMethod === "whatsapp") &&
    !values.phone
  )
    errors.phone =
      "A phone number is required for Telephone or WhatsApp follow-up.";
  else if (values.phone.length > CONTACT_FIELD_LIMITS.phone)
    errors.phone = `Use ${CONTACT_FIELD_LIMITS.phone} characters or fewer.`;

  validateRequiredLength(
    "country",
    values.country,
    1,
    "country or region",
    errors,
  );
  if (!interestValues.has(values.interest as ContactPayload["interest"]))
    errors.interest = "Select an area of interest.";
  validateRequiredLength(
    "targetMarkets",
    values.targetMarkets,
    1,
    "target markets",
    errors,
  );
  if (!values.contactMethod)
    errors.contactMethod = "Select a preferred contact method.";
  validateRequiredLength("message", values.message, 20, "message", errors);
  if (!input.consent) errors.consent = "Consent is required before continuing.";
  if (input.website.trim())
    errors.website = "The enquiry could not be validated.";

  if (Object.keys(errors).length) return { ok: false, errors };
  return {
    ok: true,
    payload: {
      fullName: values.fullName,
      organisation: values.organisation,
      workEmail: values.workEmail,
      phone: values.phone,
      country: values.country,
      interest: values.interest as ContactPayload["interest"],
      targetMarkets: values.targetMarkets,
      contactMethod: values.contactMethod as ContactMethod,
      message: values.message,
      consent: true,
    },
  };
}

function validateRequiredLength(
  field: keyof typeof CONTACT_FIELD_LIMITS,
  value: string,
  minimum: number,
  label: string,
  errors: ContactFieldErrors,
) {
  if (!value) errors[field] = `Enter your ${label}.`;
  else if (value.length < minimum)
    errors[field] = `Enter at least ${minimum} characters for your ${label}.`;
  else if (value.length > CONTACT_FIELD_LIMITS[field])
    errors[field] = `Use ${CONTACT_FIELD_LIMITS[field]} characters or fewer.`;
}

export const notConfiguredContactSubmitter: ContactSubmitter = async () => ({
  status: "error",
  code: "not_configured",
  message:
    "This form is not connected yet, so your enquiry has not been sent or stored. Please keep this page open if you want to retain your details.",
});

type Fetcher = (
  input: RequestInfo | URL,
  init?: RequestInit,
) => Promise<Response>;

export function createContactApiSubmitter({
  fetcher = fetch,
  startedAt = Date.now(),
}: {
  fetcher?: Fetcher;
  startedAt?: number;
} = {}): ContactSubmitter {
  return async (payload) => {
    try {
      const response = await fetcher("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...payload, website: "", startedAt }),
      });
      if (response.ok) {
        const body = (await response.json()) as { message?: unknown };
        if (typeof body.message !== "string")
          throw new Error("Invalid response");
        return { status: "success", receiptMessage: body.message };
      }
      return mapContactApiError(response.status);
    } catch {
      return {
        status: "error",
        code: "network_error",
        message:
          "We could not send your enquiry. Your details remain in the form; please try again.",
      };
    }
  };
}

function mapContactApiError(status: number): ContactSubmitResult {
  if (status === 400)
    return {
      status: "error",
      code: "validation_error",
      message: "Check the highlighted information and try again.",
    };
  if (status === 429)
    return {
      status: "error",
      code: "rate_limited",
      message: "Please wait, then try again before sending another enquiry.",
    };
  if (status === 503)
    return {
      status: "error",
      code: "configuration_error",
      message:
        "The enquiry service is temporarily unavailable. Your details remain in the form.",
    };
  return {
    status: "error",
    code: "provider_error",
    message:
      "The submission service could not confirm your enquiry. Your details remain in the form so you can try again.",
  };
}
