import { useState, useEffect, useCallback, useRef } from 'react';
import { evaluateGuess, isWin, mergeKeyStatus } from '../utils/gameLogic';
import type { EvaluatedLetter, KeyStatus } from '../utils/gameLogic';
import { loadDictionary, isValidWord, pickRandomWord } from '../utils/dictionary';

export interface SubmittedGuess {
  letters: EvaluatedLetter[];
}

export type GameStatus = 'loading' | 'playing' | 'won' | 'lost';

export interface WordleState {
  targetWord: string;
  guesses: SubmittedGuess[];
  currentGuess: string;
  gameStatus: GameStatus;
  keyStatuses: Record<string, KeyStatus>;
  message: string;
  boardWidth: number;
  shakingRow: boolean;
  bouncingRow: boolean;
  handleKey: (key: string) => void;
  newGame: () => void;
}

const MAX_GUESSES = 6;
const MIN_GUESS_LENGTH = 2;

export function useWordle(): WordleState {
  const [targetWord, setTargetWord] = useState('');
  const [guesses, setGuesses] = useState<SubmittedGuess[]>([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameStatus, setGameStatus] = useState<GameStatus>('loading');
  const [keyStatuses, setKeyStatuses] = useState<Record<string, KeyStatus>>({});
  const [message, setMessage] = useState('');
  const [shakingRow, setShakingRow] = useState(false);
  const [bouncingRow, setBouncingRow] = useState(false);

  const dictionaryRef = useRef<Set<string>>(new Set());
  const answersRef = useRef<string[]>([]);

  const showMessage = useCallback((msg: string, durationMs = 2000) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), durationMs);
  }, []);

  const triggerShake = useCallback(() => {
    setShakingRow(true);
    setTimeout(() => setShakingRow(false), 400);
  }, []);

  const initGame = useCallback(async () => {
    setGameStatus('loading');
    const { dictionary, answers } = await loadDictionary();
    dictionaryRef.current = dictionary;
    answersRef.current = answers;
    const word = pickRandomWord(answers);
    setTargetWord(word);
    setGuesses([]);
    setCurrentGuess('');
    setKeyStatuses({});
    setMessage('');
    setBouncingRow(false);
    setShakingRow(false);
    setGameStatus('playing');
  }, []);

  useEffect(() => { initGame(); }, [initGame]);

  const submitGuess = useCallback(() => {
    if (currentGuess.length < MIN_GUESS_LENGTH) {
      showMessage(`Need at least ${MIN_GUESS_LENGTH} letters`);
      triggerShake();
      return;
    }

    if (!isValidWord(currentGuess, dictionaryRef.current)) {
      showMessage('Not in word list');
      triggerShake();
      return;
    }

    const result = evaluateGuess(currentGuess, targetWord);
    const newGuess: SubmittedGuess = { letters: result };
    const newGuesses = [...guesses, newGuess];

    setGuesses(newGuesses);
    setCurrentGuess('');

    // Update keyboard letter statuses
    setKeyStatuses(prev => {
      const updated = { ...prev };
      result.forEach(({ letter, status }) => {
        const current: KeyStatus = updated[letter] ?? 'unused';
        updated[letter] = mergeKeyStatus(current, status);
      });
      return updated;
    });

    // Check win/loss
    if (isWin(result, targetWord.length)) {
      const msgs = ['Genius!', 'Magnificent!', 'Impressive!', 'Splendid!', 'Great!', 'Phew!'];
      showMessage(msgs[Math.min(newGuesses.length - 1, msgs.length - 1)], 3000);
      setBouncingRow(true);
      setTimeout(() => setBouncingRow(false), 1000);
      setGameStatus('won');
    } else if (newGuesses.length >= MAX_GUESSES) {
      showMessage('Hard luck!', 2000);
      setGameStatus('lost');
    }
  }, [currentGuess, guesses, targetWord, showMessage, triggerShake]);

  const handleKey = useCallback((key: string) => {
    if (gameStatus !== 'playing') return;

    if (key === 'Enter') {
      submitGuess();
    } else if (key === 'Backspace') {
      setCurrentGuess(prev => prev.slice(0, -1));
    } else if (/^[a-zA-Z]$/.test(key) && currentGuess.length < 20) {
      setCurrentGuess(prev => prev + key.toLowerCase());
    }
  }, [gameStatus, submitGuess, currentGuess.length]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      handleKey(e.key);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleKey]);

  const boardWidth = Math.max(
    5,
    currentGuess.length,
    ...guesses.map(g => g.letters.length)
  );

  return {
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
    newGame: initGame,
  };
}
