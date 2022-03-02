import React from "react";
import { Page } from "../components/Page";
import { Container, Row } from "react-bootstrap";

const Home = () => {
  return (
    <Page title="Welcome">
      <Container className="col-10" style={{ minWidth: "auto" }}>
        <Row>
          <p className="display-5 fw-light" style={{ color: "rgb(0, 0, 0)" }}>
            A brief message...
          </p>
          <figure>
            <blockquote className="blockquote">
              <p className="lead">
                This website was created to serve as a portfolio showcasing my
                full-stack software development capabilities. In case you're
                wondering, I am the sole creator and contributor of everything
                shown here - feel free to check out the code on{" "}
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
        </Row>
      </Container>
    </Page>
  );
};

export default Home;
