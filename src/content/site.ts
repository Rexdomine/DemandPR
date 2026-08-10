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
    label: "Book a Consultation",
    href: "/contact",
  },
  hero: {
    heading: "We Help Organisations Enter, Grow and Succeed in Africa",
    subheading:
      "We connect international organisations doing business in Africa with the market, the people and opportunities they need to thrive across Africa.",
    primaryCta: {
      label: "Explore Our Services",
      href: "/services",
    },
    secondaryCta: { label: "Book a Consultation", href: "/contact" },
  },
} as const;

export const navigation: readonly NavigationItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Market Entry Programme", href: "/africa-market-entry-programme" },
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
    href: "/services#pr-strategic-communications",
  },
  {
    title: "Events & Conference Management",
    description:
      "Delivering high-impact events, summits and executive gatherings.",
    href: "/services#events-conference-management",
  },
  {
    title: "Trade Delegations & Market Entry",
    description:
      "Leading trade missions and facilitating market entry across Africa.",
    href: "/services#trade-delegations-market-entry",
  },
  {
    title: "Leadership & Parliamentary Training",
    description: "Executive training programmes for leaders and institutions.",
    href: "/services#leadership-parliamentary-training",
  },
  {
    title: "Investor Hub",
    description:
      "Connecting investors with opportunities, partners and key stakeholders.",
    href: "/services#investor-hub",
  },
  {
    title: "Business Concierge",
    description:
      "Bespoke support services for executives, investors and delegations.",
    href: "/services#business-concierge",
  },
] as const satisfies readonly Service[];

export const serviceAreas = [
  {
    id: "pr-strategic-communications",
    group: "01 — Strategic Communications & Events",
    title: "PR & Strategic Communications",
    lead: "Building powerful brands, strengthening reputation and creating visibility with the right audiences.",
    description:
      "Demand PR develops and delivers strategic communications that help organisations build credibility, communicate effectively and strengthen their position in their markets.",
    bullets: [
      "PR strategy and communications planning",
      "Corporate positioning and brand messaging",
      "Media relations and press engagement",
      "Press releases, corporate announcements and media materials",
    ],
    closing:
      "Our focus: making sure the right people know who you are, what you do and why you matter.",
    image: "/images/services/strategy-in-motion.webp",
    alt: "African market adviser briefing business leaders during a strategic communications session",
  },
  {
    id: "events-conference-management",
    group: "01 — Strategic Communications & Events",
    title: "Events & Conference Management",
    lead: "Designing and delivering high-impact events that bring the right people into the room.",
    description:
      "From corporate meetings to international conferences and executive gatherings, Demand PR manages the planning, coordination and delivery of professional, purpose-driven events.",
    bullets: [
      "Corporate events and business receptions",
      "Conferences, summits and executive forums",
      "Venue sourcing and event logistics",
      "Delegate management",
      "Stakeholder and media engagement",
    ],
    closing:
      "We help create the connections and opportunities that make every event worthwhile.",
    image: "/images/home/investment-forum-orchestration.webp",
    alt: "Event professional coordinating an international investment forum",
  },
  {
    id: "trade-delegations-market-entry",
    group: "02 — Market Access & Leadership",
    title: "Trade Delegations & Market Entry",
    lead: "Helping organisations understand, access and build relationships within African markets.",
    description:
      "Demand PR supports international organisations, businesses and delegations looking to enter, explore or expand within African markets. We provide practical support before, during and after a market visit—helping clients identify the right people, arrange the right meetings and navigate the local business environment.",
    bullets: [
      "Plan and coordinate trade missions",
      "Host international business delegations",
      "Develop tailored business visit programmes",
      "Identify relevant companies, institutions and potential partners",
      "Arrange B2B meetings and introductions",
    ],
    closing:
      "Our role is to help clients move from simply wanting to enter Africa to having the right conversations with the right people.",
    image: "/images/home/trade-delegation-access.webp",
    alt: "African adviser leading an international business delegation through a trade venue",
  },
  {
    id: "leadership-parliamentary-training",
    group: "02 — Market Access & Leadership",
    title: "Leadership & Parliamentary Training",
    lead: "Preparing leaders and institutions to communicate, engage and operate effectively at senior levels.",
    description:
      "Demand PR develops and coordinates tailored training and development programmes for leaders, executives, parliamentarians and institutions.",
    bullets: [
      "Leadership development programmes",
      "Parliamentary and political engagement training",
      "Public speaking and presentation skills",
      "Media and interview preparation",
    ],
    closing:
      "The objective is practical: giving leaders the knowledge, confidence and communication skills to operate effectively in high-level environments.",
    image: "/images/about/context-made-practical.webp",
    alt: "Senior adviser guiding executives through a focused leadership session",
  },
  {
    id: "investor-hub",
    group: "03 — Investment & Executive Support",
    title: "Investor Hub",
    lead: "Connecting investors with credible opportunities, partners and key decision-makers.",
    description:
      "Demand PR’s Investor Hub provides a bridge between international investors seeking opportunities in Africa and businesses, institutions and stakeholders on the ground. We help create the introductions, conversations and relationships that can support informed investment decisions and long-term commercial opportunities.",
    bullets: [
      "Support market-entry conversations",
      "Identify relevant business and investment opportunities",
      "Facilitate B2B and stakeholder meetings",
      "Connect investors with professional and business networks",
      "Coordinate site visits and investment missions",
      "Coordinate follow-up after meetings and introductions",
    ],
    closing:
      "We connect the right people, opportunities and conversations to help turn investment interest into meaningful opportunities.",
    image: "/images/market-entry/market-entry-partnership-in-practice.webp",
    alt: "International investors and African partners in a focused commercial discussion",
  },
  {
    id: "business-concierge",
    group: "03 — Investment & Executive Support",
    title: "Business Concierge",
    lead: "Bespoke support for executives, investors and international delegations operating across Africa.",
    description:
      "Demand PR provides practical, end-to-end support for clients who need more than introductions—they need someone on the ground to help make things happen.",
    bullets: [
      "Secure business visas and provide travel support",
      "Airport arrival and departure protocols",
      "VIP meet-and-greet coordination",
      "Accommodation and transport arrangements",
      "Business meeting coordination",
      "Executive itinerary planning",
      "Local business introductions",
    ],
    closing: "One point of contact. Local knowledge. Practical support.",
    image: "/images/market-entry/market-entry-guided-arrival.webp",
    alt: "Executive receiving coordinated arrival support for an African business visit",
  },
] as const;

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
