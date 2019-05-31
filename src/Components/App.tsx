import React, { useState } from "react";

import "./App.css";
import MousePosition from "./MousePosition";
import { ComponentDidDoSomething } from "./ComponentDidDoSomething";
import SimpleList from "../Styles/SimpleList";
import ReducerFun from "./ReducerFun";
import AsyncLoading from "./AsyncLoading";
import { AsyncReducerLoading } from "./AsyncReducerLoading";

const App: React.FC = () => {
  const [showComponentDidMount, updateShower] = useState(true);
  const [showMousePosition, updateMousePositionShower] = useState(true);
  return (
    <div
      style={{
        width: "800px",
        marginLeft: "auto",
        marginRight: "auto"
      }}
    >
      <SimpleList>
        <button onClick={() => updateMousePositionShower(!showMousePosition)}>
          Hide/Close the MousePosition component
        </button>
        {showMousePosition && <MousePosition />}

        <button onClick={() => updateShower(!showComponentDidMount)}>
          Hide/Close the ComponentDidSomething component
        </button>
        {showComponentDidMount && <ComponentDidDoSomething />}

        <ReducerFun />

        <AsyncLoading />

        <AsyncReducerLoading />
      </SimpleList>
    </div>
  );
};

export default App;
