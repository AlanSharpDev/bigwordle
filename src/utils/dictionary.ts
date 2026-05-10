let allWords: Set<string> | null = null;
let answerPool: string[] | null = null;

export async function loadDictionary(): Promise<{ dictionary: Set<string>; answers: string[] }> {
  if (allWords && answerPool) {
    return { dictionary: allWords, answers: answerPool };
  }

  // Dynamic import splits this into its own chunk (~1MB, loads once)
  const raw = await import('an-array-of-english-words');
  const words: string[] = Array.isArray(raw) ? raw : (raw as any).default ?? raw;

  allWords = new Set(words.map(w => w.toLowerCase()));

  // Answer pool: alphabetic only, length 4–15
  answerPool = words.filter(w => w.length >= 4 && w.length <= 15 && /^[a-z]+$/.test(w));

  return { dictionary: allWords, answers: answerPool };
}

export function isValidWord(word: string, dictionary: Set<string>): boolean {
  return dictionary.has(word.toLowerCase());
}

export function pickRandomWord(answers: string[]): string {
  return answers[Math.floor(Math.random() * answers.length)].toLowerCase();
}
