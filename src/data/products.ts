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

export const NEOSHE_PRODUCT: ProductPageData = {
  id: 'neoshe',
  title: 'NEOSHE Skincare',
  tagline: 'Minimalist luxury skincare e-commerce engineered for direct-to-consumer global reach.',
  description:
    'Direct-to-consumer skincare platform with responsive catalog, custom storefront architecture, and international multi-currency checkout',
  logoUrl: '/assets/neoshe-logo.png',
  liveUrl: 'https://www.neoshe.com/',
  domainLabel: 'neoshe.com',
  client: 'NEOSHE',
  year: '2026',
  deliverables: [
    'D2C Storefront',
    'E-Commerce Architecture',
    'Global Checkout',
  ],
  summary:
    'Engineered for NEOSHE to power their high-end direct-to-consumer skincare platform—delivering clean aesthetics, high-conversion product showcases, sub-second page transitions, and smooth multi-currency checkout across international markets.',
  overviewParagraphs: [
    'NEOSHE required a clean, modern digital flagship that reflects their minimalist skincare formulation while providing a frictionless direct-to-consumer shopping experience globally.',
    'Eotra designed and engineered a performance-focused storefront architecture featuring rapid product discovery, predictive search, seamless mobile commerce, and integrated global payment rails.',
  ],
  quote:
    'A refined digital flagship that translates luxury skincare into a smooth, frictionless global e-commerce journey.',
  quoteAuthor: 'NEOSHE · neoshe.com',
  metrics: [
    { label: 'Platform Architecture', value: 'D2C Storefront' },
    { label: 'Checkout Scope', value: 'Global Multi-Currency' },
    { label: 'Mobile Performance', value: 'Touch-Optimized' },
    { label: 'Target Markets', value: 'UK & International' },
  ],
  capabilities: [
    {
      index: '01.',
      title: 'Minimalist High-Conversion Storefront',
      description:
        'Designed around tactile product presentation, high-resolution visual storytelling, and distraction-free checkout flows to maximize customer engagement.',
    },
    {
      index: '02.',
      title: 'Global Multi-Currency & Payment Rails',
      description:
        'Seamless international payments supporting major credit cards, Apple Pay, Google Pay, and localized currency settlement.',
    },
    {
      index: '03.',
      title: 'Predictive Search & Fast Merchandising',
      description:
        'Sub-second predictive search with real-time inventory synchronization, instant cart drawer interactions, and express checkout shortcuts.',
    },
    {
      index: '04.',
      title: 'Responsive Cross-Device Performance',
      description:
        'Lightweight asset optimization and mobile-first architecture ensuring instant load speeds and smooth navigation on any viewport.',
    },
  ],
  workflows: [
    {
      label: 'Storefront',
      title: 'Brand Storytelling & Catalog',
      summary:
        'Immersive product detail pages highlighting ingredient purity, application rituals, and verified customer reviews.',
    },
    {
      label: 'Commerce',
      title: 'Frictionless Quick-Add',
      summary:
        'Flyout slide cart with dynamic threshold incentives, one-tap express payment, and gift recipient options.',
    },
    {
      label: 'Logistics',
      title: 'Automated Order Fulfillment',
      summary:
        'Synchronized dispatch workflows, automated tracking updates, and direct courier label generation.',
    },
  ],
  specifications: [
    { label: 'Primary Domain', value: 'neoshe.com' },
    { label: 'Platform Type', value: 'Luxury D2C E-Commerce' },
    { label: 'Market Coverage', value: 'UK & International Shipping' },
    { label: 'Core Capabilities', value: 'Custom Storefront · Global Checkout · Fast Search' },
  ],
  inquirySubject: 'Inquiry: NEOSHE E-Commerce Platform Architecture',
};

export const IBOSH_PRODUCT: ProductPageData = {
  id: 'ibosh',
  title: 'IBOSH STORE',
  tagline: 'Curated luxury designer fashion and leather goods commerce with global shipping.',
  description:
    'High-end luxury fashion and designer accessories e-commerce storefront with multi-language Arabic, English, and Turkish localization and worldwide delivery',
  logoUrl: '/assets/ibosh-logo.png',
  liveUrl: 'https://ibosh.store/ar',
  domainLabel: 'ibosh.store',
  client: 'IBOSH STORE',
  year: '2026',
  deliverables: [
    'Luxury E-Commerce Platform',
    'Trilingual Localization (AR / EN / TR)',
    'Global Courier & Payment Rails',
  ],
  summary:
    'Crafted for IBOSH STORE to power their luxury designer fashion boutique online—showcasing curated collections with trilingual localization, high-security transaction processing, dynamic currency switching, and international courier tracking.',
  overviewParagraphs: [
    'IBOSH STORE curates high-end luxury designer bags and accessories, catering to an international clientele demanding an authentic, ultra-smooth shopping journey across Arabic, English, and Turkish.',
    'Eotra architected a bespoke modern e-commerce storefront designed for speed, visual elegance, and effortless global transactions across Middle Eastern and European markets.',
  ],
  quote:
    'An elite digital luxury boutique bridging Istanbul fashion curation with discerning shoppers worldwide.',
  quoteAuthor: 'IBOSH STORE · ibosh.store',
  metrics: [
    { label: 'Localization', value: 'Arabic · English · Turkish' },
    { label: 'Fulfillment', value: 'Worldwide Express' },
    { label: 'Architecture', value: 'Modern Web Commerce' },
    { label: 'Payment Options', value: 'Cards, Wallets & Bank Rails' },
  ],
  capabilities: [
    {
      index: '01.',
      title: 'Trilingual RTL & LTR Architecture',
      description:
        'Complete native support for Arabic right-to-left layout along with English and Turkish, delivering cultural and visual fluency to every shopper.',
    },
    {
      index: '02.',
      title: 'Luxury Merchandising & Product Curation',
      description:
        'High-resolution multi-angle product photography, authentication badges, real-time availability counters, and tailored size/spec guides.',
    },
    {
      index: '03.',
      title: 'Global Checkout & Multi-Currency Settlement',
      description:
        'Unified payment processing supporting regional and international payment methods with transparent currency conversion and tax calculation.',
    },
    {
      index: '04.',
      title: 'Automated Global Shipping Integration',
      description:
        'Direct connection to international express carriers with real-time rate calculation, customs documentation, and live doorstep tracking.',
    },
  ],
  workflows: [
    {
      label: 'Curation',
      title: 'Exclusive Drops & Pre-Orders',
      summary:
        'Manage high-demand luxury inventory drops, waitlists, and VIP private collections with instant stock synchronization.',
    },
    {
      label: 'Checkout',
      title: 'Seamless Global Payment',
      summary:
        'One-click digital wallet and card checkout optimized to eliminate friction across international buyers.',
    },
    {
      label: 'Logistics',
      title: 'Cross-Border Dispatch',
      summary:
        'Automated order routing, customs clearance manifest generation, and real-time shipment milestone notifications.',
    },
  ],
  specifications: [
    { label: 'Primary Domain', value: 'ibosh.store' },
    { label: 'Supported Locales', value: 'Arabic (RTL) · English · Turkish' },
    { label: 'Product Focus', value: 'Luxury Designer Bags & Accessories' },
    { label: 'Fulfillment Scope', value: 'Door-to-Door Worldwide Delivery' },
  ],
  inquirySubject: 'Inquiry: IBOSH STORE Luxury E-Commerce Architecture',
};

export const LIDYA_PRODUCT: ProductPageData = {
  id: 'lidya',
  title: 'Lidya&Co',
  tagline: 'Ingredient-led hair, skin, and body care formulations made in Istanbul.',
  description:
    'Clean beauty and personal care digital flagship featuring scientific formulation showcases, routine builders, and direct-to-consumer e-commerce',
  logoUrl: '/assets/lidya-logo.svg',
  liveUrl: 'https://www.lidyaco.tr/en',
  domainLabel: 'lidyaco.tr',
  client: 'Lidya&Co',
  year: '2026',
  deliverables: [
    'Clean Beauty Digital Flagship',
    'Scientific Routine Builder',
    'Bilingual TR / EN Storefront',
  ],
  summary:
    'Developed for Lidya&Co to showcase their ingredient-led cosmetics and wellness formulations crafted in Istanbul—unifying clean Scandinavian/Mediterranean aesthetic design, active ingredient education, and high-speed direct-to-consumer shopping.',
  overviewParagraphs: [
    'Lidya&Co combines pure botanical extracts with dermatological science (biotin, keratin, niacinamide). They required a digital brand flagship that communicates scientific credibility while making skincare and haircare routines intuitive to discover.',
    'Eotra designed and engineered a fresh, high-performance storefront featuring routine-guided shopping, ingredient transparency drawers, and frictionless mobile checkout.',
  ],
  quote:
    'Natural ingredients. Scientific formulation. Simple routines—crafted in Istanbul for modern skin and hair wellness.',
  quoteAuthor: 'Lidya&Co · lidyaco.tr',
  metrics: [
    { label: 'Formulation Hub', value: 'Made in Istanbul' },
    { label: 'Languages', value: 'English & Turkish' },
    { label: 'Category Reach', value: 'Hair, Skin & Body Care' },
    { label: 'Shopping Flow', value: 'Routine & Ingredient Guided' },
  ],
  capabilities: [
    {
      index: '01.',
      title: 'Ingredient-Led Product Merchandising',
      description:
        'Dedicated breakdowns for active compounds like niacinamide, keratin, and biotin, giving consumers scientific transparency before purchase.',
    },
    {
      index: '02.',
      title: 'Interactive Routine Guidance',
      description:
        'Guided discovery helping customers bundle complementary cleanser, serum, and moisturizer steps into effective daily regimens.',
    },
    {
      index: '03.',
      title: 'Bilingual TR/EN Commerce Experience',
      description:
        'Synchronized localization between Turkish domestic market shoppers and expanding international English-speaking audiences.',
    },
    {
      index: '04.',
      title: 'Sub-Second Mobile Storefront Speed',
      description:
        'Optimized bundle size, responsive imagery, and instant slide cart ensuring zero-friction mobile browsing.',
    },
  ],
  workflows: [
    {
      label: 'Education',
      title: 'Active Formula Deep-Dives',
      summary:
        'Transparent ingredient panels detailing clinical benefits, skin compatibility, and usage instructions.',
    },
    {
      label: 'Bundling',
      title: 'Routine Builder Checkouts',
      summary:
        'One-click complete routine additions with smart volume discounts and travel-size add-on recommendations.',
    },
    {
      label: 'Fulfillment',
      title: 'Domestic & Regional Dispatch',
      summary:
        'Instant integration with Turkish courier networks and cross-border regional postal fulfillment.',
    },
  ],
  specifications: [
    { label: 'Primary Domain', value: 'lidyaco.tr' },
    { label: 'Operating Markets', value: 'Türkiye & Global Export' },
    { label: 'Product Focus', value: 'Ingredient-Led Cosmetics & Care' },
    { label: 'Language Options', value: 'Turkish · English' },
  ],
  inquirySubject: 'Inquiry: Lidya&Co Cosmetics Digital Flagship',
};

export const PRODUCTS: ProductPageData[] = [
  JAMJOOM_PRODUCT,
  EOTRA_MENU_PRODUCT,
  NEOSHE_PRODUCT,
  IBOSH_PRODUCT,
  LIDYA_PRODUCT,
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
