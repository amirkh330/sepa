/* src/lib/progression.ts */
import { STAGE_COUNT } from '../config/game';
import type { GameProgress } from '../types/storage';

export function createDefaultProgress(): GameProgress {
  return {
    passedStages: [],
    highestUnlockedStage: 1,
    level: 0,
  };
}

export function normalizeProgress(input: unknown): GameProgress {
  const d = createDefaultProgress();

  if (!input || typeof input !== 'object') return d;
  const obj = input as Partial<GameProgress>;

  const passedStages =
    Array.isArray(obj.passedStages)
      ? obj.passedStages.filter((n): n is number => Number.isInteger(n) && n >= 1 && n <= STAGE_COUNT)
      : [];

  // unique + sorted
  const uniquePassed = Array.from(new Set(passedStages)).sort((a, b) => a - b);

  const level = typeof obj.level === 'number' && Number.isInteger(obj.level) && obj.level >= 0
    ? obj.level
    : uniquePassed.length;

  const computedLevel = uniquePassed.length; // source of truth
  const safeLevel = Math.max(0, Math.min(STAGE_COUNT, computedLevel));

  const highestUnlockedStage =
    typeof obj.highestUnlockedStage === 'number' && Number.isInteger(obj.highestUnlockedStage)
      ? obj.highestUnlockedStage
      : 1;

  const computedHighestUnlocked = Math.min(
    STAGE_COUNT,
    Math.max(1, Math.max(highestUnlockedStage, safeLevel + 1))
  );

  // اگر همه مراحل پاس شده باشند، بالاترین آن همان 20 می‌ماند
  const finalHighestUnlocked = safeLevel >= STAGE_COUNT ? STAGE_COUNT : computedHighestUnlocked;

  return {
    passedStages: uniquePassed,
    level: safeLevel,
    highestUnlockedStage: finalHighestUnlocked,
  };
}

export function isStagePassed(progress: GameProgress, stageNumber: number): boolean {
  return progress.passedStages.includes(stageNumber);
}

export function isStageUnlocked(progress: GameProgress, stageNumber: number): boolean {
  // مرحله پاس‌شده "قابل بازی" نیست، ولی برای نمایش روی خانه مهم است
  // unlocked یعنی کاربر حق ورود دارد، اما چون replay ممنوع است:
  // unlockedOnlyForPlay = unlocked && !passed
  return stageNumber >= 1 && stageNumber <= progress.highestUnlockedStage;
}

export function canPlayStage(progress: GameProgress, stageNumber: number): boolean {
  return isStageUnlocked(progress, stageNumber) && !isStagePassed(progress, stageNumber);
}

export function applyStagePass(progress: GameProgress, stageNumber: number): GameProgress {
  if (stageNumber < 1 || stageNumber > STAGE_COUNT) return progress;
  if (isStagePassed(progress, stageNumber)) return progress;

  const passedStages = Array.from(new Set([...progress.passedStages, stageNumber])).sort((a, b) => a - b);
  const level = Math.min(STAGE_COUNT, passedStages.length);

  const nextStage = stageNumber + 1;
  const highestUnlockedStage =
    level >= STAGE_COUNT
      ? STAGE_COUNT
      : Math.min(STAGE_COUNT, Math.max(progress.highestUnlockedStage, nextStage));

  return {
    passedStages,
    level,
    highestUnlockedStage,
  };
}
