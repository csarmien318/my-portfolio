import { act, render, fireEvent, waitFor } from "@testing-library/react";
import React from "react";
import { MemoryRouter, Routes, Route, Navigate } from "react-router-dom";
import { Navbar, NavDropdown, Container, Nav } from "react-bootstrap";
import Header from "../Header";
import Home from "../../pages/Home";
import About from "../../pages/About";
import Songs from "../../pages/Songs";
import Weather from "../../pages/Weather";
import Contact from "../../pages/Contact";
import useAuth from "../../hooks/useAuth";
import moment from "moment";
import { server } from "../../mocks/server";
import { rest } from "msw";

const MockAppRoutes = ({ isUser }) => {
  return (
    <MemoryRouter>
      <Header />
      <Routes>
        {!isUser && <Route path="/login" element={<Login />} />}

        {isUser && (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/songs" element={<Songs />} />
            <Route path="/weather" element={<Weather />} />
            <Route path="/contact" element={<Contact />} />
          </>
        )}
        <Route path="*" element={<Navigate to={isUser ? "/" : "/login"} />} />
      </Routes>
    </MemoryRouter>
  );
};

const MockHeader = ({ activeUser }) => {
  const { handleLogout } = useAuth();
  return (
    <Navbar sticky="top" variant="dark" expand="md" collapseOnSelect>
      <Container fluid>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {activeUser && (
            <Nav>
              <NavDropdown
                data-testid="activeUserDropMenu"
                id="collapsible-nav-dropdown"
                title={activeUser}
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

describe("Header component", () => {
  console.warn = jest.fn();
  it("should render specific elements in routes when clicked on Header", async () => {
    const { getByRole, getByText } = render(<MockAppRoutes isUser="true" />);

    fireEvent.click(getByRole("link", { name: /about/i }));
    expect(getByRole("button", { name: /view resume/i })).toBeInTheDocument();

    fireEvent.click(getByRole("link", { name: /songs/i }));
    await waitFor(() => expect(getByText(/tabled data/i)).toBeInTheDocument());

    fireEvent.click(getByRole("link", { name: /weather/i }));
    expect(getByRole("button", { name: /get weather/i })).toBeInTheDocument();

    fireEvent.click(getByRole("link", { name: /contact/i }));
    expect(getByRole("button", { name: /submit/i })).toBeInTheDocument();

    fireEvent.click(getByRole("link", { name: /home/i }));
    expect(getByText(/welcome/i)).toBeInTheDocument();
  });

  it("should call window.onpopstate to simulate user pressing back btn in browser", async () => {
    jest.spyOn(React, "useEffect").mockImplementation((e) => e());
    jest.spyOn(window, "onpopstate");
    console.error = jest.fn();

    render(<MockAppRoutes isUser="true" />);
    window.onpopstate();
    expect(window.onpopstate).toHaveBeenCalledTimes(1);
  });

  it("should render logout button and be truthy upon click", async () => {
    const { getByText } = render(<MockHeader activeUser="test1000" />);
    fireEvent.click(getByText(/test1000/i));
    const clickLogout = fireEvent.click(getByText(/logout/i));

    await waitFor(() => {
      expect(clickLogout).toBeTruthy();
    });
  });

  it("should throw and log error on console with message", async () => {
    server.use(
      rest.get("http://localhost:8080/api/logout", (req, res, ctx) => {
        return res.networkError();
      })
    );
    const { getByText } = render(<MockHeader activeUser="test1000" />);
    fireEvent.click(getByText(/test1000/i));
    const clickLogout = fireEvent.click(getByText(/logout/i));
    console.log = jest.fn();

    await waitFor(() => {
      expect(console.log).toBeCalledWith(
        "An internal server error has occurred."
      );
    });
  });
});
