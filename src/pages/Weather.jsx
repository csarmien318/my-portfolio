import React, { useState } from "react";
import useWeather from "../hooks/useWeather";
import { Page } from "../components/Page";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Placeholder,
  Row,
} from "react-bootstrap";

export const Weather = () => {
  const [location, setLocation] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(location);
  };

  const handleSubmit = (value) => {
    submitRequest(value);
  };

  const { error, loader, weather, submitRequest } = useWeather();

  return (
    <Page>
      <div className="container col-6">
        <Card className="text-center">
          <Card.Header as="h5">Weather App</Card.Header>
          <Card.Body>
            {!loader && (
              <Form className="text-center" onSubmit={onSubmit}>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Enter a city or zip code"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={onSubmit}>
                  Get Weather
                </Button>
              </Form>
            )}
            {error && (
              <div className="error alert" role="alert">
                {error}
              </div>
            )}
            {loader && (
              <Placeholder as="p" animation="glow">
                <Placeholder xs={12} bg="primary" />
              </Placeholder>
            )}
            {weather && (
              <div style={{ margin: "20px" }}>
                <Card>
                  <Card.Body>
                    <Container>
                      <Row>
                        <Col xs={12} md={4}>
                          <div>{`${weather.city}, ${weather.state} ${weather.country}`}</div>
                        </Col>
                        <Col
                          xs={12}
                          md={8}
                          className="d-flex flex-column justify-content-between"
                        >
                          <span>{`${weather.temperature} F`}</span>
                          <span>{weather.conditions}</span>
                        </Col>
                      </Row>
                    </Container>
                  </Card.Body>
                </Card>
              </div>
            )}
          </Card.Body>
        </Card>
      </div>
    </Page>
  );
};
