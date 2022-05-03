import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Aos from "aos";
import Page from "../components/Page";
import styles from "../css/Home.module.css";
import "aos/dist/aos.css";

const Home = () => {
  useEffect(() => {
    Aos.init({
      startEvent: "scroll",
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <Page title="Welcome">
      <Container fluid="md" className={`lead ${styles.container}`}>
        <Row
          data-aos=""
          style={{
            marginBottom: "30%",
            flexWrap: "wrap-reverse",
          }}
        >
          <Col md={8}>
            <p className="display-5 fw-light">A brief message...</p>
            <figure>
              <blockquote className="blockquote">
                <p className="lead">
                  This website was created to serve as a portfolio showcasing my
                  <em> full-stack software development</em> capabilities.
                  Moreover, this application marks the start of my journey into
                  software engineering as a self-educated individual in the
                  field.
                  <br />
                </p>
                <p>
                  In case you're wondering,{" "}
                  <em>I am the sole contributor and creator</em> of this
                  application - feel free to check out the code on{" "}
                  <a
                    style={{ textDecoration: "none" }}
                    href="https://github.com/csarmien318/my-portfolio.git"
                    target="_blank"
                  >
                    my github
                  </a>
                  . Scroll down to get started!
                </p>
              </blockquote>
              <figcaption className="blockquote-footer">
                Christopher Sarmiento, <cite title="Source Title">Creator</cite>
              </figcaption>
            </figure>
          </Col>
          <Col md={4}>
            <div className={styles.shardsImg}></div>
          </Col>
        </Row>
        <Row data-aos="fade-up" style={{ marginBottom: "30%" }}>
          <Col md={2} lg={3} xl={2}>
            <div className={styles.logoImg} />
          </Col>
          <Col md={4} lg={1} xl={1} />
          <Col md={6} lg={8} xl={9}>
            <div className={styles.box1}>
              <p className="display-5 fw-light">Introduction</p>
              <p>
                This application was written primarily in{" "}
                <strong>JavaScript</strong> and built using the{" "}
                <strong>
                  <em>MERN Stack</em> (MongoDB, Express, React, Node)
                </strong>{" "}
                web development framework. In addition,{" "}
                <strong>authentication middleware</strong> for generating{" "}
                <strong>JSON web tokens, Mongoose,</strong> and{" "}
                <strong>Cors</strong> were implemented in the server-side layer
                of this app. <br />
              </p>
              <p>
                <strong>
                  <em>Performance testing frameworks</em>
                </strong>{" "}
                such as <strong>React Testing Library, Jest</strong> and{" "}
                <strong>Mock Service Worker</strong> were used to test code
                functionality, detect bugs, and prevent unintended behavior.
                <br />
              </p>
              <p>
                Excluding the home page, this website contains five primary
                routes: <strong>About, Songs, Weather, Contact</strong> and a{" "}
                <strong>Login</strong> page.
                <br />
              </p>
              <p>
                Keep scrolling down for a brief overview about the details of
                each page and their content.
              </p>
            </div>
          </Col>
        </Row>
        <Row
          data-aos="fade-up"
          style={{
            flexWrap: "wrap-reverse",
            marginBottom: "30%",
          }}
        >
          <Col md={8}>
            <p className="display-5 fw-light">About</p>
            <p>
              Fairly self-explanatory. Here you can find my personal statement,
              education, professional experience, and some miscellaneous things
              about me, all of which were styled using{" "}
              <strong>Bootstrap</strong> and <strong>CSS</strong>.
            </p>
          </Col>
          <Col md={2}>
            <div className={styles.personImg} />
          </Col>
        </Row>
        <Row data-aos="fade-up" style={{ marginBottom: "30%" }}>
          <Col md={2} lg={3} xl={2}>
            <div className={styles.musicImg}></div>
          </Col>
          <Col md={4} lg={1} xl={1} />
          <Col md={6} lg={8} xl={9}>
            <p className="display-5 fw-light">Songs</p>
            <p>
              This project is simply just a list of songs organized into a table
              alongside a list group and implements:
            </p>
            <ul>
              <li>
                Performing <strong>API calls</strong> to read data manually
                stored in <strong>MongoDB</strong>
              </li>
              <li>
                <strong>Tabulating, sorting,</strong> and{" "}
                <strong>paginating</strong> data
              </li>
              <li>
                <strong>Bootstrap</strong> styling and <strong>CSS</strong>{" "}
                formatting
              </li>
            </ul>
          </Col>
        </Row>
        <Row
          data-aos="fade-up"
          style={{ flexWrap: "wrap-reverse", marginBottom: "30%" }}
        >
          <Col md={8}>
            <p className="display-5 fw-light">Weather</p>
            <p>
              For this project, I created a basic weather application through{" "}
              <a
                style={{ textDecoration: "none" }}
                href="https://weatherapi.com/"
                target="_blank"
              >
                weatherapi.com
              </a>{" "}
              that gets the weather for a given city. Here's what was
              implemented:
            </p>
            <ul>
              <li>
                <strong>API requests</strong>, <strong>query parameters</strong>
                , <strong>responses</strong>, and{" "}
                <strong>error handling</strong>
              </li>
              <li>
                <strong>Organizing</strong> and{" "}
                <strong>dynamic displaying</strong> of data retrieved
              </li>
              <li>
                <strong>Bootstrap</strong> styling and <strong>CSS</strong>{" "}
                formatting
              </li>
            </ul>
          </Col>
          <Col md={4}>
            <div className={styles.cloudImg} />
          </Col>
        </Row>
        <Row data-aos="fade-up" style={{ marginBottom: "15%" }}>
          <Col md={2} lg={3} xl={2}>
            <div className={styles.contactImg} />
          </Col>
          <Col md={4} lg={1} xl={1} />
          <Col md={6} lg={8} xl={9}>
            <p className="display-5 fw-light">Contact and Login</p>
            <p>
              Lastly, I included a contact me section as well as an initial
              login page to prevent unwanted users from entering this site. The
              following was applied to either one, the other, or both:
            </p>
            <ul>
              <li>
                <strong>Form validation, error handling,</strong> user{" "}
                <strong>authentication</strong> and{" "}
                <strong>authorization</strong>
              </li>
              <li>
                Generating <strong>access</strong> and{" "}
                <strong>refresh JSON web tokens</strong> stored as{" "}
                <strong>httpOnly cookies</strong> sent from the back-end
              </li>
              <li>
                Defining <strong>API endpoints</strong> and applying{" "}
                <strong>CRUD operations</strong> on data in{" "}
                <strong>MongoDB</strong>
              </li>
            </ul>
            <p className="fw-bolder fst-italic text-muted">
              <br />
              <br />
              So, now that you've had a brief walkthrough, feel free to click on
              any of the routes above!
            </p>
          </Col>
        </Row>
      </Container>
    </Page>
  );
};

export default Home;
