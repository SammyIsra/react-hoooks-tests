import React, { useEffect } from "react";
import { useRefresh, useMousePositionRef } from "../Utils/Hooks";
import SimpleList from "../Styles/SimpleList";

// The test in this file is to have a component that only opdates every so often
//  I wanted to test making using a useRef hook,
//  and manually updating using useState anf forcing a rerender every so often, as we needed to
//  Some hooks have been extracted to Utils/Hooks cus they may be used in more than one place

const MousePosition: React.FC = () => {
  const mouseLocation = useMousePositionRef();
  const refresh = useRefresh();

  useEffect(() => {
    const intervalId = setInterval(refresh, 1000);
    console.log("running this again??");
    return () => clearInterval(intervalId);
    // Disabling rule because we dont want to run this function again on every render.
    // Since the 'refresh' function is a new function at every run, the equality check would fail
    //  and the function would rerun
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SimpleList>
      X: {mouseLocation.client.x} Y: {mouseLocation.client.y}
    </SimpleList>
  );
};

export default React.memo(MousePosition);
