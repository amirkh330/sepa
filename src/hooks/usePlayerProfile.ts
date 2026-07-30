/* src/hooks/usePlayerProfile.ts */
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { PlayerProfile } from '../types/storage';
import { readJson, removeKey, writeJson } from '../lib/localStorage';

const KEY = 'pwa_game_profile' as const;

function isValidProfile(x: unknown): x is PlayerProfile {
  if (!x || typeof x !== 'object') return false;
  const obj = x as Partial<PlayerProfile>;
  return typeof obj.firstName === 'string' && obj.firstName.trim().length > 0
    && typeof obj.lastName === 'string' && obj.lastName.trim().length > 0;
}
// src/hooks/usePlayerProfile.ts

export function usePlayerProfile() {
  const [profile, setProfile] = useState<PlayerProfile | null>(null);
  // ۱. اضافه کردن وضعیت hydration
  const [isHydrated, setIsHydrated] = useState(false); 

  useEffect(() => {
    const stored = readJson<unknown>(KEY);
    setProfile(isValidProfile(stored) ? stored : null);
    
    // ۲. بعد از خواندن، وضعیت را true کن
    setIsHydrated(true); 
  }, []);

  const saveProfile = useCallback((next: PlayerProfile) => {
    // ... (بقیه کدها دست نخورده باقی می‌ماند)
    const clean: PlayerProfile = {
      firstName: next.firstName.trim(),
      lastName: next.lastName.trim(),
    };
    writeJson(KEY, clean);
    setProfile(clean);
  }, []);

  const clearProfile = useCallback(() => {
    removeKey(KEY);
    setProfile(null);
  }, []);

  const fullName = useMemo(() => {
    if (!profile) return '';
    return `${profile.firstName} ${profile.lastName}`.trim();
  }, [profile]);

  // ۳. اضافه کردن isHydrated به خروجی هوک
  return { profile, isHydrated, fullName, saveProfile, clearProfile };
}

