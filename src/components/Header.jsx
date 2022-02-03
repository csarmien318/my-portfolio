import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";

export const Header = () => {
  return (
    <Navbar variant="light">
      <Container fluid>
        <Navbar.Brand href="/">Home</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/about">About</Nav.Link>
          <Nav.Link href="/songs-project">Songs Project</Nav.Link>
          <Nav.Link href="/weather-api">Weather</Nav.Link>
          <Nav.Link href="/contact">Contact</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};
