import {Eye, EyeOff, Power, PowerOff} from "lucide-react";
import {controls} from "../../StateManager";

type ModuleName = keyof typeof controls.value;

export default function Controls({modName}: {modName: ModuleName}) {

  return (
    <div className="flex flex-col gap-2 mb-4">
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
      </button>

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
      >
        {controls.value[modName].active ? <Power /> : <PowerOff />}
      </button>
    </div>
  );
}
