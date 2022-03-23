import React, { useState } from "react";
import useWeather from "../hooks/useWeather";
import { Page } from "../components/Page";
import styles from "../css/Weather.module.css";
import Moment from "moment";
import { Button, Card, Container, Form, Placeholder } from "react-bootstrap";

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
    <Page title="Weather">
      <Container className="col-6" style={{ width: "auto", maxWidth: "580px" }}>
        <Card className={styles.card}>
          <Card.Body className={styles.backdrop}>
            {!loader && (
              <Form className="text-center" onSubmit={onSubmit}>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Enter a city or zip code"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    style={{ fontSize: "1rem" }}
                    required
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  size="sm"
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
                <Placeholder xs={12} bg="dark" size="lg" />
              </Placeholder>
            )}
            {!error && weather && (
              <div style={{ marginTop: "16px" }}>
                <Card className={styles.box} bsPrefix>
                  <Card.Title>
                    <p className="lead fs-4">{`Weather for ${weather.city}${
                      weather.state && weather.city !== weather.state
                        ? ", " + weather.state
                        : ""
                    }, ${weather.country}`}</p>
                    <i className="lead fs-6">
                      {`(last updated on ${Moment(weather.date).format(
                        "MMMM D, YYYY, h:mm A"
                      )} - date & time in ${weather.city})`}
                    </i>
                  </Card.Title>
                  <Card.Body>
                    <Container className={styles.weatherBox} bsPrefix>
                      <div>
                        <h1>{`${Math.round(weather.temperature)} \xB0F `}</h1>
                        <p
                          className="lead"
                          style={{ fontSize: "1rem", fontStyle: "italic" }}
                        >{`Feels like ${Math.round(
                          weather.feelsLike
                        )} \xB0F`}</p>
                        <Card.Img src={weather.icon} style={{ width: "70%" }} />
                      </div>
                      <div
                        className="lead"
                        style={{
                          textAlign: "left",
                          fontSize: "1rem",
                          fontStyle: "italic",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                        }}
                      >
                        <p>{`${weather.conditions}`}</p>
                        {weather.precipitation ? (
                          <p>{`Precipitation: ${weather.precipitation} in`}</p>
                        ) : (
                          ""
                        )}
                        <p>{`Humidity: ${weather.humidity}%`}</p>
                        <p>{`Wind speed: ${weather.windSpeed} mph`}</p>
                        <p>{`Wind direction: ${weather.windDirection}`}</p>
                        <p>{`Pressure: ${weather.pressure} inHg`}</p>
                        <p>{`Visibility: ${weather.visibility} mi`}</p>
                        <p>{`UV index: ${weather.uvIndex}`}</p>
                      </div>
                    </Container>
                  </Card.Body>
                </Card>
              </div>
            )}
          </Card.Body>
        </Card>
      </Container>
    </Page>
  );
};

export default Weather;
