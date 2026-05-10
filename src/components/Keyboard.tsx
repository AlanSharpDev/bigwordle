import type { KeyStatus } from '../utils/gameLogic';

const ROWS = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['Enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '⌫'],
];

const STATUS_COLORS: Record<KeyStatus, string> = {
  correct: 'bg-[#538d4e] text-white',
  present: 'bg-[#c97c2e] text-white',
  absent: 'bg-[#3a3a3c] text-zinc-400',
  unused: 'bg-[#818384] text-white',
};

interface KeyboardProps {
  keyStatuses: Record<string, KeyStatus>;
  onKey: (key: string) => void;
}

export function Keyboard({ keyStatuses, onKey }: KeyboardProps) {
  const getColor = (key: string): string => {
    const status: KeyStatus = keyStatuses[key.toLowerCase()] ?? 'unused';
    return STATUS_COLORS[status];
  };

  const handleClick = (key: string) => {
    if (key === '⌫') onKey('Backspace');
    else onKey(key);
  };

  return (
    <div className="flex flex-col gap-1.5 items-center w-full px-2" style={{ maxWidth: 500 }}>
      {ROWS.map((row, rowIdx) => (
        <div key={rowIdx} className="flex gap-1.5 w-full justify-center">
          {row.map(key => (
            <button
              key={key}
              onMouseDown={e => e.preventDefault()}
              onClick={() => handleClick(key)}
              className={`
                ${getColor(key)}
                ${key.length > 1 ? 'flex-[1.5] text-xs sm:text-sm' : 'flex-1'}
                h-14 rounded font-bold uppercase
                transition-colors duration-150
                cursor-pointer select-none
                min-w-[28px] max-w-[50px]
              `}
            >
              {key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
