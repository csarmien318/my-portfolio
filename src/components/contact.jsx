import React from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";

class Contact extends React.Component {
  render() {
    return (
      <div className="container col-5">
        <Card>
          <Card.Header>Contact Me</Card.Header>
          <Card.Body>
            <Form>
              <Form className="mb-3">
                <Row>
                  <Col>
                    <Form.Control placeholder="Full name" />
                  </Col>
                  <Col>
                    <Form.Control placeholder="Company (optional)" />
                  </Col>
                </Row>
              </Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  required
                  isInvalid
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a valid email (ex: johndoe@email.com).
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
                  rows={3}
                  placeholder="Write your message here..."
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default Contact;
