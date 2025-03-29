import {rotorSettings, setRotorSettings} from "../../StateManager";
import {ROTORS} from "../../data/constants";

interface RotorSelectorProps {
  index: number;
}

export default function RotorSelector({index}: RotorSelectorProps) {
  function handleRotorTypeChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newSettings = [...rotorSettings.value];
    newSettings[index].rotor = e.target.value;
    setRotorSettings(newSettings);
  }

  function handleRingSettingChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newSettings = [...rotorSettings.value];
    newSettings[index].ringSetting = parseInt(e.target.value);
    setRotorSettings(newSettings);
  }

  return (
    <div className="enigma-rotor w-28">
      <div className="text-center mb-1">
        <span className="enigma-label">Rotor {3 - index}</span>
      </div>
      
      <select
        value={rotorSettings.value[index].rotor}
        onChange={handleRotorTypeChange}
        className="enigma-input w-full text-center mb-3 py-1"
      >
        {Object.keys(ROTORS).map((rotorType) => (
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
          className="enigma-input w-12 text-center py-1"
        />
      </div>
    </div>
  );
}