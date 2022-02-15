import React, { useState } from "react";
import useWeather from "../hooks/useWeather";
import { Page } from "../components/Page";
import styles from "../css/Weather.module.css";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Placeholder,
  Row,
} from "react-bootstrap";

const Weather = () => {
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
        <Card className={styles.card} bsPrefix>
          <Card.Header className={styles.header} as="h4" bsPrefix>
            Weather App
          </Card.Header>
          <Card.Body>
            {!loader && (
              <Form className="text-center" onSubmit={onSubmit}>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Enter a city or zip code"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    style={{ fontSize: "1.2rem" }}
                    required
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  onClick={onSubmit}
                  disabled={!location ? true : false}
                >
                  Get Weather
                </Button>
              </Form>
            )}
            {error && (
              <h5 className={styles.error} role="alert">
                {error}
              </h5>
            )}
            {loader && (
              <Placeholder as="p" animation="glow">
                <Placeholder xs={12} bg="light" size="lg" />
              </Placeholder>
            )}
            {!error && weather && (
              <div style={{ margin: "20px" }}>
                <Card className={styles.box} bsPrefix>
                  <Card.Title as="h5" className={styles.boxTitle}>{`${
                    weather.city
                  }${
                    weather.state && weather.city !== weather.state
                      ? ", " + weather.state
                      : ""
                  }, ${weather.country}`}</Card.Title>
                  <Card.Body>
                    <Container className={styles.weatherBox} bsPrefix>
                      <div>
                        <h1>{`${Math.round(weather.temperature)} \xB0F `}</h1>
                        <p>{`Feels like ${Math.round(
                          weather.feelsLike
                        )} \xB0F`}</p>
                        <Card.Img src={weather.icon} />
                      </div>
                      <div style={{ textAlign: "left", fontSize: "1.5rem" }}>
                        <p>{`${weather.conditions}`}</p>
                        <p>{`Humidity: ${weather.humidity}%`}</p>
                        <p>{`Wind speed: ${weather.windSpeed} mph`}</p>
                        <p>{`Wind direction: ${weather.windDirection}`}</p>
                        <p>{`Visibility: ${weather.visibility} mi`}</p>
                        <p>{`UV Index: ${weather.uvIndex}`}</p>
                      </div>
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

export default Weather;
