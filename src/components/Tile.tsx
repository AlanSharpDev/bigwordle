import type { LetterStatus } from '../utils/gameLogic';

interface TileProps {
  letter?: string;
  status?: LetterStatus;
  revealDelay?: number;
  boardWidth: number;
}

function tileSize(boardWidth: number): string {
  if (boardWidth <= 7) return '52px';
  if (boardWidth <= 9) return '46px';
  if (boardWidth <= 11) return '40px';
  if (boardWidth <= 13) return '34px';
  return '30px';
}

function tileClasses(letter: string | undefined, status: LetterStatus): string {
  const base = 'tile';
  if (status === 'correct' || status === 'present' || status === 'absent') {
    return `${base} revealed ${status}`;
  }
  if (letter) return `${base} tbd`;
  return `${base} empty`;
}

export function Tile({ letter, status = 'empty', revealDelay = 0, boardWidth }: TileProps) {
  const size = tileSize(boardWidth);

  return (
    <div className="tile-container" style={{ width: size, height: size }}>
      <div
        className={tileClasses(letter, status)}
        style={{
          width: size,
          height: size,
          animationDelay: `${revealDelay}ms`,
        }}
      >
        {letter}
      </div>
    </div>
  );
}
