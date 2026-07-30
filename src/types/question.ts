export type Difficulty = 'easy' | 'medium' | 'hard';
export type QuestionOptionCount = 2 | 4;

export interface Question {
  id: string;
  stageNumber: number;
  difficulty: Difficulty;
  text: string;
  optionType: QuestionOptionCount;
  options: string[];
  correctAnswer: string;
  imageUrl?: string; // فیلد جدید برای تصویر سوال

}
