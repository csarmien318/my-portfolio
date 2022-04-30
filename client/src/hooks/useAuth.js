import { useState, useEffect } from "react";
import { config } from "../constants";
import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const activeUser = cookies.get("user");
const user = sessionStorage.getItem("user");

axios.defaults.withCredentials = true;

const useAuth = () => {
  const [isUser, setUser] = useState(user);

  const checkUser = sessionStorage.getItem("user");
  useEffect(() => {
    async function authUser() {
      try {
        await axios.post(`${config.SERVER_URI}/auth`);
        if (!sessionStorage.getItem("user")) sessionStorage.clear();
      } catch (err) {
        if (err.response.status === 403) {
          alert("Forbidden");
          handleLogout();
        }
      }
    }
    if (isUser) authUser();
  });

  const handleLogin = async (username, password) => {
    try {
      const response = await axios.post(
        `${config.SERVER_URI}/login`,
        JSON.stringify({ username, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      let name = JSON.stringify(response.data.user);
      sessionStorage.setItem("user", name);
      window.location.reload();
    } catch {
      alert("Incorrect username or password");
      window.location.reload();
    }
  };

  const handleLogout = async () => {
    try {
      axios.delete(`${config.SERVER_URI}/clear-cookies`);
      axios.get(`${config.SERVER_URI}/logout`, {
        headers: { "Content-Type": "application/json" },
        withCredential: true,
      });
      setUser(false);
      sessionStorage.clear();
      window.location.reload();
    } catch {
      console.log("An internal server error has occurred.");
    }
  };

  return {
    isUser,
    activeUser,
    checkUser,
    setUser,
    handleLogin,
    handleLogout,
  };
};

export default useAuth;
