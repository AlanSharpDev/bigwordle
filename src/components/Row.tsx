import React from 'react';
import type { EvaluatedLetter } from '../utils/gameLogic';
import { Tile } from './Tile';

interface RowProps {
  letters?: EvaluatedLetter[];
  currentGuess?: string;
  boardWidth: number;
  isActive?: boolean;
  isSubmitted?: boolean;
  isShaking?: boolean;
  isBouncing?: boolean;
}

export function Row({
  letters = [],
  currentGuess,
  boardWidth,
  isActive,
  isSubmitted,
  isShaking,
  isBouncing,
}: RowProps) {
  const tiles: React.ReactElement[] = [];

  if (isActive && currentGuess !== undefined) {
    for (let i = 0; i < boardWidth; i++) {
      const letter = currentGuess[i] ?? '';
      tiles.push(
        <Tile key={i} letter={letter || undefined} status={letter ? 'tbd' : 'empty'} boardWidth={boardWidth} />
      );
    }
  } else if (isSubmitted) {
    for (let i = 0; i < boardWidth; i++) {
      const el = letters[i];
      tiles.push(
        <Tile
          key={i}
          letter={el?.letter}
          status={el ? el.status : 'empty'}
          boardWidth={boardWidth}
          revealDelay={i * 300}
        />
      );
    }
  } else {
    for (let i = 0; i < boardWidth; i++) {
      tiles.push(<Tile key={i} boardWidth={boardWidth} />);
    }
  }

  return (
    <div
      className={`flex gap-[5px] ${isShaking ? 'row-shake' : ''} ${isBouncing ? 'row-bounce' : ''}`}
    >
      {tiles}
    </div>
  );
}
