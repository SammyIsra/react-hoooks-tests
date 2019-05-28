import React, { useReducer } from "react";
import SimpleList from "../Styles/SimpleList";

type CounterReducerStates = "advance" | "go back";
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

type AdvancedStreetLightStates = "green" | "yellow" | "red";
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
    <SimpleList>
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
    </SimpleList>
  );
};

export default ReducerFun;
