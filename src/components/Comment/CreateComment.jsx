import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { postComments, getComments } from "../../store/actions";

const CreateComment = (props) => {
  const [comment, setComment] = useState();
  const [click, setClick] = useState(false);

  const slug = props.slug;

  useEffect(() => {}, []);
  useEffect(() => {
    get();
  }, [click]);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.postComments(slug, comment);
    setClick(!click);
  };

  const get = async () => {
    const data = await props.getComments(slug);
    if (data) {
      setComment(data.payload.comments);
    }
  };

  return (
    <div>
      <form className="card comment-form" onSubmit={handleSubmit}>
        <div className="card-block">
          <textarea
            className="form-control"
            placeholder="Write a comment..."
            onChange={(e) => setComment(e.target.value)}
            rows="3"
          ></textarea>
        </div>
        <div className="card-footer">
          <button className="btn btn-sm btn-success" type="submit">
            Post Comment
          </button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    comment: state.comment,
  };
};

export default connect(mapStateToProps, { postComments, getComments })(
  CreateComment
);
