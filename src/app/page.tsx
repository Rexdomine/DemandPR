import Image from "next/image";
import Link from "next/link";

import {
  clientReasons,
  featuredServices,
  site,
  successStories,
} from "@/content/site";

const serviceIcons = ["◇", "▦", "⚖", "◎", "⌖", "□", "✦"] as const;

const industries = [
  { icon: "◇", title: "Infrastructure" },
  { icon: "▦", title: "Financial Services" },
  { icon: "◉", title: "Energy" },
  { icon: "◎", title: "Agriculture" },
  { icon: "⌖", title: "Technology" },
  { icon: "✦", title: "Healthcare" },
] as const;

const featuredSolutions = [
  {
    title: "Trade Missions & Business Delegations",
    text: "Focused planning and coordination that connects organisations with governments, investors and commercial opportunities.",
    href: "/services",
    image: {
      label: "Trade and market access",
    },
  },
  {
    title: "Investment Forums & Executive Events",
    text: "Strategy and delivery support for investment summits, international exhibitions and executive networking programmes.",
    href: "/services",
    image: {
      label: "Forums and events",
    },
  },
  {
    title: "Africa Market Entry Programme",
    text: "An integrated route for international organisations establishing, investing and growing across African markets.",
    href: "/africa-market-entry-programme",
    image: {
      label: "Market-entry advisory",
    },
  },
] as const;

function FeaturedSolutionImage({ title }: { title: string }) {
  if (title === "Trade Missions & Business Delegations") {
    return (
      <Image
        src="/images/home/trade-delegation-access.webp"
        alt="African adviser leading an international business delegation through a trade venue"
        fill
        sizes="(min-width: 960px) 33vw, (min-width: 640px) 50vw, 100vw"
      />
    );
  }

  if (title === "Investment Forums & Executive Events") {
    return (
      <Image
        src="/images/home/investment-forum-orchestration.webp"
        alt="Communications producer coordinating an investment forum backstage"
        fill
        sizes="(min-width: 960px) 33vw, (min-width: 640px) 50vw, 100vw"
      />
    );
  }

  return (
    <Image
      src="/images/home/sector-entry-field-advisory.webp"
      alt="Infrastructure adviser briefing an investor during an African site visit"
      fill
      sizes="(min-width: 960px) 33vw, (min-width: 640px) 50vw, 100vw"
    />
  );
}

const recentProjectCapabilities = [
  "Event management",
  "B2B matchmaking",
  "Strategic partnerships",
  "Public relations",
  "International business development and sponsorship",
] as const;

export default function Home() {
  return (
    <main id="main-content">
      <section className="hero" aria-labelledby="hero-heading">
        <Image
          className="hero-image"
          src="/images/home/demand-pr-owner-strategic-counsel.webp"
          alt="Senior African market adviser in a burgundy suit leading a private executive consultation"
          fill
          priority
          sizes="100vw"
          unoptimized
        />
        <div className="hero-overlay" aria-hidden="true" />
        <div className="shell hero-content">
          <p className="eyebrow hero-eyebrow">
            Global strategy · African opportunity
          </p>
          <h1 id="hero-heading">{site.hero.heading}</h1>
          <p className="hero-lede">{site.hero.subheading}</p>
          <div className="button-row">
            <Link className="button" href={site.hero.primaryCta.href}>
              {site.hero.primaryCta.label}
            </Link>
            <Link
              className="button button-ghost"
              href={site.hero.secondaryCta.href}
            >
              {site.hero.secondaryCta.label}
            </Link>
          </div>
        </div>
      </section>

      <section className="section services-section" id="services">
        <div className="shell">
          <div className="section-heading centred">
            <p className="eyebrow">Expertise</p>
            <h2>Core Services</h2>
            <p>
              Connected strategic, relationship and delivery support for
              organisations entering, investing and growing across African
              markets.
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
                <span className="service-icon" aria-hidden="true">
                  {serviceIcons[index]}
                </span>
                {service.featured ? (
                  <span className="programme-label">Flagship programme</span>
                ) : null}
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                {service.featured ? (
                  <Link className="card-link" href={service.href}>
                    Learn more <span aria-hidden="true">→</span>
                  </Link>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section outcomes-section" id="industries">
        <div className="shell">
          <div className="outcomes-heading">
            <div>
              <p className="eyebrow">Sector expertise</p>
              <h2>Industries We Support</h2>
              <p>
                Sector-aware support shaped around each organisation’s
                commercial priorities and market context.
              </p>
            </div>
            <span aria-hidden="true" />
          </div>
          <div className="outcome-grid industry-grid">
            {industries.map((industry) => (
              <article key={industry.title}>
                <span className="outcome-icon" aria-hidden="true">
                  {industry.icon}
                </span>
                <div>
                  <h3>{industry.title}</h3>
                  <p>Strategic market, stakeholder and partnership support.</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section advantage-section" id="why-demand-pr">
        <div className="shell advantage-grid">
          <div className="advantage-intro">
            <p className="eyebrow">Why Demand PR</p>
            <h2>The Competitive Advantage</h2>
            <p>
              Our relationship-led model combines international business
              standards with practical understanding of African markets.
            </p>
            <Link className="button button-light" href="#featured-solutions">
              Explore featured solutions
            </Link>
          </div>
          <div className="reason-grid">
            {clientReasons.map((reason) => (
              <article key={reason.title}>
                <h3>{reason.title}</h3>
                <p>{reason.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section stories-section" id="featured-solutions">
        <div className="shell">
          <div className="stories-heading">
            <div>
              <p className="eyebrow">Priority capabilities</p>
              <h2>Featured Solutions</h2>
            </div>
            <p>
              Three practical routes into Demand PR’s wider advisory,
              relationship and delivery capabilities.
            </p>
          </div>
          <div className="story-grid featured-solution-grid">
            {featuredSolutions.map((solution) => (
              <article key={solution.title}>
                <div className="story-image">
                  <FeaturedSolutionImage title={solution.title} />
                </div>
                <span className="story-label">{solution.image.label}</span>
                <h3>{solution.title}</h3>
                <p>{solution.text}</p>
                <Link className="card-link" href={solution.href}>
                  Learn more <span aria-hidden="true">→</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section retainer-section" id="recent-projects">
        <div className="shell retainer-content">
          <p className="eyebrow">Demand PR success stories</p>
          <h2>Recent Projects</h2>
          <p className="recent-projects-intro">
            Demand PR has supported international trade shows, business summits,
            investment forums and industry exhibitions across the UK, Europe,
            Africa and North America.
          </p>
          <div
            className="retainer-pills"
            aria-label="Recent project capabilities"
          >
            {recentProjectCapabilities.map((capability) => (
              <span key={capability}>{capability}</span>
            ))}
          </div>
          <div className="retainer-cards success-story-grid">
            {successStories.map((story, index) => (
              <article key={story.title}>
                <span aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {story.delegationLeadership ? (
                  <p className="success-story-label">
                    International delegation leadership
                  </p>
                ) : null}
                <h3>{story.title}</h3>
                <p>{story.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section cta-section" id="consultation">
        <div className="shell cta-content">
          <h2>Ready to Expand into Africa?</h2>
          <p>
            Start a focused conversation about your target market, commercial
            priorities and the practical support your organisation needs.
          </p>
          <p className="consultation-status">
            Strategy consultations are available by arrangement. Demand PR works
            with qualified organisations to clarify market priorities,
            stakeholder needs and the appropriate engagement scope.
          </p>
          <Link className="button button-light" href="/contact">
            Strategy Consultation Details <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
