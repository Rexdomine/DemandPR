import Link from "next/link";

const explore = [
  { label: "Africa Market Entry", href: "/africa-market-entry-programme" },
  { label: "Our Services", href: "/services" },
  { label: "About Demand PR", href: "/about" },
  { label: "Contact & Consultation", href: "/contact" },
] as const;
const sectors = [
  "Infrastructure",
  "Financial Services",
  "Energy",
  "Agriculture",
  "Technology",
] as const;

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-intro">
          <Link className="footer-brand" href="/" aria-label="Demand PR home">
            Demand PR
          </Link>
          <p>
            Strategic market-entry advisory, investor support and stakeholder
            engagement for organisations expanding across African markets.
          </p>
        </div>
        <nav aria-labelledby="footer-explore-heading">
          <h2 id="footer-explore-heading">Explore</h2>
          <ul>
            {explore.map((item) => (
              <li key={item.label}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <section aria-labelledby="footer-sectors-heading">
          <h2 id="footer-sectors-heading">Sectors</h2>
          <ul>
            {sectors.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <Link
            className="footer-sector-link"
            href="/services#sector-expertise"
          >
            Explore our sector expertise <span aria-hidden="true">→</span>
          </Link>
        </section>
        <div>
          <h2>Connect</h2>
          <p>
            Tell us about your market-entry priorities and the support your
            organisation needs.
          </p>
          <Link className="footer-email" href="/contact">
            Strategy Consultation Details <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
      <div className="shell footer-base">
        <p>© Demand PR Ltd. All rights reserved.</p>
        <Link href="#main-content">Back to top ↑</Link>
      </div>
    </footer>
  );
}
