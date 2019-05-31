import React, { useReducer, useEffect } from "react";
import { makeGet, requestReducer } from "../Services/request";
import { Post } from "../Utils/Types";
import SimpleList from "../Styles/SimpleList";
import { SinglePost } from "./SinglePost";

export const AsyncReducerLoading: React.FC<{}> = () => {
  const [requestState, requestDispatch] = useReducer(requestReducer<Post>(), {
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
      <h2>Async loading using useReducer</h2>
      <div>Request Status: {requestState.status}</div>
      {requestState.status === "success" && (
        <SinglePost {...requestState.payload} />
      )}
    </SimpleList>
  );
};
