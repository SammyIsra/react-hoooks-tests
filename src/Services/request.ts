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
  payload: undefined;
}

interface LoadingFetchRequest {
  status: "loading";
  payload: undefined;
}

interface ErrorFetchRequest {
  status: "error";
  payload: undefined;
}

interface SuccessFetchRequest<T> {
  status: "success";
  payload: T;
}
