import React, { useState, useEffect } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "../css/Header.module.css";

export const Header = () => {
  const path = window.location.pathname;
  const storedPath = localStorage.getItem(path);
  const [tab, setTab] = useState(storedPath ? storedPath : "");
  useEffect(() => {
    localStorage.setItem("tab", path);
  }, [tab]);

  return (
    <Navbar variant="dark" className={styles.bar}>
      <Container fluid>
        <Navbar.Brand
          className={tab === "home" || path === "/home" ? "active" : ""}
          as={Link}
          to="/"
          onClick={() => setTab("home")}
        >
          Home
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link
            className={tab === "about" || path === "/about" ? "active" : ""}
            as={Link}
            to="/about"
            onClick={() => setTab("about")}
          >
            About
          </Nav.Link>
          <Nav.Link
            className={tab === "songs" || path === "/songs" ? "active" : ""}
            as={Link}
            to="/songs"
            onClick={() => setTab("songs")}
          >
            Songs
          </Nav.Link>
          <Nav.Link
            className={tab === "weather" || path === "/weather" ? "active" : ""}
            as={Link}
            to="/weather"
            onClick={() => setTab("weather")}
          >
            Weather
          </Nav.Link>
          <Nav.Link
            className={tab === "contact" || path === "/contact" ? "active" : ""}
            as={Link}
            to="/contact"
            onClick={() => setTab("contact")}
          >
            Contact
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};
