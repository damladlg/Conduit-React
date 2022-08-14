import React from "react";
import { Link } from "react-router-dom";
import CommentDeleteButton from "./CommentDeleteButton";

const Comment = (props) => {
  const token = JSON.stringify(localStorage.getItem("accessToken"));

  const comment = props.comment;

  return (
    <div className="card" style={{ marginTop: "20px" }}>
      <div className="card-block">
        <p className="card-text" style={{ height: "30px", margin: "20px" }}>
          {comment.body}
        </p>
      </div>
      <div className="card-footer">
        <Link to={`/@${comment.author.username}`} className="comment-author">
          <img
            src={comment.author.image}
            style={{ width: "30px" }}
            className="comment-author-img"
            alt=""
          />
        </Link>
        &nbsp;
        <Link to={`/@${comment.author.username}`} className="comment-author">
          {comment.author.username}
        </Link>
        <span className="date-posted">
          {new Date(comment.createdAt).toDateString()}
        </span>
        <CommentDeleteButton
          token={token}
          slug={props.slug}
          commentId={comment.id}
        />
        <div className="comment-delete-button"></div>
      </div>
    </div>
  );
};

export default Comment;
