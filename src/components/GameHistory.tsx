import React from 'react';
import { History, Clock, Trophy, Handshake } from 'lucide-react';

interface GameHistoryProps {
  history: Array<{
    winner: string | null;
    board: Array<string | null>;
    date: Date;
  }>;
}

const GameHistory: React.FC<GameHistoryProps> = ({ history }) => {

  // Player Names
  const PLAYER_X = "Sangita";
  const PLAYER_O = "Priya";


  // Format game time
  const formatDate = (date: Date | string) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(new Date(date));
  };


  // Convert X/O into player name
  const getWinnerName = (winner: string | null) => {

    if (!winner) {
      return "Draw";
    }

    const player = winner.toUpperCase();

    if (player === "X") {
      return PLAYER_X;
    }

    if (player === "O") {
      return PLAYER_O;
    }

    return winner;
  };


  // Winner text color
  const getWinnerColor = (winner: string | null) => {

    if (!winner) {
      return "text-slate-300";
    }

    if (winner.toUpperCase() === "X") {
      return "text-cyan-300";
    }

    if (winner.toUpperCase() === "O") {
      return "text-pink-300";
    }

    return "text-white";
  };


  return (
    <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl shadow-xl">

      {/* Header */}
      <h2 className="mb-5 flex items-center gap-2 text-xl font-bold text-white">
        <History className="h-5 w-5 text-cyan-400" />
        Game History
      </h2>


      <div className="max-h-72 space-y-3 overflow-y-auto pr-1">

        {history.length === 0 ? (

          <p className="text-center italic text-slate-400">
            No games played yet.
          </p>

        ) : (

          [...history]
            .reverse()
            .map((game, index) => (

              <div
                key={index}
                className="
                  rounded-xl 
                  border border-white/10 
                  bg-slate-800/60 
                  p-4
                  transition-all
                  duration-300
                  hover:border-cyan-400
                  hover:shadow-lg
                  hover:shadow-cyan-500/20
                "
              >

                <div className="flex items-center justify-between">


                  <div className="flex items-center gap-3">

                    {game.winner ? (

                      <Trophy className="h-5 w-5 text-yellow-400" />

                    ) : (

                      <Handshake className="h-5 w-5 text-slate-400" />

                    )}


                    <span
                      className={`font-semibold ${getWinnerColor(
                        game.winner
                      )}`}
                    >

                      {game.winner
                        ? `🏆 ${getWinnerName(game.winner)} Wins!`
                        : "🤝 Match Drawn."}

                    </span>

                  </div>



                  <span className="flex items-center gap-1 text-xs text-slate-400">

                    <Clock className="h-3 w-3" />

                    {formatDate(game.date)}

                  </span>


                </div>

              </div>

            ))

        )}

      </div>

    </div>
  );
};


export default GameHistory;