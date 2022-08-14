import React from "react";
import Container from "react-bootstrap/Container";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const user = JSON.parse(localStorage.getItem("user"));

const LoggedOutView = () => {
  if (!user) {
    return (
      <Nav>
        <Nav.Link as={Link} to="/">
          Home
        </Nav.Link>{" "}
        <Nav.Link as={Link} to="/login">
          Sign in
        </Nav.Link>{" "}
        <Nav.Link as={Link} to="/register">
          Sign up
        </Nav.Link>{" "}
      </Nav>
    );
  }
  return null;
};

const LoggedInView = () => {
  if (user) {
    return (
      <Nav>
        <Nav.Link as={Link} to="/">
          Home
        </Nav.Link>{" "}
        <Nav.Link as={Link} to="/editor">
          New Article
        </Nav.Link>{" "}
        <Nav.Link as={Link} to="/settings">
          Settings
        </Nav.Link>{" "}
        <Nav.Link as={Link} to={`/user/@${user.username}`}>
          {user.username}
        </Nav.Link>{" "}
      </Nav>
    );
  }
  return null;
};

const Header = () => {
  return (
    <>
      <div className="container-nav">
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
          <Container>
            <Navbar.Brand href="/" style={{ color: "#5CB85C" }}>
              conduit
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto"></Nav>
              <LoggedOutView />

              <LoggedInView />
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </>
  );
};

export default Header;
