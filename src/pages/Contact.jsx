import React from "react";
import axios from "axios";
import Page from "../components/Page";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useContact } from "../hooks/useContact";

const Contact = () => {
  const formSubmit = () => {
    console.log("Form Values: ", values);

    axios
      .post("http://localhost:8080/api/save", values, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then(() => {
        alert("Your response was submitted, thank you for reaching out!");
        window.location.reload();
        console.log("Data has been sent to the server");
      })
      .catch((err) => {
        if (err)
          alert(
            "Expired session. Try refreshing the page or logging in to submit the form."
          );
        else console.log("Internal server error");
      });
  };

  const { handleChange, handleSubmit, values, errors, submitted } =
    useContact(formSubmit);

  return (
    <Page title="Contact Me">
      <div
        className="container-md col-4"
        style={{ width: "440px", marginBottom: "40px" }}
      >
        <Card>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <div className="mb-3">
                <Row>
                  <Col>
                    <Form.Control
                      type="text"
                      name="username"
                      placeholder="Your name"
                      onChange={handleChange}
                      isInvalid={errors.username}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.username}
                    </Form.Control.Feedback>
                  </Col>
                  <Col>
                    <Form.Control
                      type="text"
                      name="company"
                      placeholder="Company (optional)"
                      onChange={handleChange}
                    />
                  </Col>
                </Row>
              </div>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  onChange={handleChange}
                  isInvalid={errors.email}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Message</Form.Label>
                <Form.Control
                  as="textarea"
                  type="textarea"
                  name="message"
                  placeholder="Write your message here..."
                  onChange={handleChange}
                  rows={3}
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                value="Submit"
                className="submit"
              >
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </Page>
  );
};

export default Contact;
