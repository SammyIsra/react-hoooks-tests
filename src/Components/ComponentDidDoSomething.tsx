// In this file I wanted to test with how useEffect functions behave when determining when to run, etc

import React, { useEffect, useRef, useState } from "react";
import { useRefresh } from "../Utils/Hooks";
import SimpleList from "../Styles/SimpleList";

export const ComponentDidDoSomething: React.FC = () => {
  const counters = useRef({ mounted: 0, refreshed: 0, buttonClicked: 0 });
  const [clicked, updateClick] = useState(0);

  const refresh = useRefresh();

  // Behaves as componentDidMount (aka, only once when the component mounts)
  useEffect(() => {
    counters.current.mounted++;
    console.log("Running 'componentDidMount'");
    return () => console.log("Clearing up useEffect1");
  }, []);

  // Behaves as componentDidUpdate
  useEffect(() => {
    counters.current.refreshed++;
    console.log("Running 'componentDidUpdate'");
    return () => console.log("Clearing up useEffect2");
  });

  // Runs only when componentDidUpdate AND a specific value has changed
  //  In this scenario this is entirely useless since the value of clicked is more accurate than counters.current.buttonClicked
  //  but i just want to show how useEffect decides when to run, which is when we change the value of 'clicked'
  useEffect(() => {
    counters.current.buttonClicked++;
    console.log("Running the specific updater");
    return () => console.log("Clearing up useEffect3");
  }, [clicked]);

  // Runs like componentDidUnmount.
  //  The way it does this is by running as componentDidMount, and returning a function that will run when the component unmounts
  // Every method that is returned from a callback passed to a useEffect, will run when the component unmounts
  useEffect(() => () => console.log("Running as 'componentDidUnmount'"), []);

  // Run this every time that we rerender
  console.log("Re-rendering");

  return (
    <SimpleList>
      <div>Mounted: {counters.current.mounted}</div>
      <div>Refreshed: {counters.current.refreshed}</div>
      <div>Clicked: {counters.current.buttonClicked}</div>
      <button onClick={() => updateClick(clicked + 1)}>Increase Clicker</button>
      <button onClick={() => refresh()}>Force update</button>
    </SimpleList>
  );
};
