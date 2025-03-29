import {useEffect, useRef} from "react";
import {
  input,
  output,
  rotorSettings,
  plugboard,
  setInput,
  setOutput,
  setActiveLamp,
  setRotorSettings,
} from "../../StateManager";
import {cn} from "../../utils/cn";
import * as data from "../../data/constants";
import {cipher} from "./enigmaHelpers";
import RotorSelector from "./RotorSelector";
import Lampboard from "./Lampboard";
import Keyboard from "./Keyboard";
import Plugboard from "./Plugboard";
import Controls from "./Controls";

const {ALPHABET} = data;

export default function EnigmaComponent() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function processChar(char: string) {
    if (ALPHABET.includes(char) || char === " ") {
      const cipheredChar = char === " " ? " " : cipher(char, rotorSettings.value, plugboard.value);
      const newInput = input.value + char;
      const newOutput = output.value + cipheredChar;
      setInput(newInput);
      setOutput(newOutput);
      setActiveLamp(cipheredChar.toUpperCase());

      if (char !== " ") {
        const newSettings = [...rotorSettings.value];
        newSettings[0].ringSetting = (newSettings[0].ringSetting + 1) % 26;
        if (newSettings[0].ringSetting === 0) {
          newSettings[1].ringSetting = (newSettings[1].ringSetting + 1) % 26;
          if (newSettings[1].ringSetting === 0) {
            newSettings[2].ringSetting = (newSettings[2].ringSetting + 1) % 26;
          }
        }
        setRotorSettings(newSettings);
      }
    }
  }

  function handleInputChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const newInput = event.target.value;
    if (newInput.length > input.value.length) {
      const lastChar = newInput.slice(-1).toUpperCase();
      processChar(lastChar);
    } else {
      setInput(newInput);
    }
  }

  function handleButtonPress(char: string) {
    processChar(char.toUpperCase());
    textareaRef.current?.focus();
  }

  useEffect(() => {
    function handleKeyUp() {
      setActiveLamp(null);
    }

    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

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
          <label htmlFor="input-area" className="font-bold mb-2">
            Input:
            <textarea
              ref={textareaRef}
              name="input-area"
              id="input-area"
              className="p-2 border rounded-sm bg-gray-600 min-h-[100px] w-full resize-none"
              value={input.value}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div className="size-full">
          <h2 className="font-bold mb-2">Output:</h2>
          <p className="p-2 border rounded-sm bg-gray-600 min-h-[100px] overflow-auto text-wrap">{output.value}</p>
        </div>
      </div>
    </section>
  );
}
