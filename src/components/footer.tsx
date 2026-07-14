import Link from "next/link";

const expertise = [
  "Market Entry",
  "Government Relations",
  "Investor Advisory",
  "Trade Missions",
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
        <div>
          <h2>Expertise</h2>
          <ul>
            {expertise.map((item) => (
              <li key={item}>
                <Link href="/services">{item}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Sectors</h2>
          <ul>
            {sectors.map((item) => (
              <li key={item}>
                <Link href="/#capabilities">{item}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Connect</h2>
          <p>
            Tell us about your market-entry priorities and the support your
            organisation needs.
          </p>
          <Link className="footer-email" href="/#consultation">
            Strategy Consultation Details <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
      <div className="shell footer-base">
        <p>© Demand PR Ltd. All rights reserved.</p>
        <Link href="/#main-content">Back to top ↑</Link>
      </div>
    </footer>
  );
}
