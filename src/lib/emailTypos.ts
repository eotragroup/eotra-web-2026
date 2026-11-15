// Catches common typos in email domains ("gamil.com" -> "gmail.com") so leads are not lost.
const COMMON = [
  'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com', 'live.com', 'msn.com', 'me.com', 'aol.com', 'mail.com',
  'gmx.com', 'proton.me', 'protonmail.com', 'yandex.com', 'hotmail.com.tr', 'outlook.com.tr', 'yahoo.com.tr', 'googlemail.com',
];

/** Edit distance where swapping two neighbouring letters counts as one change */
function distance(a: string, b: string): number {
  const d: number[][] = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 0; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
    }
  }
  return d[a.length][b.length];
}

/** Returns a corrected address when the domain looks like a typo of a popular one, otherwise null */
export function suggestEmail(email: string): string | null {
  const at = email.trim().lastIndexOf('@');
  if (at < 1) return null;
  const local = email.trim().slice(0, at);
  const domain = email.trim().slice(at + 1).toLowerCase();
  if (COMMON.includes(domain)) return null;
  const best = COMMON.filter((c) => distance(domain, c) === 1).sort((a, b) => Math.abs(a.length - domain.length) - Math.abs(b.length - domain.length))[0];
  return best ? `${local}@${best}` : null;
}
