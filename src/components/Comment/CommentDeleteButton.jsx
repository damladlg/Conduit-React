import React from "react";
import { deleteComments } from "../../store/actions";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

const CommentDeleteButton = (props) => {
  const navigate = useNavigate();

  const handleDelete = (e) => {
    e.preventDefault();
    props.deleteComments(props.slug, props.commentId);
    navigate(`/article/${props.slug}`);
  };

  if (props.token) {
    return (
      <div style={{ float: "right" }}>
        <button
          className="btn btn-outline-danger btn-sm"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    );
  }
  return null;
};

const mapStateToProps = (state) => {
  return {
    comment: state.comment,
  };
};

export default connect(mapStateToProps, { deleteComments })(
  CommentDeleteButton
);
