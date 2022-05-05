import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Page from "../components/Page";
import useAuth from "../hooks/useAuth";
import useLogin from "../hooks/useLogin";
import styles from "../css/Login.module.css";

const Login = () => {
  const formSubmit = async () => {
    const response = await handleLogin(username, password);
    setUsername("");
    setPassword("");
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
      <div className={`container-md col-4 ${styles.container}`}>
        <Card style={{ boxShadow: "-8px 7px 20px 0px grey" }}>
          <Card.Body>
            <div className={styles.textBox}>
              <p className="fs-6 fw-normal lead">
                To view this website, please enter the credentials provided.
              </p>
              <p
                className="text-center fw-light fst-italic"
                style={{ marginTop: "-2%", fontSize: "0.87rem" }}
              >
                (username and password are case-sensitive)
              </p>
            </div>
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
                  className={`submit col-3 ${styles.btn}`}
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
