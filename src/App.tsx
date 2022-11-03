import React from "react";

import "./App.css";
import { DragAndDrop } from "./components/DragAndDrop";
import { Title } from "./components/Title";

function App() {
  return (
    <div className="App">
      <Title />
      <DragAndDrop />
    </div>
  );
}

export default App;
