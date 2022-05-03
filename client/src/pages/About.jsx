import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Page from "../components/Page";
import ResumeModal from "../components/ResumeModal";
import styles from "../css/About.module.css";

const About = () => {
  const [modalShow, setModalShow] = useState(false);

  const handleClick = () => {
    setModalShow(true);
  };

  return (
    <Page title="About Me">
      <Container className="lead">
        <Row>
          <Col md={6}>
            <Card
              data-testid="aboutMeCards"
              className={styles.cardBox}
              style={{ margin: "none" }}
            >
              <Card.Body>
                <Card.Title className={`lead fs-2 ${styles.cardTitle}`}>
                  Personal Statement
                </Card.Title>
                <Card.Text className={styles.cardText}>
                  If it involves <strong>problem solving</strong>, exploring{" "}
                  <strong>logical approaches</strong>, <strong>learning</strong>{" "}
                  new systems, and <strong>working on a team</strong> of people
                  as eager as I am to <strong>find solutions</strong>, count me
                  in!
                </Card.Text>
              </Card.Body>
            </Card>
            <Card
              data-testid="aboutMeCards"
              className={styles.cardBox}
              style={{ marginTop: "40px" }}
            >
              <Card.Body>
                <Card.Title className={`lead fs-2 ${styles.cardTitle}`}>
                  Professional Experience
                </Card.Title>
                <div className={styles.cardText}>
                  <strong>Advanced Placement Chemistry Teacher</strong>
                  <ul>
                    <li>Mater Academy Charter High: Aug '19 - Aug '21</li>
                  </ul>
                  <strong>Contractor Services Manager</strong>
                  <ul>
                    <li>The Home Depot: May '13 - Feb '15</li>
                  </ul>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card
              data-testid="aboutMeCards"
              className={styles.cardBox}
              style={{ marginTop: "40px" }}
            >
              <Card.Body>
                <Card.Title className={`lead fs-2 ${styles.cardTitle}`}>
                  Education
                </Card.Title>
                <div className={styles.cardText}>
                  <strong>University of Florida</strong>
                  <ul>
                    <li>Bachelor of Science in Chemistry</li>
                    <li>
                      Awarded <em>Cum Laude</em> -{" "}
                      <em>
                        GPA: <strong>3.81</strong> of 4.00
                      </em>
                    </li>
                    <li>Graduated December 2018</li>
                  </ul>
                </div>
              </Card.Body>
            </Card>
            <Card
              data-testid="aboutMeCards"
              className={styles.cardBox}
              style={{ margin: "40px 0 20px 0" }}
            >
              <Card.Body>
                <Card.Title className={`lead fs-2 ${styles.cardTitle}`}>
                  Skills
                </Card.Title>
                <div className={styles.cardText}>
                  <ul>
                    <li>
                      Strong <strong>analytical</strong> and{" "}
                      <strong>problem-solving</strong> skills
                    </li>
                    <li>
                      Effective verbal <strong>communication</strong> and{" "}
                      <strong>interpretation</strong> of abstract data
                    </li>
                    <li>
                      <strong>Bilingual</strong> proficiency in{" "}
                      <strong>Spanish</strong>
                    </li>
                  </ul>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Button
            variant="primary"
            onClick={handleClick}
            style={{ margin: "30px 5px 30px 0", width: "126px" }}
          >
            View Resume
          </Button>
          <ResumeModal
            data-testid="modalInAbout"
            modalShow={modalShow}
            setModalShow={setModalShow}
          />
        </Row>
      </Container>
    </Page>
  );
};

export default About;
