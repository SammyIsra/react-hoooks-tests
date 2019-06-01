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

export function useFetch<T>(url: string, dependencies: any[] = []) {
  const [state, dispatch] = useAsyncReducer<T>();

  useEffect(() => {
    console.log("Running the useEffect inside of useFetch");
    dispatch({ actionType: "start" });

    // Start request
    makeGet<T>(url, {
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
    // I dont know WHY it forces me to have 'dispatch' as a dependency, it doesn't have a problem with it in the AsyncLoadingUseReducer useEffect!!
  }, [
    dispatch,
    url,
    // I have to disable this rule because I am supposed to trust the array from the arguments
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ...dependencies
  ]);

  return state;
}
