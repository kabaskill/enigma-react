import {ReactElement, useState} from "react";
import {plugboardMapping, connectPlugboardPair, disconnectPlugboardLetter} from "../../StateManager";
import * as data from "../../data/constants";
import ModuleWrapper from "./ModuleWrapper";
import {cn} from "../../utils/cn";

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

  return (
    <ModuleWrapper modName="plugboard">
      <div className="text-xs text-center text-gray-500 mt-2">
        Click two letters to connect them. Double-click to disconnect.
      </div>
      <div className="flex flex-wrap justify-center mb-2 p-2 gap-2">
        {(() => {
          const displayedLetters = new Set<string>();
          const buttons: ReactElement[] = [];

          ALPHABET.split("").forEach((letter) => {
            if (displayedLetters.has(letter)) return;

            const mapping = plugboardMapping.value;
            const pairedLetter = mapping[letter];
            const isPaired = pairedLetter !== letter;

            if (isPaired) {
              displayedLetters.add(letter);
              displayedLetters.add(pairedLetter);

              buttons.push(
                <button
                  key={`${letter}-${pairedLetter}`}
                  onClick={() => handleLetterClick(letter)}
                  onDoubleClick={() => handleDoubleClick(letter)}
                  className={cn(
                    "px-3 py-2 min-w-[3.5rem] cursor-pointer",
                    "flex items-center justify-center ",
                    "bg-indigo-500 text-white font-medium",
                    "border border-transparent rounded-lg",
                    "transition-all duration-200 shadow-sm"
                  )}
                >
                  {letter}
                  <span className="mx-0.5 text-indigo-200">{` = `}</span>
                  {pairedLetter}
                </button>
              );
            } else {
              buttons.push(
                <button
                  key={letter}
                  onClick={() => handleLetterClick(letter)}
                  onDoubleClick={() => handleDoubleClick(letter)}
                  className={cn(
                    "w-10 h-10 cursor-pointer",
                    "flex items-center justify-center ",
                    "border border-transparent rounded-lg",
                    "transition-all duration-200",

                    selectedLetter === letter
                      ? "bg-yellow-300 text-yellow-800 scale-105 shadow-md"
                      : "bg-zinc-700 text-white hover:bg-zinc-600"
                  )}
                >
                  {letter}
                </button>
              );
            }
          });

          return buttons;
        })()}
      </div>
    </ModuleWrapper>
  );
}
