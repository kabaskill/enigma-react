// Keyboard.tsx
import { useEnigma } from "./EnigmaContext";
import { cn } from "../../utils/cn";
import * as data from "../../data/constants";

const { KEYBOARD } = data;

interface KeyboardProps {
    onButtonPress: (char: string) => void;
}

export default function Keyboard({ onButtonPress }: KeyboardProps) {
    const { dispatch } = useEnigma();

    const Button = ({ char }: { char: string }) => (
        <button
            className={cn(
                "w-12 h-12 m-1 rounded-full bg-gray-600",
                "hover:bg-gray-400 focus:outline-hidden",
                "border-2 border-white"
            )}
            onMouseDown={() => onButtonPress(char)}
            onMouseUp={() => dispatch({ type: "SET_ACTIVE_LAMP", payload: null })}
            onMouseLeave={() => dispatch({ type: "SET_ACTIVE_LAMP", payload: null })}
        >
            {char}
        </button>
    );

    return (
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
                    "hover:bg-gray-400 focus:outline-hidden",
                    "border-2 border-white"
                )}
                onMouseDown={() => onButtonPress(" ")}
            >
                SPACE
            </button>
        </div>
    );
}
