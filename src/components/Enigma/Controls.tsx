import { useEnigma } from "./EnigmaContext";
import { cn } from "../../utils/cn";

export default function Controls() {
    const { state, dispatch } = useEnigma();

    const handleExtendedModeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: "SET_EXTENDED_MODE", payload: e.target.checked });
    };

    const handleReset = () => {
        dispatch({ type: "RESET" });
    };

    return (
        <div className="flex justify-around items-center p-2">
            <label className="flex items-center">
                <input
                    type="checkbox"
                    checked={state.extendedMode}
                    onChange={handleExtendedModeChange}
                    className="mr-2"
                />
                Extended Mode
            </label>

            <button
                onClick={handleReset}
                className={cn(
                    "p-2 rounded-lg bg-gray-600",
                    "hover:bg-gray-400 focus:outline-none",
                    "border-2 border-white"
                )}
            >
                RESET
            </button>
        </div>
    );
}
