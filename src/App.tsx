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

  const [selectedQuestionId, setSelectedQuestionId] = useState<number | null>(null);

  const selectedQuestion = questions.find((q) => q.id === selectedQuestionId) || null;

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
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-green-900 relative overflow-hidden">
      <div className="snowflakes" aria-hidden="true">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="snowflake">❄</div>
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-2 drop-shadow-lg animate-glow">
            🎄 New Year Jeopardy 🎄
          </h1>
          <p className="text-2xl text-yellow-300 font-semibold drop-shadow">
            Comtehno University Edition
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
            <ScoreBoard teams={gameState.teams} currentTeamIndex={gameState.currentTeamIndex} />
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
