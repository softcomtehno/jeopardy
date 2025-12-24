import { useState } from 'react';
import { Question } from '../data/questions';
import { X } from 'lucide-react';

interface QuestionModalProps {
  question: Question | null;
  onClose: () => void;
  onAnswer: (correct: boolean) => void;
}

export const QuestionModal = ({ question, onClose, onAnswer }: QuestionModalProps) => {
  const [showAnswer, setShowAnswer] = useState(false);

  if (!question) return null;

  const handleCorrect = () => {
    onAnswer(true);
    setShowAnswer(false);
    onClose();
  };

  const handleIncorrect = () => {
    onAnswer(false);
    setShowAnswer(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-gradient-to-br from-green-700 via-green-600 to-green-700 rounded-2xl shadow-2xl max-w-3xl w-full p-8 relative border-4 border-yellow-400 animate-slideIn">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-yellow-300 transition-colors"
        >
          <X size={32} />
        </button>

        <div className="text-center mb-6">
          <div className="inline-block bg-red-600 text-white px-6 py-2 rounded-full text-xl font-bold border-2 border-yellow-400">
            {question.points} баллов
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 mb-6 shadow-inner">
          <p className="text-2xl md:text-3xl font-bold text-gray-800 text-center leading-relaxed">
            {question.question}
          </p>
        </div>

        {showAnswer && (
          <div className="bg-yellow-100 rounded-xl p-6 mb-6 border-2 border-yellow-400 animate-fadeIn">
            <p className="text-xl font-semibold text-gray-800 text-center">
              <span className="text-green-700 font-bold">Ответ:</span> {question.answer}
            </p>
          </div>
        )}

        <div className="flex flex-wrap gap-4 justify-center">
          {!showAnswer ? (
            <button
              onClick={() => setShowAnswer(true)}
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 px-8 rounded-lg transition-all hover:scale-105 shadow-lg"
            >
              Показать ответ
            </button>
          ) : (
            <>
              <button
                onClick={handleCorrect}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg transition-all hover:scale-105 shadow-lg"
              >
                Правильно ✓
              </button>
              <button
                onClick={handleIncorrect}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-lg transition-all hover:scale-105 shadow-lg"
              >
                Неправильно ✗
              </button>
            </>
          )}
        </div>

        <div className="mt-4 text-center text-white text-sm opacity-75">
          by {question.author}
        </div>
      </div>
    </div>
  );
};
