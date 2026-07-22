import { describe, expect, it, vi } from "vitest";

import { createContactApiSubmitter, type ContactPayload } from "./contact-form";

const payload: ContactPayload = {
  fullName: "Ada Okafor",
  organisation: "Meridian Partners",
  workEmail: "ada@example.com",
  phone: "",
  country: "Ghana",
  interest: "market-entry",
  targetMarkets: "Ghana and Kenya",
  contactMethod: "email",
  message: "We are assessing a regional expansion programme.",
  consent: true,
};

describe("contact API client adapter", () => {
  it("posts JSON to the same-origin endpoint with bot timing metadata", async () => {
    const fetcher = vi.fn().mockResolvedValue(
      new Response(
        JSON.stringify({
          ok: true,
          message: "Your enquiry has been sent successfully.",
        }),
        {
          status: 200,
          headers: { "content-type": "application/json" },
        },
      ),
    );
    const submit = createContactApiSubmitter({ fetcher, startedAt: 1234 });
    await expect(submit(payload)).resolves.toEqual({
      status: "success",
      receiptMessage: "Your enquiry has been sent successfully.",
    });
    expect(fetcher).toHaveBeenCalledWith("/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...payload, website: "", startedAt: 1234 }),
    });
  });

  it.each([
    [400, "validation_error", /check the highlighted information/i],
    [429, "rate_limited", /wait.*try again/i],
    [503, "configuration_error", /temporarily unavailable/i],
    [502, "provider_error", /could not confirm/i],
  ])("maps HTTP %s safely", async (status, code, message) => {
    const fetcher = vi
      .fn()
      .mockResolvedValue(
        new Response(
          JSON.stringify({ ok: false, code, message: "unsafe server detail" }),
          { status },
        ),
      );
    await expect(
      createContactApiSubmitter({ fetcher, startedAt: 1 })(payload),
    ).resolves.toMatchObject({
      status: "error",
      code,
      message: expect.stringMatching(message),
    });
  });

  it("maps network and malformed responses to a generic retryable error", async () => {
    const thrown = vi
      .fn()
      .mockRejectedValue(new Error("private network detail"));
    await expect(
      createContactApiSubmitter({ fetcher: thrown, startedAt: 1 })(payload),
    ).resolves.toEqual({
      status: "error",
      code: "network_error",
      message:
        "We could not send your enquiry. Your details remain in the form; please try again.",
    });
  });
});
