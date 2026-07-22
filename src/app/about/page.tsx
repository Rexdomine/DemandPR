import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn how Demand PR, an international business consultancy, supports relationship-led market entry, strategic partnerships and sustainable growth across global-African corridors.",
  alternates: { canonical: "/about" },
};

const values = [
  [
    "Integrity",
    "We approach every engagement with transparency, sound judgement and respect for all parties.",
  ],
  [
    "Strategic Clarity",
    "We turn complex market considerations into focused priorities and practical routes forward.",
  ],
  [
    "Relationship Stewardship",
    "We cultivate professional relationships thoughtfully, with attention to context and shared purpose.",
  ],
  [
    "International Perspective",
    "We connect international business standards with an informed understanding of distinct markets.",
  ],
  [
    "Execution Focus",
    "We link strategic advice to coordinated activity, clear responsibilities and practical support.",
  ],
  [
    "Long-Term Partnership",
    "We remain attentive as priorities evolve, supporting relationships and programmes beyond an initial brief.",
  ],
] as const;

const reasons = [
  [
    "Tailored advisory",
    "Every engagement is shaped around the organisation, sector, target market and commercial objectives.",
  ],
  [
    "International perspective",
    "Cross-border thinking is balanced with careful attention to the context of each market.",
  ],
  [
    "Relationship-led support",
    "Constructive engagement and well-managed relationships sit at the centre of our approach.",
  ],
  [
    "Execution focus",
    "Advice is connected to introductions, coordination and practical next steps.",
  ],
] as const;

const journey = [
  [
    "Understand Objectives",
    "Clarify the organisation’s ambitions, priorities and measures for a productive engagement.",
  ],
  [
    "Identify Markets and Opportunities",
    "Assess relevant markets and opportunities against sector and commercial context.",
  ],
  [
    "Build Strategic Relationships",
    "Develop considered engagement plans around relevant organisations and stakeholders.",
  ],
  [
    "Facilitate Introductions",
    "Coordinate purposeful introductions with clear context and preparation.",
  ],
  [
    "Coordinate Delivery",
    "Keep activity aligned through practical planning, communication and follow-through.",
  ],
  [
    "Provide Ongoing Support",
    "Adapt strategic advice and market support as needs and conditions evolve.",
  ],
] as const;

const regions = [
  [
    "United Kingdom",
    "International advisory and cross-border business context.",
  ],
  [
    "Europe",
    "Support for organisations considering global-African commercial corridors.",
  ],
  [
    "Africa",
    "Market-entry and relationship-led support shaped to specific opportunities.",
  ],
  [
    "United States",
    "Cross-border perspective for organisations exploring African markets.",
  ],
] as const;

const advisoryCapabilities = [
  [
    "Strategic Counsel",
    "Focused senior attention helps align market priorities, engagement plans and commercial objectives.",
  ],
  [
    "Relationship Coordination",
    "Careful preparation and communication support credible, productive stakeholder engagement.",
  ],
  [
    "Delivery Oversight",
    "Consistent oversight connects advice with introductions, coordination and practical progress.",
  ],
] as const;

export default function AboutPage() {
  return (
    <main id="main-content" className="about-page">
      <section className="about-hero" aria-labelledby="about-title">
        <span
          className="about-hero-image-description"
          role="img"
          aria-label="An African adviser sharing a city perspective with two business leaders"
        />
        <div className="about-hero-overlay" aria-hidden="true" />
        <div className="shell about-hero-content">
          <p className="eyebrow">About Demand PR</p>
          <h1 id="about-title">Bridging Ambition with African Opportunity</h1>
          <p>
            Demand PR is an international business consultancy helping
            organisations expand into new markets, build strategic partnerships
            and pursue sustainable commercial opportunities across the United
            Kingdom, Europe, Africa and the United States.
          </p>
        </div>
      </section>

      <section className="about-section about-story">
        <div className="shell about-story-grid">
          <div>
            <p className="eyebrow">Our story</p>
            <h2>Relationship-Led Expansion</h2>
          </div>
          <div>
            <p className="about-lead">
              Effective market entry calls for more than information. It
              requires clear objectives, informed local context and
              relationships built with care.
            </p>
            <p>
              Demand PR brings these elements together through tailored
              advisory, stakeholder engagement and practical coordination. We
              help organisations understand opportunity, prepare for meaningful
              conversations and move from strategy towards well-managed action.
            </p>
          </div>
        </div>
      </section>

      <section className="about-section about-purpose">
        <div className="shell">
          <div className="about-heading-centred">
            <p className="eyebrow">Our direction</p>
            <h2>Vision &amp; Mission</h2>
          </div>
          <div className="about-purpose-grid">
            <article>
              <span aria-hidden="true">◇</span>
              <h3>Vision</h3>
              <p>
                To contribute to sustainable commercial relationships and
                opportunity across global-African business corridors.
              </p>
            </article>
            <article>
              <span aria-hidden="true">◎</span>
              <h3>Mission</h3>
              <p>
                To give organisations clear strategic advice, relationship-led
                support and coordinated execution as they enter and grow in new
                markets.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="about-section about-values">
        <div className="shell">
          <div className="about-heading-centred">
            <p className="eyebrow">Guiding principles</p>
            <h2>Foundational Values</h2>
          </div>
          <div className="about-values-grid">
            {values.map(([title, text], index) => (
              <article key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-section about-reasons">
        <div className="shell about-reasons-grid">
          <div>
            <p className="eyebrow">The Demand PR approach</p>
            <h2>Why Clients Work With Us</h2>
            <div className="about-reasons-list">
              {reasons.map(([title, text]) => (
                <article key={title}>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="about-reasons-image">
            <Image
              src="/images/about/context-made-practical.webp"
              alt="An African adviser explaining agritech equipment to two business leaders in a greenhouse"
              fill
              sizes="(min-width: 961px) 44vw, 100vw"
            />
          </div>
        </div>
      </section>

      <section className="about-section about-journey">
        <div className="shell">
          <p className="eyebrow">How we work</p>
          <h2>The Strategic Journey</h2>
          <p className="about-section-intro">
            A considered six-step approach that connects commercial ambition
            with informed, coordinated activity.
          </p>
          <ol className="about-journey-grid">
            {journey.map(([title, text], index) => (
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

      <section className="about-section about-reach">
        <div className="shell">
          <div className="about-heading-centred">
            <p className="eyebrow">International perspective</p>
            <h2>Global Reach</h2>
            <p>
              We support cross-border ambitions across four broad regions, with
              every engagement defined around the relevant market, sector and
              objective.
            </p>
          </div>
          <div className="about-reach-grid">
            {regions.map(([title, text]) => (
              <article key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-section about-advisory">
        <div className="shell">
          <div className="about-heading-row">
            <div>
              <p className="eyebrow">Capability in focus</p>
              <h2>Senior-Led Advisory</h2>
            </div>
            <p>
              Engagements are shaped through attentive strategic counsel,
              disciplined relationship coordination and practical delivery
              oversight.
            </p>
          </div>
          <div className="about-advisory-grid">
            {advisoryCapabilities.map(([title, text], index) => (
              <article key={title}>
                <span aria-hidden="true">0{index + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-section about-retained">
        <div className="shell about-retained-inner">
          <div>
            <p className="eyebrow">Preferred engagement</p>
            <h2>Retained Partnership Model</h2>
            <p>
              Retained strategic advisory is our preferred model for
              organisations that value continuity. It enables ongoing counsel,
              relationship support and delivery coordination to evolve alongside
              changing priorities.
            </p>
          </div>
          <Link className="button button-light" href="/contact">
            Discuss a Retained Partnership
          </Link>
        </div>
      </section>

      <section className="about-section about-final-cta">
        <div className="shell">
          <p className="eyebrow">Start a conversation</p>
          <h2>Ready to Expand into Africa?</h2>
          <p>
            Explore the consultation process or learn how our dedicated
            market-entry programme supports a considered route into African
            markets.
          </p>
          <div className="button-row">
            <Link className="button" href="/contact">
              Strategy Consultation Details
            </Link>
            <Link
              className="button about-outline-button"
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
