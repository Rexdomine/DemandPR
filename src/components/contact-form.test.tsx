import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { describe, expect, it, vi } from "vitest";

import type { ContactSubmitResult, ContactSubmitter } from "@/lib/contact-form";

import { ContactForm } from "./contact-form";

async function completeForm(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/full name/i), "Ada Okafor");
  await user.type(screen.getByLabelText(/organisation/i), "Meridian Partners");
  await user.type(screen.getByLabelText(/work email/i), "ada@example.com");
  await user.type(
    screen.getByLabelText(/country or region/i),
    "United Kingdom",
  );
  await user.selectOptions(
    screen.getByLabelText(/area of interest/i),
    "market-entry",
  );
  await user.type(screen.getByLabelText(/target markets/i), "Ghana and Kenya");
  await user.click(screen.getByRole("radio", { name: "Email" }));
  await user.type(
    screen.getByLabelText(/objectives and support required/i),
    "We are assessing a regional expansion programme.",
  );
  await user.click(
    screen.getByRole("checkbox", { name: /may use the information/i }),
  );
}

describe("ContactForm", () => {
  it("associates labels, autocomplete and published length limits with every control", () => {
    const { container } = render(<ContactForm />);
    expect(screen.getByLabelText(/full name/i)).toHaveAttribute(
      "autocomplete",
      "name",
    );
    expect(screen.getByLabelText(/work email/i)).toHaveAttribute(
      "type",
      "email",
    );
    expect(screen.getByLabelText(/work email/i)).toHaveAttribute(
      "autocomplete",
      "email",
    );
    expect(screen.getByLabelText("Phone (optional)")).toHaveAttribute(
      "type",
      "tel",
    );
    expect(
      screen.getByLabelText(/objectives and support required/i),
    ).toHaveAttribute("maxlength", "2000");
    expect(
      container.querySelector('input[name="website"]'),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("group", { name: /preferred contact method/i }),
    ).toBeVisible();
  });

  it("shows accessible field errors and focuses the first invalid control", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    await user.click(screen.getByRole("button", { name: /send enquiry/i }));

    const fullName = screen.getByLabelText(/full name/i);
    expect(fullName).toHaveFocus();
    expect(fullName).toHaveAttribute("aria-invalid", "true");
    expect(fullName.getAttribute("aria-describedby")).toContain(
      "fullName-error",
    );
    expect(screen.getByText(/enter your full name/i)).toHaveAttribute(
      "role",
      "alert",
    );
    expect(
      screen.getByRole("group", { name: /preferred contact method/i }),
    ).toHaveAttribute("aria-invalid", "true");
  });

  it("clears a field error as the visitor corrects that field", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    await user.click(screen.getByRole("button", { name: /send enquiry/i }));

    const fullName = screen.getByLabelText(/full name/i);
    await user.type(fullName, "Ada Okafor");

    expect(fullName).toHaveAttribute("aria-invalid", "false");
    expect(screen.queryByText(/enter your full name/i)).not.toBeInTheDocument();
  });

  it("clears a conditional phone error when Email follow-up is selected", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    await completeForm(user);
    await user.click(screen.getByRole("radio", { name: "Telephone" }));
    await user.click(screen.getByRole("button", { name: /send enquiry/i }));
    expect(screen.getByText(/phone number is required/i)).toBeVisible();

    await user.click(screen.getByRole("radio", { name: "Email" }));

    expect(
      screen.queryByText(/phone number is required/i),
    ).not.toBeInTheDocument();
    expect(screen.getByLabelText("Phone (optional)")).toHaveAttribute(
      "aria-invalid",
      "false",
    );
  });

  it("makes phone conditionally required for Telephone and WhatsApp", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    await completeForm(user);
    await user.click(screen.getByRole("radio", { name: "Telephone" }));
    await user.click(screen.getByRole("button", { name: /send enquiry/i }));
    expect(screen.getByLabelText("Phone (optional)")).toHaveFocus();
    expect(screen.getByText(/phone number is required/i)).toBeVisible();
  });

  it("prevents duplicate submission while pending and exposes busy state", async () => {
    let resolve!: (result: ContactSubmitResult) => void;
    const submitter = vi.fn<ContactSubmitter>(
      () => new Promise((resolver) => (resolve = resolver)),
    );
    const user = userEvent.setup();
    render(<ContactForm submitter={submitter} />);
    await completeForm(user);
    const button = screen.getByRole("button", { name: /send enquiry/i });
    await user.click(button);

    expect(submitter).toHaveBeenCalledTimes(1);
    expect(
      screen.getByRole("form", { name: /consultation enquiry/i }),
    ).toHaveAttribute("aria-busy", "true");
    expect(screen.getByRole("button", { name: /sending/i })).toBeDisabled();
    await user.click(screen.getByRole("button", { name: /sending/i }));
    expect(submitter).toHaveBeenCalledTimes(1);
    resolve({
      status: "error",
      code: "provider_error",
      message: "Please try again.",
    });
    await screen.findByText("Please try again.");
  });

  it("shows a confirmed receipt, clears values and supports another enquiry", async () => {
    const submitter = vi.fn<ContactSubmitter>().mockResolvedValue({
      status: "success",
      receiptMessage: "Your enquiry was confirmed by the submission service.",
    });
    const user = userEvent.setup();
    render(<ContactForm submitter={submitter} />);
    await completeForm(user);
    await user.click(screen.getByRole("button", { name: /send enquiry/i }));

    expect(
      await screen.findByText(/confirmed by the submission service/i),
    ).toBeVisible();
    expect(screen.queryByDisplayValue("Ada Okafor")).not.toBeInTheDocument();
    await user.click(
      screen.getByRole("button", { name: /send another enquiry/i }),
    );
    expect(screen.getByLabelText(/full name/i)).toHaveValue("");
  });

  it.each([
    {
      name: "provider error",
      submitter: vi.fn<ContactSubmitter>().mockResolvedValue({
        status: "error",
        code: "provider_error",
        message: "The submission service could not confirm your enquiry.",
      }),
      message: /could not confirm/i,
    },
  ])(
    "preserves all values on $name failure",
    async ({ submitter, message }) => {
      const user = userEvent.setup();
      render(<ContactForm submitter={submitter} />);
      await completeForm(user);
      await user.click(screen.getByRole("button", { name: /send enquiry/i }));
      expect(await screen.findByText(message)).toBeVisible();
      expect(screen.getByLabelText(/full name/i)).toHaveValue("Ada Okafor");
      expect(screen.getByLabelText(/target markets/i)).toHaveValue(
        "Ghana and Kenya",
      );
      expect(
        screen.getByRole("checkbox", { name: /may use the information/i }),
      ).toBeChecked();
    },
  );

  it("does not call the adapter when the honeypot is populated", async () => {
    const submitter = vi.fn<ContactSubmitter>();
    const user = userEvent.setup();
    const { container } = render(<ContactForm submitter={submitter} />);
    await completeForm(user);
    await user.type(
      container.querySelector<HTMLInputElement>('[name="website"]')!,
      "spam",
    );
    await user.click(screen.getByRole("button", { name: /send enquiry/i }));
    expect(submitter).not.toHaveBeenCalled();
  });

  it("has no detectable automated accessibility violations", async () => {
    const { container } = render(<ContactForm />);
    expect((await axe(container)).violations).toEqual([]);
  });
});
