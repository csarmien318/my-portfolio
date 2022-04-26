import React from "react";
import Page from "../components/Page";
import { useContact } from "../hooks/useContact";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import useAuth from "../hooks/useAuth";

const Contact = () => {
  const {} = useAuth();
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

// const formSubmit = async () => {
//   console.log("Form Values: ", values);

//   try {
//     await axios.post("http://localhost:8080/api/save", values, {
//       headers: { "Content-Type": "application/json" },
//       withCredentials: true,
//     });
//     alert("Your response was submitted, thank you for reaching out!");
//     window.location.reload();
//     console.log("Data has been sent to the server");
//   } catch (error) {
//     if (error.response.status === 401) {
//       window.location.reload();
//       alert(
//         "Your session expired before submitting the form - reauthentication successful. Please resubmit the form."
//       );
//       return;
//     }
//     if (error.response.status === 403) {
//       alert("Forbidden");
//       window.location.reload();
//     } else {
//       alert("An internal server error occurred.");
//       window.location.reload();
//     }
//   }
// await axios
//   .post("http://localhost:8080/api/save", values, {
//     headers: { "Content-Type": "application/json" },
//     withCredentials: true,
//   })
//   .then(() => {
//     alert("Your response was submitted, thank you for reaching out!");
//     window.location.reload();
//     console.log("Data has been sent to the server");
//   })
//   .catch((error) => {
//     if (error.response.status === 401) {
//       window.location.reload();
//       alert(
//         "Your session expired before submitting the form - reauthentication successful. Please resubmit the form."
//       );
//       return;
//     }
//     if (error.response.status === 403) {
//       alert("Forbidden");
//     } else {
//       alert("An internal server error occurred.");
//     }
//     window.location.reload();
//   });
// };
//
// const { handleChange, handleSubmit, values, errors } = useContact(formSubmit);
