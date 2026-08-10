export type PremiumIconName =
  | "communications"
  | "events"
  | "market-entry"
  | "leadership-training"
  | "investor-hub"
  | "concierge"
  | "international-business"
  | "private-equity"
  | "development-partners"
  | "tourism"
  | "trade-associations"
  | "universities"
  | "event-organisers";

type PremiumIconProps = Readonly<{
  name: PremiumIconName;
  className?: string;
}>;

/**
 * Renders Demand PR's cohesive decorative line-icon system.
 * The adjacent card heading supplies the accessible name, so icons stay hidden
 * from assistive technology while exposing a stable semantic QA identifier.
 */
export function PremiumIcon({ name, className }: PremiumIconProps) {
  return (
    <svg
      className={className}
      data-premium-icon={name}
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {name === "communications" ? (
        <>
          <path d="M8 14h22v15H18l-7 6v-6H8Z" />
          <path d="M16 20h14M16 24h9" />
          <path d="M34 18h6v14h-5l-5 4v-4h-5" />
        </>
      ) : null}
      {name === "events" ? (
        <>
          <rect x="8" y="10" width="32" height="29" rx="4" />
          <path d="M8 18h32M16 7v7M32 7v7" />
          <path d="m24 23 1.7 3.5 3.8.5-2.8 2.7.7 3.8-3.4-1.8-3.4 1.8.7-3.8-2.8-2.7 3.8-.5Z" />
        </>
      ) : null}
      {name === "market-entry" ? (
        <>
          <circle cx="13" cy="13" r="4" />
          <circle cx="35" cy="35" r="4" />
          <path d="M13 17c0 13 22 1 22 14M24 10h13v13" />
          <path d="m30 17 7-7" />
        </>
      ) : null}
      {name === "leadership-training" ? (
        <>
          <path d="M8 17 24 8l16 9-16 9Z" />
          <path d="M14 21v10c6 5 14 5 20 0V21M40 17v12" />
          <circle cx="40" cy="32" r="2" />
        </>
      ) : null}
      {name === "investor-hub" ? (
        <>
          <path d="M8 37h32M12 37V24h7v13M22 37V18h7v19M32 37V11h7v26" />
          <path d="m11 17 8-6 7 3 12-7" />
          <path d="m33 7 5 .2-.7 5" />
        </>
      ) : null}
      {name === "concierge" ? (
        <>
          <path d="M7 36h34M11 36c1-10 7-16 13-16s12 6 13 16" />
          <path d="M24 20v-5" />
          <circle cx="24" cy="12" r="2" />
          <path d="M15 31h18" />
        </>
      ) : null}
      {name === "international-business" ? (
        <>
          <circle cx="24" cy="24" r="16" />
          <path d="M8 24h32M24 8c5 5 7 10 7 16s-2 11-7 16c-5-5-7-10-7-16s2-11 7-16Z" />
          <path d="M14 14c6 4 14 4 20 0M14 34c6-4 14-4 20 0" />
        </>
      ) : null}
      {name === "private-equity" ? (
        <>
          <rect x="8" y="15" width="32" height="24" rx="3" />
          <path d="M17 15v-5h14v5M8 25h32M20 25v4h8v-4" />
          <path d="m29 11 4-4 4 4" />
        </>
      ) : null}
      {name === "development-partners" ? (
        <>
          <circle cx="15" cy="17" r="5" />
          <circle cx="33" cy="17" r="5" />
          <path d="M7 37c1-8 5-12 11-12M41 37c-1-8-5-12-11-12" />
          <path d="m17 30 7 7 7-7M24 37V23" />
        </>
      ) : null}
      {name === "tourism" ? (
        <>
          <path d="M8 37h32M12 37c2-10 8-16 16-16 5 0 9 2 12 7" />
          <circle cx="34" cy="12" r="5" />
          <path d="M12 28c5 0 8 3 10 9M15 22l5 5M9 24l6 4" />
        </>
      ) : null}
      {name === "trade-associations" ? (
        <>
          <path d="M7 18 24 8l17 10M10 21h28M12 21v14M20 21v14M28 21v14M36 21v14M8 39h32" />
          <path d="M20 14h8" />
        </>
      ) : null}
      {name === "universities" ? (
        <>
          <path d="m6 17 18-9 18 9-18 9Z" />
          <path d="M12 21v11c7 6 17 6 24 0V21M42 17v13" />
          <path d="M38 34h8" />
        </>
      ) : null}
      {name === "event-organisers" ? (
        <>
          <path d="M8 35h32M11 35V19h26v16M16 19v-7h16v7" />
          <path d="M16 27h16M20 23v8M28 23v8" />
          <circle cx="24" cy="15" r="2" />
        </>
      ) : null}
    </svg>
  );
}
