import React from "react";
import { Page } from "../components/Page";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

const Login = () => {
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
            </Card.Text>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control type="email" placeholder="Enter username" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </Page>
  );
};

export default Login;
