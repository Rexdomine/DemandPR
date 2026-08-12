import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact & Consultation",
  description:
    "Share your Africa market-entry and growth objectives and review the information needed for a focused Demand PR consultation.",
  alternates: { canonical: "/contact" },
};

const steps = [
  [
    "Share Your Objectives",
    "Outline your commercial priorities, target markets, timing and the support you want to explore.",
  ],
  [
    "Review and Scope",
    "Demand PR can assess the context, clarify potential fit and identify questions for an initial conversation.",
  ],
  [
    "Agree the Next Step",
    "If there is a suitable basis to proceed, both sides can define the appropriate conversation or engagement scope.",
  ],
] as const;

const preparation = [
  [
    "Commercial Objective",
    "The outcome you are working towards and the business case behind your market activity.",
  ],
  [
    "Target Markets",
    "The countries or regions under consideration, including any existing presence or relationships.",
  ],
  [
    "Timing and Context",
    "Your current stage, decision horizon and any relevant commercial or stakeholder context.",
  ],
  [
    "Preferred Follow-up",
    "How you would prefer Demand PR to continue the conversation after reviewing your enquiry.",
  ],
] as const;

function ContactIcon({ index }: { index: number }) {
  return (
    <svg className="contact-icon" viewBox="0 0 40 40" aria-hidden="true">
      <circle cx="20" cy="20" r="17" />
      {index === 0 ? <path d="M12 25h16M14 21l4-5 4 3 5-7" /> : null}
      {index === 1 ? <path d="M12 14h16v12H12Zm5 12v3m6-3v3" /> : null}
      {index === 2 ? <path d="M13 13h14v14H13Zm4-3v6m6-6v6m-7 5h8" /> : null}
      {index === 3 ? <path d="M12 20h16m-5-5 5 5-5 5" /> : null}
    </svg>
  );
}

function ContactDetailIcon({ type }: { type: "email" | "phone" | "location" }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      {type === "email" ? (
        <>
          <rect x="7" y="11" width="34" height="26" rx="3" />
          <path d="m9 14 15 12 15-12" />
        </>
      ) : null}
      {type === "phone" ? (
        <path d="M14.2 8.5h6l3 9-4.1 2.8a27.6 27.6 0 0 0 8.6 8.6l2.8-4.1 9 3v6c0 3.2-2.6 5.8-5.8 5.7C20 39 9 28 8.5 14.3c-.1-3.2 2.5-5.8 5.7-5.8Z" />
      ) : null}
      {type === "location" ? (
        <>
          <path d="M38 20c0 10.5-14 20-14 20S10 30.5 10 20a14 14 0 1 1 28 0Z" />
          <circle cx="24" cy="20" r="4.5" />
        </>
      ) : null}
    </svg>
  );
}

export default function ContactPage() {
  return (
    <main id="main-content" className="contact-page">
      <section className="contact-hero" aria-labelledby="contact-title">
        <Image
          className="contact-hero-image"
          src="/images/contact/purposeful-conversation.webp"
          alt="An African business adviser in conversation with an executive in a contemporary terrace setting"
          fill
          priority
          sizes="100vw"
        />
        <div className="contact-hero-shade" aria-hidden="true" />
        <div className="shell contact-hero-content">
          <p className="eyebrow">Start a Conversation</p>
          <h1 id="contact-title">
            Let’s Discuss Your Africa Market Entry and Growth Objectives
          </h1>
          <p>
            Share the objectives you are working towards, the markets you are
            considering and the strategic or practical support you would like to
            explore.
          </p>
          <a className="button" href="#enquiry-form">
            Review the enquiry form <span aria-hidden="true">↓</span>
          </a>
        </div>
      </section>

      <section
        className="contact-details"
        aria-labelledby="contact-details-title"
      >
        <div className="shell">
          <div className="contact-details-heading">
            <div>
              <p className="eyebrow">Direct contact</p>
              <h2 id="contact-details-title">Connect with Demand PR</h2>
            </div>
            <p>
              Reach our team directly or use the consultation form below to
              share more context about your objectives.
            </p>
          </div>

          <div className="contact-details-grid">
            <article className="contact-detail-card">
              <ContactDetailIcon type="email" />
              <p>Email</p>
              <h3>Start by email</h3>
              <a
                href="mailto:customercare@demandpr.org"
                aria-label="Email customercare@demandpr.org"
              >
                customercare@demandpr.org
              </a>
            </article>

            <article className="contact-detail-card">
              <ContactDetailIcon type="phone" />
              <p>Telephone</p>
              <h3>Speak with our team</h3>
              <a href="tel:+447****1126" aria-label="Call +44 7971 201126">
                +44 7971 201126
              </a>
            </article>

            <article className="contact-detail-card contact-detail-address">
              <ContactDetailIcon type="location" />
              <p>London office</p>
              <h3>Our registered address</h3>
              <address>
                <strong>DEMAND PR LTD</strong>
                <span>Suite G04, 1 Quality Court</span>
                <span>Chancery Lane</span>
                <span>London</span>
                <span>WC2A 1HR</span>
              </address>
            </article>
          </div>
        </div>
      </section>

      <section className="contact-consultation" id="enquiry-form">
        <div className="shell contact-consultation-grid">
          <div className="contact-process">
            <p className="eyebrow">Consultation process</p>
            <h2>A Clear Route from Objectives to Next Steps</h2>
            <p className="contact-process-lead">
              A useful initial conversation starts with enough context to assess
              priorities and determine whether Demand PR’s capabilities align
              with the support required.
            </p>
            <ol>
              {steps.map(([title, text], index) => (
                <li key={title}>
                  <span aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <aside
              className="contact-connection-note"
              aria-label="Form connection status"
            >
              <strong>Secure enquiry delivery</strong>
              <p>
                Submissions are delivered securely to Demand PR. After a
                successful submission, this page confirms receipt and an email
                acknowledgement is sent to the address provided.
              </p>
            </aside>
          </div>
          <ContactForm />
        </div>
      </section>

      <section className="contact-prepare">
        <div className="shell">
          <div className="contact-section-heading">
            <p className="eyebrow">Prepare the context</p>
            <h2>What Helps Us Prepare</h2>
            <p>
              Concise, practical context helps Demand PR review your priorities
              and shape a more focused first conversation.
            </p>
          </div>
          <div className="contact-prepare-grid">
            {preparation.map(([title, text], index) => (
              <article key={title}>
                <ContactIcon index={index} />
                <span aria-hidden="true">0{index + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="contact-explore">
        <div className="shell contact-explore-grid">
          <div>
            <p className="eyebrow">Build your starting point</p>
            <h2>Explore Before You Enquire</h2>
            <p>
              Review Demand PR’s capabilities and market-entry approach before
              sharing your priorities. These pages can help you identify the
              most relevant starting point.
            </p>
          </div>
          <div className="contact-explore-links">
            <Link href="/services">
              <span>
                <small>Capabilities</small>
                <strong>Explore Services</strong>
              </span>
              <span aria-hidden="true">→</span>
            </Link>
            <Link href="/africa-market-entry-programme">
              <span>
                <small>Flagship approach</small>
                <strong>View the Market Entry Programme</strong>
              </span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
