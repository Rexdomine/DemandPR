import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Africa Market Entry Programme",
  description:
    "Strategic market-entry advisory, stakeholder engagement and practical support for organisations entering and expanding across African markets.",
  alternates: { canonical: "/africa-market-entry-programme" },
};

const partners = [
  {
    icon: "◇",
    title: "International Businesses",
    text: "Organisations seeking a clear commercial strategy for establishing or expanding their presence in African markets.",
  },
  {
    icon: "◎",
    title: "Investors & Family Offices",
    text: "Investors who need informed market context, stakeholder support and practical guidance throughout the investment journey.",
  },
  {
    icon: "◫",
    title: "Governments & Institutions",
    text: "Public institutions, trade organisations and agencies building productive investment and commercial relationships.",
  },
] as const;

const framework = [
  [
    "Discover",
    "Clarify objectives, priorities and the markets that warrant closer assessment.",
  ],
  [
    "Assess",
    "Review commercial, stakeholder and operational considerations to support informed decisions.",
  ],
  [
    "Shape",
    "Develop a market-entry strategy aligned with your sector, proposition and growth goals.",
  ],
  [
    "Build",
    "Identify relevant stakeholders and cultivate credible, productive relationships.",
  ],
  [
    "Facilitate",
    "Coordinate introductions, engagement and practical support for market activity.",
  ],
  [
    "Support",
    "Provide ongoing advice, representation and market-development support as priorities evolve.",
  ],
] as const;

const services = [
  [
    "Market Intelligence",
    "Focused market and sector insight to inform priorities, positioning and risk-aware decisions.",
  ],
  [
    "Investor Representation",
    "Strategic representation and ongoing support aligned with investor objectives.",
  ],
  [
    "Government Relations",
    "Constructive engagement with governments, regulators and relevant public stakeholders.",
  ],
  [
    "Strategic Introductions",
    "Carefully selected introductions to relevant decision-makers and potential commercial partners.",
  ],
  [
    "Trade & Investment Support",
    "Planning and coordination for trade missions, business delegations and investment activity.",
  ],
  [
    "Stakeholder Engagement",
    "Clear engagement strategies that connect commercial goals with local context and relationships.",
  ],
] as const;

const industries = [
  { icon: "infrastructure", title: "Infrastructure" },
  { icon: "financial-services", title: "Financial Services" },
  { icon: "energy", title: "Energy" },
  { icon: "agriculture", title: "Agriculture" },
  { icon: "technology", title: "Technology" },
  { icon: "healthcare", title: "Healthcare" },
] as const;

type SectorIconType = (typeof industries)[number]["icon"];

/**
 * Draws a sector-specific visual cue using one consistent line-icon language.
 * The icon is decorative because the adjacent heading provides the accessible name.
 */
function SectorIcon({ type }: { type: SectorIconType }) {
  return (
    <svg
      className="market-entry-sector-icon"
      data-sector-icon={type}
      viewBox="0 0 64 64"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {type === "infrastructure" ? (
        <>
          <path d="M8 46h48M12 40h40" />
          <path d="M17 40V19h6v21m18 0V19h6v21M17 23h30" />
          <path d="M17 23 9 40m14-17 9 17m9-17-9 17m15-17 8 17" />
          <path d="M27 40h10" />
        </>
      ) : null}
      {type === "financial-services" ? (
        <>
          <path d="m10 25 22-12 22 12M13 28h38M10 49h44M14 54h36" />
          <path d="M17 28v21m10-21v21m10-21v21m10-21v21" />
          <path d="M28 21h8" />
        </>
      ) : null}
      {type === "energy" ? (
        <>
          <path d="M26 8h12l-3 17h10L24 56l4-22H18Z" />
          <path d="M10 49h10m24 0h10" />
        </>
      ) : null}
      {type === "agriculture" ? (
        <>
          <path d="M32 53V30" />
          <path d="M32 35C20 34 14 27 14 16c12 0 18 7 18 19Z" />
          <path d="M32 28c11-1 17-7 18-17-11 0-17 6-18 17Z" />
          <path d="M9 53c6-7 12-7 18 0m10 0c6-7 12-7 18 0" />
        </>
      ) : null}
      {type === "technology" ? (
        <>
          <rect x="22" y="22" width="20" height="20" rx="3" />
          <path d="M27 27h10v10H27ZM26 14v8m12-8v8M26 42v8m12-8v8M14 26h8m-8 12h8m20-12h8m-8 12h8" />
          <circle cx="14" cy="26" r="2" />
          <circle cx="50" cy="38" r="2" />
        </>
      ) : null}
      {type === "healthcare" ? (
        <>
          <path d="M32 54S13 44 13 27c0-8 5-13 12-13 4 0 7 2 9 6 2-4 5-6 9-6 7 0 12 5 12 13 0 17-23 27-23 27Z" />
          <path d="M19 33h8l3-7 5 14 4-7h10" />
        </>
      ) : null}
    </svg>
  );
}

const edge = [
  [
    "Relationship-Led",
    "Trusted relationships and stakeholder engagement shaped around each organisation’s objectives.",
  ],
  [
    "International Perspective",
    "International business standards combined with practical understanding of African markets.",
  ],
  [
    "Execution Focused",
    "Strategic advice connected to introductions, coordination and practical market support.",
  ],
] as const;

const faqs = [
  [
    "Which markets do you support?",
    "We assess support around each organisation’s target market, sector and objectives. A strategy consultation helps establish fit, priorities and the appropriate scope before an engagement begins.",
  ],
  [
    "Who is a suitable client for this programme?",
    "The programme is designed for international businesses, investors, governments, trade organisations and institutions with clear ambitions to establish, expand or strengthen their presence in African markets.",
  ],
  [
    "How do we start the process?",
    "Begin with the consultation information below. An initial conversation can clarify your market priorities, stakeholder needs and whether a focused engagement or retained strategic partnership is appropriate.",
  ],
] as const;

export default function AfricaMarketEntryProgramme() {
  return (
    <main id="main-content" className="market-entry-page">
      <section
        className="market-entry-hero"
        aria-labelledby="market-entry-title"
      >
        <Image
          className="market-entry-hero-image"
          src="/images/market-entry/market-entry-guided-arrival.webp"
          alt="African market adviser guiding business leaders through a waterfront commercial district"
          fill
          priority
          sizes="100vw"
        />
        <div className="market-entry-hero-shade" aria-hidden="true" />
        <div className="shell market-entry-hero-content">
          <p className="eyebrow">Africa Market Entry Programme</p>
          <h1
            id="market-entry-title"
            aria-label="Enter African Markets with Clarity, Confidence and the Right Connections"
          >
            Enter African Markets with Clarity, Confidence and
            <span className="market-entry-hero-phrase">
              {" the Right Connections"}
            </span>
          </h1>
          <p>
            Strategic market-entry support for international organisations
            seeking sustainable growth and a well-informed presence across
            African markets.
          </p>
          <div className="button-row">
            <Link className="button" href="/contact">
              Strategy Consultation Details <span aria-hidden="true">→</span>
            </Link>
            <Link
              className="button market-entry-outline-button"
              href="/africa-market-entry-programme#framework"
            >
              Explore Our Framework
            </Link>
          </div>
        </div>
      </section>

      <section className="market-entry-section market-entry-opportunity">
        <div className="shell market-entry-opportunity-grid">
          <div>
            <p className="eyebrow">Why Africa</p>
            <h2>Navigating the African Opportunity</h2>
            <p className="market-entry-lead">
              African markets offer significant possibilities across diverse
              sectors, but every market has its own commercial, regulatory and
              stakeholder context.
            </p>
            <p>
              Demand PR helps organisations move beyond general research with
              tailored strategic advisory, trusted relationships and practical
              market-entry support.
            </p>
            <blockquote>
              Success requires local understanding, a clear commercial strategy
              and the patience to build credible relationships.
            </blockquote>
          </div>
          <div className="market-entry-image-pair">
            <div>
              <Image
                src="/images/market-entry/market-entry-local-intelligence.webp"
                alt="African business founder sharing manufacturing insight with a market adviser"
                fill
                sizes="(min-width: 960px) 22vw, 45vw"
              />
            </div>
            <div>
              <Image
                src="/images/market-entry/market-entry-logistics-execution.webp"
                alt="African logistics manager coordinating activity at an intermodal freight terminal"
                fill
                sizes="(min-width: 960px) 22vw, 45vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="market-entry-section market-entry-partners">
        <div className="shell">
          <div className="market-entry-heading-centred">
            <p className="eyebrow">Strategic partners</p>
            <h2>Who We Partner With</h2>
          </div>
          <div className="market-entry-partner-grid">
            {partners.map((partner) => (
              <article key={partner.title}>
                <span aria-hidden="true">{partner.icon}</span>
                <h3>{partner.title}</h3>
                <p>{partner.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="market-entry-section market-entry-framework"
        id="framework"
      >
        <div className="shell">
          <p className="eyebrow">Our market-entry framework</p>
          <h2>A Systematic 6‑Step Framework</h2>
          <p className="market-entry-section-intro">
            A structured methodology that turns initial ambition into an
            informed route to sustainable growth.
          </p>
          <ol className="market-entry-framework-grid">
            {framework.map(([title, text], index) => (
              <li key={title}>
                <span aria-hidden="true">{index + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="market-entry-section market-entry-services">
        <div className="shell">
          <div className="market-entry-heading-row">
            <div>
              <p className="eyebrow">Services included</p>
              <h2>Strategic Service Suite</h2>
            </div>
            <p>
              Capabilities are tailored to your market, sector and commercial
              objectives.
            </p>
          </div>
          <div className="market-entry-service-grid">
            {services.map(([title, text], index) => (
              <article key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="market-entry-section market-entry-engagement">
        <div className="shell">
          <div className="market-entry-heading-centred">
            <p className="eyebrow">Engagement model</p>
            <h2>Partnership Built Around Your Ambition</h2>
            <p>
              We prioritise lasting strategic partnerships while providing a
              focused starting point where appropriate.
            </p>
          </div>
          <div className="market-entry-engagement-grid">
            <article>
              <p className="eyebrow">Focused engagement</p>
              <h3>Market-Entry Advisory</h3>
              <p>
                A defined engagement for organisations that need a clear market
                assessment, stakeholder map or practical entry roadmap.
              </p>
              <ul>
                <li>Objectives and priority assessment</li>
                <li>Tailored strategy and recommendations</li>
                <li>Clear route into ongoing support</li>
              </ul>
            </article>
            <article className="market-entry-retained-card">
              <p className="eyebrow">Preferred model</p>
              <h3>Retained Strategic Partnership</h3>
              <p>
                Ongoing advisory, representation and market-development support
                that evolves with your organisation’s long-term priorities.
              </p>
              <ul>
                <li>Continuous strategic counsel</li>
                <li>Stakeholder engagement and introductions</li>
                <li>Market intelligence and business-development support</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="market-entry-section market-entry-industries">
        <div className="shell">
          <div className="market-entry-heading-centred">
            <p className="eyebrow">Industries served</p>
            <h2>Sector Specialisation</h2>
          </div>
          <div className="market-entry-industry-grid">
            {industries.map((industry, index) => (
              <article key={industry.title}>
                <div className="market-entry-industry-visual">
                  <span
                    className="market-entry-industry-number"
                    aria-hidden="true"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="market-entry-industry-icon"
                    aria-hidden="true"
                  >
                    <SectorIcon type={industry.icon} />
                  </span>
                </div>
                <h3>{industry.title}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="market-entry-section market-entry-edge">
        <div className="shell market-entry-edge-grid">
          <div className="market-entry-edge-image">
            <Image
              src="/images/market-entry/market-entry-partnership-in-practice.webp"
              alt="African strategic adviser connecting local and international business leaders"
              fill
              sizes="(min-width: 960px) 48vw, 100vw"
            />
          </div>
          <div>
            <p className="eyebrow">Why Demand PR</p>
            <h2>The Demand PR Edge</h2>
            <div className="market-entry-edge-list">
              {edge.map(([title, text], index) => (
                <article key={title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="market-entry-section market-entry-faq">
        <div className="shell market-entry-faq-inner">
          <p className="eyebrow">Practical information</p>
          <h2>Frequently Asked Questions</h2>
          <div className="market-entry-faq-list">
            {faqs.map(([question, answer]) => (
              <details key={question}>
                <summary>
                  <span>{question}</span>
                  <span aria-hidden="true">+</span>
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="market-entry-section market-entry-final-cta">
        <div className="shell">
          <p className="eyebrow">Take the next step</p>
          <h2>Ready to Navigate the African Opportunity?</h2>
          <p>
            Start a focused conversation about your target market, commercial
            priorities and the practical support your organisation needs.
          </p>
          <Link className="button button-light" href="/contact">
            Strategy Consultation Details <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
