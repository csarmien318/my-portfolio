import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const isAuthed = cookies.get("isAuthed");

axios.defaults.withCredentials = true;

const useAuth = () => {
  const [isUser, setIsUser] = useState(isAuthed);
  const [user, setUser] = useState(localStorage.getItem("user"));
  const checkUser = localStorage.getItem("user");

  useEffect(() => {
    async function getData() {
      let mounted = true;
      await axios
        .post("http://localhost:8080/api/auth", {
          withCredentials: true,
        })
        .then((response) => {
          if (mounted && response) {
            setUser(checkUser);
            setIsUser(true);
            // return response.data;
          }
          // return handleLogout();
        });
      return () => {
        mounted = false;
      };
    }
    getData();
  }, []);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      if (checkUser) {
        console.log("checkUser: ", checkUser);
        const currentUser = JSON.parse(checkUser);
        setUser(currentUser);
      } else {
        setUser();
      }
    }
    return () => {
      mounted = false;
    };
  }, [isUser]);

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
