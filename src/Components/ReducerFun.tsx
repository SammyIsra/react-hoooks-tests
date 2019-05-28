import React, { useReducer } from "react";
import SimpleList from "../Styles/SimpleList";

type reducerStates = "advance" | "go back";

const componentReducer: React.Reducer<number, reducerStates> = (
  prevState,
  action
) => {
  switch (action) {
    case "advance":
      return prevState + 1;
    case "go back":
      return prevState - 1;
  }
};

const ReducerFun = () => {
  const [state, dispatch] = useReducer(componentReducer, 0);

  return (
    <SimpleList>
      <div>Clicked {state} times!</div>
      <button onClick={() => dispatch("advance")}>Increase</button>
      <button onClick={() => dispatch("go back")}>Go back</button>
    </SimpleList>
  );
};

export default ReducerFun;
