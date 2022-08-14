import React from "react";
import { Link } from "react-router-dom";
import "./../../assets/css/article.css";

const ArticleList = (props) => {
  const articles = props.articles;
  return (
    <>
      <div>
        {articles &&
          articles.map((article) => {
            return (
              <div className="article-preview">
                <div className="article-meta">
                  <img src={article.author.image} alt="" />
                  <Link to={`/@${article.author.username}`}></Link>

                  <div className="info">
                    <Link
                      className="author"
                      to={`/@${article.author.username}`}
                    >
                      {article.author.username}
                    </Link>
                    <span className="date">
                      {new Date(article.createdAt).toDateString()}
                    </span>
                  </div>

                  <div className="pull-xs-right">
                    <button
                      className="favoriteButtonClass"
                      // onClick={handleClick}
                    >
                      <i
                        className="iconify"
                        data-icon="ion:heart"
                        style={{ color: "#5CB85C" }}
                      ></i>{" "}
                      {article.favoritesCount}
                    </button>
                  </div>
                </div>

                <Link to={`/article/${article.slug}`} className="preview-link">
                  <h1>{article.title}</h1>
                  <p>{article.description}</p>
                  <span>Read more...</span>
                  <ul className="tag-list">
                    {article.tagList.map((tag) => {
                      return (
                        <li
                          className="tag-default tag-pill tag-outline"
                          key={tag}
                        >
                          {tag}
                        </li>
                      );
                    })}
                  </ul>
                </Link>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default ArticleList;
