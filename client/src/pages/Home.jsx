import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Aos from "aos";
import Page from "../components/Page";
import styles from "../css/Home.module.css";
import "aos/dist/aos.css";

const Home = () => {
  useEffect(() => {
    Aos.init({ duration: 1000, once: true });
  }, []);

  return (
    <Page title="Welcome">
      <Container fluid="md" className={`lead ${styles.container}`}>
        <Row
          style={{
            marginBottom: "60%",
            flexWrap: "wrap-reverse",
          }}
        >
          <Col md={8}>
            <p className="display-5 fw-light">A brief message...</p>
            <figure>
              <blockquote className="blockquote">
                <p className="lead">
                  This website was created to serve as a portfolio showcasing my
                  <em> full-stack software development</em> capabilities. In
                  case you're wondering, I am the sole creator and contributor
                  of everything shown here - feel free to check out the code on{" "}
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
                This project was built using the{" "}
                <strong>
                  <em>MERN Stack</em> (MongoDB, ExpressJS, ReactJS,
                </strong>{" "}
                and <strong>NodeJS)</strong> web development framework. In
                addition, <strong>Mongoose, Axios, CORS, </strong> and
                implementation of <strong>middleware</strong> were used to
                create server-side functionality. All code was tested using{" "}
                <strong>React Testing Library, Jest</strong> and{" "}
                <strong>Mock Service Worker</strong> to mock API calls.
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
              about me - all of which were styled using Bootstrap and CSS.
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
              <li>Performing API calls to read data stored in MongoDB</li>
              <li>Tabulating, sorting, and paginating data</li>
              <li>Bootstrap styling and CSS formatting</li>
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
                API requests, query parameters, responses, and error handling
              </li>
              <li>Organizing and dynamically displaying received data</li>
              <li>Bootstrap Styling and CSS formatting</li>
            </ul>
          </Col>
          <Col md={4}>
            <div className={styles.cloudImg} />
          </Col>
        </Row>
        <Row data-aos="fade-up" style={{ marginBottom: "10%" }}>
          <Col md={2} lg={3} xl={2}>
            <div className={styles.contactImg} />
          </Col>
          <Col md={4} lg={1} xl={1} />
          <Col md={6} lg={8} xl={9}>
            <p className="display-5 fw-light">Contact and Login</p>
            <p>
              Lastly, I included a contact me section as well as an initial
              login page to prevent unwanted users from entering this site. The
              following was applied to either one or the other, or both:
            </p>
            <ul>
              <li>
                Defining API endpoints and applying CRUD operations on data in
                MongoDB
              </li>
              <li>
                Form validation, error handling, user authentication and
                authorization
              </li>
              <li>
                Generating access and refresh JSON web tokens stored as httpOnly
                cookies
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
