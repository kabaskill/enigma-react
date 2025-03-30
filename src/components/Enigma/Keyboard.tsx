import {setActiveLamp} from "../../StateManager";
import * as data from "../../data/constants";
import {cn} from "../../utils/cn";

const {KEYBOARD} = data;

interface KeyboardProps {
  onButtonPress: (char: string) => void;
}

export default function Keyboard({onButtonPress}: KeyboardProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      {Object.keys(KEYBOARD).map((row) => (
        <div key={row} className="flex gap-2">
          {KEYBOARD[row].split("").map((char) => (
            <Button key={char} char={char} onButtonPress={onButtonPress} />
          ))}
        </div>
      ))}
      <div className="mt-3">
        <button
          className={cn(
            "enigma-button w-32 h-12 text-sm transition-all duration-150",
            "bg-zinc-700 border-2 border-zinc-600 hover:bg-zinc-600",
            "active:translate-y-0.5 active:shadow-inner text-amber-100"
          )}
          onMouseDown={() => onButtonPress(" ")}
          onMouseUp={() => setActiveLamp(null)}
          onMouseLeave={() => setActiveLamp(null)}
        >
          SPACE
        </button>
      </div>
    </div>
  );
}

function Button({char, onButtonPress}: {char: string; onButtonPress: (char: string) => void}) {
  return (
    <button
      className={cn(
        "enigma-button w-14 h-14 font-semibold text-amber-100",
        "bg-zinc-700 border-2 border-zinc-600 shadow-md",
        "hover:bg-zinc-600 active:translate-y-0.5 active:shadow-inner",
        "transition-all duration-150 relative"
      )}
      onMouseDown={() => onButtonPress(char)}
      onMouseUp={() => setActiveLamp(null)}
      onMouseLeave={() => setActiveLamp(null)}
    >
      {char}
    </button>
  );
}
