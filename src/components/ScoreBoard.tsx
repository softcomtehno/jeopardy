import { Team } from '../types/game';
import { Trophy } from 'lucide-react';

interface ScoreBoardProps {
  teams: Team[];
  currentTeamIndex: number;
}

export const ScoreBoard = ({ teams, currentTeamIndex }: ScoreBoardProps) => {
  const sortedTeams = [...teams].sort((a, b) => b.score - a.score);

  return (
    <div className="bg-white rounded-xl shadow-xl p-6 border-4 border-green-600">
      <h2 className="text-2xl font-bold text-center mb-4 text-black flex items-center justify-center gap-2">
        <Trophy className="text-yellow-500" />
        Таблица результатов
      </h2>
      <div className="space-y-3">
        {sortedTeams.map((team, index) => {
          const isCurrent = teams[currentTeamIndex]?.id === team.id;
          return (
            <div
              key={team.id}
              className={`flex items-center justify-between p-4 rounded-lg transition-all ${
                isCurrent
                  ? 'bg-gradient-to-r from-yellow-200 to-yellow-300 shadow-lg scale-105 border-2 border-yellow-500'
                  : 'bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="text-2xl font-bold text-gray-600">
                  {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}.`}
                </div>
                {/* <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: team.color }}
                /> */}
                <div className="font-bold text-lg">{team.name}</div>
                {isCurrent && (
                  <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                    ХОД
                  </span>
                )}
              </div>
              <div className="text-2xl font-bold" style={{ color: team.score >= 0 ? 'green' : 'red' }}>
                {team.score}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
