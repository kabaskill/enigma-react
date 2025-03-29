import {setActiveLamp} from "../../StateManager";
import * as data from "../../data/constants";

const {KEYBOARD} = data;

interface KeyboardProps {
  onButtonPress: (char: string) => void;
}

export default function Keyboard({onButtonPress}: KeyboardProps) {
  return (
    <div className="mb-6">
 
      <div className="flex flex-col items-center gap-2">
        {Object.keys(KEYBOARD).map((row) => (
          <div key={row} className="flex gap-1.5">
            {KEYBOARD[row].split("").map((char) => (
              <Button key={char} char={char} onButtonPress={onButtonPress} />
            ))}
          </div>
        ))}
        <div className="mt-2">
          <button className="enigma-button w-32 h-12 text-sm" onMouseDown={() => onButtonPress(" ")}>
            SPACE
          </button>
        </div>
      </div>
    </div>
  );
}

function Button({char, onButtonPress}: {char: string; onButtonPress: (char: string) => void}) {
  return (
    <button
      className="enigma-button w-14 h-14"
      onMouseDown={() => onButtonPress(char)}
      onMouseUp={() => setActiveLamp(null)}
      onMouseLeave={() => setActiveLamp(null)}
    >
      {char}
    </button>
  );
}
