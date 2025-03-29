import {rotorSettings, setRotorSettings, updateRotor, removeRotor, getAvailableRotors} from "../../StateManager";

interface RotorSelectorProps {
  index: number;
}

export default function RotorSelector({index}: RotorSelectorProps) {
  const currentRotor = rotorSettings.value[index].rotor;
  // Get available rotors plus the currently selected one
  const availableRotors = getAvailableRotors(currentRotor);

  function handleRotorTypeChange(e: React.ChangeEvent<HTMLSelectElement>) {
    updateRotor(index, e.target.value);
  }

  function handleRingSettingChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newSettings = [...rotorSettings.value];
    newSettings[index].ringSetting = parseInt(e.target.value);
    setRotorSettings(newSettings);
  }

  function handleRemove() {
    removeRotor(index);
  }

  const rotorNumber = rotorSettings.value.length - index;

  return (
    <div className="enigma-rotor relative">
      <div className="text-center mb-1 flex justify-between items-center">
        <span className="enigma-label">Rotor {rotorNumber}</span>
        {rotorSettings.value.length > 1 && (
          <button onClick={handleRemove} className="text-red-500 hover:text-red-700 font-bold" title="Remove rotor">
            ✕
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
          value={rotorSettings.value[index].ringSetting}
          onChange={handleRingSettingChange}
          className="enigma-input text-center py-1"
        />
      </div>
    </div>
  );
}
