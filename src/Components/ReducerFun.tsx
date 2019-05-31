import React, { useReducer, useEffect } from "react";
import SimpleList from "../Styles/SimpleList";
import { makeGet, RequestReducer } from "../Services/request";
import { Post } from "../Utils/Types";

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
      <AsyncReducerLoading />
    </SimpleList>
  );
};

/** Reducer that handles loading states of an async request to get a post */
const LoadingPostReducer: RequestReducer<Post> = (prevState, action) => {
  if (prevState.status === "ready") {
    if (action.actionType === "start") {
      return { status: "loading" };
    }
  } else if (prevState.status === "loading") {
    if (action.actionType === "finish") {
      return { status: "success", payload: action.payload };
    }
  }
  return prevState;
};

const AsyncReducerLoading: React.FC<{}> = () => {
  const [requestState, requestDispatch] = useReducer(LoadingPostReducer, {
    status: "ready",
    payload: undefined
  });

  useEffect(() => {
    requestDispatch({ actionType: "start" });

    // Start request
    makeGet<Post>("https://jsonplaceholder.typicode.com/posts/5", {
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      // Mark request as successful, and store result
      .then(body => requestDispatch({ actionType: "finish", payload: body }))

      // Mark request as error
      .catch(err => {
        requestDispatch({ actionType: "error" });
        console.error(err);
      });
  }, []);

  return (
    <SimpleList>
      <div>Request Status: {requestState.status}</div>
      <div>Payload: {requestState.payload && requestState.payload.title}</div>
    </SimpleList>
  );
};

export default ReducerFun;
