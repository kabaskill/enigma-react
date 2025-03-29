import { useSignals } from "@preact/signals-react/runtime";
import EnigmaComponent from "./components/Enigma/EnigmaComponent";
import Footer from "./components/Footer";
import Header from "./components/Header";
import {cn} from "./utils/cn";

function App() {
  useSignals();
  
  return (
    <>
      <Header />
      <main className={cn("p-4 max-w-6xl mx-auto")}>
        <p className="text-lg">
          This is a recreation of the famous Enigma machine. While the default version is true to the source, Extended
          Mode more complex features.
        </p>
        <EnigmaComponent />
        {/* <MyComponent /> */}
      </main>
      <Footer />
    </>
  );
}

export default App;
