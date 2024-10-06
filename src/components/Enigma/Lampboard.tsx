import { useEnigma } from "./EnigmaContext";
import * as data from "../../data/constants";

const { KEYBOARD } = data;

export default function Lampboard() {
    const { state } = useEnigma();

    const Lamp = ({ char }: { char: string }) => (
        <div
            className={`w-12 h-12 m-1 rounded-full flex items-center justify-center
            ${
                state.activeLamp === char
                    ? "bg-yellow-500 shadow-lg shadow-yellow-300"
                    : "bg-gray-900"
            }`}
        >
            {char}
        </div>
    );

    return (
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
    );
}
