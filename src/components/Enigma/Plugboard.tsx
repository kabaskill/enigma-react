import {plugboard, setPlugboard} from "../../StateManager";
import * as data from "../../data/constants";

const {ALPHABET} = data;

export default function Plugboard() {
  const handlePlugboardChange = (index: number, field: "from" | "to", value: string) => {
    const newPlugboard = [...plugboard.value];

    if (!newPlugboard[index]) {
      newPlugboard[index] = {from: "", to: ""};
    }
    newPlugboard[index] = {...newPlugboard[index], [field]: value};
    setPlugboard(newPlugboard);
  };

  return (
    <div className="mt-4">
      <h2 className="font-bold mb-2">Plugboard</h2>
      <div className="flex flex-wrap justify-center mb-2 p-2 gap-2">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="flex justify-center p-2">
            <select
              value={plugboard.value[i]?.from || ""}
              onChange={(e) => handlePlugboardChange(i, "from", e.target.value)}
              className="mr-2 p-1 border rounded-sm"
            >
              <option value="">-</option>
              {ALPHABET.split("").map((char) => (
                <option key={char} value={char}>
                  {char}
                </option>
              ))}
            </select>
            <select
              value={plugboard.value[i]?.to || ""}
              onChange={(e) => handlePlugboardChange(i, "to", e.target.value)}
              className="ml-2 p-1 border rounded-sm"
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
}
