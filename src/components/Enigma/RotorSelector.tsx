import { useEnigma } from "./EnigmaContext";
import { cn } from "../../utils/cn";
import * as data from "../../data/constants";

const { ROTORS } = data;

export default function RotorSelector({ index }: { index: number }) {
    const { state, dispatch } = useEnigma();

    const handleRotorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newSettings = [...state.rotorSettings];
        newSettings[index].rotor = e.target.value;
        dispatch({ type: "SET_ROTOR_SETTINGS", payload: newSettings });
    };

    const handleRingSettingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSettings = [...state.rotorSettings];
        newSettings[index].ringSetting = parseInt(e.target.value) % 26;
        dispatch({ type: "SET_ROTOR_SETTINGS", payload: newSettings });
    };

    return (
        <div className={cn("flex flex-1 gap-4 items-center border-2 border-gray-700 p-2")}>
            <select
                value={state.rotorSettings[index].rotor}
                onChange={handleRotorChange}
                className="p-2 rounded-sm h-full"
            >
                {Object.keys(ROTORS).map((rotor) => (
                    <option key={rotor} value={rotor}>
                        Rotor {rotor}
                    </option>
                ))}
            </select>

            <label className="w-4/5 flex flex-col gap-2">
                Ring:
                <input
                    type="number"
                    min="0"
                    max="25"
                    value={state.rotorSettings[index].ringSetting}
                    onChange={handleRingSettingChange}
                    className="px-1 border rounded-sm"
                />
            </label>
        </div>
    );
}
