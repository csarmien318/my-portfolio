import React, { useState } from "react";
import useWeather from "../hooks/useWeather";
import { Page } from "../components/Page";
import { Button, Card, Form, Placeholder } from "react-bootstrap";

export const Weather = () => {
  const [location, setLocation] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(location);
  };

  const handleSubmit = (value) => {
    submitRequest(value);
  };

  const { error, message, submitRequest } = useWeather();

  return (
    <Page>
      <div className="container col-6">
        <Card className="text-center">
          <Card.Header as="h5">Weather App</Card.Header>
          <Card.Body>
            <Form className="text-center" onSubmit={onSubmit}>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Enter a City"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit" onClick={onSubmit}>
                Get Weather
              </Button>
            </Form>
            <span>
              {error && (
                <div className="error alert" role="alert">
                  {message}
                </div>
              )}
            </span>
          </Card.Body>
        </Card>
      </div>
    </Page>
  );
};
