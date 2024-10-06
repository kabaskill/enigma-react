import { useState } from "react";
import { cn } from "../utils/cn";
import { RotorSetting, PlugboardPair } from "../data/types";
import * as data from "../data/constants";

export default function Enigma() {
    const { ALPHABET, KEYBOARD, ROTORS, REFLECTOR } = data;

    const [input, setInput] = useState<string>("");
    const [output, setOutput] = useState<string>("");
    const [rotorSettings, setRotorSettings] = useState<RotorSetting[]>([
        { rotor: "I", ringSetting: 0 },
        { rotor: "II", ringSetting: 0 },
        { rotor: "III", ringSetting: 0 },
    ]);

    const [plugboard, setPlugboard] = useState<PlugboardPair[]>([]);
    const [activeLamp, setActiveLamp] = useState<string | null>(null);
    const [extendedMode, setExtendedMode] = useState<boolean>(false);

    const reset = () => {
        setInput("");
        setOutput("");
        setRotorSettings([
            { rotor: "I", ringSetting: 0 },
            { rotor: "II", ringSetting: 0 },
            { rotor: "III", ringSetting: 0 },
        ]);
        setPlugboard([]);
        setActiveLamp(null);
    };

    const applyPlugboard = (char: string): string => {
        const pair = plugboard.find((p) => p.from === char || p.to === char);
        return pair ? (pair.from === char ? pair.to : pair.from) : char;
    };

    const rotorPass = (
        char: string,
        rotor: string,
        ringSetting: number,
        reverse: boolean = false
    ): string => {
        let index = ALPHABET.indexOf(char);
        index = (index + ringSetting + 26) % 26;

        if (reverse) {
            index = ROTORS[rotor].indexOf(ALPHABET[index]);
        } else {
            index = ALPHABET.indexOf(ROTORS[rotor][index]);
        }

        index = (index - ringSetting + 26) % 26;
        return ALPHABET[index];
    };

    const cipher = (char: string): string => {
        char = char.toUpperCase();
        char = applyPlugboard(char);

        // Step rotors
        const newSettings = [...rotorSettings];
        newSettings[0].ringSetting = (newSettings[0].ringSetting + 1) % 26;
        if (newSettings[0].ringSetting === 0) {
            newSettings[1].ringSetting = (newSettings[1].ringSetting + 1) % 26;
            if (newSettings[1].ringSetting === 0) {
                newSettings[2].ringSetting = (newSettings[2].ringSetting + 1) % 26;
            }
        }
        setRotorSettings(newSettings);

        // Forward pass through rotors
        for (let i = 0; i < 3; i++) {
            char = rotorPass(char, newSettings[i].rotor, newSettings[i].ringSetting);
        }

        // Reflector
        char = REFLECTOR[ALPHABET.indexOf(char)];

        // Backward pass through rotors
        for (let i = 2; i >= 0; i--) {
            char = rotorPass(char, newSettings[i].rotor, newSettings[i].ringSetting, true);
        }

        return applyPlugboard(char);
    };

    const handleButtonPress = (char: string): void => {
        const cipheredChar = char === " " ? " " : cipher(char);
        const newInput = input + char;
        const newOutput = output + cipheredChar;
        setInput(newInput);
        setOutput(newOutput);
        setActiveLamp(cipheredChar.toUpperCase());
    };

    const Button = ({ char }: { char: string }) => (
        <button
            className={cn(
                "w-12 h-12 m-1 rounded-full bg-gray-600",
                "hover:bg-gray-400 focus:outline-none",
                "border-2 border-white"
            )}
            onMouseDown={() => handleButtonPress(char)}
            onMouseUp={() => setActiveLamp(null)}
            onMouseLeave={() => setActiveLamp(null)}
        >
            {char}
        </button>
    );

    const Lamp = ({ char }: { char: string }) => (
        <div
            className={`w-12 h-12 m-1 rounded-full flex items-center justify-center
                  ${
                      activeLamp === char
                          ? "bg-yellow-500 shadow-lg shadow-yellow-300"
                          : "bg-gray-900"
                  }`}
        >
            {char}
        </div>
    );

    const RotorSelector = ({ index }: { index: number }) => (
        <div className={cn("flex flex-1 gap-4 items-center border-2 border-gray-700 p-2")}>
            <select
                value={rotorSettings[index].rotor}
                onChange={(e) => {
                    const newSettings = [...rotorSettings];
                    newSettings[index].rotor = e.target.value;
                    setRotorSettings(newSettings);
                }}
                className="p-2  rounded h-full"
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
                    id={`rotor-${index}-ring`}
                    type="number"
                    min="0"
                    max="25"
                    value={rotorSettings[index].ringSetting}
                    onChange={(e) => {
                        const newSettings = [...rotorSettings];
                        newSettings[index].ringSetting = parseInt(e.target.value) % 26;
                        setRotorSettings(newSettings);
                    }}
                    className="px-1 border rounded"
                />
            </label>
        </div>
    );

    const Plugboard = () => (
        <div className="mt-4 ">
            <h2 className="font-bold mb-2">Plugboard</h2>

            <div className="flex flex-wrap justify-center mb-2 p-2 gap-2 ">
                {[...Array(10)].map((_, i) => (
                    <div key={i} className="flex justify-center p-2">
                        <select
                            value={plugboard[i]?.from || ""}
                            onChange={(e) => {
                                const newPlugboard = [...plugboard];
                                newPlugboard[i] = { ...newPlugboard[i], from: e.target.value };
                                setPlugboard(newPlugboard);
                            }}
                            className="mr-2 p-1 border rounded"
                        >
                            <option value="">-</option>
                            {ALPHABET.split("").map((char) => (
                                <option key={char} value={char}>
                                    {char}
                                </option>
                            ))}
                        </select>
                        <select
                            value={plugboard[i]?.to || ""}
                            onChange={(e) => {
                                const newPlugboard = [...plugboard];
                                newPlugboard[i] = { ...newPlugboard[i], to: e.target.value };
                                setPlugboard(newPlugboard);
                            }}
                            className="ml-2 p-1 border rounded"
                        >
                            <option value="">-</option>
                            {ALPHABET.split("").map((char) => (
                                <option key={char} value={char}>
                                    {char}
                                </option>
                            ))}
                        </select>
                    </div>
                ))}
            </div>
        </div>
    );

    const Controls = () => (
        <div className="flex justify-around items-center p-2">
            <label className="flex items-center">
                <input
                    type="checkbox"
                    checked={extendedMode}
                    onChange={(e) => setExtendedMode(e.target.checked)}
                    className="mr-2"
                />
                Extended Mode
            </label>

            <button
                onClick={reset}
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

    return (
        <section className="grid grid-cols-3 gap-4">
            {/* Left column */}
            <div className="col-span-2">
                <div className="flex justify-center gap-2 mb-4 mt-4">
                    <RotorSelector index={2} />
                    <RotorSelector index={1} />
                    <RotorSelector index={0} />
                </div>
                <div className="mb-4">
                    <h2 className="font-bold mb-2">Lampboard</h2>
                    <div className="flex flex-wrap justify-center">
                        {Object.keys(KEYBOARD).map((row) => (
                            <div key={row} className="flex">
                                {KEYBOARD[row].split("").map((char) => (
                                    <Lamp key={char} char={char} />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mb-4">
                    <h2 className="font-bold mb-2">Keyboard</h2>
                    <div className="flex flex-wrap justify-center">
                        {Object.keys(KEYBOARD).map((row) => (
                            <div key={row} className="flex">
                                {KEYBOARD[row].split("").map((char) => (
                                    <Button key={char} char={char} />
                                ))}
                            </div>
                        ))}
                    </div>
                    
                    <button
                        className={cn(
                            "w-24 h-12 m-1 rounded-full bg-gray-600",
                            "hover:bg-gray-400 focus:outline-none",
                            "border-2 border-white"
                        )}
                        onMouseDown={() => {
                            handleButtonPress(" ");
                        }}
                    >
                        SPACE
                    </button>
                </div>

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
