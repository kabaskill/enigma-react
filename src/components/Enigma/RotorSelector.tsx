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
    <div className="flex flex-col items-center">
      <label>
        Rotor {3 - index}:
        <select
          value={rotorSettings.value[index].rotor}
          onChange={handleRotorTypeChange}
          className="ml-2 p-1 bg-gray-700 border rounded"
        >
          {Object.keys(ROTORS).map((rotorType) => (
            <option key={rotorType} value={rotorType}>
              {rotorType}
            </option>
          ))}
        </select>
      </label>
      <label className="mt-2">
        Ring:
        <input
          type="number"
          min="0"
          max="25"
          value={rotorSettings.value[index].ringSetting}
          onChange={handleRingSettingChange}
          className="ml-2 p-1 w-16 bg-gray-700 border rounded"
        />
      </label>
    </div>
  );
}
