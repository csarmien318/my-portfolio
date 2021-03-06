import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const activeUser = cookies.get("user");
const user = sessionStorage.getItem("user");

axios.defaults.withCredentials = true;

const useAuth = () => {
  const [isUser, setUser] = useState(user);

  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

  useEffect(() => {
    async function authUser() {
      if ((isUser && !user) || (!isUser && activeUser)) return handleLogout();
      try {
        if (isUser && user) await axios.post(`${API_ENDPOINT}/auth`);
      } catch (err) {
        if (err?.response?.status === 403) {
          alert(
            "Forbidden: Either another user has logged in with the same credentials, or there was an authentication error."
          );
        }
        handleLogout();
      }
    }

    authUser();
  }, []);

  const handleLogin = async (username, password) => {
    try {
      const response = await axios.post(
        `${API_ENDPOINT}/login`,
        JSON.stringify({ username, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (response.status === 202) {
        let name = response.data.user.username;
        sessionStorage.setItem("user", name);
      }
      window.location.reload();
    } catch (error) {
      alert("Incorrect username or password");
      window.location.reload();
    }
  };

  const handleLogout = async () => {
    axios.delete(`${API_ENDPOINT}/clear-cookies`);
    await axios
      .get(`${API_ENDPOINT}/logout`, {
        withCredential: true,
      })
      .catch(() => {
        console.log("An internal server error has occurred.");
      });
    setUser(false);
    sessionStorage.clear();
    window.location.reload();
  };

  return {
    user,
    isUser,
    activeUser,
    // checkUser,
    setUser,
    handleLogin,
    handleLogout,
  };
};

export default useAuth;
