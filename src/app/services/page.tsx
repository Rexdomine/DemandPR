import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Strategic advisory, representation and practical market support for organisations entering, investing and growing across African markets.",
  alternates: { canonical: "/services" },
};

const pillars = [
  {
    title: "Market Entry & Intelligence",
    services: [
      {
        title: "Africa Market Entry",
        text: "Tailored strategy, stakeholder mapping and practical coordination for organisations establishing or expanding their market presence.",
        icon: "compass",
      },
      {
        title: "Market Intelligence",
        text: "Focused market and sector insight that supports informed priorities, positioning and risk-aware decisions.",
        icon: "chart",
      },
    ],
  },
  {
    title: "Representation & Relationships",
    services: [
      {
        title: "Investor Representation",
        text: "Strategic representation and ongoing market support aligned with investor objectives.",
        icon: "briefcase",
      },
      {
        title: "Government Relations",
        text: "Constructive engagement with governments, regulators and relevant public stakeholders.",
        icon: "columns",
      },
      {
        title: "PR & Stakeholder Engagement",
        text: "Clear communications and engagement strategies connecting organisational goals with relevant stakeholder context.",
        icon: "people",
      },
    ],
  },
  {
    title: "Missions, Forums & Events",
    services: [
      {
        title: "Trade Missions",
        text: "Planning and coordination for focused trade missions and business delegations.",
        icon: "route",
      },
      {
        title: "Investment Forums",
        text: "Strategy and delivery support for investment-focused convening and stakeholder programmes.",
        icon: "forum",
      },
      {
        title: "Executive Events",
        text: "Purpose-led executive programmes shaped around dialogue, relationships and commercial priorities.",
        icon: "calendar",
      },
    ],
  },
  {
    title: "Executive & Corporate Support",
    services: [
      {
        title: "Corporate Concierge",
        text: "Practical coordination for organisations and leadership teams undertaking market activity.",
        icon: "concierge",
      },
      {
        title: "Strategic Introductions",
        text: "Carefully selected introductions to relevant decision-makers and potential commercial partners.",
        icon: "link",
      },
      {
        title: "Visa & Immigration",
        text: "Coordination and practical mobility support, subject to applicable requirements and specialist guidance where needed.",
        icon: "document",
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

function ServiceIcon({ type }: { type: string }) {
  return (
    <svg className="services-icon" viewBox="0 0 32 32" aria-hidden="true">
      <rect x="5" y="5" width="22" height="22" rx="4" />
      {type === "chart" ? <path d="M10 21v-5m6 5V11m6 10v-8" /> : null}
      {type === "people" ? (
        <path d="M10 21c1-4 11-4 12 0M13 12a3 3 0 1 0 6 0 3 3 0 0 0-6 0Z" />
      ) : null}
      {type === "columns" ? (
        <path d="m9 12 7-4 7 4M10 14v7m6-7v7m6-7v7M8 23h16" />
      ) : null}
      {type === "calendar" ? (
        <path d="M9 13h14M12 8v5m8-5v5m-8 5h3m3 0h2" />
      ) : null}
      {type === "link" ? (
        <path d="m13 19-2 2a3 3 0 0 1-4-4l4-4a3 3 0 0 1 4 0m2 0 2-2a3 3 0 0 1 4 4l-4 4a3 3 0 0 1-4 0m-3-3h8" />
      ) : null}
      {type === "document" ? (
        <path d="M11 8h7l4 4v12H11Zm7 0v5h4m-8 4h5m-5 3h5" />
      ) : null}
      {type === "route" ? (
        <path d="M10 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM10 11c0 7 12 3 12 10" />
      ) : null}
      {type === "briefcase" ? (
        <path d="M9 13h14v10H9Zm4 0v-3h6v3m-10 5h14" />
      ) : null}
      {type === "forum" ? <path d="M9 10h14v9H15l-4 3v-3H9Z" /> : null}
      {type === "concierge" ? (
        <path d="M8 21h16M10 21a6 6 0 0 1 12 0m-6-8v-2" />
      ) : null}
      {type === "compass" ? <path d="m20 11-2.5 6.5L11 20l2.5-6.5Z" /> : null}
    </svg>
  );
}

export default function ServicesPage() {
  return (
    <main id="main-content" className="services-page">
      <section className="services-hero" aria-labelledby="services-title">
        <Image
          className="services-hero-image"
          src="/images/home/african-city-twilight.jpg"
          alt="African city skyline illuminated at twilight"
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
            <Link className="button" href="/#consultation">
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
              Four connected areas of support, tailored to each organisation’s
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
                      <ServiceIcon type={service.icon} />
                      <h4>{service.title}</h4>
                      <p>{service.text}</p>
                      {service.title === "Africa Market Entry" ? (
                        <Link href="/africa-market-entry-programme">
                          Africa Market Entry programme details{" "}
                          <span aria-hidden="true">→</span>
                        </Link>
                      ) : null}
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
              src="/images/home/strategic-adviser.jpg"
              alt="Strategic adviser preparing for an executive discussion"
              fill
              sizes="(min-width: 960px) 44vw, 100vw"
            />
            <p>Ongoing representation across Africa</p>
          </div>
        </div>
      </section>

      <section className="services-sectors">
        <div className="shell services-sector-row">
          <h2>Our Sector Expertise</h2>
          <div className="services-sector-chips" aria-label="Supported sectors">
            {[
              "Infrastructure",
              "Financial Services",
              "Energy",
              "Agriculture",
              "Technology",
            ].map((sector) => (
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
            <Link className="button" href="/#consultation">
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
