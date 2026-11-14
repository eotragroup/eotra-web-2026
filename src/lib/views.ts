import { useEffect, useState } from 'react';

export type ViewCounts = Record<string, number>;

// Public view counts from the Cloudflare Worker (/api/views). Returns null while loading or when
// the API is not available (for example on the local dev server), so the UI simply hides the numbers.
export function useViewCounts(): [ViewCounts | null, (slug: string, n: number) => void] {
  const [counts, setCounts] = useState<ViewCounts | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/views')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!cancelled && data && typeof data === 'object') setCounts(data as ViewCounts);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  return [counts, (slug, n) => setCounts((c) => ({ ...(c ?? {}), [slug]: n }))];
}

// Count one view per browser per post per 24 hours.
export async function recordView(slug: string): Promise<number | null> {
  const key = `eotra-view:${slug}`;
  try {
    const last = Number(localStorage.getItem(key) || 0);
    if (Date.now() - last < 24 * 60 * 60 * 1000) return null;
  } catch {
    /* storage unavailable: still count */
  }
  try {
    const r = await fetch(`/api/views/${slug}`, { method: 'POST' });
    if (!r.ok) return null;
    const data = await r.json();
    try {
      localStorage.setItem(key, String(Date.now()));
    } catch {
      /* ignore */
    }
    return typeof data?.views === 'number' ? data.views : null;
  } catch {
    return null;
  }
}

export function formatViews(n: number): string {
  if (n >= 10000) return `${Math.round(n / 1000)}K`;
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, '')}K`;
  return String(n);
}
