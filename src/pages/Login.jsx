import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Page from "../components/Page";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleLogin(username, password);

    setUsername("");
    setPassword("");

    navigate("/");
  };

  const { handleLogin } = useAuth();

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
              {/* {errorMsg && (
                <p
                  className="text-danger text-center"
                  style={{ paddingTop: "10px" }}
                >
                  {errorMsg}
                </p>
              )} */}
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
