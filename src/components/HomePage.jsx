import React from "react";
import Banner from "./Banner";
import PopularTags from "./PopularTags";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ArticleTabs from "./Article/ArticleTabs";
import "./../assets/css/profile.css";

const HomePage = () => {
  return (
    <>
      <Banner />
      <div className="profile-wrap">
        <Container>
          <Row>
            <Col sm={9}>
              <ArticleTabs header1={"Your Feeds"} header2={"Global Feeds"} />
            </Col>
            <Col sm={3}>
              <PopularTags />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default HomePage;
