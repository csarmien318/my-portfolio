import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const isAuthed = cookies.get("isAuthed");
const activeUser = cookies.get("user");

axios.defaults.withCredentials = true;

const useAuth = () => {
  const [isUser, setUser] = useState(() => {
    if (activeUser || isAuthed) return true;
    return false;
  });

  const checkUser = localStorage.getItem("user");
  useEffect(() => {
    (async () => {
      try {
        await axios.post("http://localhost:8080/api/auth");
      } catch (err) {
        if (!err?.response) {
          alert("Internal server error. Try again later.");
          return setUser(false);
        }
        // if (checkUser || activeUser) {
        //   handleLogout();
        //   alert("Unauthorized");
        //   window.location.reload();
        // }
      }
    })();
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
      setUser(true);
      window.location.reload();
    } catch {
      alert("Incorrect username or password");
    }
  };

  const handleLogout = () => {
    axios.delete("http://localhost:8080/api/clear-cookies");
    axios
      .get("http://localhost:8080/api/logout", {
        headers: { "Content-Type": "application/json" },
        withCredential: true,
      })
      // .then(() => {
      //   localStorage.clear();
      // })
      .catch(() => {
        console.log("An internal server error has occurred.");
      });

    setUser(false);
    localStorage.clear();
    window.location.reload();
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
