import React from "react";
import Page from "../components/Page";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Col, Container, Nav, Row } from "react-bootstrap";
import styles from "../css/About.module.css";
import ResumeModal from "../components/ResumeModal";

const About = () => {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <Page title="About Me">
      <Container className="lead">
        <Row>
          <Col md={6}>
            <Card className={styles.boxPs} style={{ width: "auto" }}>
              <Card.Body>
                <Card.Title className={`lead fs-2 ${styles.cardTitle}`}>
                  Personal Statement
                </Card.Title>
                <Card.Text className={styles.cardText}>
                  If it involves problem solving, exploring logical approaches,
                  learning new systems, and working on a team of people as eager
                  as I am to find solutions, count me in!
                </Card.Text>
              </Card.Body>
            </Card>
            <Card className={styles.boxPro} style={{ width: "auto" }}>
              <Card.Body>
                <Card.Title className={`lead fs-2 ${styles.cardTitle}`}>
                  Professional Experience
                </Card.Title>
                <Card.Text className={styles.cardText}>
                  <strong>Mater Academy Charter High School</strong>
                  <ul>
                    <li>Advanced Placement Chemistry Teacher</li>
                    <li>August 2019 - August 2021</li>
                  </ul>
                  <strong>HomeDepot</strong>
                  <ul>
                    <li>Contractor Services Manager</li>
                    <li>May 2013 - February 2015</li>
                  </ul>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className={styles.boxEdu} style={{ width: "auto" }}>
              <Card.Body>
                <Card.Title className={`lead fs-2 ${styles.cardTitle}`}>
                  Education
                </Card.Title>
                <Card.Text className={styles.cardText}>
                  <strong>University of Florida</strong>
                  <ul>
                    <li>Bachelor of Science in Chemistry</li>
                    <li>Awarded Cum Laude - GPA: 3.81 of 4.00</li>
                    <li>Graduation Date: December 2018</li>
                  </ul>
                </Card.Text>
              </Card.Body>
            </Card>
            <Card className={styles.boxSkill} style={{ width: "auto" }}>
              <Card.Body>
                <Card.Title className={`lead fs-2 ${styles.cardTitle}`}>
                  Skills
                </Card.Title>
                <Card.Text className={styles.cardText}>
                  <ul>
                    <li>Strong analytical and problem-solving skills</li>
                    <li>
                      Effective verbal communication and interpretation of
                      abstract data
                    </li>
                    <li>Fluent in Spanish</li>
                  </ul>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Button
            variant="primary"
            onClick={() => setModalShow(true)}
            style={{ margin: "10px 5px 30px 0", width: "126px" }}
          >
            View Resume
          </Button>
          <ResumeModal show={modalShow} onHide={() => setModalShow(false)} />
        </Row>
      </Container>
    </Page>
  );
};

export default About;
