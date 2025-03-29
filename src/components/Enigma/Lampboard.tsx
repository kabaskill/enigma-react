import {activeLamp} from "../../StateManager";
import {cn} from "../../utils/cn";
import {KEYBOARD} from "../../data/constants";

export default function Lampboard() {
  return (
    <div className="mb-8 p-4 rounded-lg bg-zinc-900/50 border border-zinc-800">
      <h2 className="enigma-header text-center mb-4">Lampboard</h2>
      <div className="flex flex-col items-center gap-2">
        {Object.keys(KEYBOARD).map((row) => (
          <div key={row} className="flex gap-1.5">
            {KEYBOARD[row].split("").map((char) => (
              <div
                key={char}
                className={cn(
                  "enigma-lamp w-14 h-14",
                  activeLamp.value === char && "enigma-lamp-active"
                )}
              >
                {char}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}