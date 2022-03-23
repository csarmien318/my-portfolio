import React from "react";
import { Container } from "react-bootstrap";
import styles from "../css/Jumbotron.module.css";

const Jumbotron = ({ title }) => {
  return (
    <div className={styles.jumbotron}>
      <div className={styles.overlay}></div>
      <Container style={{ textAlign: "center" }}>
        <p
          className="display-2 fw-light"
          style={{ color: "rgb(240, 240, 240)" }}
        >
          {title}
        </p>
      </Container>
    </div>
  );
};

export default Jumbotron;
