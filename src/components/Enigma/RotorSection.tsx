import RotorSelector from "./RotorSelector";
import {rotorSettings, addRotor, getAvailableRotors} from "../../StateManager";
import Controls from "./Controls";

export default function RotorSection() {
  const canAddRotor = getAvailableRotors().length > 0;

  return (
    <div className="enigma-section">
      <div className="flex flex-col items-center">
        <h2 className="enigma-header text-center mb-4">Rotors</h2>
        <Controls modName="rotors" />
        <div className="flex gap-4 mb-4">
          {rotorSettings.value.map((_, index) => (
            <RotorSelector key={index} index={index} />
          ))}
        </div>

        {canAddRotor && (
          <button onClick={addRotor} className="enigma-button mt-2">
            Add Rotor
          </button>
        )}
      </div>
    </div>
  );
}
