import React, { useState, useEffect } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import styles from "../css/Header.module.css";

export const Header = () => {
  const [tab, setTab] = useState("");

  useEffect(() => {
    window.onpopstate = () => {
      window.location.reload();
    };
  });

  return (
    <Navbar
      sticky="top"
      variant="dark"
      expand="md"
      collapseOnSelect
      className={styles.bar}
    >
      <Container fluid>
        <Navbar.Brand href="/" onClick={() => setTab("home")}>
          Home
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
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
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
// export const Header = () => {
//   const path = window.location.pathname;
//   const storedPath = localStorage.getItem(path);
//   const [tab, setTab] = useState(storedPath ? storedPath : "");
//   useEffect(() => {
//     localStorage.setItem("tab", path);
//   }, [tab]);

//   return (
//     <Navbar
//       sticky="top"
//       variant="dark"
//       expand="md"
//       collapseOnSelect
//       className={styles.bar}
//     >
//       <Container fluid>
//         <Navbar.Brand
//           className={tab === "home" || path === "/home" ? "active" : ""}
//           as={Link}
//           to="/"
//           onClick={() => setTab("home")}
//         >
//           Home
//         </Navbar.Brand>
//         <Navbar.Toggle aria-controls="responsive-navbar-nav" />
//         <Navbar.Collapse id="responsive-navbar-nav">
//           <Nav className="me-auto">
//             <Nav.Link
//               className={tab === "about" || path === "/about" ? "active" : ""}
//               href="/about"
//               onClick={() => setTab("about")}
//             >
//               About
//             </Nav.Link>
//             <Nav.Link
//               className={tab === "songs" || path === "/songs" ? "active" : ""}
//               href="/songs"
//               onClick={() => setTab("songs")}
//             >
//               Songs
//             </Nav.Link>
//             <Nav.Link
//               className={
//                 tab === "weather" || path === "/weather" ? "active" : ""
//               }
//               href="/weather"
//               onClick={() => setTab("weather")}
//             >
//               Weather
//             </Nav.Link>
//             <Nav.Link
//               className={
//                 tab === "contact" || path === "/contact" ? "active" : ""
//               }
//               as={Link}
//               to="/contact"
//               href="/contact"
//               onClick={() => setTab("contact")}
//             >
//               Contact
//             </Nav.Link>
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// };
