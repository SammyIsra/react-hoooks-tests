import React from "react";
import { Post } from "../../Utils/Types";

/** React Component just to display a single post */
export const SinglePost: React.FC<Post> = post => {
  return (
    <div>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
    </div>
  );
};
