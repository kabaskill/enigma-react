import Enigma from "./components/Enigma";
import Footer from "./components/Footer";
import Header from "./components/Header";
import MyComponent from "./components/SimpleKeyboard/SimpleComponent";
import {cn} from "./utils/cn";

function App() {
  return (
    <>
      <Header />
      <main className={cn("p-4 max-w-6xl mx-auto")}>
        <p className="text-lg">
          This is a recreation of the famous Enigma machine. While the default version is true to the source, Extended
          Mode more complex features.
        </p>
        <Enigma />
        <MyComponent />
      </main>
      <Footer />
    </>
  );
}

export default App;
