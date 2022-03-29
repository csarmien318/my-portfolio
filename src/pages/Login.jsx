import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Page from "../components/Page";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

const Login = ({ authenticate, user, setUser }) => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      // const user = { username, password };
      // const response = await axios.post("/api/login", user);
      const response = await axios.post(
        "/api/login",
        JSON.stringify({ username, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response.data));
      setUser(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
      const accessToken = response?.data?.accessToken;
      const refreshToken = response?.data?.refreshToken;
      // setUser({ username: username, token: refreshToken });

      await axios.post(
        "/api/token",
        JSON.stringify({ username, refreshToken }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      setUsername("");
      setPassword("");
      // authenticate();
      navigate("/");
      // window.location.reload();
    } catch (err) {
      if (!err?.response) {
        setErrorMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrorMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrorMsg("Incorrect username or password");
        console.log("Incorrect username or password");
      } else {
        setErrorMsg("Login Failed");
      }
      // setUser({ username: "", token: "" });
    }
  };

  return (
    <Page title="Login">
      <div
        className="container-md col-4"
        style={{ width: "480px", marginBottom: "40px" }}
      >
        <Card>
          <Card.Body>
            <Card.Text>
              <em className="lead fs-6">
                To view this website, please enter the credentials provided.
              </em>
              {errorMsg && (
                <p
                  className="text-danger text-center"
                  style={{ paddingTop: "10px" }}
                >
                  {errorMsg}
                </p>
              )}
            </Card.Text>
            <Form onSubmit={onSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  value={username}
                  type="text"
                  placeholder="Enter username"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  value={password}
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <div className="d-flex justify-content-center">
                <Button
                  className="col-3"
                  variant="primary"
                  type="submit"
                  onClick={onSubmit}
                  disabled={username && password ? false : true}
                >
                  Submit
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </Page>
  );
};

export default Login;

Login.propTypes = {
  authenticate: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};
