import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Header } from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Songs from "./pages/Songs";
import Weather from "./pages/Weather";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

function App() {
  const [auth, setAuth] = useState(null);

  // useEffect(() => {
  //   let user = localStorage.getItem("user");
  //   user && JSON.parse(user) ? setAuth(true) : setAuth(false);
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem("user", auth);
  // }, [auth]);

  // const prev = () => {
  //   window.onpopstate = () => {
  //     return window.location.reload();
  //   };
  // }

  return (
    <Router>
      <Header />
      <Routes>
        {!auth && (
          <Route
            path="/login"
            element={<Login authenticate={() => setAuth(true)} />}
          />
        )}

        {auth && (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/songs" element={<Songs />} />
            <Route path="/weather" element={<Weather />} />
            <Route path="/contact" element={<Contact />} />
          </>
        )}
        <Route path="*" element={<Navigate to={auth ? "/" : "/login"} />} />
      </Routes>
    </Router>

    // <Router>
    //   <Header />
    //   <Routes>
    //     {auth ? (
    //       <>
    //         <Route path="/" element={<Home />} />
    //         <Route path="/about" element={<About />} />
    //         <Route path="/songs" element={<Songs />} />
    //         <Route path="/weather" element={<Weather />} />
    //         <Route path="/contact" element={<Contact />} />
    //         <Route path="/login" element={<Navigate to="/" />} />
    //         <Route path="*" element={<NotFound />} />
    //       </>
    //     ) : (
    //       <>
    //         <Route path="/login" element={<Login />} />
    //         <Route path="*" element={<Navigate to="login" />} />
    //       </>
    //     )}
    //   </Routes>
    // </Router>
  );
}

export default App;
