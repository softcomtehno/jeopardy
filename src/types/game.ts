export interface Team {
  id: string;
  name: string;
  score: number;
  color: string;
}

export interface GameState {
  teams: Team[];
  currentTeamIndex: number;
  answeredQuestions: number[];
  questionHistory: {
    questionId: number;
    teamId: string;
    correct: boolean;
    timestamp: number;
  }[];
}

export const STORAGE_KEY = 'jeopardy-game-state';
