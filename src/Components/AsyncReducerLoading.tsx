import React, { useReducer, useEffect } from "react";
import { makeGet, requestReducer } from "../Services/request";
import { Post, PostComment } from "../Utils/Types";
import { SimpleBorderedList, StatusLabel } from "../Styles/BasicStyles";
import { SinglePost } from "./Posts";
import { CommentList } from "./Comments";

const Post5RequestURL = "https://jsonplaceholder.typicode.com/posts/5";
const Post5CommentsRequestURL =
  "https://jsonplaceholder.typicode.com/posts/5/comments?_limit=3";

/** Demo how to handle async requests using useReducer and useEffect */
export const AsyncReducerLoading: React.FC<{}> = () => {
  // Request Reducer for fetching a Post
  const [singlePostState, singlePostDispatch] = useReducer(
    requestReducer<Post>(),
    {
      status: "ready",
      payload: undefined
    }
  );

  // Request Reducer for fetching the Comments of a Post
  const [postCommentsState, postCommentsDispatch] = useReducer(
    requestReducer<PostComment[]>(),
    {
      status: "ready",
      payload: undefined
    }
  );

  // Run on component mount
  useEffect(() => {
    singlePostDispatch({ actionType: "start" });

    // Start request
    makeGet<Post>(Post5RequestURL, {
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      // Mark request as successful, and store result
      .then(body => singlePostDispatch({ actionType: "finish", payload: body }))

      // Mark request as error
      .catch(err => {
        singlePostDispatch({ actionType: "error" });
        console.error(err);
      });
  }, []);

  // Run on successful return of single post call
  useEffect(() => {
    if (singlePostState.status !== "success") return;

    postCommentsDispatch({ actionType: "start" });

    makeGet<PostComment[]>(Post5CommentsRequestURL, {
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(body =>
        postCommentsDispatch({ actionType: "finish", payload: body })
      )

      .catch(err => {
        postCommentsDispatch({ actionType: "error" });
        console.error(err);
      });
  }, [singlePostState.status]);

  return (
    <SimpleBorderedList>
      <h2>Async loading using useReducer</h2>
      <div>
        Post Request Status:{" "}
        <StatusLabel status={singlePostState.status}>
          {singlePostState.status}
        </StatusLabel>
      </div>
      {singlePostState.status === "success" && (
        <SinglePost {...singlePostState.payload} />
      )}
      <div>
        Post Comments Status:{" "}
        <StatusLabel status={postCommentsState.status}>
          {postCommentsState.status}
        </StatusLabel>
      </div>
      {postCommentsState.status === "success" && (
        <CommentList comments={postCommentsState.payload} />
      )}
    </SimpleBorderedList>
  );
};
