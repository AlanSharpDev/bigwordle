import React from 'react';
import type { SubmittedGuess } from '../hooks/useWordle';
import { Row } from './Row';

interface BoardProps {
  guesses: SubmittedGuess[];
  currentGuess: string;
  boardWidth: number;
  maxGuesses: number;
  gameOver: boolean;
  shakingRow: boolean;
  bouncingRow: boolean;
}

export function Board({ guesses, currentGuess, boardWidth, maxGuesses, gameOver, shakingRow, bouncingRow }: BoardProps) {
  const rows: React.ReactElement[] = [];
  const activeIndex = guesses.length;

  for (let i = 0; i < maxGuesses; i++) {
    if (i < guesses.length) {
      rows.push(
        <Row
          key={i}
          letters={guesses[i].letters}
          boardWidth={boardWidth}
          isSubmitted
          isBouncing={bouncingRow && i === guesses.length - 1}
        />
      );
    } else if (i === activeIndex && !gameOver) {
      rows.push(
        <Row
          key="active"
          currentGuess={currentGuess}
          boardWidth={boardWidth}
          isActive
          isShaking={shakingRow}
        />
      );
    } else {
      rows.push(<Row key={i} boardWidth={boardWidth} />);
    }
  }

  return (
    <div className="flex flex-col gap-[5px]">
      {rows}
    </div>
  );
}
