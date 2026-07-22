"use client";

import { useRef, useState, type FormEvent } from "react";

import {
  CONTACT_FIELD_LIMITS,
  CONTACT_INTERESTS,
  createContactApiSubmitter,
  validateContactForm,
  type ContactFieldErrors,
  type ContactFormInput,
  type ContactMethod,
  type ContactSubmitter,
} from "@/lib/contact-form";

const fieldOrder: (keyof ContactFormInput)[] = [
  "fullName",
  "organisation",
  "workEmail",
  "phone",
  "country",
  "interest",
  "targetMarkets",
  "contactMethod",
  "message",
  "consent",
  "website",
];

export function ContactForm({ submitter }: { submitter?: ContactSubmitter }) {
  const formRef = useRef<HTMLFormElement>(null);
  const apiSubmitterRef = useRef<ContactSubmitter | null>(null);
  if (!apiSubmitterRef.current)
    apiSubmitterRef.current = createContactApiSubmitter();
  const activeSubmitter = submitter ?? apiSubmitterRef.current;
  const pendingRef = useRef(false);
  const [errors, setErrors] = useState<ContactFieldErrors>({});
  const [pending, setPending] = useState(false);
  const [contactMethod, setContactMethod] = useState<ContactMethod | "">("");
  const [messageLength, setMessageLength] = useState(0);
  const [status, setStatus] = useState("");
  const [receipt, setReceipt] = useState("");

  const clearFieldErrors = (...fields: (keyof ContactFormInput)[]) => {
    setErrors((current) => {
      if (!fields.some((field) => current[field])) return current;
      const next = { ...current };
      fields.forEach((field) => delete next[field]);
      return next;
    });
  };

  const focusFirstError = (fieldErrors: ContactFieldErrors) => {
    const first = fieldOrder.find((field) => fieldErrors[field]);
    if (!first || first === "website") return;
    const control = formRef.current?.elements.namedItem(first);
    if (control instanceof RadioNodeList) {
      (control[0] as HTMLElement | undefined)?.focus();
    } else if (control instanceof HTMLElement) control.focus();
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (pendingRef.current) return;
    setStatus("");
    const data = new FormData(event.currentTarget);
    const input: ContactFormInput = {
      fullName: String(data.get("fullName") ?? ""),
      organisation: String(data.get("organisation") ?? ""),
      workEmail: String(data.get("workEmail") ?? ""),
      phone: String(data.get("phone") ?? ""),
      country: String(data.get("country") ?? ""),
      interest: String(data.get("interest") ?? ""),
      targetMarkets: String(data.get("targetMarkets") ?? ""),
      contactMethod: String(data.get("contactMethod") ?? "") as
        | ContactMethod
        | "",
      message: String(data.get("message") ?? ""),
      consent: data.get("consent") === "on",
      website: String(data.get("website") ?? ""),
    };
    const validation = validateContactForm(input);
    if (!validation.ok) {
      setErrors(validation.errors);
      focusFirstError(validation.errors);
      return;
    }

    setErrors({});
    pendingRef.current = true;
    setPending(true);
    try {
      const result = await activeSubmitter(validation.payload);
      if (result.status === "success") {
        formRef.current?.reset();
        setContactMethod("");
        setMessageLength(0);
        setReceipt(result.receiptMessage);
      } else setStatus(result.message);
    } catch {
      setStatus(
        "The submission service could not confirm your enquiry. Your details remain in the form so you can try again.",
      );
    } finally {
      pendingRef.current = false;
      setPending(false);
    }
  };

  if (receipt) {
    return (
      <div className="contact-receipt" role="status" aria-live="polite">
        <svg viewBox="0 0 48 48" aria-hidden="true">
          <circle cx="24" cy="24" r="21" />
          <path d="m14 24 7 7 14-15" />
        </svg>
        <h3>Enquiry confirmed</h3>
        <p>{receipt}</p>
        <button className="button" type="button" onClick={() => setReceipt("")}>
          Send another enquiry
        </button>
      </div>
    );
  }

  const describedBy = (field: keyof ContactFormInput, hint?: string) =>
    [hint, errors[field] ? `${field}-error` : ""].filter(Boolean).join(" ") ||
    undefined;
  const errorFor = (field: keyof ContactFormInput) =>
    errors[field] ? (
      <p className="contact-field-error" id={`${field}-error`} role="alert">
        {errors[field]}
      </p>
    ) : null;

  return (
    <form
      ref={formRef}
      className="contact-form"
      aria-label="Consultation enquiry"
      aria-busy={pending}
      noValidate
      onInput={(event) => {
        const name = (
          event.target as
            | HTMLInputElement
            | HTMLSelectElement
            | HTMLTextAreaElement
        ).name as keyof ContactFormInput;
        if (name) clearFieldErrors(name);
        if (status) setStatus("");
      }}
      onSubmit={handleSubmit}
    >
      <div className="contact-form-heading">
        <p className="eyebrow">Your objectives</p>
        <h2>Tell Us About Your Priorities</h2>
        <p>Fields marked with an asterisk (*) are required.</p>
      </div>

      <div className="contact-form-grid">
        <Field label="Full name" name="fullName" error={errors.fullName}>
          <input
            id="fullName"
            name="fullName"
            autoComplete="name"
            maxLength={CONTACT_FIELD_LIMITS.fullName}
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={describedBy("fullName")}
          />
          {errorFor("fullName")}
        </Field>
        <Field
          label="Organisation"
          name="organisation"
          error={errors.organisation}
        >
          <input
            id="organisation"
            name="organisation"
            autoComplete="organization"
            maxLength={CONTACT_FIELD_LIMITS.organisation}
            aria-invalid={Boolean(errors.organisation)}
            aria-describedby={describedBy("organisation")}
          />
          {errorFor("organisation")}
        </Field>
        <Field label="Work email" name="workEmail" error={errors.workEmail}>
          <input
            id="workEmail"
            name="workEmail"
            type="email"
            inputMode="email"
            autoComplete="email"
            maxLength={CONTACT_FIELD_LIMITS.workEmail}
            aria-invalid={Boolean(errors.workEmail)}
            aria-describedby={describedBy("workEmail")}
          />
          {errorFor("workEmail")}
        </Field>
        <Field label="Phone (optional)" name="phone" error={errors.phone}>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            maxLength={CONTACT_FIELD_LIMITS.phone}
            aria-required={
              contactMethod === "telephone" || contactMethod === "whatsapp"
            }
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={describedBy("phone", "phone-hint")}
          />
          <span className="contact-hint" id="phone-hint">
            Required when Telephone or WhatsApp is selected.
          </span>
          {errorFor("phone")}
        </Field>
        <Field label="Country or region" name="country" error={errors.country}>
          <input
            id="country"
            name="country"
            autoComplete="country-name"
            maxLength={CONTACT_FIELD_LIMITS.country}
            aria-invalid={Boolean(errors.country)}
            aria-describedby={describedBy("country")}
          />
          {errorFor("country")}
        </Field>
        <Field label="Area of interest" name="interest" error={errors.interest}>
          <select
            id="interest"
            name="interest"
            defaultValue=""
            aria-invalid={Boolean(errors.interest)}
            aria-describedby={describedBy("interest")}
          >
            <option value="" disabled>
              Select an area
            </option>
            {CONTACT_INTERESTS.map(([value, label]) => (
              <option value={value} key={value}>
                {label}
              </option>
            ))}
          </select>
          {errorFor("interest")}
        </Field>
      </div>

      <Field
        label="Target markets"
        name="targetMarkets"
        error={errors.targetMarkets}
      >
        <input
          id="targetMarkets"
          name="targetMarkets"
          maxLength={CONTACT_FIELD_LIMITS.targetMarkets}
          aria-invalid={Boolean(errors.targetMarkets)}
          aria-describedby={describedBy("targetMarkets", "targetMarkets-hint")}
        />
        <span className="contact-hint" id="targetMarkets-hint">
          List the African markets or regions you are considering.
        </span>
        {errorFor("targetMarkets")}
      </Field>

      <fieldset
        className={
          errors.contactMethod
            ? "contact-choice contact-field-invalid"
            : "contact-choice"
        }
        aria-invalid={Boolean(errors.contactMethod)}
        aria-describedby={describedBy("contactMethod", "contactMethod-hint")}
      >
        <legend>Preferred contact method *</legend>
        <span className="contact-hint" id="contactMethod-hint">
          Choose how you would prefer Demand PR to follow up.
        </span>
        <div className="contact-choice-row">
          {(["email", "telephone", "whatsapp"] as const).map((method) => (
            <label key={method}>
              <input
                type="radio"
                name="contactMethod"
                value={method}
                onChange={() => {
                  setContactMethod(method);
                  clearFieldErrors(
                    "contactMethod",
                    ...(method === "email" ? (["phone"] as const) : []),
                  );
                }}
              />
              {method === "email"
                ? "Email"
                : method === "telephone"
                  ? "Telephone"
                  : "WhatsApp"}
            </label>
          ))}
        </div>
        {errorFor("contactMethod")}
      </fieldset>

      <Field
        label="Objectives and support required"
        name="message"
        error={errors.message}
      >
        <textarea
          id="message"
          name="message"
          rows={7}
          minLength={20}
          maxLength={CONTACT_FIELD_LIMITS.message}
          onChange={(event) =>
            setMessageLength(event.currentTarget.value.length)
          }
          aria-invalid={Boolean(errors.message)}
          aria-describedby={describedBy(
            "message",
            "message-hint message-count",
          )}
        />
        <span className="contact-hint" id="message-hint">
          Include your objective, context, timing and the support you want to
          discuss.
        </span>
        <span className="contact-count" id="message-count">
          {messageLength} / {CONTACT_FIELD_LIMITS.message} characters
        </span>
        {errorFor("message")}
      </Field>

      <div
        className={
          errors.consent
            ? "contact-consent contact-field-invalid"
            : "contact-consent"
        }
      >
        <label>
          <input
            id="consent"
            name="consent"
            type="checkbox"
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={describedBy("consent")}
          />
          <span>
            Demand PR may use the information provided to respond to this
            enquiry. *
          </span>
        </label>
        {errorFor("consent")}
      </div>

      <div className="contact-honeypot" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div
        className="contact-submit-status"
        role={status ? "alert" : "status"}
        aria-live="assertive"
      >
        {status}
      </div>
      <button
        className="button contact-submit"
        type="submit"
        disabled={pending}
      >
        {pending ? "Sending…" : "Send enquiry"}
        <span aria-hidden="true">→</span>
      </button>
      <p className="contact-submit-note">
        Your enquiry will be sent securely to Demand PR. After successful
        submission, you will see confirmation here and receive an email
        acknowledgement.
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  error,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={
        error ? "contact-field contact-field-invalid" : "contact-field"
      }
    >
      <label htmlFor={name}>
        {label}{" "}
        {label.includes("optional") ? null : <span aria-hidden="true">*</span>}
      </label>
      {children}
    </div>
  );
}
