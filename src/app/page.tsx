import Link from "next/link";

import {
  clientReasons,
  commercialOutcomes,
  featuredServices,
  retainerServices,
  site,
  successStories,
  trustAreas,
  whyDemandPr,
} from "@/content/site";

export default function Home() {
  return (
    <main id="main-content">
      <section className="hero">
        <div className="hero-glow" aria-hidden="true" />
        <div className="shell hero-grid">
          <div className="hero-copy">
            <p className="eyebrow gold">
              Africa market entry & business growth
            </p>
            <h1>{site.hero.heading}</h1>
            <p className="hero-lede">{site.hero.subheading}</p>
            <div className="button-row">
              <Link className="button" href={site.hero.primaryCta.href}>
                {site.hero.primaryCta.label}
                <span aria-hidden="true">↗</span>
              </Link>
              <Link
                className="button button-ghost"
                href={site.hero.secondaryCta.href}
              >
                {site.hero.secondaryCta.label}
              </Link>
            </div>
          </div>
          <div
            className="bridge-art"
            aria-label="Abstract composition representing connected markets"
            role="img"
          >
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="art-card art-card-a">
              <span>International ambition</span>
              <b>Strategy</b>
            </div>
            <div className="art-card art-card-b">
              <span>African opportunity</span>
              <b>Connection</b>
            </div>
            <div className="art-line" />
          </div>
        </div>
        <div className="shell trust-strip" aria-label="Areas of expertise">
          {trustAreas.map((area) => (
            <span key={area}>{area}</span>
          ))}
        </div>
      </section>

      <section className="section intro" id="about">
        <div className="shell editorial-grid">
          <div>
            <p className="eyebrow">Why Demand PR</p>
            <h2>Your Strategic Partner for Growth Across Africa</h2>
          </div>
          <div className="prose">
            {whyDemandPr.map((paragraph, index) => (
              <p className={index === 0 ? "lead" : undefined} key={paragraph}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="section services-section" id="services">
        <div className="shell">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Core services</p>
              <h2>Core Services</h2>
            </div>
            <p>
              For client review: Relationship-led support from initial market
              thinking to ongoing representation.
            </p>
          </div>
          <div className="service-grid">
            {featuredServices.map((service, index) => (
              <article
                className={
                  service.featured ? "service-card featured" : "service-card"
                }
                id={service.featured ? "market-entry" : undefined}
                key={service.title}
              >
                <span className="card-index" aria-hidden="true">
                  0{index + 1}
                </span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <Link
                  className="card-link"
                  href={service.href}
                  aria-label={`Discuss ${service.title}`}
                >
                  Discuss this service <span aria-hidden="true">→</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section reasons-section">
        <div className="shell">
          <div className="section-heading">
            <div>
              <h2>Why Clients Choose Demand PR</h2>
            </div>
          </div>
          <div className="reason-grid">
            {clientReasons.map((reason, index) => (
              <article key={reason.title}>
                <span aria-hidden="true">0{index + 1}</span>
                <h3>{reason.title}</h3>
                <p>{reason.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section outcomes-section">
        <div className="shell outcomes-grid">
          <div>
            <h2>Delivering Commercial Outcomes</h2>
          </div>
          <ul>
            {commercialOutcomes.map((outcome) => (
              <li key={outcome}>
                <span aria-hidden="true">↗</span>
                {outcome}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section stories-section">
        <div className="shell">
          <div className="section-heading">
            <div>
              <h2>Featured Success Stories</h2>
            </div>
            <p>
              Capability-led examples only; named engagements and outcomes will
              be added after client approval.
            </p>
          </div>
          <div className="story-grid">
            {successStories.map((story) => (
              <article key={story.title}>
                <div className="story-visual" aria-hidden="true">
                  <span>Demand PR</span>
                </div>
                <h3>{story.title}</h3>
                <p>{story.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section retainer-section" id="retainers">
        <div className="shell retainer-grid">
          <div>
            <p className="eyebrow gold">Strategic partnership retainers</p>
            <h2>Ongoing Representation Across Africa</h2>
            <p>
              Many organisations require ongoing strategic support rather than
              one-off consultancy.
            </p>
            <p>
              Demand PR provides retained advisory services that give clients a
              trusted partner on the ground, supporting long-term growth across
              African markets.
            </p>
            <Link className="button" href={site.hero.primaryCta.href}>
              {site.hero.primaryCta.label}
            </Link>
          </div>
          <ul className="retainer-list" aria-label="Retainer services">
            {retainerServices.map((service) => (
              <li key={service}>{service}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section cta-section" id="consultation">
        <div className="shell cta-panel">
          <p className="eyebrow gold">Begin the conversation</p>
          <h2>Ready to Expand into Africa?</h2>
          <p>
            Partner with Demand PR to access trusted expertise, influential
            networks and practical market-entry support that delivers measurable
            commercial outcomes.
          </p>
          <p className="launch-contact" role="status">
            Consultation booking will be connected to the approved client
            contact route during launch configuration.
          </p>
        </div>
      </section>
    </main>
  );
}
