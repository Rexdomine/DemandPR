import Image from "next/image";
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

const socialProfiles = [
  {
    name: "Instagram",
    label: "Follow Demand PR on Instagram",
    href: "https://www.instagram.com/demandpruk?igsh=MWcxa3Y5d2Juejlseg==",
    path: "M7.03.084C5.753.144 4.881.348 4.119.647 3.33.955 2.662 1.367 1.997 2.035.665 3.371.119 5.114.064 7.076.008 8.354-.005 8.765.001 12.023c.006 3.259.021 3.667.083 4.948.061 1.276.264 2.148.563 2.91.308.789.72 1.457 1.388 2.123.668.665 1.337 1.074 2.129 1.38.763.295 1.636.496 2.913.552 1.277.056 1.688.069 4.946.063 3.258-.006 3.668-.021 4.948-.081 1.28-.061 2.147-.266 2.91-.564.789-.308 1.458-.72 2.123-1.388.665-.668 1.074-1.338 1.379-2.128.296-.763.497-1.636.552-2.912.056-1.281.069-1.69.063-4.948-.006-3.258-.021-3.667-.082-4.947-.061-1.28-.264-2.149-.563-2.912-.308-.789-.72-1.457-1.388-2.123C21.298 1.33 20.628.921 19.838.617 19.074.321 18.202.12 16.924.065 15.647.009 15.236-.005 11.977.001 8.718.008 8.31.022 7.03.084Zm4.982 5.754a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324Zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.378-11.856a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88Z",
  },
  {
    name: "LinkedIn",
    label: "Connect with Demand PR on LinkedIn",
    href: "https://www.linkedin.com/in/maureen-bond-21375926?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065ZM7.119 20.452H3.555V9h3.564v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z",
  },
  {
    name: "Facebook",
    label: "Follow Demand PR on Facebook",
    href: "https://www.facebook.com/share/16Y49Pk14c/",
    path: "M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103.392.047.773.112 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z",
  },
  {
    name: "X",
    label: "Follow Demand PR on X",
    href: "https://x.com/demandprltd?t=6dhLt2XKfKOPpbqVjBdLXA&s=09",
    path: "M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993l-9.508-13.838Zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182l-6.327-9.05Z",
  },
  {
    name: "Threads",
    label: "Follow Demand PR on Threads",
    href: "https://www.threads.net/@demandpruk",
    path: "M18.263 11.097c-.03-3.486-1.92-5.586-5.111-5.586-2.13 0-3.922.963-4.863 2.499l2.062 1.438c.535-.843 1.272-1.543 2.628-1.543 1.528 0 2.318.85 2.544 2.431a15 15 0 0 0-2.236-.173c-4.125 0-6.068 1.867-6.068 4.336s1.943 3.99 4.804 3.99c3.139 0 5.013-2.115 5.781-4.735.798.361 1.348 1.204 1.348 2.47 0 3.387-3.907 5.232-7.22 5.232-4.885 0-8.077-3.207-8.077-8.424 0-6.392 4.223-10.487 9.9-10.487 3.808 0 5.69 1.671 6.97 3.914l2.108-1.475C21.44 2.078 18.331 0 13.663 0 6.227 0 1.168 5.277 1.168 12.934c0 7 4.953 11.066 10.856 11.066 4.878 0 9.809-2.846 9.809-7.716 0-2.545-1.46-4.231-3.569-5.187Zm-6.33 4.855c-1.077 0-2.026-.512-2.026-1.453 0-1.483 1.822-1.934 3.606-1.934.678 0 1.34.045 1.927.173-.422 1.927-1.671 3.215-3.508 3.214Z",
  },
] as const;

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-intro">
          <Link className="footer-brand" href="/" aria-label="Demand PR home">
            <Image
              className="footer-brand-logo"
              src="/brand/demandpr-logo.svg"
              width="1296"
              height="388"
              alt=""
              unoptimized
            />
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
          <nav className="footer-socials" aria-label="Demand PR social media">
            {socialProfiles.map((profile) => (
              <a
                key={profile.name}
                className="footer-social-link"
                href={profile.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={profile.label}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path d={profile.path} />
                </svg>
              </a>
            ))}
          </nav>
        </div>
      </div>
      <div className="shell footer-base">
        <p>© Demand PR Ltd. All rights reserved.</p>
        <Link href="#main-content">Back to top ↑</Link>
      </div>
    </footer>
  );
}
