import React from "react";

import "./App.css";
import UserExample from "./components/UserExample";

function helloworld() {
  alert("helloworld");
}

function App() {
  return (
    <div className="App">
      <UserExample />
    </div>
  );
}

export default App;
