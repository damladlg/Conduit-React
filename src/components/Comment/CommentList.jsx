import React from "react";
import Comment from "./Comment";

const CommentList = (props) => {
  return (
    <div>
      {props.comments?.map((comment) => {
        return <Comment comment={comment} slug={props.slug} />;
      })}
    </div>
  );
};

export default CommentList;
