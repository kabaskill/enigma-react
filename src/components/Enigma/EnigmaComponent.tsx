import {useEffect, useRef} from "react";
import {useEnigma} from "./EnigmaContext";
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
  const {state, dispatch} = useEnigma();
  const {input, output, rotorSettings, plugboard} = state;
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function processChar(char: string) {
    if (ALPHABET.includes(char)) {
      const cipheredChar = char === " " ? " " : cipher(char, rotorSettings, plugboard);
      const newInput = input + char;
      const newOutput = output + cipheredChar;
      dispatch({type: "SET_INPUT", payload: newInput});
      dispatch({type: "SET_OUTPUT", payload: newOutput});
      dispatch({type: "SET_ACTIVE_LAMP", payload: cipheredChar.toUpperCase()});

      // Step rotors
      const newSettings = [...rotorSettings];
      newSettings[0].ringSetting = (newSettings[0].ringSetting + 1) % 26;
      if (newSettings[0].ringSetting === 0) {
        newSettings[1].ringSetting = (newSettings[1].ringSetting + 1) % 26;
        if (newSettings[1].ringSetting === 0) {
          newSettings[2].ringSetting = (newSettings[2].ringSetting + 1) % 26;
        }
      }
      dispatch({type: "SET_ROTOR_SETTINGS", payload: newSettings});
    }
  }

  function handleInputChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const newInput = event.target.value;
    if (newInput.length > input.length) {
      const lastChar = newInput.slice(-1).toUpperCase();
      processChar(lastChar);
    } else {
      dispatch({type: "SET_INPUT", payload: newInput});
    }
  }

  function handleButtonPress(char: string) {
    processChar(char.toUpperCase());
    textareaRef.current?.focus();
  }

  useEffect(() => {
    function handleKeyUp() {
      dispatch({type: "SET_ACTIVE_LAMP", payload: null});
    };

    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [dispatch]);

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
              value={input}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div className="size-full">
          <h2 className="font-bold mb-2">Output:</h2>
          <p className="p-2 border rounded-sm bg-gray-600 min-h-[100px] overflow-auto text-wrap">{output}</p>
        </div>
      </div>
    </section>
  );
}
