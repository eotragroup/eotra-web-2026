// Plain text content of every service (no images or icons), so the Cloudflare Worker can read it too.

export interface ServiceData {
  slug: string;
  index: string;
  category: string;
  title: string;
  /** Short line used on cards and in the header menu */
  description: string;
  /** One sentence under the page title */
  tagline: string;
  /** Short paragraph on the service page */
  intro: string;
  imageAlt: string;
  /** What we build (kept short) */
  offers: { title: string; text: string }[];
  /** Typical technologies */
  tech: string[];
  /** Subject sent to the Connect form (pre-selects the matching service) */
  inquirySubject: string;
}


export const SERVICE_STEPS = [
  { title: 'Discover', text: 'We learn your business, users and goals, then agree the scope.' },
  { title: 'Design', text: 'Clear flows and a prototype you can click before we build.' },
  { title: 'Build', text: 'Weekly demos and clean, tested code you own.' },
  { title: 'Launch & support', text: 'We ship, monitor and keep improving it with you.' },
];

export const SERVICE_DATA: ServiceData[] = [
  {
    slug: 'web-apps',
    index: '01.',
    category: 'Web Engineering',
    title: 'Custom Web Apps',
    description: 'Full-stack SaaS, portals, and modern frontends.',
    tagline: 'Fast, secure web applications built around how your business works.',
    intro:
      'From customer portals to full SaaS products, we build web apps that load fast, scale with you and are simple to maintain.',
    imageAlt: 'Laptop displaying modern web application UI and code editor',
    offers: [
      { title: 'SaaS platforms', text: 'Multi-tenant products with billing, roles and analytics.' },
      { title: 'Customer portals', text: 'Self-service areas for orders, invoices and support.' },
      { title: 'Marketing sites', text: 'Quick, SEO-ready sites that convert visitors.' },
      { title: 'Progressive web apps', text: 'App-like experience, installable and offline-friendly.' },
    ],
    tech: ['React', 'TypeScript', 'Node.js', 'Tailwind', 'PostgreSQL'],
    inquirySubject: 'Service Inquiry: Custom Web Apps',
  },
  {
    slug: 'mobile-development',
    index: '02.',
    category: 'Mobile',
    title: 'Mobile Development',
    description: 'Native and cross-platform iOS & Android apps.',
    tagline: 'Polished iOS and Android apps your users will keep on their phones.',
    intro:
      'One team, one codebase when it makes sense, native when it matters. We design, build and publish apps to both stores.',
    imageAlt: 'Smartphone showing clean minimalist mobile application UI',
    offers: [
      { title: 'iOS & Android apps', text: 'Smooth, reliable apps that follow each platform’s rules.' },
      { title: 'Cross-platform', text: 'One codebase to ship faster and spend less.' },
      { title: 'Offline & sync', text: 'Apps that keep working without a connection.' },
      { title: 'Store launch', text: 'Setup, review and release on App Store and Google Play.' },
    ],
    tech: ['React Native', 'Swift', 'Kotlin', 'Firebase', 'REST & GraphQL'],
    inquirySubject: 'Service Inquiry: Mobile Development',
  },
  {
    slug: 'ui-ux-design',
    index: '03.',
    category: 'Design',
    title: 'UI / UX & Product Design',
    description: 'Design systems, prototypes, and user flows.',
    tagline: 'Clean, simple interfaces that people understand at first glance.',
    intro:
      'We turn ideas into clear flows and a consistent design system, tested with real users before a line of code is written.',
    imageAlt: 'Product designer crafting interface components and typography grids',
    offers: [
      { title: 'User research', text: 'Interviews and tests to find what really matters.' },
      { title: 'Wireframes & prototypes', text: 'Clickable flows you can try and change early.' },
      { title: 'Design systems', text: 'Reusable components so every screen feels the same.' },
      { title: 'Branding & visuals', text: 'Logo, colours and type that fit your product.' },
    ],
    tech: ['Figma', 'Design tokens', 'Prototyping', 'Usability testing'],
    inquirySubject: 'Service Inquiry: UI / UX & Product Design',
  },
  {
    slug: 'e-commerce',
    index: '04.',
    category: 'Commerce',
    title: 'E-Commerce Builds',
    description: 'Custom storefronts, carts, and local wallets.',
    tagline: 'Online stores that sell, with the payments your customers already use.',
    intro:
      'Fast storefronts with simple checkout, local payment methods and stock that stays in sync with your shops and warehouse.',
    imageAlt: 'Digital commerce storefront tablet next to curated retail goods',
    offers: [
      { title: 'Custom storefronts', text: 'Your brand, not a generic template.' },
      { title: 'Checkout & payments', text: 'Cards, local wallets and bank transfer.' },
      { title: 'Inventory sync', text: 'One stock number across web, POS and warehouse.' },
      { title: 'Orders & shipping', text: 'Fulfilment, tracking and returns in one place.' },
    ],
    tech: ['Next.js', 'Stripe & local gateways', 'Headless CMS', 'Search'],
    inquirySubject: 'Service Inquiry: E-Commerce Builds',
  },
  {
    slug: 'backend-apis',
    index: '05.',
    category: 'Backend',
    title: 'Backend & APIs',
    description: 'Scalable REST APIs, databases, and integrations.',
    tagline: 'The solid engine behind your apps: fast, secure and well documented.',
    intro:
      'We design APIs and data models that stay fast as you grow, and connect the systems you already use.',
    imageAlt: 'Developer workspace showing backend code and database schemas',
    offers: [
      { title: 'REST & GraphQL APIs', text: 'Clean, versioned and documented.' },
      { title: 'Databases', text: 'Schema design, performance and safe migrations.' },
      { title: 'Integrations', text: 'Payments, ERP, CRM, shipping and more.' },
      { title: 'Security', text: 'Authentication, permissions and audit trails.' },
    ],
    tech: ['Node.js', 'PostgreSQL', 'Redis', 'Cloudflare Workers', 'OpenAPI'],
    inquirySubject: 'Service Inquiry: Backend & APIs',
  },
  {
    slug: 'cloud-devops',
    index: '06.',
    category: 'Infrastructure',
    title: 'Cloud & DevOps',
    description: 'CI/CD pipelines, containers, and global scaling.',
    tagline: 'Ship often, stay online and scale without surprises.',
    intro:
      'We set up the pipelines, hosting and monitoring that let your team release with confidence at any time.',
    imageAlt: 'Software engineering team monitoring live cloud deployment pipeline',
    offers: [
      { title: 'CI/CD pipelines', text: 'Automatic tests and one-click releases.' },
      { title: 'Cloud hosting', text: 'Fast global delivery with sensible costs.' },
      { title: 'Containers', text: 'Reproducible environments from laptop to production.' },
      { title: 'Monitoring', text: 'Alerts and dashboards before users notice problems.' },
    ],
    tech: ['Cloudflare', 'AWS', 'Docker', 'GitHub Actions', 'Terraform'],
    inquirySubject: 'Service Inquiry: Cloud & DevOps',
  },
  {
    slug: 'internal-tools-erp',
    index: '07.',
    category: 'Systems',
    title: 'Internal Tools & ERP',
    description: 'Custom dashboards, POS, CRM, and workflows.',
    tagline: 'One connected system for sales, stock, finance and customers.',
    intro:
      'Replace spreadsheets and disconnected apps with tools built for your exact workflow, from the shop floor to the head office.',
    imageAlt: 'Widescreen display presenting operational analytics and KPI charts',
    offers: [
      { title: 'POS & ordering', text: 'Fast checkout that works offline too.' },
      { title: 'Inventory & WMS', text: 'Live stock across branches and warehouses.' },
      { title: 'ERP & finance', text: 'Invoicing, settlement and reporting in one place.' },
      { title: 'CRM & dashboards', text: 'Know your customers and your numbers.' },
    ],
    tech: ['React', 'Node.js', 'PostgreSQL', 'Realtime sync', 'Role-based access'],
    inquirySubject: 'Service Inquiry: Internal Tools & ERP',
  },
  {
    slug: 'qa-dedicated-teams',
    index: '08.',
    category: 'Lifecycle',
    title: 'QA & Dedicated Teams',
    description: 'Automated testing, monitoring, and long-term support.',
    tagline: 'Keep quality high, and add engineers who feel like part of your team.',
    intro:
      'Automated testing and ongoing support to keep releases safe, or a dedicated team that works with you for the long run.',
    imageAlt: 'Engineers reviewing automated test results together on a laptop',
    offers: [
      { title: 'Automated testing', text: 'Regression suites that run on every change.' },
      { title: 'Maintenance', text: 'Updates, fixes and security patches.' },
      { title: 'Dedicated team', text: 'Engineers and designers embedded in your roadmap.' },
      { title: 'Support', text: 'Clear response times and a named contact.' },
    ],
    tech: ['Playwright', 'Jest', 'Sentry', 'Retainers', 'SLA support'],
    inquirySubject: 'Service Inquiry: QA & Dedicated Teams',
  },
];


