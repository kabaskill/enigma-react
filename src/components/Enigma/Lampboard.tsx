import {activeLamp} from "../../StateManager";
import {cn} from "../../utils/cn";
import {KEYBOARD } from "../../data/constants";

export default function Lampboard() {
  return (
    <div className="mb-4 p-2  rounded">
      <div className="flex flex-wrap justify-center">
        {Object.keys(KEYBOARD).map((row) => (
          <div key={row} className="flex">
            {KEYBOARD[row].split("").map((char) => (
              <div
                key={char}
                className={cn(
                 "w-12 h-12 m-1 rounded-full bg-gray-600",
                 "flex items-center justify-center",
                  activeLamp.value === char
                    ? "bg-yellow-300 text-black border-yellow-500 shadow-amber-200 shadow-lg"
                    : "bg-gray-700 text-white border-gray-600"
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
