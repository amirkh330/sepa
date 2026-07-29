export interface PlayerProfile {
  firstName: string;
  lastName: string;
}

export interface GameProgress {
  passedStages: number[];
  highestUnlockedStage: number;
  level: number;
}
