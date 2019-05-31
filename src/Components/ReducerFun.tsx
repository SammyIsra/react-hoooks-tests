import React, { useReducer } from "react";
import { SimpleBorderedList } from "../Styles/BasicStyles";

type CounterReducerStates = "advance" | "go back";

/** Reducer that determines the number of clicks given the prevState */
const counterReducer: React.Reducer<number, CounterReducerStates> = (
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

type StreetLightStates = "green" | "yellow" | "red";

/** Reducer that uses only the prevState to determine the next state, since it only has one track */
const streetLightReducer: React.Reducer<StreetLightStates, void> = (
  prevState,
  action
) => {
  switch (prevState) {
    case "green":
      return "yellow";
    case "yellow":
      return "red";
    case "red":
      return "green";
  }
};

/** Reducer that considers previous state and action to determine the enxt state (tho it only goes in one direction) */
const advancedStreetLightReducer: React.Reducer<
  StreetLightStates,
  StreetLightStates
> = (prevState, action) => {
  switch (prevState) {
    case "green":
      return action === "yellow" ? action : prevState;
    case "yellow":
      return action === "red" ? action : prevState;
    case "red":
      return action === "green" ? action : prevState;
  }
};

const ReducerFun = () => {
  const [clickedCounter, dispatchCounter] = useReducer(counterReducer, 0);
  const [light, dispatchLight] = useReducer(streetLightReducer, "red");
  const [aLight, aDispatchLight] = useReducer(
    advancedStreetLightReducer,
    "red"
  );

  return (
    <SimpleBorderedList>
      <div>Clicked {clickedCounter} times!</div>
      <button onClick={() => dispatchCounter("advance")}>Increase</button>
      <button onClick={() => dispatchCounter("go back")}>Go back</button>
      <br />
      <div>Current light: {light}</div>
      <button onClick={() => dispatchLight()}>Move forward</button>
      <br />
      <div>Current advanced light: {aLight}</div>
      <button onClick={() => aDispatchLight("green")}>Go Green</button>
      <button onClick={() => aDispatchLight("yellow")}>Go Yellow</button>
      <button onClick={() => aDispatchLight("red")}>Go Red</button>
    </SimpleBorderedList>
  );
};

export default ReducerFun;
