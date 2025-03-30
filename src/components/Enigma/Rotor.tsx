import {X} from "lucide-react";
import {rotorSettings, setRotorSettings, updateRotor, removeRotor, getAvailableRotors} from "../../StateManager";

interface RotorProps {
  index: number;
}

export default function Rotor({index}: RotorProps) {
  const currentRotor = rotorSettings.value[index].rotor;
  const availableRotors = getAvailableRotors(currentRotor);

  const reverseIndex = rotorSettings.value.length - index - 1;  

  function handleRotorTypeChange(e: React.ChangeEvent<HTMLSelectElement>) {
    updateRotor(index, e.target.value);
  }

  function handleRingSettingChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newSettings = [...rotorSettings.value];
    newSettings[reverseIndex].ringSetting = parseInt(e.target.value);
    setRotorSettings(newSettings);
  }

  function handleRemove() {
    removeRotor(index);
  }

  const rotorNumber = rotorSettings.value.length - index;

  return (
    <div className="enigma-rotor">
      <div className="w-full flex justify-between items-center">
        <p className="enigma-label">Rotor {rotorNumber}</p>
        {rotorSettings.value.length > 1 && (
          <button
            onClick={handleRemove}
            className=" text-red-500 hover:text-red-700 cursor-pointer"
            title="Remove rotor"
          >
            <X size={14} />
          </button>
        )}
      </div>

      <select
        value={currentRotor}
        onChange={handleRotorTypeChange}
        className="enigma-input w-full text-center mb-3 py-1"
      >
        <option value={currentRotor}>{currentRotor}</option>
        {availableRotors
          .filter((rotor) => rotor !== currentRotor)
          .map((rotorType) => (
            <option key={rotorType} value={rotorType}>
              {rotorType}
            </option>
          ))}
      </select>

      <div className="flex items-center justify-between w-full">
        <span className="enigma-label text-xs">Ring:</span>
        <input
          type="number"
          min="0"
          max="25"
          value={rotorSettings.value[reverseIndex].ringSetting}
          onChange={handleRingSettingChange}
          className="enigma-input text-center py-1"
        />
      </div>
    </div>
  );
}
