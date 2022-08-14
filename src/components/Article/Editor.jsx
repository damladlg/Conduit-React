import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  createArticle,
  getArticles,
  updateArticle,
} from "./../../store/actions";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import "./../../assets/css/tag.css";
import { useValidatableForm } from "react-validatable-form";
import FormErrorComponent from "../FormErrorComponent";

const rules = [
  {
    path: "val_title",
    ruleSet: [
      { rule: "required" },
      {
        rule: "length",
        greaterThan: 8,
      },
    ],
  },
  {
    path: "val_description",
    ruleSet: [
      { rule: "required" },
      {
        rule: "length",
        greaterThan: 16,
      },
    ],
  },
  {
    path: "val_text",
    ruleSet: [
      { rule: "required" },
      {
        rule: "length",
        greaterThan: 50,
      },
    ],
  },
  {
    path: "val_tag",
    ruleSet: [
      { rule: "required" },
      {
        rule: "listSize",
        greaterThanOrEqualTo: 1,
      },
    ],
  },
];

const Editor = (props) => {
  const navigate = useNavigate();

  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [body, setBody] = useState();
  const [tags, setTags] = useState([]);

  const { slug } = useParams();
  const [newSlug, setNewSlug] = useState(slug);

  const {
    isValid,
    setPathValue,
    getValue,
    getError,
    setPathIsBlurred,
    setFormIsSubmitted,
  } = useValidatableForm({
    rules,
  });

  useEffect(() => {
    if (slug) {
      get();
    }
  }, []);

  const get = async () => {
    const data = await props.getArticles(slug);
    if (data) {
      setTitle(data.payload.article.title);
      setDescription(data.payload.article.description);
      setBody(data.payload.article.body);
      setTags(data.payload.article.tags);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitResultValid = setFormIsSubmitted();
    if (submitResultValid) {
      props.createArticle(title, description, body, tags);
      navigate("/");
    }
  };

  const updateSubmit = (e) => {
    e.preventDefault();
    const submitResultValid = setFormIsSubmitted();
    if (submitResultValid) {
      props.updateArticle(title, description, body, newSlug);
      navigate("/");
    }
  };

  const removeTagData = (indexToRemove) => {
    setTags([...tags.filter((_, index) => index !== indexToRemove)]);
  };

  const addTagData = (event) => {
    if (event.target.value !== "") {
      setTags([...tags, event.target.value]);
      event.target.value = "";
    }
  };

  return (
    <div className="editor-page wrapper" style={{ marginTop: "1.5rem" }}>
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            <form>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Article Title"
                    id="val_title"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                      setPathValue("val_title", e.target.value);
                    }}
                  />
                  <FormErrorComponent errorMessage={getError("val_title")} />
                </fieldset>

                <fieldset className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    placeholder="What's this article about?"
                    id="val_description"
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                      setPathValue("val_description", e.target.value);
                    }}
                  />
                  <FormErrorComponent
                    errorMessage={getError("val_description")}
                  />
                </fieldset>

                <fieldset className="form-group">
                  <textarea
                    className="form-control"
                    rows="8"
                    placeholder="Write your article (in markdown)"
                    id="val_text"
                    value={body}
                    onChange={(e) => {
                      setBody(e.target.value);
                      setPathValue("val_text", e.target.value);
                    }}
                  ></textarea>
                  <FormErrorComponent errorMessage={getError("val_text")} />
                </fieldset>

                <fieldset className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    onKeyUp={(event) =>
                      event.key === "Enter" ? addTagData(event) : null
                    }
                    placeholder="Enter tags"
                    id="val_tag"
                    value={getValue("val_tag")}
                    onChange={(e) => {
                      setPathValue("val_tag", e.target.value);
                    }}
                  />
                  <FormErrorComponent errorMessage={getError("val_tag")} />
                  <div className="tag-input">
                    <ul className="tags">
                      {tags?.map((tag, index) => (
                        <li key={index} className="tag-style">
                          <span className="tag-title">{tag}</span>
                          <span
                            className="tag-close-icon"
                            onClick={() => removeTagData(index)}
                          >
                            x
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </fieldset>
                <p style={{ color: "red" }}>
                  {" "}
                  Form is {""} {isValid ? "valid" : "invalid"}
                </p>

                {newSlug ? (
                  <button
                    className="btn btn-lg pull-xs-right btn-success"
                    type="button"
                    onClick={updateSubmit}
                  >
                    Update Article
                  </button>
                ) : (
                  <button
                    className="btn btn-lg pull-xs-right btn-success"
                    type="button"
                    onClick={handleSubmit}
                  >
                    Publish Article
                  </button>
                )}
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    article: state.article,
  };
};

export default connect(mapStateToProps, {
  createArticle,
  getArticles,
  updateArticle,
})(Editor);
