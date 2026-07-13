export type NavigationItem = Readonly<{ label: string; href: string }>;
export type Service = Readonly<{
  title: string;
  description: string;
  href: string;
  featured?: boolean;
}>;
export type ContentBlock = Readonly<{ title: string; text: string }>;

export const site = {
  name: "Demand PR Ltd",
  tagline: "Connecting Business. Enabling Growth. Delivering Opportunities.",
  hero: {
    heading: "Expand into Africa with Confidence",
    subheading:
      "Demand PR helps international businesses, investors, governments and organisations successfully enter African markets through strategic market entry advisory, investor support, government engagement and high-level commercial connections.",
    primaryCta: {
      label: "Strategy Consultation Details",
      href: "/#consultation",
    },
    secondaryCta: { label: "Explore Our Services", href: "/#services" },
  },
} as const;

export const navigation: readonly NavigationItem[] = [
  { label: "Home", href: "/" },
  { label: "Market Entry Programme", href: "/#market-entry" },
  { label: "Services", href: "/#services" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#consultation" },
];

export const trustAreas = [
  "Africa Market Entry",
  "Investor Advisory",
  "Government Relations",
  "Trade & Investment",
  "Executive Concierge",
] as const;

export const whyDemandPr = [
  "Entering African markets requires more than market research—it requires trusted relationships, local expertise and a clear commercial strategy.",
  "Demand PR is a trusted strategic adviser to governments, corporations, investors, trade organisations and institutions seeking to establish, expand or strengthen their presence across Africa and its diaspora.",
  "Rather than delivering one-off consultancy projects, we build long-term strategic partnerships with our clients through recurring advisory, representation and market development services.",
  "Acting as an extension of our clients’ leadership teams, we provide ongoing strategic counsel, government and stakeholder engagement, market intelligence, business development support and in-country representation to help organisations navigate Africa’s complex and evolving business landscape with confidence.",
  "Our retained advisory model ensures clients have continuous access to experienced strategic guidance, trusted local networks and practical market support, enabling them to identify opportunities, manage risk, build influential relationships and achieve sustainable growth across African markets.",
  "At Demand PR, we don’t simply help organisations enter Africa—we become their long-term strategic partner for success on the continent.",
] as const;

export const featuredServices: readonly Service[] = [
  {
    title: "Africa Market Entry Programme",
    description:
      "Helping international organisations establish and expand successfully across African markets.",
    href: "/#market-entry",
    featured: true,
  },
  {
    title: "Investor Concierge",
    description:
      "Supporting investors throughout every stage of the investment journey.",
    href: "/#consultation",
  },
  {
    title: "Government Relations",
    description:
      "Building productive relationships with governments, regulators and strategic stakeholders.",
    href: "/#consultation",
  },
  {
    title: "Trade Missions & Business Delegations",
    description:
      "Connecting organisations directly with governments, investors and commercial opportunities.",
    href: "/#consultation",
  },
  {
    title: "Strategic Introductions",
    description:
      "Facilitating carefully selected introductions to influential decision-makers and commercial partners.",
    href: "/#consultation",
  },
  {
    title: "Visa & Executive Mobility",
    description: "Business visas, work permits and executive travel support.",
    href: "/#consultation",
  },
  {
    title: "Investment Forums & Executive Events",
    description:
      "Delivering world-class conferences, investment summits and executive networking programmes.",
    href: "/#consultation",
  },
];

export const clientReasons: readonly ContentBlock[] = [
  {
    title: "Access to Influential Networks",
    text: "Trusted relationships with government leaders, investors, chambers of commerce, business associations and strategic partners across Africa.",
  },
  {
    title: "Accelerated Market Entry",
    text: "Practical market-entry support designed to reduce complexity and shorten the path to successful expansion.",
  },
  {
    title: "Tailored Strategic Advisory",
    text: "Every engagement is customised around your commercial objectives, sector and growth strategy.",
  },
  {
    title: "End-to-End Project Delivery",
    text: "From strategy and stakeholder engagement to logistics and implementation, we manage every stage.",
  },
  {
    title: "International Perspective",
    text: "Combining international business standards with deep understanding of African markets.",
  },
  {
    title: "Long-Term Strategic Partnerships",
    text: "Ongoing retained advisory services supporting continued expansion, representation and business growth.",
  },
];

export const commercialOutcomes = [
  "Faster Market Entry",
  "Stronger Government Relationships",
  "Strategic Business Partnerships",
  "Access to Senior Decision Makers",
  "Increased Investment Opportunities",
  "Successful Trade Missions",
  "Reduced Market Entry Risk",
  "Sustainable Commercial Growth",
] as const;

export const successStories: readonly ContentBlock[] = [
  {
    title: "Trade Delegation Planning",
    text: "An illustrative capability scenario showing how Demand PR can shape cross-border agendas, stakeholder preparation and delegation logistics.",
  },
  {
    title: "Investment Forum Design",
    text: "An illustrative capability scenario for programme strategy, speaker and stakeholder coordination, and investor-focused convening.",
  },
  {
    title: "Sector Entry Advisory",
    text: "An illustrative capability scenario combining market intelligence, stakeholder mapping and a practical entry roadmap for a growth sector.",
  },
  {
    title: "Regulatory Navigation",
    text: "An illustrative capability scenario for structured engagement, local context and informed preparation around evolving requirements.",
  },
];

export const retainerServices = [
  "Investor Representation",
  "Government Relations",
  "Market Intelligence",
  "Strategic Introductions",
  "Corporate Concierge",
  "Stakeholder Engagement",
  "Business Development",
] as const;
