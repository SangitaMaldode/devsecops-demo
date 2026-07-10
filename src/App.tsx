import React, { useState, useEffect, useRef } from 'react';
import { RefreshCw, Award } from 'lucide-react';
import Board from './components/Board';
import ScoreBoard from './components/ScoreBoard';
import GameHistory from './components/GameHistory';
import { calculateWinner, checkDraw } from './utils/gameLogic';

interface GameRecord {
  winner: string | null;
  board: Array<string | null>;
  date: string;
}

function App() {

  const PLAYER_X = "Sangita";
  const PLAYER_O = "Priya";


  const [board, setBoard] = useState<Array<string | null>>(
    Array(9).fill(null)
  );

  const [xIsNext, setXIsNext] = useState(true);


  const [scores, setScores] = useState({
    X: 0,
    O: 0,
    draws: 0
  });


  // Load history from localStorage
  const [gameHistory, setGameHistory] = useState<GameRecord[]>(() => {

    const saved =
      localStorage.getItem("ticTacToeHistory");

    return saved
      ? JSON.parse(saved)
      : [];

  });


  const [gameStatus, setGameStatus] =
    useState<'playing' | 'won' | 'draw'>('playing');


  const [winningLine, setWinningLine] =
    useState<number[] | null>(null);


  // Prevent duplicate history
  const gameFinished = useRef(false);



  // Save history whenever it changes
  useEffect(() => {

    localStorage.setItem(
      "ticTacToeHistory",
      JSON.stringify(gameHistory)
    );

  }, [gameHistory]);





  // Check winner/draw
  useEffect(() => {


    if (gameFinished.current) {
      return;
    }


    const result = calculateWinner(board);



    if (result) {


      gameFinished.current = true;


      setGameStatus('won');

      setWinningLine(result.line);



      setScores(prev => ({
        ...prev,
        [result.winner]:
          prev[result.winner as keyof typeof prev] + 1
      }));



      setGameHistory(prev => [
        ...prev,
        {
          winner: result.winner,
          board: [...board],
          date: new Date().toISOString()
        }
      ]);



    }
    else if (checkDraw(board)) {


      gameFinished.current = true;


      setGameStatus('draw');



      setScores(prev => ({
        ...prev,
        draws: prev.draws + 1
      }));



      setGameHistory(prev => [
        ...prev,
        {
          winner: null,
          board: [...board],
          date: new Date().toISOString()
        }
      ]);

    }



  }, [board]);





  const handleClick = (index:number) => {


    if (
      board[index] ||
      gameStatus !== 'playing'
    ) {
      return;
    }



    const newBoard = [...board];


    newBoard[index] =
      xIsNext ? "X" : "O";



    setBoard(newBoard);


    setXIsNext(!xIsNext);

  };





  const resetGame = () => {


    setBoard(
      Array(9).fill(null)
    );


    setXIsNext(true);


    setGameStatus('playing');


    setWinningLine(null);


    gameFinished.current = false;

  };





  const resetStats = () => {


    resetGame();



    setScores({
      X:0,
      O:0,
      draws:0
    });



    setGameHistory([]);



    localStorage.removeItem(
      "ticTacToeHistory"
    );

  };





  const getStatusMessage = () => {


    if(gameStatus === "won") {


      const winner =
        !xIsNext ? "X" : "O";


      const name =
        winner === "X"
          ? PLAYER_X
          : PLAYER_O;



      return `🏆 ${name} Wins!`;

    }



    if(gameStatus === "draw") {

      return "🤝 Match Draw";

    }



    return `🎮 Next Player: ${
      xIsNext
        ? PLAYER_X
        : PLAYER_O
    }`;

  };





  return (

    <div className="relative min-h-screen overflow-hidden bg-slate-950">


      <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />

      <div className="absolute top-1/3 -right-32 h-96 w-96 rounded-full bg-purple-600/20 blur-3xl" />

      <div className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-pink-500/20 blur-3xl" />



      <div className="relative z-10 flex min-h-screen items-center justify-center p-6">


        <div className="w-full max-w-7xl overflow-hidden rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl shadow-2xl">


          <div className="border-b border-white/10 bg-gradient-to-r from-cyan-600/30 via-indigo-600/30 to-purple-600/30 p-8">


            <div className="flex flex-col items-center">


              <Award className="mb-5 h-12 w-12 text-yellow-400"/>


              <h1 className="text-5xl font-extrabold text-white">
                TIC TAC TOE
              </h1>


              <p className="mt-3 text-slate-300">
                Modern React + TypeScript Edition
              </p>


            </div>


          </div>





          <div className="grid gap-10 p-8 lg:grid-cols-3">


            <div className="flex flex-col items-center lg:col-span-2">


              <div className="mb-8 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-6 py-3">

                <h2 className="text-2xl font-bold text-cyan-300">
                  {getStatusMessage()}
                </h2>

              </div>



              <Board
                squares={board}
                onClick={handleClick}
                winningLine={winningLine}
              />



              <div className="mt-10 flex gap-5">


                <button
                  onClick={resetGame}
                  className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-8 py-3 font-semibold text-white"
                >

                  <RefreshCw className="h-5 w-5"/>

                  New Game

                </button>



                <button
                  onClick={resetStats}
                  className="rounded-xl bg-white/10 px-8 py-3 font-semibold text-white"
                >

                  Reset Statistics

                </button>


              </div>


            </div>





            <div className="flex flex-col gap-6">


              <ScoreBoard scores={scores}/>


              <GameHistory history={gameHistory}/>


            </div>


          </div>


        </div>


      </div>


    </div>

  );

}


export default App;