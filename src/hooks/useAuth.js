import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const isAuthed = cookies.get("isAuthed");
const activeUser = cookies.get("user");

axios.defaults.withCredentials = true;

const useAuth = () => {
  const [isUser, setUser] = useState(isAuthed);
  const checkUser = localStorage.getItem("user");

  useEffect(() => {
    async function getData() {
      await axios.post("http://localhost:8080/api/auth").catch(() => {
        if (checkUser || activeUser) {
          handleLogout();
          window.location.reload();
          alert("Unauthorized");
        }
      });
    }
    getData();
  }, []);

  const handleLogin = async (username, password) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/login",
        JSON.stringify({ username, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      let name = JSON.stringify(response.data.user);
      localStorage.setItem("user", name);
      window.location.reload();
      setUser(true);
    } catch (err) {
      if (!err?.response) {
        alert("An unexpected error occurred. Please try again later.");
      } else if (err.response?.status === 400) {
        alert("Missing Username or Password");
      } else if (err.response?.status === 401) {
        alert("Incorrect username or password");
        console.log("Incorrect username or password");
      } else {
        alert("Login Failed");
      }
    }
  };

  const handleLogout = () => {
    axios.delete("http://localhost:8080/api/clear-cookies");
    axios
      .get("http://localhost:8080/api/logout", {
        headers: { "Content-Type": "application/json" },
        withCredential: true,
      })
      .then(() => {
        localStorage.clear();
      })
      .catch(() => {
        console.log("An internal server error has occurred.");
      });

    localStorage.clear();
    window.location.reload();
  };

  return {
    isUser,
    activeUser,
    setUser,
    handleLogin,
    handleLogout,
  };
};

export default useAuth;
