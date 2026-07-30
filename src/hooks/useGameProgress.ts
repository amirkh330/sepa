import { useCallback, useEffect, useMemo, useState } from 'react';
import type { GameProgress } from '../types/storage';
import { readJson, removeKey, writeJson } from '../lib/localStorage';
import {
  applyStagePass,
  canPlayStage,
  createDefaultProgress,
  isStagePassed,
  isStageUnlocked,
  normalizeProgress,
} from '../lib/progression';
import { getRankByLevel } from '../lib/rank';

const KEY = 'pwa_game_progress' as const;

export function useGameProgress() {
  const [progress, setProgress] = useState<GameProgress>(createDefaultProgress());
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const stored = readJson<unknown>(KEY);
    const normalized = normalizeProgress(stored);

    setProgress(normalized);
    writeJson(KEY, normalized);
    setIsHydrated(true);
  }, []);

  const persist = useCallback((next: GameProgress) => {
    setProgress(next);
    writeJson(KEY, next);
  }, []);

  const markStagePassed = useCallback((stageNumber: number) => {
    setProgress((prev) => {
      const next = applyStagePass(prev, stageNumber);
      writeJson(KEY, next);
      return next;
    });
  }, []);

  const resetProgress = useCallback(() => {
    const next = createDefaultProgress();
    persist(next);
  }, [persist]);

  const level = progress.level;
  const rank = useMemo(() => getRankByLevel(level), [level]);

  return {
    progress,
    level,
    rank,
    isHydrated,
    markStagePassed,
    resetProgress,

    isStageUnlocked: (n: number) => isStageUnlocked(progress, n),
    isStagePassed: (n: number) => isStagePassed(progress, n),
    canPlayStage: (n: number) => canPlayStage(progress, n),

    clearProgressStorage: () => removeKey(KEY),
  };
}
