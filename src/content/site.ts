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
  headerCta: {
    label: "Strategy Consultation Details",
    href: "/contact",
  },
  hero: {
    heading: "We Help Organisations Enter, Grow and Succeed in Africa",
    subheading:
      "Strategic communications, market entry, investor support and government engagement solutions that open doors and deliver measurable results.",
    primaryCta: {
      label: "Explore Our Services",
      href: "/services",
    },
    secondaryCta: { label: "Book a Consultation", href: "/contact" },
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

export const featuredServices = [
  {
    title: "PR & Strategic Communications",
    description:
      "Building powerful brands and managing reputations that drive impact.",
    href: "/services",
  },
  {
    title: "Events & Conference Management",
    description:
      "Delivering high-impact events, summits and executive gatherings.",
    href: "/services",
  },
  {
    title: "Trade Delegations & Market Entry",
    description:
      "Leading trade missions and facilitating market entry across Africa.",
    href: "/services",
  },
  {
    title: "Leadership & Parliamentary Training",
    description: "Executive training programmes for leaders and institutions.",
    href: "/services",
  },
  {
    title: "Investor Hub",
    description:
      "Connecting investors with opportunities, partners and key stakeholders.",
    href: "/services",
  },
  {
    title: "Business Concierge",
    description:
      "Bespoke support services for executives, investors and delegations.",
    href: "/services",
  },
] as const satisfies readonly Service[];

export const supportedIndustries = [
  "International Businesses",
  "Investors & Private Equity",
  "NGOs & Development Partners",
  "Tourism Boards & Destinations",
  "Chambers & Trade Associations",
  "Universities & Institutions",
  "Event Organisers",
] as const;

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
