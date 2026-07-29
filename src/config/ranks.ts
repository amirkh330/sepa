export const RANKS = [
  'Soldier',                         // Level 1
  'Second Soldier',                  // Level 2
  'First Soldier',                   // Level 3
  'Combat Assistant',                // Level 4
  'Third Warrior',                   // Level 5
  'Second Warrior',                  // Level 6
  'First Warrior',                   // Level 7
  'Second Guardian',                 // Level 8
  'Third Lieutenant',                // Level 9
  'Second Lieutenant',               // Level 10
  'First Lieutenant',                // Level 11
  'Captain',                         // Level 12
  'Major',                           // Level 13
  'Lieutenant Colonel',              // Level 14
  'Colonel',                         // Level 15
  'Brigadier General Second Class',  // Level 16
  'Brigadier General',               // Level 17
  'Major General',                   // Level 18
  'Lieutenant General',              // Level 19
  'Commander'                        // Level 20 (رنک بیستم اضافه شده)
] as const;

export function getRankByLevel(level: number): string {
  if (level <= 0) return 'No Rank';
  const index = Math.min(level - 1, RANKS.length - 1);
  return RANKS[index];
}
