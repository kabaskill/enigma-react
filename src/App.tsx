import {useSignals} from "@preact/signals-react/runtime";
import EnigmaComponent from "./components/Enigma/EnigmaComponent";
import Footer from "./components/Footer";
import Header from "./components/Header";

export default function App() {
  useSignals();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container max-w-6xl mx-auto px-4 flex-grow">
        <p className="text-lg text-amber-100/80 max-w-3xl mx-auto text-center mb-6">
          This is a recreation of the famous Enigma machine used during World War II. The default version stays true to
          the original, while the Extended Mode offers additional modern features.
        </p>
        <EnigmaComponent />
      </main>
      <Footer />
    </div>
  );
}
