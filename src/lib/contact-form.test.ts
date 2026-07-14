import { describe, expect, it } from "vitest";

import {
  CONTACT_FIELD_LIMITS,
  notConfiguredContactSubmitter,
  validateContactForm,
  type ContactFormInput,
} from "./contact-form";

const validInput: ContactFormInput = {
  fullName: "  Ada Okafor  ",
  organisation: "  Meridian Partners  ",
  workEmail: "  ADA@EXAMPLE.COM  ",
  phone: "  +44 20 1234 5678  ",
  country: "  United Kingdom  ",
  interest: "market-entry",
  targetMarkets: "  Ghana and Kenya  ",
  contactMethod: "email",
  message: "  We are assessing a regional expansion programme.  ",
  consent: true,
  website: "",
};

describe("contact form validation", () => {
  it("normalises a complete valid payload deterministically", () => {
    expect(validateContactForm(validInput)).toEqual({
      ok: true,
      payload: {
        fullName: "Ada Okafor",
        organisation: "Meridian Partners",
        workEmail: "ada@example.com",
        phone: "+44 20 1234 5678",
        country: "United Kingdom",
        interest: "market-entry",
        targetMarkets: "Ghana and Kenya",
        contactMethod: "email",
        message: "We are assessing a regional expansion programme.",
        consent: true,
      },
    });
  });

  it("returns field errors for every required value and malformed email", () => {
    const result = validateContactForm({
      ...validInput,
      fullName: " ",
      organisation: "x",
      workEmail: "not-an-email",
      country: "",
      interest: "",
      targetMarkets: " ",
      contactMethod: "",
      message: "too short",
      consent: false,
    });

    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(Object.keys(result.errors)).toEqual([
      "fullName",
      "organisation",
      "workEmail",
      "country",
      "interest",
      "targetMarkets",
      "contactMethod",
      "message",
      "consent",
    ]);
  });

  it.each(["telephone", "whatsapp"] as const)(
    "requires a phone number when %s is preferred",
    (contactMethod) => {
      const result = validateContactForm({
        ...validInput,
        contactMethod,
        phone: " ",
      });
      expect(result.ok).toBe(false);
      if (!result.ok) expect(result.errors.phone).toMatch(/required/i);
    },
  );

  it("allows phone to be omitted when email is preferred", () => {
    expect(validateContactForm({ ...validInput, phone: " " }).ok).toBe(true);
  });

  it("rejects every overlong field at its published boundary", () => {
    for (const field of [
      "fullName",
      "organisation",
      "workEmail",
      "phone",
      "country",
      "targetMarkets",
      "message",
    ] as const) {
      const result = validateContactForm({
        ...validInput,
        [field]: "x".repeat(CONTACT_FIELD_LIMITS[field] + 1),
      });
      expect(result.ok, field).toBe(false);
      if (!result.ok)
        expect(result.errors[field], field).toMatch(/characters or fewer/i);
    }
  });

  it("rejects an invalid interest and a populated honeypot", () => {
    const invalidInterest = validateContactForm({
      ...validInput,
      interest: "invented",
    });
    const bot = validateContactForm({
      ...validInput,
      website: "https://spam.invalid",
    });
    expect(invalidInterest.ok).toBe(false);
    expect(bot.ok).toBe(false);
    if (!invalidInterest.ok)
      expect(invalidInterest.errors.interest).toBeDefined();
    if (!bot.ok) expect(bot.errors.website).toBeDefined();
  });

  it("uses a transparent inert default submitter", async () => {
    const validated = validateContactForm(validInput);
    expect(validated.ok).toBe(true);
    if (!validated.ok) return;
    await expect(
      notConfiguredContactSubmitter(validated.payload),
    ).resolves.toEqual({
      status: "error",
      code: "not_configured",
      message:
        "This form is not connected yet, so your enquiry has not been sent or stored. Please keep this page open if you want to retain your details.",
    });
  });
});
