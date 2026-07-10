import React from 'react';
import { Trophy, User, Users } from 'lucide-react';

interface ScoreBoardProps {
  scores: {
    X: number;
    O: number;
    draws: number;
  };
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ scores }) => {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl shadow-xl">

      {/* Header */}
      <h2 className="mb-5 flex items-center gap-2 text-xl font-bold text-white">
        <Trophy className="h-6 w-6 text-yellow-400" />
        Score Board
      </h2>

      <div className="space-y-4">

        {/* Player X */}
        <div className="flex items-center justify-between rounded-xl border border-cyan-500/20 bg-cyan-500/10 p-4 transition-all duration-300 hover:scale-[1.02] hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/20">

          <div className="flex items-center gap-3">
            <div className="rounded-full bg-cyan-500/20 p-2">
              <User className="h-5 w-5 text-cyan-300" />
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest text-slate-400">
                Player X
              </p>

              <p className="text-lg font-semibold text-cyan-300">
                Sangita
              </p>
            </div>
          </div>

          <span className="text-3xl font-extrabold text-cyan-300">
            {scores.X}
          </span>

        </div>

        {/* Player O */}
        <div className="flex items-center justify-between rounded-xl border border-pink-500/20 bg-pink-500/10 p-4 transition-all duration-300 hover:scale-[1.02] hover:border-pink-400 hover:shadow-lg hover:shadow-pink-500/20">

          <div className="flex items-center gap-3">
            <div className="rounded-full bg-pink-500/20 p-2">
              <User className="h-5 w-5 text-pink-300" />
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest text-slate-400">
                Player O
              </p>

              <p className="text-lg font-semibold text-pink-300">
                Priya
              </p>
            </div>
          </div>

          <span className="text-3xl font-extrabold text-pink-300">
            {scores.O}
          </span>

        </div>

        {/* Draws */}
        <div className="flex items-center justify-between rounded-xl border border-slate-600 bg-slate-800/60 p-4 transition-all duration-300 hover:scale-[1.02] hover:border-slate-400">

          <div className="flex items-center gap-3">
            <div className="rounded-full bg-slate-700 p-2">
              <Users className="h-5 w-5 text-slate-300" />
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest text-slate-400">
                Total Draws
              </p>

              <p className="text-lg font-semibold text-white">
                Matches
              </p>
            </div>
          </div>

          <span className="text-3xl font-extrabold text-white">
            {scores.draws}
          </span>

        </div>

      </div>
    </div>
  );
};

export default ScoreBoard;