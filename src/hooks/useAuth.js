import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const authedSession = cookies.get("authedSession");

axios.defaults.withCredentials = true;

const useAuth = () => {
  const [isUser, setIsUser] = useState(authedSession);
  const [user, setUser] = useState(localStorage.getItem("user"));

  const checkUser = localStorage.getItem("user");

  useEffect(() => {
    if (checkUser) {
      console.log("checkUser: ", checkUser);
      const currentUser = JSON.parse(checkUser);
      setUser(currentUser);
      // setIsUser(authedSession);
    } else {
      setUser();
      setIsUser(false);
    }
  }, []);

  useEffect(() => {
    console.log("User: ", user);
    async function getData() {
      if (!authedSession && checkUser) {
        try {
          const response = await axios.post("http://localhost:8080/api/auth", {
            withCredentials: true,
          });
          window.location.reload();
          console.log(response.data);
        } catch (err) {
          console.log("Error: " + err);
        }
      }
    }
    getData();
  });

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
    axios.delete("http://localhost:8080/api/clear-cookies");
    axios
      .get("http://localhost:8080/api/logout", {
        headers: { "Content-Type": "application/json" },
        withCredential: true,
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
