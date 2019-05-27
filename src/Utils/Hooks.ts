import { useState, useRef, useEffect } from "react";

/** Function that when called, forces a re-render of the application */
type RefreshFunction = () => void;

/**
 * Returns a function that forces a component refresh.
 * Intended to be used to update ref values.
 */
export function useRefresh(): RefreshFunction {
  const [, update] = useState(0);

  return () => update(Math.random());
}

interface Coordinates {
  x: number;
  y: number;
}

export interface MouseLocation {
  client: Coordinates;
  screen: Coordinates;
}

/**
 * Returns an object with the value ofthe X and Y mouse location on the screen and the client.
 * The object works as a ref object, so it will not update the React Component and its changes will only be reflected on component update
 */
export function useMousePositionRef() {
  const location = useRef<MouseLocation>({
    client: { x: 0, y: 0 },
    screen: { x: 0, y: 0 }
  });

  function mouseMovesHandler(event: MouseEvent) {
    location.current.client.x = event.clientX;
    location.current.client.y = event.clientY;
    location.current.screen.x = event.screenX;
    location.current.screen.y = event.screenY;
  }

  document.addEventListener("mousemove", mouseMovesHandler);

  useEffect(
    () => () => {
      console.log("Unsubscribing event listener");
      document.removeEventListener("mousemove", mouseMovesHandler);
    },
    []
  );

  return location.current;
}
