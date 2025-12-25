import { useState } from 'react';
import { GameBoard } from './components/GameBoard';
import { QuestionModal } from './components/QuestionModal';
import { ScoreBoard } from './components/ScoreBoard';
import { HostPanel } from './components/HostPanel';
import { useGameState } from './hooks/useGameState';
import { questions } from './data/questions';

function App() {
  const {
    gameState,
    addTeam,
    removeTeam,
    updateTeamScore,
    setTeamScore,
    markQuestionAnswered,
    nextTeam,
    setCurrentTeam,
    resetGame,
  } = useGameState();

  const [selectedQuestionId, setSelectedQuestionId] = useState<number | null>(
    null
  );

  const selectedQuestion =
    questions.find((q) => q.id === selectedQuestionId) || null;

  const handleQuestionClick = (questionId: number) => {
    setSelectedQuestionId(questionId);
  };

  const handleAnswer = (correct: boolean) => {
    if (selectedQuestionId && gameState.teams[gameState.currentTeamIndex]) {
      const question = questions.find((q) => q.id === selectedQuestionId);
      const currentTeam = gameState.teams[gameState.currentTeamIndex];

      if (question) {
        const points = correct ? question.points : -question.points;
        updateTeamScore(currentTeam.id, points);
        markQuestionAnswered(selectedQuestionId, currentTeam.id, correct);
        nextTeam();
      }
    }
  };

  const handleCloseModal = () => {
    setSelectedQuestionId(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-blue-900 to-black relative overflow-hidden">
      <div className="snowflakes" aria-hidden="true">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="snowflake">
            ❄
          </div>
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl flex items-center justify-center gap-2 font-bold text-white mb-2">
            Жаны Жыл 2026 <img className="w-20" src="/logo.png" alt="" />
          </h1>
          <p className="text-2xl text-white font-semibold drop-shadow">
            Создано командой COMTEHNO для новогоднего настроения!
          </p>
        </header>

        <div className="grid lg:grid-cols-[1fr_350px] gap-6 mb-8">
          <div>
            <GameBoard
              answeredQuestions={gameState.answeredQuestions}
              onQuestionClick={handleQuestionClick}
            />
          </div>
          <div className="space-y-6">
            <ScoreBoard
              teams={gameState.teams}
              currentTeamIndex={gameState.currentTeamIndex}
            />
            <HostPanel
              teams={gameState.teams}
              currentTeamIndex={gameState.currentTeamIndex}
              onAddTeam={addTeam}
              onRemoveTeam={removeTeam}
              onSetTeamScore={setTeamScore}
              onNextTeam={nextTeam}
              onSetCurrentTeam={setCurrentTeam}
              onResetGame={resetGame}
            />
          </div>
        </div>
      </div>

      <QuestionModal
        question={selectedQuestion}
        onClose={handleCloseModal}
        onAnswer={handleAnswer}
      />
    </div>
  );
}

export default App;
