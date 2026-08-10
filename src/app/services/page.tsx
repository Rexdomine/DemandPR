import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { serviceAreas, supportedIndustries } from "@/content/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Six connected strategic service areas spanning communications, events, market access, leadership, investment and executive business support.",
  alternates: { canonical: "/services" },
};

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

function ServiceAreaImage({
  id,
  alt,
}: {
  id: (typeof serviceAreas)[number]["id"];
  alt: string;
}) {
  const sharedProps = {
    alt,
    fill: true,
    sizes: "(min-width: 961px) 42vw, 100vw",
  } as const;

  if (id === "pr-strategic-communications") {
    return (
      <Image src="/images/services/strategy-in-motion.webp" {...sharedProps} />
    );
  }
  if (id === "events-conference-management") {
    return (
      <Image
        src="/images/home/investment-forum-orchestration.webp"
        {...sharedProps}
      />
    );
  }
  if (id === "trade-delegations-market-entry") {
    return (
      <Image src="/images/home/trade-delegation-access.webp" {...sharedProps} />
    );
  }
  if (id === "leadership-parliamentary-training") {
    return (
      <Image src="/images/about/context-made-practical.webp" {...sharedProps} />
    );
  }
  if (id === "investor-hub") {
    return (
      <Image
        src="/images/market-entry/market-entry-partnership-in-practice.webp"
        {...sharedProps}
      />
    );
  }
  return (
    <Image
      src="/images/market-entry/market-entry-guided-arrival.webp"
      {...sharedProps}
    />
  );
}

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
            One strategic partner. <span>Six connected service areas.</span>
          </h1>
          <p>
            Demand PR combines PR, events, market access, leadership, investment
            and executive business support to help organisations build
            visibility, enter markets, connect with decision-makers and turn
            opportunities into action.
          </p>
          <div className="button-row">
            <Link className="button" href="/contact">
              Strategy Consultation Details <span aria-hidden="true">→</span>
            </Link>
            <Link
              className="button services-outline-button"
              href="/services#service-pillars"
            >
              Explore Core Services
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
            <p className="eyebrow">Demand PR — six service areas</p>
            <h2>Our Six Core Service Areas</h2>
            <p>
              From strategic communications and corporate events to trade
              delegations, market entry, investor connections and executive
              support, we provide the relationships, access and practical
              expertise needed to operate successfully across Africa and
              international markets.
            </p>
          </div>
          <div className="services-area-list">
            {serviceAreas.map((service, index) => (
              <article
                className="services-area"
                id={service.id}
                key={service.id}
              >
                <div className="services-area-image">
                  <ServiceAreaImage id={service.id} alt={service.alt} />
                  <span aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="services-area-copy">
                  <p className="services-area-group">{service.group}</p>
                  <h3>{service.title}</h3>
                  <p className="services-area-lead">{service.lead}</p>
                  <p>{service.description}</p>
                  <h4>What we do</h4>
                  <ul>
                    {service.bullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <p className="services-area-closing">{service.closing}</p>
                </div>
              </article>
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
