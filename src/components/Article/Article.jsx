import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import { connect } from "react-redux";
import { getArticles, deleteArticle, getComments } from "./../../store/actions";
import CreateComment from "./../Comment/CreateComment";
import CommentList from "./../Comment/CommentList";
import "./../../assets/css/article.css";

const Article = (props) => {
  const navigate = useNavigate();

  const { slug } = useParams();

  const [comments, setComments] = useState([]);
  const [article, setArticle] = useState([]);
  const [authorUsername, setAuthorUsername] = useState();
  const [authorImage, setauthorImage] = useState();
  const [createdAt, setcreatedAt] = useState();
  const [title, setTitle] = useState();

  useEffect(() => {}, []);
  useEffect(() => {
    get();
  }, []);

  const get = async () => {
    const data = await props.getArticles(slug);
    if (data) {
      setAuthorUsername(data.payload.article.author.username);
      setauthorImage(data.payload.article.author.image);
      setcreatedAt(data.payload.article.createdAt);
      setTitle(data.payload.article.title);
      setArticle(data.payload.article);
    }

    const comments = await props.getComments(slug);
    if (comments) {
      setComments(comments.payload.comments);
      console.log("a");
      console.log(comments);
    }
  };

  const deleteArticles = async () => {
    await props.deleteArticle(slug);
    navigate("/");
  };

  return (
    <div className="article-page">
      <div className="banner">
        <div className="container">
          <h1>{title}</h1>
          <div className="article-meta">
            <Link to={`/@${authorUsername}`}>
              <img src={authorImage} alt="" />
            </Link>
            <div className="info">
              <Link
                to={`/@${authorUsername}`}
                className="author"
                style={{ color: "white" }}
              >
                {authorUsername}
              </Link>
              <span className="date">{new Date(createdAt).toDateString()}</span>
            </div>
            <span>
              <Link
                to={`/editor/${article.slug}`}
                className="btn btn-outline-secondary btn-sm"
              >
                <i className="ion-edit"></i> Edit Article
              </Link>

              <button
                className="btn btn-outline-danger btn-sm"
                onClick={deleteArticles}
              >
                {" "}
                Delete Article
              </button>
            </span>
          </div>
        </div>
      </div>
      <div className="container page">
        <div className="row article-content">
          <div className="col-xs-12 ">
            <p>{article.description}</p>
            <ul className="tag-list">
              {article.tagList?.map((tag) => {
                return (
                  <li className="tag-default tag-pill tag-outline" key={tag}>
                    {tag}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <hr />
        <div className="col-xs-12 col-md-8 offset-md-2">
          <CreateComment slug={slug} />
          <CommentList slug={slug} comments={comments} />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    article: state.article,
    comment: state.comment,
  };
};

export default connect(mapStateToProps, {
  getArticles,
  deleteArticle,
  getComments,
})(Article);
