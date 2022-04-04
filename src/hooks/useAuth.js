import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const authedSession = cookies.get("authedSession");
// const authedToken = cookies.get("authedToken");

const useAuth = () => {
  const [isUser, setIsUser] = useState(authedSession);
  const [user, setUser] = useState(localStorage.getItem("user"));

  const checkUser = localStorage.getItem("user");

  useEffect(() => {
    console.log("mounting event");
    if (checkUser) {
      console.log("checkUser: ", checkUser);
      const currentUser = JSON.parse(checkUser);
      setUser(currentUser);
      setIsUser(authedSession);
    } else {
      setUser();
      setIsUser(false);
    }
  }, []);

  // useEffect(() => {
  //   if (!authedSession) {
  //   }
  // });

  const handleLogin = async (username, password) => {
    try {
      const response = await axios.post(
        "/api/login",
        JSON.stringify({ username, password }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      window.location.reload();
      localStorage.setItem("user", JSON.stringify(response.data.user));

      setUser(response.data.user);
      setIsUser(true);
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
    axios.delete("/api/clear-cookies");
    axios
      .get("/api/logout", {
        headers: { "Content-Type": "application/json" },
      })
      .then(() => {
        localStorage.clear();
        console.log("Logged out successfully.");
      })
      .catch(() => {
        console.log("An internal server error has occurred.");
      });

    localStorage.clear();
    setUser(false);
  };

  return {
    user,
    isUser,
    setUser,
    setIsUser,
    handleLogin,
    handleLogout,
  };
};

export default useAuth;

// TODO: Make a function validateInput that checks
// const validateInput = (username, password) => {
//   if (!(username has a number && lowercase letters)) {
//     return false;
//   }
//   if (!(password has numbers && has uppercase letters && lowercase letters)) {
//     return false;
//   }
//
//   return true;
// }
