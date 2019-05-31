import React, { useState } from "react";
import styled from "styled-components";

import "./App.css";
import MousePosition from "./MousePosition";
import ComponentDidDoSomething from "./ComponentDidDoSomething";
import SimpleUseReducer from "./SimpleUseReducer";
import AsyncLoadingUseState from "./AsyncLoadingUseState";
import AsyncLoadingUseReducer from "./AsyncLoadingUseReducer";

import { SimpleBorderedList } from "../Styles/BasicStyles";

const App: React.FC = () => {
  const [showComponentDidMount, updateShower] = useState(true);
  return (
    <AppBody>
      <SimpleBorderedList>
        <MousePosition />

        <button onClick={() => updateShower(!showComponentDidMount)}>
          Hide/Close the ComponentDidSomething component
        </button>
        {showComponentDidMount && <ComponentDidDoSomething />}

        <SimpleUseReducer />
        <AsyncLoadingUseState />
        <AsyncLoadingUseReducer />
      </SimpleBorderedList>
    </AppBody>
  );
};

const AppBody = styled.div`
  width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

export default App;
