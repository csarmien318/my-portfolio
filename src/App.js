import React, { useState, useEffect } from "react";
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

import Cookies from "universal-cookie";
const cookies = new Cookies();

function App() {
  const [isUser, setIsUser] = useState(false || localStorage.getItem("user"));
  const [user, setUser] = useState(() => {
    if (!isUser) return "";
    return localStorage.getItem("user");
  });

  useEffect(() => {
    const checkUser = localStorage.getItem("user");
    if (checkUser) {
      console.log("checkUser: ", checkUser);
      const currentUser = JSON.parse(checkUser);
      setUser(currentUser);
      setIsUser(true);
    } else {
      setUser();
      setIsUser(false);
    }
  }, []);

  useEffect(() => {
    const activeUser = user;
    console.log("Logged in user: ", activeUser);
  }, [user]);

  return (
    <Router>
      <Header user={user} setUser={setUser} />
      <Routes>
        {!isUser && (
          <Route path="/login" element={<Login setUser={setIsUser} />} />
        )}

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
    </Router>
  );
}

export default App;
