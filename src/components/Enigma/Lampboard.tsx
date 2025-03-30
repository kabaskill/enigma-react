import {activeLamp} from "../../StateManager";
import {cn} from "../../utils/cn";
import {KEYBOARD} from "../../data/constants";
import ModuleWrapper from "./ModuleWrapper";

export default function Lampboard() {
  return (
    <ModuleWrapper modName="lampboard">
      <div className="flex flex-col items-center gap-2 ">
        {Object.keys(KEYBOARD).map((row) => (
          <div key={row} className="flex gap-1.5">
            {KEYBOARD[row].split("").map((char) => (
              <div
                key={char}
                className={cn(
                  "enigma-lamp w-14 h-14 rounded-full font-medium flex items-center justify-center",
                  "bg-zinc-800 border border-zinc-700 text-zinc-400 transition-all duration-200",
                  "shadow-[inset_0_1px_3px_rgba(0,0,0,0.3)]",
                  activeLamp.value === char 
                    ? "enigma-lamp-active bg-amber-400 text-zinc-900 shadow-[0_0_15px_rgba(251,191,36,0.7)]" 
                    : ""
                )}
              >
                {char}
              </div>
            ))}
          </div>
        ))}
      </div>
    </ModuleWrapper>
  );
}