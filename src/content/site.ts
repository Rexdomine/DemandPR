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
      href: "/contact",
    },
    secondaryCta: { label: "Explore Our Services", href: "/services" },
  },
} as const;

export const navigation: readonly NavigationItem[] = [
  { label: "Home", href: "/" },
  { label: "Market Entry Programme", href: "/africa-market-entry-programme" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
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
    href: "/africa-market-entry-programme",
    featured: true,
  },
  {
    title: "Investor Concierge",
    description:
      "Supporting investors throughout every stage of the investment journey.",
    href: "/contact",
  },
  {
    title: "Government Relations",
    description:
      "Building productive relationships with governments, regulators and strategic stakeholders.",
    href: "/contact",
  },
  {
    title: "Trade Missions & Business Delegations",
    description:
      "Connecting organisations directly with governments, investors and commercial opportunities.",
    href: "/contact",
  },
  {
    title: "Strategic Introductions",
    description:
      "Facilitating carefully selected introductions to influential decision-makers and commercial partners.",
    href: "/contact",
  },
  {
    title: "Visa & Executive Mobility",
    description: "Business visas, work permits and executive travel support.",
    href: "/contact",
  },
  {
    title: "Investment Forums & Executive Events",
    description:
      "Delivering world-class conferences, investment summits and executive networking programmes.",
    href: "/contact",
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

export const successStories = [
  {
    title: "GESA Summit",
    text: "Supported stakeholder engagement and strategic partnerships at a leading diplomacy, investment and business summit.",
    delegationLeadership: false,
  },
  {
    title: "World Travel Market (WTM) London",
    text: "Delivered B2B matchmaking, exhibition support and partnership development for tourism and hospitality organisations.",
    delegationLeadership: true,
  },
  {
    title: "UK–Nigeria Trade Summits",
    text: "Facilitated trade, investment and business collaboration between UK and Nigerian organisations.",
    delegationLeadership: true,
  },
  {
    title: "British–Nigerian Law Forum",
    text: "Supported business networking and cross-border commercial partnerships between legal and corporate professionals.",
    delegationLeadership: false,
  },
  {
    title: "Air Peace Trade Expo",
    text: "Facilitated stakeholder engagement, business networking and partnership opportunities.",
    delegationLeadership: false,
  },
  {
    title: "African Tourism Board (ATB)",
    text: "Supported tourism promotion and strategic partnerships to enhance Africa’s global tourism profile.",
    delegationLeadership: true,
  },
  {
    title: "World Petroleum Congress",
    text: "Facilitated international networking and partnership opportunities within the global energy sector.",
    delegationLeadership: true,
  },
  {
    title: "Royal Norfolk Agricultural Show",
    text: "Supported business networking and international trade within the agriculture and agritech sectors.",
    delegationLeadership: false,
  },
  {
    title: "US–Africa Trade Congress",
    text: "Promoted trade, investment and strategic business partnerships between Africa and the United States.",
    delegationLeadership: false,
  },
  {
    title: "Farnborough International Airshow",
    text: "Supported international business development across the aerospace, aviation and defence industries.",
    delegationLeadership: true,
  },
  {
    title: "InfoSecurity Europe",
    text: "Connected technology companies with key stakeholders through business networking and partnership opportunities.",
    delegationLeadership: true,
  },
  {
    title: "UK Cyber Week",
    text: "Supported organisations in building strategic partnerships and expanding market opportunities within cybersecurity.",
    delegationLeadership: true,
  },
] as const;

export const retainerServices = [
  "Investor Representation",
  "Government Relations",
  "Market Intelligence",
  "Strategic Introductions",
  "Corporate Concierge",
  "Stakeholder Engagement",
  "Business Development",
] as const;
