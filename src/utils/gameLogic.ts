export type LetterStatus = 'correct' | 'present' | 'absent' | 'tbd' | 'empty';

export interface EvaluatedLetter {
  letter: string;
  status: LetterStatus;
}

export function evaluateGuess(guess: string, target: string): EvaluatedLetter[] {
  const guessArr = [...guess.toLowerCase()];
  const targetArr = [...target.toLowerCase()];

  const result: EvaluatedLetter[] = guessArr.map(letter => ({ letter, status: 'absent' as LetterStatus }));
  const targetUsed = new Array(targetArr.length).fill(false);
  const guessUsed = new Array(guessArr.length).fill(false);

  // Pass 1: exact position matches (green)
  for (let i = 0; i < guessArr.length; i++) {
    if (i < targetArr.length && guessArr[i] === targetArr[i]) {
      result[i].status = 'correct';
      targetUsed[i] = true;
      guessUsed[i] = true;
    }
  }

  // Pass 2: present but wrong position (orange)
  for (let i = 0; i < guessArr.length; i++) {
    if (guessUsed[i]) continue;
    for (let j = 0; j < targetArr.length; j++) {
      if (!targetUsed[j] && guessArr[i] === targetArr[j]) {
        result[i].status = 'present';
        targetUsed[j] = true;
        break;
      }
    }
  }

  return result;
}

export function isWin(result: EvaluatedLetter[], targetLength: number): boolean {
  return result.length === targetLength && result.every(r => r.status === 'correct');
}

export type KeyStatus = 'correct' | 'present' | 'absent' | 'unused';

const STATUS_RANK: Record<KeyStatus, number> = {
  correct: 3,
  present: 2,
  absent: 1,
  unused: 0,
};

export function mergeKeyStatus(current: KeyStatus, incoming: LetterStatus): KeyStatus {
  if (incoming === 'tbd' || incoming === 'empty') return current;
  const next = incoming as KeyStatus;
  return STATUS_RANK[next] > STATUS_RANK[current] ? next : current;
}
