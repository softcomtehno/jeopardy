import { useState } from 'react';
import { Team } from '../types/game';
import { Plus, Trash2, ChevronLeft, ChevronRight, RotateCcw, Edit2 } from 'lucide-react';

interface HostPanelProps {
  teams: Team[];
  currentTeamIndex: number;
  onAddTeam: (name: string, color: string) => void;
  onRemoveTeam: (teamId: string) => void;
  onSetTeamScore: (teamId: string, score: number) => void;
  onNextTeam: () => void;
  onSetCurrentTeam: (index: number) => void;
  onResetGame: () => void;
}

const teamColors = [
  '#EF4444',
  '#3B82F6',
  '#10B981',
  '#F59E0B',
  '#8B5CF6',
  '#EC4899',
  '#14B8A6',
  '#F97316',
];

export const HostPanel = ({
  teams,
  currentTeamIndex,
  onAddTeam,
  onRemoveTeam,
  onSetTeamScore,
  onNextTeam,
  onSetCurrentTeam,
  onResetGame,
}: HostPanelProps) => {
  const [newTeamName, setNewTeamName] = useState('');
  const [selectedColor, setSelectedColor] = useState(teamColors[0]);
  const [editingTeamId, setEditingTeamId] = useState<string | null>(null);
  const [editScore, setEditScore] = useState('');

  const handleAddTeam = () => {
    if (newTeamName.trim()) {
      onAddTeam(newTeamName.trim(), selectedColor);
      setNewTeamName('');
      setSelectedColor(teamColors[(teams.length + 1) % teamColors.length]);
    }
  };

  const handleEditScore = (teamId: string) => {
    const team = teams.find((t) => t.id === teamId);
    if (team) {
      setEditingTeamId(teamId);
      setEditScore(team.score.toString());
    }
  };

  const handleSaveScore = (teamId: string) => {
    const score = parseInt(editScore);
    if (!isNaN(score)) {
      onSetTeamScore(teamId, score);
    }
    setEditingTeamId(null);
    setEditScore('');
  };

  const handleResetGame = () => {
    if (confirm('Вы уверены, что хотите сбросить игру? Все данные будут удалены!')) {
      onResetGame();
    }
  };

  return (
    <div className="bg-gradient-to-br from-red-700 to-red-800 rounded-xl shadow-2xl p-6 border-4 border-yellow-400">
      <div className="bg-white rounded-lg p-4 mb-6">
        <h3 className="font-bold text-lg mb-3 text-gray-800">Добавить команду</h3>
        <div className="space-y-3">
          <input
            type="text"
            value={newTeamName}
            onChange={(e) => setNewTeamName(e.target.value)}
            placeholder="Название команды"
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
            onKeyPress={(e) => e.key === 'Enter' && handleAddTeam()}
          />
          <div className="flex gap-2 flex-wrap">
            {/* {teamColors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`w-8 h-8 rounded-full transition-all ${
                  selectedColor === color ? 'ring-4 ring-blue-400 scale-110' : ''
                }`}
                style={{ backgroundColor: color }}
              />
            ))} */}
          </div>
          <button
            onClick={handleAddTeam}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-all flex items-center justify-center gap-2"
          >
            <Plus size={20} />
            Добавить команду
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg p-4 mb-6">
        <h3 className="font-bold text-lg mb-3 text-gray-800">Управление командами</h3>
        <div className="space-y-2">
          {teams.map((team, index) => (
            <div
              key={team.id}
              className={`flex items-center gap-2 p-3 rounded-lg ${
                currentTeamIndex === index ? 'bg-yellow-100 border-2 border-yellow-400' : 'bg-gray-50'
              }`}
            >
              {/* <div
                className="w-4 h-4 rounded-full flex-shrink-0"
                style={{ backgroundColor: team.color }}
              /> */}
              <div className="flex-1 font-semibold">{team.name}</div>
              {editingTeamId === team.id ? (
                <input
                  type="number"
                  value={editScore}
                  onChange={(e) => setEditScore(e.target.value)}
                  onBlur={() => handleSaveScore(team.id)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSaveScore(team.id)}
                  className="w-20 px-2 py-1 border-2 border-blue-400 rounded"
                  autoFocus
                />
              ) : (
                <button
                  onClick={() => handleEditScore(team.id)}
                  className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                >
                  <Edit2 size={16} />
                  <span className="font-bold">{team.score}</span>
                </button>
              )}
              <button
                onClick={() => onSetCurrentTeam(index)}
                className={`px-3 py-1 rounded transition-all ${
                  currentTeamIndex === index
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                {currentTeamIndex === index ? 'Ход' : 'Выбрать'}
              </button>
              <button
                onClick={() => onRemoveTeam(team.id)}
                className="text-red-600 hover:text-red-800"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* <div className="bg-white rounded-lg p-4 mb-6">
        <h3 className="font-bold text-lg mb-3 text-gray-800">Управление ходом</h3>
        <button
          onClick={onNextTeam}
          disabled={teams.length === 0}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2"
        >
          <ChevronRight size={20} />
          Следующая команда
        </button>
      </div> */}

      <button
        onClick={handleResetGame}
        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2"
      >
        <RotateCcw size={20} />
        Сбросить игру
      </button>
    </div>
  );
};
