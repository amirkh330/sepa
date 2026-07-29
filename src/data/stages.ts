import { getStageDifficulty } from '../config/game';
import type { StageDefinition } from '../types/game';
import { MOCK_QUESTIONS } from './questions';

export const STAGES: StageDefinition[] = Array.from({ length: 20 }, (_, index) => {
  const stageNumber = index + 1;
  const difficulty = getStageDifficulty(stageNumber);
  
  // فیلتر کردن سوالات مربوط به این مرحله
  const questionIds = MOCK_QUESTIONS.filter(q => q.stageNumber === stageNumber).map(q => q.id);

  return {
    stageNumber,
    difficulty,
    questionIds
  };
});
