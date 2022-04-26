import React, { useState, useEffect } from "react";
import { Navbar, NavDropdown, Container, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import useAuth from "../hooks/useAuth";
import styles from "../css/Header.module.css";

const Header = () => {
  const [tab, setTab] = useState("");

  useEffect(() => {
    window.onpopstate = () => {
      window.location.reload();
    };
  });

  const { activeUser, handleLogout } = useAuth();

  return (
    <Navbar
      sticky="top"
      variant="dark"
      expand="md"
      collapseOnSelect
      className={styles.bar}
    >
      <Container fluid>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer
              className="fs-5"
              to="/"
              style={{ marginTop: "-4px" }}
            >
              <Nav.Link active onClick={() => setTab("home")}>
                Home
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/about">
              <Nav.Link
                className={tab === "about" ? "active" : ""}
                onClick={() => setTab("about")}
              >
                About
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/songs">
              <Nav.Link
                className={tab === "songs" ? "active" : ""}
                onClick={() => setTab("songs")}
              >
                Songs
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/weather">
              <Nav.Link
                className={tab === "weather" ? "active" : ""}
                onClick={() => setTab("weather")}
              >
                Weather
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/contact">
              <Nav.Link
                className={tab === "contact" ? "active" : ""}
                onClick={() => setTab("contact")}
              >
                Contact
              </Nav.Link>
            </LinkContainer>
          </Nav>
          {activeUser?.username && (
            <Nav>
              <NavDropdown
                data-testid="activeUserDropMenu"
                id="collapsible-nav-dropdown"
                title={activeUser.username}
                align="end"
              >
                <NavDropdown.Item onClick={handleLogout} href="/login">
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
