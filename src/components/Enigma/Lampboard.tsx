import {activeLamp} from "../../StateManager";
import {cn} from "../../utils/cn";
import {KEYBOARD} from "../../data/constants";
import ModuleWrapper from "./ModuleWrapper";

export default function Lampboard() {
  return (
    <ModuleWrapper modName="lampboard">
      <div className="flex flex-col items-center gap-2">
        {Object.keys(KEYBOARD).map((row) => (
          <div key={row} className="flex gap-1.5">
            {KEYBOARD[row].split("").map((char) => (
              <div
                key={char}
                className={cn("enigma-lamp w-14 h-14", activeLamp.value === char && "enigma-lamp-active")}
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
