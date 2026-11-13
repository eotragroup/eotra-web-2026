export interface ProductCapability {
  index: string;
  title: string;
  description: string;
}

export interface ProductWorkflow {
  label: string;
  title: string;
  summary: string;
}

export interface CaseStudyData {
  id: string;
  title: string;
  description: string;
  videoUrl?: string;
  logoUrl?: string;
  liveUrl?: string;
  domainLabel?: string;
  client: string;
  year: string;
  deliverables: string[];
  summary: string;
  quote: string;
  quoteAuthor: string;
  metrics: { label: string; value: string }[];
}

export interface ProductPageData extends CaseStudyData {
  tagline: string;
  overviewParagraphs: string[];
  capabilities: ProductCapability[];
  workflows: ProductWorkflow[];
  specifications: { label: string; value: string }[];
  inquirySubject: string;
}

export const JAMJOOM_PRODUCT: ProductPageData = {
  id: 'jamjoom-online',
  title: 'Jamjoom Pharmacy Group',
  tagline: 'Safe medicine, wherever you are—online and across every pharmacy branch.',
  description:
    'Multi-branch digital pharmacy group platform—connecting safe medicine, health & beauty inventory, city delivery, and local wallets',
  logoUrl: '/assets/aistudio/jamjoom_english--logo231313_aec5cb31.png',
  liveUrl: 'https://jamjoomonline.com/',
  domainLabel: 'jamjoomonline.com',
  client: 'Jamjoom Pharmacies',
  year: '2026',
  deliverables: [
    'Pharmacy Group Platform',
    'Multi-Branch Inventory',
    'Local Wallet Checkout',
  ],
  summary:
    'Built for Jamjoom Pharmacy Group to power its physical pharmacy network online across Sanaa and Al Hudaydah—linking branch inventory, medicine, vitamins, mother & baby, and skincare brands (The Ordinary, Bioderma, La Roche-Posay, Eucerin) with city-level delivery routing and local mobile wallets.',
  overviewParagraphs: [
    'Jamjoom Pharmacy Group required a unified digital commerce and fulfillment layer capable of reflecting real-time stock across physical pharmacy branches while keeping medication discovery fast, trusted, and accessible.',
    'Eotra engineered a multi-branch storefront architecture tailored to regional healthcare logistics—unifying pharmacy inventory, dermo-cosmetic catalogs, city-based delivery zones, and instant local wallet settlement into one cohesive system.',
  ],
  quote:
    'Safe medicine, wherever you are—connecting Jamjoom Pharmacy Group branches directly to patients and shoppers.',
  quoteAuthor: 'Jamjoom Pharmacy Group · jamjoomonline.com',
  metrics: [
    { label: 'Branch Network', value: 'Sanaa & Al Hudaydah' },
    { label: 'Checkout Options', value: '6+ Local Wallets' },
    { label: 'Catalog Scope', value: 'Pharmacy & Dermo' },
    { label: 'Experience', value: 'Arabic RTL & EN' },
  ],
  capabilities: [
    {
      index: '01.',
      title: 'City-Based Branch & Delivery Routing',
      description:
        'Customers select their delivery city directly in the header so product availability, promotions, and courier dispatch route automatically to the nearest stocked branch.',
    },
    {
      index: '02.',
      title: 'Curated Pharmacy & Dermo-Cosmetic Catalog',
      description:
        'Structured merchandising across prescription support, daily vitamins, mother & baby care, oral hygiene, and global skincare houses including Bioderma, La Roche-Posay, The Ordinary, and Eucerin.',
    },
    {
      index: '03.',
      title: 'Regional Mobile Wallet & COD Settlement',
      description:
        'Seamless checkout supporting 6+ regional mobile wallets alongside cash on delivery, reducing cart abandonment across mobile shoppers.',
    },
    {
      index: '04.',
      title: 'Unified Inventory & Order Sync',
      description:
        'Orders placed on jamjoomonline.com flow directly into branch fulfillment workflows, keeping shelf quantities synchronized between walk-in patients and online buyers.',
    },
  ],
  workflows: [
    {
      label: 'Fulfillment',
      title: 'Multi-City Dispatch',
      summary:
        'Dedicated city-aware inventory rules ensure Sanaa and Al Hudaydah shoppers only see stocked medicines ready for immediate local dispatch.',
    },
    {
      label: 'Discovery',
      title: 'Visual & Clinical Search',
      summary:
        'Instant search across active ingredients, international skincare labels, and seasonal health bundles with wishlist and express cart drawers.',
    },
    {
      label: 'Payments',
      title: 'Local Wallet Integration',
      summary:
        'Built-in support for regional digital wallets and verified payment rails alongside direct cash-on-delivery confirmation.',
    },
  ],
  specifications: [
    { label: 'Primary Domain', value: 'jamjoomonline.com' },
    { label: 'Service Cities', value: 'Sanaa, Al Hudaydah' },
    { label: 'Core Stack', value: 'Eotra Retail & Fulfillment Core' },
    { label: 'Support Channels', value: 'Web Storefront · Mobile Web · Live Chat' },
  ],
  inquirySubject: 'Inquiry: Jamjoom Pharmacy Platform Architecture',
};

export const EOTRA_MENU_PRODUCT: ProductPageData = {
  id: 'eotra-menu',
  title: 'EOTRA Menu',
  tagline: 'Create a branded digital QR restaurant menu in minutes—served in 3 languages.',
  description:
    'Branded QR restaurant menus in English, Arabic, and Turkish with 20 templates, auto-translation on save, and live item analytics',
  logoUrl: '/assets/eotra-menu-logo.svg',
  liveUrl: 'https://menu.eotra.com/en',
  domainLabel: 'menu.eotra.com',
  client: 'Eotra Hospitality Suite',
  year: '2026',
  deliverables: ['QR Digital Menus', 'Auto-Translation', 'Menu Analytics'],
  summary:
    'Create a branded digital restaurant menu in minutes with a drag-and-drop editor, 20 customizable templates, automatic English, Arabic, and Turkish translations on save, table QR generation, and real-time guest popularity analytics.',
  overviewParagraphs: [
    'Modern hospitality operators serve international guests across multiple currencies and languages, yet printed menus and static PDFs break the moment pricing changes or dishes sell out.',
    'EOTRA Menu solves menu operations from one dashboard: update items once, save changes, and publish synchronized English, Arabic, and Turkish menus behind a single custom table QR code.',
  ],
  quote:
    'Update dishes from one dashboard and serve guests instantly in English, Arabic, and Turkish—no app required.',
  quoteAuthor: 'Eotra Menu · menu.eotra.com',
  metrics: [
    { label: 'Auto Languages', value: 'EN · AR · TR' },
    { label: 'Menu Templates', value: '20 Designs' },
    { label: 'Sync Speed', value: 'Real-Time QR' },
    { label: 'Guest Access', value: 'Zero App Install' },
  ],
  capabilities: [
    {
      index: '01.',
      title: 'Automatic Multi-Language Translation on Save',
      description:
        'Write or edit a dish in one language and automatically generate localized copy across English, Arabic, and Turkish—eliminating manual translation bottlenecks.',
    },
    {
      index: '02.',
      title: '20 Branded Hospitality Templates',
      description:
        'Select from curated layouts crafted for specialty coffee shops, bakeries, casual dining, and multi-branch restaurants with custom brand colors and typography.',
    },
    {
      index: '03.',
      title: 'Instant Table QR & Multi-Currency Pricing',
      description:
        'Generate print-ready QR codes linked to live dish availability, calorie tags, chef picks, and configurable currencies such as TRY and USD.',
    },
    {
      index: '04.',
      title: 'Guest Engagement & Dish Analytics',
      description:
        'Measure which categories, featured dishes, and languages guests browse most—helping operators optimize seasonal menus and margins.',
    },
  ],
  workflows: [
    {
      label: 'Authoring',
      title: 'One-Dashboard Updates',
      summary:
        'Toggle availability, adjust prices, or reorder signature items from desktop or phone with changes reflected on every table immediately.',
    },
    {
      label: 'Localization',
      title: 'Instant RTL & LTR Switch',
      summary:
        'Guests switch seamlessly between English, Arabic, and Turkish on arrival without downloading any native application.',
    },
    {
      label: 'Insights',
      title: 'Live Menu Telemetry',
      summary:
        'See top-viewed dishes, peak dining scan hours, and category performance across single or multi-branch hospitality groups.',
    },
  ],
  specifications: [
    { label: 'Primary Domain', value: 'menu.eotra.com/en' },
    { label: 'Supported Languages', value: 'English · Arabic · Turkish' },
    { label: 'Template Library', value: '20 Responsive Layouts' },
    { label: 'Deployment Model', value: 'Cloud SaaS · Instant QR' },
  ],
  inquirySubject: 'Inquiry: EOTRA Menu for Hospitality',
};

export const PRODUCTS: ProductPageData[] = [
  JAMJOOM_PRODUCT,
  EOTRA_MENU_PRODUCT,
];

export const CASE_STUDIES: CaseStudyData[] = [
  {
    id: 'horizon-retail',
    title: 'Horizon Retail Group',
    description:
      'How Eotra helped Horizon Retail increase global sales by 30% through unified POS, WMS, and ERP operations',
    videoUrl:
      'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260516_122702_390f5305-8719-41d5-ae80-d23ab3796c28.mp4',
    client: 'Horizon Retail Group',
    year: '2025',
    deliverables: ['Enterprise Edition', 'POS & WMS', 'Global ERP'],
    summary:
      'Horizon Retail replaced five disconnected legacy tools with Eotra Enterprise Edition, unifying real-time warehouse stock, store checkouts, and executive predictive analytics across international markets.',
    quote:
      'Eotra transformed our operations completely. Data visibility is incredible.',
    quoteAuthor: 'Michael Chen, CEO of Horizon Retail Group',
    metrics: [
      { label: 'Global Sales Lift', value: '+30%' },
      { label: 'Systems Replaced', value: '5 → 1' },
      { label: 'Deployment Time', value: 'Weeks' },
    ],
  },
  {
    id: 'lumiere-athletics',
    title: 'Lumière & Urban Athletics',
    description:
      'Scaling 50+ retail stores seamlessly with offline-first POS and real-time omni-channel inventory sync',
    videoUrl:
      'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260516_123323_f909c2b8-ff6c-4edf-882b-8ebcdbe389b5.mp4',
    client: 'Lumière / Urban Athletics',
    year: '2025',
    deliverables: ['Professional Edition', 'Offline-First POS', 'CRM & Loyalty'],
    summary:
      'Built for expanding multi-location chains, Eotra synchronized online storefronts with 50+ physical boutiques using offline-resilient terminals, automated fulfillment routing, and unified CRM.',
    quote:
      'We scaled to 50 stores seamlessly. The offline-first POS is a lifesaver.',
    quoteAuthor: 'Sarah Jenkins, VP Operations at Lumière',
    metrics: [
      { label: 'Stores Scaled', value: '50+' },
      { label: 'Inventory Sync', value: 'Real-Time' },
      { label: 'Checkout Uptime', value: '99.99%' },
    ],
  },
];
