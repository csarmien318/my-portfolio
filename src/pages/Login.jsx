import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Page from "../components/Page";
import useAuth from "../hooks/useAuth";
import useLogin from "../hooks/useLogin";

const Login = () => {
  const navigate = useNavigate();

  const formSubmit = async () => {
    await handleLogin(username, password);

    setUsername("");
    setPassword("");

    navigate("/");
  };

  const {
    username,
    password,
    setUsername,
    setPassword,
    handleChange,
    handleSubmit,
  } = useLogin(formSubmit);
  const { handleLogin } = useAuth();

  return (
    <Page title="Login">
      <div
        className="container-md col-4"
        style={{
          width: "480px",
          marginBottom: "40px",
        }}
      >
        <Card style={{ boxShadow: "-8px 7px 20px 0px grey" }}>
          <Card.Body>
            <Card.Text>
              <em className="lead fs-6">
                To view this website, please enter the credentials provided.
              </em>
            </Card.Text>
            <Form data-testid="loginForm" onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  placeholder="Enter username"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name="password"
                  type="password"
                  placeholder="Password"
                  onChange={handleChange}
                />
              </Form.Group>
              <div className="d-flex justify-content-center">
                <Button
                  className="submit col-3"
                  variant="primary"
                  type="submit"
                  value="Submit"
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
