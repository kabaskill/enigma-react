import {useState} from "react";
import {plugboardMapping, connectPlugboardPair, disconnectPlugboardLetter} from "../../StateManager";
import * as data from "../../data/constants";
import ModuleWrapper from "./ModuleWrapper";

const {ALPHABET} = data;

export default function Plugboard() {
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);

  function handleLetterClick(letter: string) {
    if (!selectedLetter) {
      setSelectedLetter(letter);
    } else if (selectedLetter === letter) {
      setSelectedLetter(null);
    } else {
      connectPlugboardPair(selectedLetter, letter);
      setSelectedLetter(null);
    }
  }

  function handleDoubleClick(letter: string) {
    disconnectPlugboardLetter(letter);
  }

  // Get style for letter buttons
  function getButtonStyle(letter: string) {
    const mapping = plugboardMapping.value;

    if (selectedLetter === letter) {
      return "bg-yellow-300";
    }
    if (mapping[letter] !== letter) {
      return "bg-green-300";
    }
    return "bg-zinc-600";
  }

  return (
    <ModuleWrapper modName="plugboard">
      <div className="flex flex-wrap justify-center mb-2 p-2 gap-2">
        {ALPHABET.split("").map((letter) => (
          <button
            key={letter}
            onClick={() => handleLetterClick(letter)}
            onDoubleClick={() => handleDoubleClick(letter)}
            className={`w-10 h-10 flex items-center justify-center border rounded-md ${getButtonStyle(letter)}`}
          >
            {letter}
            {plugboardMapping.value[letter] !== letter && (
              <span className="text-xs ml-1">→{plugboardMapping.value[letter]}</span>
            )}
          </button>
        ))}
      </div>
      <div className="text-xs text-center text-gray-500 mt-2">
        Click two letters to connect them. Double-click to disconnect.
      </div>
    </ModuleWrapper>
  );
}
