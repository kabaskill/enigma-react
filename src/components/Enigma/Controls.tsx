import {ChevronDown} from "lucide-react";
import {controls} from "../../StateManager";
import {Modules} from "../../data/types";
import {cn} from "../../utils/cn";

export default function Controls({modName}: {modName: Modules}) {
  return (
    <div className="w-full flex justify-between gap-4">
      {/*    
      <button
        onClick={() => {
          controls.value = {
            ...controls.value,
            [modName]: {
              ...controls.value[modName],
              show: !controls.value[modName].show,
            },
          };
        }}
      >
        {controls.value[modName].show ? <Eye /> : <EyeOff />}
      </button> */}

      <h2 className="enigma-header">{modName}</h2>
      <button
        onClick={() => {
          controls.value = {
            ...controls.value,
            [modName]: {
              ...controls.value[modName],
              active: !controls.value[modName].active,
            },
          };
        }}
        className={cn(
          "transform transition duration-200 ease-in-out cursor-pointer",
          controls.value[modName].active ? "rotate-180" : "rotate-0"
        )}
      >
        <ChevronDown />
      </button>
    </div>
  );
}
