import type { Difficulty } from "../types/question";

export const STAGE_COUNT = 20;

export interface DifficultyRule {
  questionCount: number;
  timePerQuestionSec: number;
}

export const DIFFICULTY_RULES: Record<Difficulty, DifficultyRule> = {
  easy: { questionCount: 1, timePerQuestionSec: 30 },
  medium: { questionCount: 2, timePerQuestionSec: 20 },
  hard: { questionCount: 3, timePerQuestionSec: 10 },
} as const;

export function getStageDifficulty(stageNumber: number): Difficulty {
  if (stageNumber >= 1 && stageNumber <= 11) return 'easy';
  if (stageNumber >= 12 && stageNumber <= 16) return 'medium';
  if (stageNumber >= 17 && stageNumber <= 20) return 'hard';
  return 'easy';
}
