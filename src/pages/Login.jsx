import React, { useState } from "react";
import axios from "axios";
import PropTypes, { number } from "prop-types";
import { useNavigate } from "react-router-dom";
import Page from "../components/Page";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

const Login = ({ setIsUser, setUser }) => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // TODO:
    // const isValid = validateInput(username, password);
    // if (!isValid) setErrorMsg("Incorrect username or password");
    // else {
    //   ...make api call...
    // }

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
      setUsername("");
      setPassword("");

      navigate("/");
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
    }
  };

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
            <Form onSubmit={handleSubmit}>
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
                  onClick={handleSubmit}
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
  setUser: PropTypes.func.isRequired,
};

Login.defaultProps = {
  setUser: "",
};
