import React from 'react';

interface SquareProps {
  value: string | null;
  onClick: () => void;
  isWinningSquare: boolean;
}

const Square: React.FC<SquareProps> = ({
  value,
  onClick,
  isWinningSquare,
}) => {
  const baseClasses =
    "w-full h-24 md:h-28 lg:h-32 rounded-2xl flex items-center justify-center text-5xl md:text-6xl font-black transition-all duration-300 transform select-none";

  const getSquareClasses = () => {
    // Winning Square
    if (isWinningSquare) {
      return `${baseClasses}
        bg-gradient-to-br
        from-emerald-400
        to-green-500
        text-white
        border-2
        border-emerald-300
        shadow-2xl
        shadow-emerald-500/50
        scale-105
        animate-pulse`;
    }

    // Empty Square
    if (!value) {
      return `${baseClasses}
        bg-white/10
        backdrop-blur-md
        border
        border-white/20
        hover:bg-white/20
        hover:scale-105
        hover:border-cyan-400
        hover:shadow-xl
        hover:shadow-cyan-500/20
        cursor-pointer`;
    }

    // X Square
    if (value === 'X') {
      return `${baseClasses}
        bg-gradient-to-br
        from-cyan-500/20
        to-blue-600/20
        backdrop-blur-md
        border
        border-cyan-400/40
        text-cyan-300
        shadow-lg
        shadow-cyan-500/30`;
    }

    // O Square
    return `${baseClasses}
      bg-gradient-to-br
      from-pink-500/20
      to-purple-600/20
      backdrop-blur-md
      border
      border-pink-400/40
      text-pink-300
      shadow-lg
      shadow-pink-500/30`;
  };

  return (
    <button
      onClick={onClick}
      className={getSquareClasses()}
      aria-label={value ? `Square with ${value}` : 'Empty square'}
    >
      {value === "X" && (
        <span className="drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]">
          X
        </span>
      )}

      {value === "O" && (
        <span className="drop-shadow-[0_0_15px_rgba(236,72,153,0.8)]">
          O
        </span>
      )}
    </button>
  );
};

export default Square;