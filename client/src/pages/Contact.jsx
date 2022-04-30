import React from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useContact } from "../hooks/useContact";
import Page from "../components/Page";

const Contact = () => {
  const { handleChange, handleSubmit, errors, submitted } = useContact();

  return (
    <Page title="Contact Me">
      <div
        className="container-md col-4"
        style={{ width: "440px", marginBottom: "40px" }}
      >
        <Card style={{ boxShadow: "-8px 7px 20px 0 grey" }}>
          <Card.Body>
            {submitted && <p>sending...</p>}
            <Form data-testid="contactForm" onSubmit={handleSubmit}>
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
                data-testid="contactBtn"
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
