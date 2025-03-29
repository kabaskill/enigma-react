import {useState} from "react";
import Keyboard from "./Keyboard";
import SimpleKeyboard from "../SimpleKeyboard/SimpleKeyboard";
import {processChar} from "../../StateManager";
import ModuleWrapper from "./ModuleWrapper";

interface KeyboardToggleProps {
  onButtonPress: (char: string) => void;
}

export default function KeyboardToggle({onButtonPress}: KeyboardToggleProps) {
  const [useSimpleKeyboard, setUseSimpleKeyboard] = useState(false);

  const handleKeyboardChange = () => {
    setUseSimpleKeyboard(!useSimpleKeyboard);
  };

  const handleSimpleKeyboardInput = (input: string) => {
    if (input.length > 0) {
      const lastChar = input.slice(-1).toUpperCase();
      processChar(lastChar);
    }
  };

  return (
    <ModuleWrapper modName="keyboard">
      <div className="flex justify-end mb-2">
        <button
          onClick={handleKeyboardChange}
          className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm"
        >
          Switch to {useSimpleKeyboard ? "Traditional" : "Simple"} Keyboard
        </button>
      </div>

      {useSimpleKeyboard ? (
        <SimpleKeyboard onKeyPress={handleSimpleKeyboardInput} />
      ) : (
        <Keyboard onButtonPress={onButtonPress} />
      )}
    </ModuleWrapper>
  );
}
