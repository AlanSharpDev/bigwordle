export function HowToPlay() {
  return (
    <div className="text-sm text-zinc-400 text-center px-4 pb-2 space-y-1">
      <p>
        <span className="inline-block w-4 h-4 rounded-sm bg-[#538d4e] mr-1 align-middle" />
        Correct letter &amp; position
        <span className="inline-block w-4 h-4 rounded-sm bg-[#c97c2e] mx-1 ml-3 align-middle" />
        Wrong position
        <span className="inline-block w-4 h-4 rounded-sm bg-[#3a3a3c] mx-1 ml-3 align-middle" />
        Not in word
      </p>
      <p className="text-zinc-500 text-xs">
        The word can be <strong className="text-zinc-300">any length</strong> — the grid grows as you type!
      </p>
    </div>
  );
}
