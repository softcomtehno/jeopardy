import { useState, useEffect } from 'react';
import { GameState, Team, STORAGE_KEY } from '../types/game';

const initialGameState: GameState = {
  teams: [],
  currentTeamIndex: 0,
  answeredQuestions: [],
  questionHistory: [],
};

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : initialGameState;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
  }, [gameState]);

  const addTeam = (name: string, color: string) => {
    const newTeam: Team = {
      id: Date.now().toString(),
      name,
      score: 0,
      color,
    };
    setGameState((prev) => ({
      ...prev,
      teams: [...prev.teams, newTeam],
    }));
  };

  const removeTeam = (teamId: string) => {
    setGameState((prev) => ({
      ...prev,
      teams: prev.teams.filter((t) => t.id !== teamId),
      currentTeamIndex: Math.min(prev.currentTeamIndex, prev.teams.length - 2),
    }));
  };

  const updateTeamScore = (teamId: string, points: number) => {
    setGameState((prev) => ({
      ...prev,
      teams: prev.teams.map((t) =>
        t.id === teamId ? { ...t, score: t.score + points } : t
      ),
    }));
  };

  const setTeamScore = (teamId: string, score: number) => {
    setGameState((prev) => ({
      ...prev,
      teams: prev.teams.map((t) =>
        t.id === teamId ? { ...t, score } : t
      ),
    }));
  };

  const markQuestionAnswered = (questionId: number, teamId: string, correct: boolean) => {
    setGameState((prev) => ({
      ...prev,
      answeredQuestions: [...prev.answeredQuestions, questionId],
      questionHistory: [
        ...prev.questionHistory,
        {
          questionId,
          teamId,
          correct,
          timestamp: Date.now(),
        },
      ],
    }));
  };

  const nextTeam = () => {
    setGameState((prev) => ({
      ...prev,
      currentTeamIndex: (prev.currentTeamIndex + 1) % prev.teams.length,
    }));
  };

  const setCurrentTeam = (index: number) => {
    setGameState((prev) => ({
      ...prev,
      currentTeamIndex: index,
    }));
  };

  const resetGame = () => {
    setGameState(initialGameState);
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    gameState,
    addTeam,
    removeTeam,
    updateTeamScore,
    setTeamScore,
    markQuestionAnswered,
    nextTeam,
    setCurrentTeam,
    resetGame,
  };
};
