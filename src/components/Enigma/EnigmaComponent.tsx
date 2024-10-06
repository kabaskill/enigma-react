import { useCallback, useEffect, useRef } from "react";
import { useEnigma } from "./EnigmaContext";
import { cn } from "../../utils/cn";
import * as data from "../../data/constants";
import { cipher } from "./enigmaHelpers";
import RotorSelector from "./RotorSelector";
import Lampboard from "./Lampboard";
import Keyboard from "./Keyboard";
import Plugboard from "./Plugboard";
import Controls from "./Controls";

const { ALPHABET } = data;

export default function EnigmaComponent() {
    const { state, dispatch } = useEnigma();
    const { input, output, rotorSettings, plugboard } = state;
    const pressedKeys = useRef(new Set<string>());

    const handleButtonPress = useCallback(
        (char: string): void => {
            if (ALPHABET.includes(char)) {
                const cipheredChar = char === " " ? " " : cipher(char, rotorSettings, plugboard);
                const newInput = input + char;
                const newOutput = output + cipheredChar;
                dispatch({ type: "SET_INPUT", payload: newInput });
                dispatch({ type: "SET_OUTPUT", payload: newOutput });
                dispatch({ type: "SET_ACTIVE_LAMP", payload: cipheredChar.toUpperCase() });

                // Step rotors
                const newSettings = [...rotorSettings];
                newSettings[0].ringSetting = (newSettings[0].ringSetting + 1) % 26;
                if (newSettings[0].ringSetting === 0) {
                    newSettings[1].ringSetting = (newSettings[1].ringSetting + 1) % 26;
                    if (newSettings[1].ringSetting === 0) {
                        newSettings[2].ringSetting = (newSettings[2].ringSetting + 1) % 26;
                    }
                }
                dispatch({ type: "SET_ROTOR_SETTINGS", payload: newSettings });

                pressedKeys.current.add(char);
            }
        },
        [input, output, rotorSettings, plugboard, dispatch]
    );

    // KEYBOARD FUNCTIONALITY
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const char = event.key.toUpperCase();
            if (ALPHABET.includes(char)) {
                handleButtonPress(char);
            }
        };

        const handleKeyUp = (event: KeyboardEvent) => {
            const char = event.key.toUpperCase();
            if (ALPHABET.includes(char)) {
                pressedKeys.current.delete(char);
            }
            dispatch({ type: "SET_ACTIVE_LAMP", payload: null });
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, [dispatch, handleButtonPress]);

    return (
        <section className={cn("grid grid-cols-3 gap-4")}>
            {/* Left column */}
            <div className="col-span-2">
                <div className="flex justify-center gap-2 mb-4 mt-4">
                    <RotorSelector index={2} />
                    <RotorSelector index={1} />
                    <RotorSelector index={0} />
                </div>
                <Lampboard />
                <Keyboard onButtonPress={handleButtonPress} />
                <Plugboard />
            </div>

            {/* Right column */}
            <div className="col-span-1 size-full p-2 flex flex-col justify-around">
                <Controls />
                <div className="size-full">
                    <h2 className="font-bold mb-2">Input:</h2>
                    <p className="p-2 border rounded bg-gray-600 min-h-[100px] overflow-auto text-wrap">
                        {input}
                    </p>
                </div>
                <div className="size-full">
                    <h2 className="font-bold mb-2">Output:</h2>
                    <p className="p-2 border rounded bg-gray-600 min-h-[100px] overflow-auto text-wrap">
                        {output}
                    </p>
                </div>
            </div>
        </section>
    );
}
