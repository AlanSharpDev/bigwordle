import { useWordle } from './hooks/useWordle';
import { Board } from './components/Board';
import { Keyboard } from './components/Keyboard';
import { HowToPlay } from './components/HowToPlay';

const MAX_GUESSES = 6;

export default function App() {
  const {
    targetWord,
    guesses,
    currentGuess,
    gameStatus,
    keyStatuses,
    message,
    boardWidth,
    shakingRow,
    bouncingRow,
    handleKey,
    newGame,
  } = useWordle();

  const gameOver = gameStatus === 'won' || gameStatus === 'lost';

  return (
    <div className="flex flex-col min-h-screen bg-[#121213] text-white select-none">
      {/* Header */}
      <header className="border-b border-zinc-700 py-3 flex items-center justify-center shrink-0">
        <h1
          className="text-3xl font-black tracking-[0.2em] uppercase"
          style={{ fontFamily: "'Clear Sans', 'Helvetica Neue', Arial, sans-serif" }}
        >
          It Could be Donkey!
        </h1>
      </header>

      {/* Toast message */}
      <div className="relative flex justify-center h-0 z-20">
        <div
          className={`
            absolute top-3 bg-white text-zinc-900 px-4 py-2 rounded-lg font-bold text-sm
            transition-all duration-200 pointer-events-none
            ${message ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}
          `}
        >
          {message || ' '}
        </div>
      </div>

      {/* Main content */}
      <main className="flex flex-col items-center flex-1 py-4 gap-4 px-2 overflow-x-auto">
        <HowToPlay />

        {gameStatus === 'loading' ? (
          <div className="flex flex-1 items-center justify-center">
            <div className="text-zinc-400 text-lg animate-pulse">Loading dictionary…</div>
          </div>
        ) : (
          <>
            <div className="flex-1 flex items-center justify-center overflow-x-auto w-full">
              <Board
                guesses={guesses}
                currentGuess={currentGuess}
                boardWidth={boardWidth}
                maxGuesses={MAX_GUESSES}
                gameOver={gameOver}
                shakingRow={shakingRow}
                bouncingRow={bouncingRow}
              />
            </div>

            {gameOver && (
              <div className="flex flex-col items-center gap-3">
                <div className="text-center">
                  <p className="text-zinc-400 text-sm uppercase tracking-widest mb-1">
                    {gameStatus === 'won' ? 'You got it!' : 'The word was'}
                  </p>
                  <a
                    href={`https://www.dictionary.com/browse/${targetWord}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-3xl font-black uppercase tracking-widest text-white hover:text-yellow-300 underline underline-offset-4 transition-colors"
                  >
                    {targetWord}
                  </a>
                  <p className="text-zinc-500 text-xs mt-1">click to look it up</p>
                </div>
                <button
                  onClick={newGame}
                  className="bg-[#538d4e] hover:bg-[#6aaa64] active:bg-[#538d4e] text-white font-bold py-3 px-8 rounded-lg text-base tracking-wider uppercase transition-colors"
                >
                  New Game
                </button>
              </div>
            )}

            <Keyboard keyStatuses={keyStatuses} onKey={handleKey} />
          </>
        )}
      </main>
    </div>
  );
}
