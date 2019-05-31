export function makeGet<T>(
  url: string,
  options: RequestInit,
  typeGuard?: (x: unknown) => x is T
) {
  return fetch(url, { ...options, method: "GET" })
    .then(resp => resp.json())
    .then(resp => {
      if (typeGuard === undefined || typeGuard(resp)) {
        return resp as T;
      } else {
        throw new Error("Response is not of the expected type");
      }
    });
}

interface ReadyFetchRequest {
  status: "ready";
  payload?: undefined;
}

interface LoadingFetchRequest {
  status: "loading";
  payload?: undefined;
}

interface ErrorFetchRequest {
  status: "error";
  payload?: undefined;
}

interface SuccessFetchRequest<T> {
  status: "success";
  payload: T;
}
export type FetchRequest<T> =
  | ReadyFetchRequest
  | LoadingFetchRequest
  | ErrorFetchRequest
  | SuccessFetchRequest<T>;

interface StartAction {
  actionType: "start";
}
interface ErrorAction {
  actionType: "error";
}
interface FinishAction<T> {
  actionType: "finish";
  payload: T;
}

/** Uses the React Reducer type to provide a type that works with async calls, which can be used for useReducer */
export type RequestReducer<T> = React.Reducer<
  FetchRequest<T>,
  StartAction | ErrorAction | FinishAction<T>
>;

/** Function that returns a Reducer that handles async calls by assinging them a state */
export const requestReducer: <T>() => RequestReducer<T> = () => (
  prevState,
  action
) => {
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
