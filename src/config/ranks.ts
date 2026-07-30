export const RANKS = [
  "سرباز",
  "سرباز دوم",
  "سرباز یکم",
  "کمک‌رزم‌آور",
  "رزم‌آور سوم",
  "رزم‌آور دوم",
  "رزم‌آور یکم",
  "نگهبان دوم",
  "ستوان سوم",
  "ستوان دوم",
  "ستوان یکم",
  "سروان",
  "سرگرد",
  "سرهنگ دوم",
  "سرهنگ",
  "سرتیپ دوم",
  "سرتیپ",
  "سرلشکر",
  "سپهبد",
  "فرمانده",
] as const;

export function getRankByLevel(level: number): string {
  if (level <= 0) return "No Rank";
  const index = Math.min(level - 1, RANKS.length - 1);
  return RANKS[index];
}
