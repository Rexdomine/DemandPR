import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { PremiumIcon, type PremiumIconName } from "@/components/premium-icon";
import { featuredServices, supportedIndustries } from "@/content/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Strategic advisory, representation and practical market support for organisations entering, investing and growing across African markets.",
  alternates: { canonical: "/services" },
};

const pillars = [
  {
    title: "Strategic Communications & Events",
    services: [
      {
        ...featuredServices[0],
        text: featuredServices[0].description,
        icon: "communications",
      },
      {
        ...featuredServices[1],
        text: featuredServices[1].description,
        icon: "events",
      },
    ],
  },
  {
    title: "Market Access & Leadership",
    services: [
      {
        ...featuredServices[2],
        text: featuredServices[2].description,
        icon: "market-entry",
      },
      {
        ...featuredServices[3],
        text: featuredServices[3].description,
        icon: "leadership-training",
      },
    ],
  },
  {
    title: "Investment & Executive Support",
    services: [
      {
        ...featuredServices[4],
        text: featuredServices[4].description,
        icon: "investor-hub",
      },
      {
        ...featuredServices[5],
        text: featuredServices[5].description,
        icon: "concierge",
      },
    ],
  },
] as const;

const methodology = [
  [
    "Understand Objectives",
    "Clarify market priorities, commercial goals and the support required.",
  ],
  [
    "Shape Strategy",
    "Develop an approach aligned with the organisation, sector and market context.",
  ],
  [
    "Connect Stakeholders",
    "Identify relevant relationships and coordinate credible engagement.",
  ],
  [
    "Coordinate Delivery",
    "Support agreed activity, communications and practical market requirements.",
  ],
  [
    "Support Growth",
    "Provide ongoing counsel as priorities and market needs evolve.",
  ],
] as const;

const retainedThemes = [
  [
    "Continuous Strategic Counsel",
    "Ongoing guidance shaped around evolving leadership priorities and market context.",
  ],
  [
    "Representation & Intelligence",
    "Continued stakeholder engagement and relevant market insight to inform decisions.",
  ],
  [
    "Business Development Support",
    "Practical relationship and market-development coordination aligned with long-term goals.",
  ],
] as const;

export default function ServicesPage() {
  return (
    <main id="main-content" className="services-page">
      <section className="services-hero" aria-labelledby="services-title">
        <Image
          className="services-hero-image"
          src="/images/services/strategy-in-motion.webp"
          alt="African market adviser briefing business leaders at a logistics corridor"
          fill
          priority
          sizes="100vw"
        />
        <div className="services-hero-overlay" aria-hidden="true" />
        <div className="shell services-hero-content">
          <p className="eyebrow">Strategic Advisory</p>
          <h1 id="services-title">
            Strategic Support for <span>Market Entry</span>, Investment and
            Growth Across Africa
          </h1>
          <p>
            Demand PR supports international organisations, investors and
            institutions through strategic advisory, representation, stakeholder
            engagement and practical market coordination.
          </p>
          <div className="button-row">
            <Link className="button" href="/contact">
              Strategy Consultation Details <span aria-hidden="true">→</span>
            </Link>
            <Link
              className="button services-outline-button"
              href="/services#service-pillars"
            >
              Explore Service Pillars
            </Link>
          </div>
        </div>
      </section>

      <section
        className="services-section services-pillars"
        id="service-pillars"
      >
        <div className="shell">
          <div className="services-heading">
            <p className="eyebrow">Integrated capabilities</p>
            <h2>Service Pillars</h2>
            <p>
              Six connected core services, tailored to each organisation’s
              objectives, sector and market context.
            </p>
          </div>
          <div className="services-pillar-grid">
            {pillars.map((pillar, pillarIndex) => (
              <div className="services-pillar" key={pillar.title}>
                <span className="services-pillar-number" aria-hidden="true">
                  {String(pillarIndex + 1).padStart(2, "0")}
                </span>
                <h3>{pillar.title}</h3>
                <div className="services-card-stack">
                  {pillar.services.map((service) => (
                    <article key={service.title}>
                      <PremiumIcon
                        name={service.icon as PremiumIconName}
                        className="services-icon"
                      />
                      <h4>{service.title}</h4>
                      <p>{service.text}</p>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="services-section services-methodology">
        <div className="shell">
          <div className="services-heading services-heading-centred">
            <p className="eyebrow">How we work</p>
            <h2>The Methodology</h2>
            <p>
              A clear advisory rhythm from initial objectives through to ongoing
              support.
            </p>
          </div>
          <ol className="services-method-grid">
            {methodology.map(([title, text], index) => (
              <li key={title}>
                <span aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="services-section services-retained">
        <div className="shell services-retained-grid">
          <div className="services-retained-copy">
            <p className="eyebrow">Preferred partnership model</p>
            <h2>The Power of Retained Advisory</h2>
            <p className="services-retained-lead">
              Long-term priorities benefit from continuity. Retained advisory
              gives organisations an ongoing strategic partner for
              representation, intelligence and market development support.
            </p>
            <div className="services-retained-list">
              {retainedThemes.map(([title, text], index) => (
                <article key={title}>
                  <span aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <div className="services-retained-visual">
            <Image
              src="/images/services/retained-advisory-partnership.webp"
              alt="Senior African adviser leading a focused market planning discussion"
              fill
              sizes="(min-width: 961px) 44vw, 100vw"
            />
            <p>Ongoing representation across Africa</p>
          </div>
        </div>
      </section>

      <section className="services-sectors" id="sector-expertise">
        <div className="shell services-sector-row">
          <h2>Our Sector Expertise</h2>
          <div className="services-sector-chips" aria-label="Supported sectors">
            {supportedIndustries.map((sector) => (
              <span key={sector}>{sector}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="services-section services-final-cta">
        <div className="shell">
          <p className="eyebrow">Start with strategy</p>
          <h2>Ready to Navigate the African Opportunity?</h2>
          <p>
            Discuss your market priorities, stakeholder needs and the strategic
            support appropriate to your organisation.
          </p>
          <div className="button-row">
            <Link className="button" href="/contact">
              Strategy Consultation Details
            </Link>
            <Link
              className="button services-final-outline"
              href="/africa-market-entry-programme"
            >
              Explore the Market Entry Programme
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
