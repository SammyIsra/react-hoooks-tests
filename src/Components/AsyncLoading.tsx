import React, { useEffect, useState } from "react";
import SimpleList from "../Styles/SimpleList";
import { makeGet, FetchRequest } from "../Services/request";

/** Post object from https://jsonplaceholder.typicode.com/ */
interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

// TODO Find a way to use 'unknown' instead of 'any'
/** Determine if candidate is a Post object */
function isPost(candidate: any): candidate is Post {
  return (
    candidate instanceof Object &&
    candidate.hasOwnProperty("id") &&
    typeof candidate.id === "number" &&
    candidate.hasOwnProperty("userId") &&
    typeof candidate.userId === "number" &&
    candidate.hasOwnProperty("title") &&
    typeof candidate.title === "string" &&
    candidate.hasOwnProperty("body") &&
    typeof candidate.body === "string"
  );
}

/** Url to retrieve a single post */
const SinglePostRequestUrl = "https://jsonplaceholder.typicode.com/posts/1";

/**
 * Shows how async loading using useReducer and useEffect
 */
const AsyncLoading = () => {
  /** State of the request, including payload and status */
  const [{ status, payload }, updateRequest] = useState<FetchRequest<Post>>({
    status: "ready",
    payload: undefined
  });

  // Fetch the post data on component mount
  // Only runs on mount
  // No cleanup
  useEffect(() => {
    // Update to 'loading' status
    updateRequest({ status: "loading", payload: undefined });

    // Start request
    makeGet(
      SinglePostRequestUrl,
      {
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      },
      isPost
    )
      // Mark request as successful, and store result
      .then(body => updateRequest({ status: "success", payload: body }))

      // Mark request as error
      .catch(err => {
        updateRequest({ status: "error", payload: undefined });
        console.error(err);
      });
  }, []);

  return (
    <SimpleList>
      <div>Status: {status}</div>
      {payload && <Post {...payload} />}
    </SimpleList>
  );
};

/** React Component just to display a single post */
const Post: React.FC<Post> = post => {
  return (
    <div>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
    </div>
  );
};

export default AsyncLoading;
