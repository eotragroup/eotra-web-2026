import type { LucideIcon } from 'lucide-react';
import {
  CalendarCheck,
  Cloud,
  Code2,
  FileText,
  KeyRound,
  LifeBuoy,
  MousePointerClick,
  Palette,
  Search,
  TestTube2,
  Users,
  Zap,
} from 'lucide-react';
import {
  siDocker,
  siFigma,
  siFirebase,
  siGithubactions,
  siGraphql,
  siJest,
  siKotlin,
  siNextdotjs,
  siNodedotjs,
  siOpenapiinitiative,
  siPostgresql,
  siReact,
  siRedis,
  siSentry,
  siStripe,
  siSwift,
  siTailwindcss,
  siTerraform,
  siTypescript,
  siCloudflare,
  siCloudflareworkers,
} from 'simple-icons';

interface BrandIcon {
  path: string;
  hex: string;
}

// Real brand logos where one exists, a simple icon otherwise
const BRAND: Record<string, BrandIcon> = {
  React: siReact,
  'React Native': siReact,
  TypeScript: siTypescript,
  'Node.js': siNodedotjs,
  Tailwind: siTailwindcss,
  PostgreSQL: siPostgresql,
  Swift: siSwift,
  Kotlin: siKotlin,
  Firebase: siFirebase,
  'REST & GraphQL': siGraphql,
  Figma: siFigma,
  'Next.js': siNextdotjs,
  'Stripe & local gateways': siStripe,
  Redis: siRedis,
  'Cloudflare Workers': siCloudflareworkers,
  Cloudflare: siCloudflare,
  OpenAPI: siOpenapiinitiative,
  Docker: siDocker,
  'GitHub Actions': siGithubactions,
  Terraform: siTerraform,
  Jest: siJest,
  Sentry: siSentry,
};

const GENERIC: Record<string, LucideIcon> = {
  AWS: Cloud,
  Playwright: TestTube2,
  'Design tokens': Palette,
  Prototyping: MousePointerClick,
  'Usability testing': Users,
  'Headless CMS': FileText,
  Search: Search,
  'Realtime sync': Zap,
  'Role-based access': KeyRound,
  Retainers: CalendarCheck,
  'SLA support': LifeBuoy,
};

// Very dark brand colours would disappear on dark backgrounds; the badge sits on white so they are fine.
export function TechBadge({ name }: { name: string }) {
  const brand = BRAND[name];
  const Generic = GENERIC[name] ?? Code2;
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-white pl-3 pr-4 py-2 text-[13px] font-medium text-gray-900">
      {brand ? (
        <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" fill={`#${brand.hex}`}>
          <path d={brand.path} />
        </svg>
      ) : (
        <Generic size={16} strokeWidth={1.7} className="text-gray-500" />
      )}
      {name === 'Stripe & local gateways' ? 'Stripe' : name === 'REST & GraphQL' ? 'GraphQL & REST' : name}
    </span>
  );
}
