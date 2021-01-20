import React from "react";
import "./App.css";

import UserExample from "./components/UserExample";
import LoginTest from "./components/LoginTest";

function App() {
  return (
    <div className="App">
      <div>
        <UserExample />
      </div>
      <div>
        <LoginTest />
      </div>
    </div>
  );
}

export default App;
