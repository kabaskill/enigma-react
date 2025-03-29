import  { FunctionComponent, useState, useRef, ChangeEvent } from "react";
import KeyboardWrapper from "./KeyboardWrapper";

const SimpleKeyboard: FunctionComponent = () => {
  const [input, setInput] = useState("");
  const keyboard = useRef(null);

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>): void => {
    const input = event.target.value;
    setInput(input);
    keyboard.current.setInput(input);
  };

  return (
    <div className="text-black">
      <input
        value={input}
        placeholder={"Tap on the virtual keyboard to start"}
        onChange={e => onChangeInput(e)}
        className="text-white w-full p-2 border rounded-sm bg-gray-600 resize-none"
      />
      <KeyboardWrapper keyboardRef={keyboard} onChange={setInput} />
    </div>
  );
};

export default SimpleKeyboard;
