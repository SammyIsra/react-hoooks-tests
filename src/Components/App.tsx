import React, { useState } from "react";

import "./App.css";
import MousePosition from "./MousePosition";
import { ComponentDidDoSomething } from "./ComponentDidDoSomething";
import { SimpleBorderedList } from "../Styles/BasicStyles";
import SimpleUseReducer from "./SimpleUseReducer";
import AsyncLoadingUseState from "./AsyncLoadingUseState";
import AsyncLoadingUseReducer from "./AsyncLoadingUseReducer";

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
      <SimpleBorderedList>
        <button onClick={() => updateMousePositionShower(!showMousePosition)}>
          Hide/Close the MousePosition component
        </button>
        {showMousePosition && <MousePosition />}

        <button onClick={() => updateShower(!showComponentDidMount)}>
          Hide/Close the ComponentDidSomething component
        </button>
        {showComponentDidMount && <ComponentDidDoSomething />}

        <SimpleUseReducer />

        <AsyncLoadingUseState />

        <AsyncLoadingUseReducer />
      </SimpleBorderedList>
    </div>
  );
};

export default App;
