import Link from "next/link";

import { site } from "@/content/site";

const footerGroups = [
  {
    title: "Company",
    links: [
      { label: "Home", href: "/" },
      { label: "About Demand PR", href: "/#about" },
      { label: "Contact", href: "/#consultation" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Africa Market Entry", href: "/#market-entry" },
      { label: "All Core Services", href: "/#services" },
      { label: "Strategic Retainers", href: "/#retainers" },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-intro">
          <Link
            className="brand brand-footer"
            href="/"
            aria-label="Demand PR home"
          >
            <span className="brand-mark" aria-hidden="true">
              D
            </span>
            <span>
              Demand <b>PR</b>
            </span>
          </Link>
          <p>
            Demand PR helps international businesses, investors and
            organisations successfully enter African markets through strategic
            introductions, investor concierge services, government engagement
            and high-level trade connections.
          </p>
        </div>

        {footerGroups.map((group) => (
          <div key={group.title}>
            <h2>{group.title}</h2>
            <ul>
              {group.links.map((item) => (
                <li key={item.label}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h2>Industries</h2>
          <p className="footer-review">
            Industry navigation — For client review
          </p>
          <h2>Insights</h2>
          <p className="footer-review">
            Insights navigation — For client review
          </p>
        </div>

        <div>
          <h2>Start a conversation</h2>
          <p>
            Discuss your market-entry priorities and the support your
            organisation needs.
          </p>
          <Link
            className="text-link light-link"
            href={site.hero.primaryCta.href}
          >
            Book a consultation <span aria-hidden="true">↗</span>
          </Link>
          <ul
            className="contact-placeholders"
            aria-label="Contact details pending"
          >
            <li>Official email — For client review</li>
            <li>Telephone & WhatsApp — For client review</li>
            <li>Office locations — For client review</li>
            <li>LinkedIn — For client review</li>
          </ul>
        </div>
      </div>
      <div className="shell footer-base">
        <p>© Demand PR Ltd. All rights reserved.</p>
        <p>Privacy · Terms · Accessibility — For client review</p>
        <p>Connecting Business. Enabling Growth. Delivering Opportunities.</p>
      </div>
    </footer>
  );
}
