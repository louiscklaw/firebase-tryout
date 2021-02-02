import logo from "./logo.svg";
import "./App.css";

import Helloworld from "src/components/Helloworld";
import AutoCompleteMultipleValuesExample from "src/components/AutoCompleteMultipleValuesExample";
import SelectExample from "src/components/SelectExample";

function App() {
  return (
    <div className="App">
      <div>helloworld</div>
      <Helloworld />
      <SelectExample />
      <AutoCompleteMultipleValuesExample />
    </div>
  );
}

export default App;
