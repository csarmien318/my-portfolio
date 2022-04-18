import React from "react";
import { render } from "@testing-library/react";
import { AppRoutes } from "./App";
import { MemoryRouter, Navigate, Routes, Route } from "react-router-dom";
import App from "./App";
import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Songs from "./pages/Songs";
import Weather from "./pages/Weather";
import Contact from "./pages/Contact";
import Login from "./pages/Login";

window.alert = jest.fn();

// const MockAppRoutesComponent = ({ isUser }) => {
//   return (
//     <>
//       <Header />
//       <Routes>
//         {!isUser && <Route path="/login" element={<Login />} />}

//         {isUser && (
//           <>
//             <Route path="/" element={<Home />} />
//             <Route path="/about" element={<About />} />
//             <Route path="/songs" element={<Songs />} />
//             <Route path="/weather" element={<Weather />} />
//             <Route path="/contact" element={<Contact />} />
//           </>
//         )}
//         <Route path="*" element={<Navigate to={isUser ? "/" : "/login"} />} />
//       </Routes>
//     </>
//   );
// };

describe("Routes rendered when isUser === false", () => {
  it("should render Header", () => {
    window.alert.mockClear();
    const { getAllByRole } = render(<App />);
    const login = getAllByRole("button");
    expect(login).toBeTruthy();
  });

  it("render login", async () => {
    window.alert.mockClear();
    const { queryByRole } = render(
      <MemoryRouter initialEntries={["/login"]}>
        <AppRoutes />
      </MemoryRouter>
    );
    const login = queryByRole("button", { name: /submit/i });
    expect(login).not.toBeNull();
  });

  it("do not render home", async () => {
    window.alert.mockClear();
    const { queryByText } = render(
      <MemoryRouter initialEntries={["/"]}>
        <AppRoutes />
      </MemoryRouter>
    );
    const home = queryByText(/home/i);
    expect(home).toBeNull();
  });

  it("do not render about", async () => {
    window.alert.mockClear();
    const { queryByText } = render(
      <MemoryRouter initialEntries={["/about"]}>
        <AppRoutes />
      </MemoryRouter>
    );
    const about = queryByText(/about/i);
    expect(about).toBeNull();
  });

  it("do not render songs", async () => {
    window.alert.mockClear();
    const { queryByText } = render(
      <MemoryRouter initialEntries={["/songs"]}>
        <AppRoutes />
      </MemoryRouter>
    );
    const songs = queryByText(/data/i);
    expect(songs).toBeNull();
  });

  it("do not render weather", async () => {
    window.alert.mockClear();
    const { queryByTestId } = render(
      <MemoryRouter initialEntries={["/weather"]}>
        <AppRoutes />
      </MemoryRouter>
    );
    const weather = queryByTestId("weatherSearchBar");
    expect(weather).toBeNull();
  });

  it("do not render contact", async () => {
    window.alert.mockClear();
    const { queryByText } = render(
      <MemoryRouter initialEntries={["/contact"]}>
        <AppRoutes />
      </MemoryRouter>
    );
    const contact = queryByText(/contact/i);
    expect(contact).toBeNull();
  });
});

// describe("Routes rendered when isUser === true", () => {
//   it("do not render login", async () => {
//     window.alert.mockClear();
//     const { queryByRole } = render(
//       <MemoryRouter initialEntries={["/login"]}>
//         <MockAppRoutesComponent isUser="true" />
//       </MemoryRouter>
//     );
//     const login = queryByRole("button", { name: /submit/i });
//     expect(login).toBeNull();
//   });

//   it("render home", async () => {
//     window.alert.mockClear();
//     const { queryAllByText } = render(
//       <MemoryRouter initialEntries={["/"]}>
//         <MockAppRoutesComponent isUser="true" />
//       </MemoryRouter>
//     );
//     const home = queryAllByText(/home/i);
//     expect(home).not.toBeNull();
//   });

//   it("render about", async () => {
//     window.alert.mockClear();
//     const { queryAllByRole } = render(
//       <MemoryRouter initialEntries={["/about"]}>
//         <MockAppRoutesComponent isUser="true" />
//       </MemoryRouter>
//     );
//     const about = queryAllByRole("button");
//     expect(about).not.toBeNull();
//   });

//   it("render songs", async () => {
//     window.alert.mockClear();
//     const { queryByText } = render(
//       <MemoryRouter initialEntries={["/songs"]}>
//         <MockAppRoutesComponent isUser="true" />
//       </MemoryRouter>
//     );
//     const songs = queryByText(/data/i);
//     expect(songs).not.toBeNull();
//   });

//   it("render weather", async () => {
//     window.alert.mockClear();
//     const { queryByTestId } = render(
//       <MemoryRouter initialEntries={["/weather"]}>
//         <MockAppRoutesComponent isUser="true" />
//       </MemoryRouter>
//     );
//     const weather = queryByTestId("weatherSearchBar");
//     expect(weather).not.toBeNull();
//   });

//   it("render contact", async () => {
//     window.alert.mockClear();
//     const { queryAllByText } = render(
//       <MemoryRouter initialEntries={["/contact"]}>
//         <MockAppRoutesComponent isUser="true" />
//       </MemoryRouter>
//     );
//     const contact = queryAllByText(/contact/i);
//     expect(contact).not.toBeNull();
//   });
// });
