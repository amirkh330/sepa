import type { Difficulty } from "./question";

export interface StageDefinition {
  stageNumber: number;
  difficulty: Difficulty;
  questionIds: string[];
}

export type StageResultStatus = 'passed' | 'failed';

export interface StageResult {
  stageNumber: number;
  status: StageResultStatus;
  totalQuestions: number;
  correctAnswers: number;
}
