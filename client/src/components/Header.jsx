import React from "react";
import { Navbar, NavDropdown, Container, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import useAuth from "../hooks/useAuth";
import styles from "../css/Header.module.css";

const Header = () => {
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
              <Nav.Link active={false}>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/about">
              <Nav.Link active={false}>About</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/songs">
              <Nav.Link active={false}>Songs</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/weather">
              <Nav.Link active={false}>Weather</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/contact">
              <Nav.Link active={false}>Contact</Nav.Link>
            </LinkContainer>
          </Nav>
          {activeUser?.username && (
            <Nav>
              <NavDropdown
                data-testid="activeUserDropMenu"
                id="collapsible-nav-dropdown"
                title={activeUser.username || sessionStorage.getItem("user")}
                align="end"
              >
                <NavDropdown.Item onClick={handleLogout}>
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
