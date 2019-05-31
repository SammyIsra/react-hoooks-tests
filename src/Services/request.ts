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

export type FetchRequest<T> =
  | ReadyFetchRequest
  | LoadingFetchRequest
  | ErrorFetchRequest
  | SuccessFetchRequest<T>;

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
export type RequestReducer<T> = React.Reducer<
  FetchRequest<T>,
  StartAction | ErrorAction | FinishAction<T>
>;

// export const requestReducer: RequestReducer<T> = <T>(
//   prevState,
//   { actionType, payload }
// ) => {
//   if (prevState.status === "ready") {
//     if (actionType === "start") {
//       return { status: "loading" };
//     }
//   } else if (prevState.status === "loading") {
//     if (actionType === "finish") {
//       return { status: "success", payload: payload };
//     }
//   }
//   return prevState;
// };
