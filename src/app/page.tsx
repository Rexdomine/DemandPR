import Image from "next/image";
import Link from "next/link";

import {
  clientReasons,
  featuredServices,
  retainerServices,
  site,
  successStories,
} from "@/content/site";

const serviceIcons = ["◇", "▦", "⚖", "◎", "⌖", "□", "✦"] as const;
const outcomeCards = [
  {
    icon: "◴",
    title: "Accelerated Market Entry",
    text: "Practical support designed to reduce complexity and shorten the route from market assessment to informed action.",
  },
  {
    icon: "◇",
    title: "Resilient Partnerships",
    text: "Build durable, high-trust relationships with carefully assessed local organisations and stakeholders.",
  },
  {
    icon: "⬡",
    title: "Enhanced Risk Mitigation",
    text: "Surface political, reputational and operational considerations early enough to make better-informed decisions.",
  },
  {
    icon: "◉",
    title: "Stronger Stakeholder Positioning",
    text: "Contribute constructively to sector dialogue through credible engagement and clear strategic communications.",
  },
] as const;

const storyImages = [
  {
    src: "/images/home/trade-delegation.jpg",
    alt: "Business leaders in discussion around a boardroom table",
    label: "Trade delegation capability",
  },
  {
    src: "/images/home/investment-summit.jpg",
    alt: "Delegates attending an investment conference",
    label: "Investment forum capability",
  },
  {
    src: "/images/home/renewable-infrastructure.jpg",
    alt: "Renewable energy infrastructure in an African landscape",
    label: "Sector-entry capability",
  },
  {
    src: "/images/home/innovation-team-neutral.jpg",
    alt: "A diverse team collaborating in a contemporary workspace",
    label: "Advisory capability",
  },
] as const;

const storyCards = successStories.map((story, index) => ({
  ...story,
  image: storyImages[index]!,
}));

export default function Home() {
  return (
    <main id="main-content">
      <section className="hero" aria-labelledby="hero-heading">
        <Image
          className="hero-image"
          src="/images/home/african-city-twilight.jpg"
          alt="African city skyline illuminated at twilight"
          fill
          priority
          sizes="100vw"
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

      <section className="section philosophy" id="about">
        <div className="shell philosophy-grid">
          <div className="philosophy-copy">
            <p className="eyebrow">Our philosophy</p>
            <h2>The Sophisticated Navigator for African Markets</h2>
            <p className="lead">
              Market entry is not just about data; it requires nuance, cultural
              intelligence and trusted relationships. Africa&apos;s landscape is
              diverse, and a one-size-fits-all approach creates avoidable
              friction.
            </p>
            <p>
              Demand PR helps organisations navigate complex commercial and
              stakeholder environments, identify credible opportunities and
              build a practical route to sustainable growth.
            </p>
            <blockquote>
              “We connect strategy with the relationships and local
              understanding needed to move forward with confidence.”
            </blockquote>
          </div>
          <div className="portrait-wrap">
            <Image
              src="/images/home/strategic-adviser.jpg"
              alt="Strategic adviser seated in a modern city office"
              fill
              sizes="(min-width: 960px) 42vw, 100vw"
            />
            <div className="portrait-note">
              <strong>Relationship-led</strong>
              <span>
                Strategic support shaped around each organisation, sector and
                market.
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="section services-section" id="services">
        <div className="shell">
          <div className="section-heading centred">
            <p className="eyebrow">Expertise</p>
            <h2>Strategic Solutions for Seamless Entry</h2>
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

      <section className="section advantage-section">
        <div className="shell advantage-grid">
          <div className="advantage-intro">
            <p className="eyebrow">Why Demand PR</p>
            <h2>The Competitive Advantage</h2>
            <p>
              Our relationship-led model combines international business
              standards with practical understanding of African markets.
            </p>
            <Link className="button button-light" href="#capabilities">
              Explore capabilities
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

      <section className="section outcomes-section">
        <div className="shell">
          <div className="outcomes-heading">
            <div>
              <p className="eyebrow">Impact</p>
              <h2>Delivering Tangible Commercial Outcomes</h2>
            </div>
            <span aria-hidden="true" />
          </div>
          <div className="outcome-grid">
            {outcomeCards.map((outcome) => (
              <article key={outcome.title}>
                <span className="outcome-icon" aria-hidden="true">
                  {outcome.icon}
                </span>
                <div>
                  <h3>{outcome.title}</h3>
                  <p>{outcome.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section stories-section" id="capabilities">
        <div className="shell">
          <div className="stories-heading">
            <div>
              <p className="eyebrow">Illustrative capability</p>
              <h2>Capabilities in Action</h2>
            </div>
            <p>
              Representative service scenarios, not claims about named client
              engagements.
            </p>
          </div>
          <div className="story-grid">
            {storyCards.map((story) => (
              <article key={story.title}>
                <div className="story-image">
                  <Image
                    src={story.image.src}
                    alt={story.image.alt}
                    fill
                    sizes="(min-width: 1100px) 25vw, (min-width: 640px) 50vw, 100vw"
                  />
                </div>
                <span className="story-label">{story.image.label}</span>
                <h3>{story.title}</h3>
                <p>{story.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section retainer-section" id="retainers">
        <div className="shell retainer-content">
          <p className="eyebrow">Ongoing representation</p>
          <h2>Strategic Continuity Across African Markets</h2>
          <div className="retainer-pills" aria-label="Retainer services">
            {retainerServices.slice(0, 5).map((service) => (
              <span key={service}>{service}</span>
            ))}
          </div>
          <div className="retainer-cards">
            {[
              [
                "01",
                "Strategic representation",
                "Ongoing counsel and representation aligned with your leadership team and commercial priorities.",
              ],
              [
                "02",
                "Market intelligence",
                "Regular briefings on relevant policy, stakeholder and commercial developments.",
              ],
              [
                "03",
                "Stakeholder engagement",
                "Planned liaison and relationship support appropriate to your market-entry objectives.",
              ],
            ].map(([number, title, text]) => (
              <article key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{text}</p>
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
