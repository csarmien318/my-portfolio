import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { Navbar, NavDropdown, Container, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import styles from "../css/Header.module.css";

const Header = ({ user, setUser, handleLogout }) => {
  const [tab, setTab] = useState("");
  const navigate = useNavigate();

  // useEffect(() => {
  //   window.onpopstate = () => {
  //     window.location.reload();
  //   };
  // });

  // const handleLogout = () => {

  //   if (user) {
  //     axios
  //       .delete("/api/logout", user, {
  //         headers: { "Content-Type": "application/json" },
  //       })
  //       .then(() => {
  //         localStorage.clear();
  //         console.log("Logged out successfully.");
  //       })
  //       .catch(() => {
  //         console.log("An internal server error has occurred.");
  //       });
  //   }
  //   // setUser({ username: "", token: "" });
  //   // window.location.reload();
  // };

  return (
    <Navbar
      sticky="top"
      variant="dark"
      expand="md"
      collapseOnSelect
      className={styles.bar}
    >
      <Container fluid>
        {/* <Navbar.Brand href="/" onClick={() => setTab("home")}>
          Home
        </Navbar.Brand> */}
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer
              className="fs-5"
              to="/"
              style={{ marginTop: "-4px" }}
            >
              <Nav.Link
                active
                // className={tab === "home" ? "active" : ""}
                onClick={() => setTab("home")}
              >
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
          {user?.username && (
            <Nav>
              <NavDropdown
                title={user.username}
                id="collapsible-nav-dropdown"
                // style={{ marginRight: "28px" }}
                style={{ marginRight: "28px", width: "32%" }}
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

Header.propTypes = {
  user: PropTypes.object.isRequired,
  setUser: PropTypes.func.isRequired,
};
