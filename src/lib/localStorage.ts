/* src/lib/localStorage.ts */
export type StorageKey = 'pwa_game_profile' | 'pwa_game_progress';

export function readJson<T>(key: StorageKey): T | null {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function writeJson<T>(key: StorageKey, value: T): void {
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function removeKey(key: StorageKey): void {
  window.localStorage.removeItem(key);
}
