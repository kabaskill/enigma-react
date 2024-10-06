import { EnigmaProvider } from "./EnigmaContext";
import EnigmaComponent from "./EnigmaComponent";

export default function Enigma() {
    return (
        <EnigmaProvider>
            <EnigmaComponent />
        </EnigmaProvider>
    );
}
