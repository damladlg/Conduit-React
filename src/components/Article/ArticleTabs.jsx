import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
} from "reactstrap";
import classnames from "classnames";
import { connect } from "react-redux";
import {
  getGlobalFeedArticle,
  getYourFeedArticle,
  getMyArticle,
  getFavoritedArticle,
} from "../../store/actions";
import ArticleList from ".//ArticleList";

const ArticleTabs = (props) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [userInfo, setUserInfo] = useState(user);

  const [articleLength, setArticleLength] = useState(0);
  const [articles, setArticles] = useState([]);
  const [currentActiveTab, setCurrentActiveTab] = useState("1");
  const toggle = (tab) => {
    if (currentActiveTab !== tab) setCurrentActiveTab(tab);
  };

  useEffect(() => {
    get();
  }, [currentActiveTab]);

  useEffect(() => {}, [articles, articleLength]);

  const get = async () => {
    if (currentActiveTab === "1") {
      if (props.username) {
        const data = await props.getMyArticle(props.username);
        if (data) {
          setArticleLength(data.payload.articlesCount);
          const count = data.payload.articlesCount;
          if (count !== 0) {
            setArticles(data.payload.articles);
          }
        }
      } else {
        const data = await props.getYourFeedArticle();
        if (data) {
          setArticleLength(data.payload.articlesCount);
          const count = data.payload.articlesCount;
          if (count !== 0) {
            setArticles(data.payload.articles);
          }
        }
      }
    } else if (currentActiveTab === "2") {
      if (props.username) {
        const data = await props.getFavoritedArticle(props.username);
        if (data) {
          setArticleLength(data.payload.articlesCount);
          const count = data.payload.articlesCount;
          if (count !== 0) {
            setArticles(data.payload.articles);
          }
        }
      } else {
        const data = await props.getGlobalFeedArticle();
        if (data) {
          setArticleLength(data.payload.articlesCount);
          const count = data.payload.articlesCount;
          if (count !== 0) {
            setArticles(data.payload.articles);
          }
        }
      }
    }
  };

  return (
    <>
      <Nav tabs style={{ borderBottom: "none" }}>
        <NavItem>
          <NavLink
            className={classnames({
              active: currentActiveTab === "1",
            })}
            onClick={() => {
              toggle("1");
            }}
          >
            {props.header1}
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink
            className={classnames({
              active: currentActiveTab === "2",
            })}
            onClick={() => {
              toggle("2");
            }}
          >
            {props.header2}
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={currentActiveTab}>
        <TabPane tabId="1">
          <Row>
            <Col sm="12">
              {userInfo ? (
                <div style={{ marginTop: "20px" }}>
                  {articleLength === 0 ? (
                    <p>No articles are here... yet.</p>
                  ) : (
                    <ArticleList articles={articles} />
                  )}
                </div>
              ) : (
                <p>Please login...</p>
              )}
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <Row>
            <Col sm="12">
              <div style={{ marginTop: "20px" }}>
                {articleLength === 0 ? (
                  <p>No articles are here... yet.</p>
                ) : (
                  <ArticleList articles={articles} />
                )}
              </div>
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    article: state.article,
  };
};

export default connect(mapStateToProps, {
  getGlobalFeedArticle,
  getYourFeedArticle,
  getMyArticle,
  getFavoritedArticle,
})(ArticleTabs);
