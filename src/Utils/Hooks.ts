import { useState, useRef, useEffect, useReducer } from "react";
import { asyncReducer, makeGet } from "../Services/request";

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
 * Returns an object with the value of the X and Y mouse location on the screen and the client.
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

/** Shortcut hook to have a reducer that is more easy to use for async events */
export function useAsyncReducer<T>() {
  const reducer = useReducer(asyncReducer<T>(), {
    status: "ready",
    payload: undefined
  });
  return reducer;
}

/**
 * Handles performing a fetch call and handling dispathing the correct actions, while exposing only the status and payload of the request
 * @param url URL that the request will be made to
 * @param dependencies List of dependencies that useEffect will depend on. Treat is as the second argument of useEffect
 */
export function useFetch<PayloadType>(
  url: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dependencies: readonly (number | string)[] = []
) {
  const [state, dispatch] = useAsyncReducer<PayloadType>();

  useEffect(() => {
    console.log("Running the useEffect inside of useFetch");
    dispatch({ actionType: "start" });

    // Start request
    makeGet<PayloadType>(url, {
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      // Mark request as successful, and store result
      .then(body => dispatch({ actionType: "finish", payload: body }))

      // Mark request as error
      .catch(err => {
        dispatch({ actionType: "error" });
        console.error(err);
      });
  }, [
    dispatch,
    url,
    // I have to disable this rule because I am supposed to trust the array from the arguments.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ...dependencies
  ]);

  return state;
}
