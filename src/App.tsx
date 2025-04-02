import {useSignals} from "@preact/signals-react/runtime";
import EnigmaComponent from "./components/Enigma/EnigmaComponent";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ModernUI from "./components/ModernUI";
import { uiStyle } from "./StateManager";

export default function App() {
  useSignals();

  const modern = uiStyle.value === "modern";

  return (
    <>
    
    {modern ? 
      <ModernUI/> : 
     <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container max-w-6xl mx-auto px-4 flex-grow">
        <EnigmaComponent />
      </main>
      <Footer />
    </div>}
    </>
  );
}
