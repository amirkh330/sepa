export type Difficulty = 'easy' | 'medium' | 'hard';
export type QuestionOptionCount = 2 | 4;

export interface Question {
  id: string;
  stageNumber: number;
  difficulty: Difficulty;
  text: string;
  image?: string;
  optionType: QuestionOptionCount;
  options: string[];
  correctAnswer: string;
}
