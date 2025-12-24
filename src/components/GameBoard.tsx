import { categories, pointValues, questions } from '../data/questions';

interface GameBoardProps {
  answeredQuestions: number[];
  onQuestionClick: (questionId: number) => void;
}

export const GameBoard = ({ answeredQuestions, onQuestionClick }: GameBoardProps) => {
  const getQuestionByPosition = (category: string, points: number) => {
    return questions.find((q) => q.category === category && q.points === points);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <div className="grid grid-cols-5 gap-3">
        {categories.map((category) => (
          <div
            key={category}
            className="bg-blue-500 text-white p-4 rounded-lg shadow-lg text-center font-bold text-sm md:text-base border-2 border-green-900"
          >
            {category}
          </div>
        ))}

        {pointValues.map((points) =>
          categories.map((category) => {
            const question = getQuestionByPosition(category, points);
            const isAnswered = question && answeredQuestions.includes(question.id);

            return (
              <button
                key={`${category}-${points}`}
                onClick={() => question && !isAnswered && onQuestionClick(question.id)}
                disabled={isAnswered}
                className={`
                  p-6 rounded-lg shadow-lg  font-bold text-2xl transition-all duration-300
                  ${
                    isAnswered
                      ? 'bg-gray-400 text-gray-600 cursor-not-allowed opacity-50'
                      : 'bg-green-500 text-white hover:from-blue-500 hover:to-blue-600 hover:scale-105 hover:shadow-xl cursor-pointer border-2 border-green-900'
                  }
                `}
              >
                {isAnswered ? '✓' : points}
              </button>
            );
          })
        )}
      </div>
    </div>
  );
};
