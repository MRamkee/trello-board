import React from "react";

import "./App.css";
import { TrelloBoardContainer } from "./components/BoardContainer";
import { NavHeader } from "./components/NavHeader";

function App() {
  return (
    <div className="App">
      <NavHeader />
      <div className="container-body">
        <TrelloBoardContainer />
      </div>
    </div>
  );
}

export default App;
