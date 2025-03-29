import {cn} from "../../utils/cn";
import {setActiveLamp} from "../../StateManager";
import * as data from "../../data/constants";

const {KEYBOARD} = data;

interface KeyboardProps {
  onButtonPress: (char: string) => void;
}

export default function Keyboard({onButtonPress}: KeyboardProps) {
  return (
    <div className="mb-4">
      <h2 className="font-bold mb-2">Keyboard</h2>
      <div className="flex flex-wrap justify-center">
        {Object.keys(KEYBOARD).map((row) => (
          <div key={row} className="flex">
            {KEYBOARD[row].split("").map((char) => (
              <Button key={char} char={char} onButtonPress={onButtonPress} />
            ))}
          </div>
        ))}
      </div>
      <button
        className={cn(
          "w-24 h-12 m-1 rounded-full bg-gray-600",
          "hover:bg-gray-400 focus:outline-hidden",
          "border-2 border-white"
        )}
        onMouseDown={() => onButtonPress(" ")}
      >
        SPACE
      </button>
    </div>
  );
}

function Button({char, onButtonPress}: {char: string; onButtonPress: (char: string) => void}) {
  return (
    <button
      className={cn(
        "w-12 h-12 m-1 rounded-full bg-gray-600",
        "hover:bg-gray-400 focus:outline-hidden",
        "border-2 border-white"
      )}
      onMouseDown={() => onButtonPress(char)}
      onMouseUp={() => setActiveLamp(null)}
      onMouseLeave={() => setActiveLamp(null)}
    >
      {char}
    </button>
  );
}
