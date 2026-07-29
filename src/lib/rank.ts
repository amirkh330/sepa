/* src/lib/rank.ts */
import { RANKS } from '../config/ranks';

export type Rank = (typeof RANKS)[number] | 'No Rank';

export function getRankByLevel(level: number): Rank {
  if (!Number.isFinite(level) || level <= 0) return 'No Rank';
  const idx = Math.min(Math.floor(level) - 1, RANKS.length - 1);
  return RANKS[idx] ?? 'No Rank';
}
