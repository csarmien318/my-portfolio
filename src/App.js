import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Songs from "./pages/Songs";
import Weather from "./pages/Weather";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

function App() {
  const [user, setUser] = useState(localStorage.getItem("user"));

  useEffect(() => {
    const checkUser = localStorage.getItem("user");
    if (checkUser) {
      const currentUser = JSON.parse(checkUser);
      setUser(currentUser);
    } else {
      setUser();
    }
  }, []);
  // useEffect(() => {
  //   const response = axios
  //     .post("/api/token", user)
  //     .then(() => {
  //       axios.post("/api/auth", user);
  //     })
  //     .catch((err) => console.log(err + ": Authorization error occurred."));
  //   console.log(response.status);
  //   if (response?.status) {
  //     const checkUser = localStorage.getItem("user");
  //     if (checkUser) {
  //       const currentUser = JSON.parse(checkUser);
  //       setUser(currentUser);
  //       console.log(currentUser);
  //     }
  //   } else {
  //     setUser();
  //   }
  // }, []);

  const handleLogout = () => {
    axios
      .delete("/api/logout", user, {
        headers: { "Content-Type": "application/json" },
      })
      .then(() => {
        localStorage.clear();
        console.log("Logged out successfully.");
      })
      .catch(() => {
        console.log("An internal server error has occurred.");
      });

    setUser();
    localStorage.clear();
  };
  return (
    <Router>
      <Header user={user} handleLogout={handleLogout} />
      <Routes>
        {!user && (
          <Route
            path="/login"
            element={<Login user={user} setUser={setUser} />}
          />
        )}

        {user && (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/songs" element={<Songs />} />
            <Route path="/weather" element={<Weather />} />
            <Route path="/contact" element={<Contact />} />
          </>
        )}
        <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;
