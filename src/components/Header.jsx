import React, { useState, useEffect } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export const Header = () => {
  const storedTab = localStorage.getItem("tab");
  const [tab, setTab] = useState(storedTab ? storedTab : "");
  useEffect(() => {
    localStorage.setItem("tab", tab);
  }, [tab]);

  return (
    <Navbar variant="light">
      <Container fluid>
        <Navbar.Brand
          className={tab === "home" ? "active" : ""}
          as={Link}
          to="/"
          onClick={() => setTab("home")}
        >
          Home
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link
            className={tab === "about" ? "active" : ""}
            as={Link}
            to="/about"
            onClick={() => setTab("about")}
          >
            About
          </Nav.Link>
          <Nav.Link
            className={tab === "songs" ? "active" : ""}
            as={Link}
            to="/songs"
            onClick={() => setTab("songs")}
          >
            Songs
          </Nav.Link>
          <Nav.Link
            className={tab === "weather" ? "active" : ""}
            as={Link}
            to="/weather"
            onClick={() => setTab("weather")}
          >
            Weather
          </Nav.Link>
          <Nav.Link
            className={tab === "contact" ? "active" : ""}
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
