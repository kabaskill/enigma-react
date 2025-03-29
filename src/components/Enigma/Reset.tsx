import {reset} from "../../StateManager";

export default function Reset() {
  return (
    <div className="flex flex-col gap-2 mb-4">
      <button onClick={reset} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded">
        Reset Machine
      </button>
    </div>
  );
}
