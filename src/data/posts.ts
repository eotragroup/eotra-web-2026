// BLOG POSTS
// To add a post:
//   1. Put its cover picture in src/assets/blog/ named exactly like the slug (for example my-new-post.jpg).
//   2. Copy one of the entries below to the TOP of the POSTS list and change the text.
//      - slug: lowercase letters, numbers and dashes only; it becomes the address /blog/<slug>
//      - date: YYYY-MM-DD
//      - body: one string per paragraph
// Save, merge to main, and the post goes live. View counting starts automatically.
// (This file holds plain data only, because the Cloudflare Worker also reads it to know which posts exist.)

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // YYYY-MM-DD
  readMinutes: number;
  body: string[];
}

export const POSTS: BlogPost[] = [
  {
    slug: 'offline-first-pos',
    title: 'Why an offline-first POS keeps your stores selling',
    excerpt: 'Internet drops happen. Here is what changes when your checkout does not depend on the connection.',
    date: '2026-11-12',
    readMinutes: 3,
    body: [
      'Every retailer has seen it: the connection drops, the card reader freezes, and the queue grows. A checkout that needs the internet for every sale turns a small outage into lost revenue.',
      'An offline-first POS works the other way around. The terminal keeps its own copy of the catalog, prices and promotions, so it can finish a sale on its own. When the connection comes back, it syncs the sales to the central system in the background.',
      'For store managers this means fewer emergencies. Staff keep serving customers, and nobody has to write sales on paper and enter them later.',
      'For the business it means one reliable source of truth. Once the terminals sync, stock, sales and customer records line up across every branch.',
      'When you evaluate a POS, ask one simple question: what happens to checkout if the internet goes down for an hour? The answer tells you a lot about how the system was built.',
    ],
  },
  {
    slug: 'one-stock-number',
    title: 'One stock number: how unified inventory stops overselling',
    excerpt: 'When stores, warehouses and your online shop each keep their own count, someone eventually sells what is not there.',
    date: '2026-11-08',
    readMinutes: 3,
    body: [
      'Overselling usually starts with a simple gap: the online shop thinks there are five items left, the store sold three an hour ago, and nobody updated the number.',
      'The fix is not a faster spreadsheet. It is a single stock number that every channel reads from and writes to: the stores, the warehouse and the website.',
      'With one shared inventory, a sale in any channel updates the count straight away. Reservations, returns and transfers between branches all move the same number.',
      'Teams also stop arguing about whose data is right. Purchasing sees what is really on the shelf, and customer service can answer where an order is without checking three systems.',
      'Unifying inventory does not have to mean replacing everything at once. Many businesses start by connecting the systems they already have, then retire the old ones step by step.',
    ],
  },
  {
    slug: 'systems-outgrown',
    title: 'Five signs your retail systems have outgrown each other',
    excerpt: 'A quick checklist for spotting when separate tools are costing you more than they save.',
    date: '2026-11-04',
    readMinutes: 4,
    body: [
      'Most retail businesses grow one tool at a time: a POS here, a warehouse sheet there, a separate tool for customers. It works until it does not. Here are five signs it is time to connect things.',
      '1. The same data is typed in twice. If staff copy orders or stock between systems, errors are only a matter of time.',
      '2. Reports never match. Sales, stock and finance each tell a slightly different story, and month end turns into detective work.',
      '3. Opening a new branch or channel is a project. Every new location means setting up the same tools again, by hand.',
      '4. Nobody has the full customer picture. Loyalty, purchases and support history live in different places, so personal service is guesswork.',
      '5. Small changes take weeks. A new price rule or promotion has to be repeated in every system, and someone always forgets one.',
      'If you recognise two or more of these, a unified platform linking POS, warehouse, ERP and CRM is worth a conversation. Start with the one that hurts most and connect outward from there.',
    ],
  },
];

export function formatPostDate(date: string, lang: 'en' | 'ar' = 'en'): string {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString(lang === 'ar' ? 'ar-u-nu-latn' : 'en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });
}
