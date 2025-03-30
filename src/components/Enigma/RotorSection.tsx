import {rotorSettings, addRotor, getAvailableRotors} from "../../StateManager";
import {cn} from "../../utils/cn";
import ModuleWrapper from "./ModuleWrapper";
import Rotor from "./Rotor";

export default function RotorSection() {
  const canAddRotor = getAvailableRotors().length > 0;

  return (
    <ModuleWrapper modName="rotors">
      <div className="flex w-full gap-4">
        {rotorSettings.value.map((_, index) => (
          <Rotor key={index} index={index} />
        ))}
        {canAddRotor && (
          <button
            onClick={addRotor}
            className={cn(
              "border-2 border-dotted border-zinc-600 rounded-lg p-3 cursor-pointer",
              "shadow-md hover:bg-zinc-700 transition duration-200 ease-in-out grow"
            )}
          >
            Add Rotor
          </button>
        )}
      </div>
    </ModuleWrapper>
  );
}
