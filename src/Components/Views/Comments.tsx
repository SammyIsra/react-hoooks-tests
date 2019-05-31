import React from "react";
import { PostComment } from "../../Utils/Types";
import { FlexList } from "../../Styles/BasicStyles";

export const SingleComment: React.FC<PostComment> = comment => {
  return (
    <FlexList>
      <p>{comment.body}</p>
      <p>by: {comment.email}</p>
    </FlexList>
  );
};

export const CommentList: React.FC<{ comments: PostComment[] }> = ({
  comments
}) => {
  return (
    <FlexList>
      {comments.map(comment => (
        <SingleComment {...comment} />
      ))}
    </FlexList>
  );
};
