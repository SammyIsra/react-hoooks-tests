import React, { useReducer, useEffect } from "react";
import { makeGet, asyncReducer } from "../Services/request";
import { Post, PostComment, Photo } from "../Utils/Types";
import { SimpleBorderedList, StatusLabel } from "../Styles/BasicStyles";
import { SinglePost } from "./Views/Posts";
import { CommentList } from "./Views/Comments";
import { useAsyncReducer, useFetch } from "../Utils/Hooks";

const Post5RequestURL = "https://jsonplaceholder.typicode.com/posts/5";
const Post5CommentsRequestURL =
  "https://jsonplaceholder.typicode.com/posts/5/comments?_limit=3";
const Photo1URL = "https://jsonplaceholder.typicode.com/photos/1/";

/** Demo how to handle async requests using useReducer and useEffect */
const AsyncReducerLoading: React.FC<{}> = () => {
  // Request Reducer for fetching a Post
  const [singlePostState, singlePostDispatch] = useReducer(
    asyncReducer<Post>(),
    {
      status: "ready",
      payload: undefined
    }
  );

  // Request Reducer for fetching the Comments of a Post comments.
  // Jses shortcut 'useAsyncReducer', which is the same as the reducer above, just a bit simplified
  const [postCommentsState, postCommentsDispatch] = useAsyncReducer<
    PostComment[]
  >();

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
  }, [postCommentsDispatch, singlePostState.status]);

  const photo = useFetch<Photo>(Photo1URL);

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
      <div>
        Photo Request Status:{" "}
        <StatusLabel status={photo.status}>{photo.status}</StatusLabel>
      </div>
      {photo.status === "success" && <div>{photo.payload.url}</div>}
    </SimpleBorderedList>
  );
};

export default AsyncReducerLoading;
