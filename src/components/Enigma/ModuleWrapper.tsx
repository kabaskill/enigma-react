import {Modules} from "../../data/types";
import {controls} from "../../StateManager";
import {cn} from "../../utils/cn";
import Controls from "./Controls";

export default function ModuleWrapper({children, modName}: {children: React.ReactNode; modName: Modules}) {
  return (
    <div className="flex flex-col items-center enigma-panel">
      <Controls modName={modName} />

      <div
        className={cn(
          "transition-all duration-300 ease-in-out",
          controls.value[modName].active ? "max-h-screen rotate-x-0" : "max-h-0 overflow-hidden -rotate-x-90 "
        )}
      >
        {children}
      </div>

     

  
    </div>
  );
}
