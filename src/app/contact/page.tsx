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
    "How you would prefer to continue the conversation once enquiry delivery is connected.",
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
              <strong>Current form status</strong>
              <p>
                This review form validates locally but is not yet connected. It
                does not send or store the information you enter.
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
              Concise, practical context helps shape a more focused first
              conversation when enquiry delivery becomes available.
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
