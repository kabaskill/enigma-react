import {useEffect, useRef} from "react";
import {input, output, setInput, setActiveLamp, processChar} from "../../StateManager";
import RotorSelector from "./RotorSelector";
import Lampboard from "./Lampboard";
import Plugboard from "./Plugboard";
import Controls from "./Controls";
import KeyboardToggle from "./KeyboardToggle";

export default function EnigmaComponent() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-8">
      {/* Left column */}
      <div className="lg:col-span-2 enigma-panel">
        <div className="flex flex-col items-center">
          <h2 className="enigma-header text-xl mb-6">Enigma M4</h2>
          
          <div className="flex justify-center gap-4 mb-8 mt-2">
            <RotorSelector index={2} />
            <RotorSelector index={1} />
            <RotorSelector index={0} />
          </div>
          
          <div className="w-full max-w-3xl mx-auto">
            <Lampboard />
            <KeyboardToggle onButtonPress={handleButtonPress} />
            <Plugboard />
          </div>
        </div>
      </div>

      {/* Right column */}
      <div className="enigma-panel flex flex-col gap-6">
        <Controls />
        
        <div className="space-y-2">
          <label htmlFor="input-area" className="enigma-label block">
            Input:
          </label>
          <textarea
            ref={textareaRef}
            name="input-area"
            id="input-area"
            className="enigma-input min-h-[120px] w-full resize-none font-mono"
            value={input.value}
            onChange={handleInputChange}
          />
        </div>
        
        <div className="space-y-2">
          <h2 className="enigma-label">Output:</h2>
          <div className="enigma-input min-h-[120px] overflow-auto text-wrap font-mono">{output.value}</div>
        </div>
      </div>
    </section>
  );
}
