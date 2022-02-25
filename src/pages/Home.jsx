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
            <blockquote class="blockquote">
              <p className="lead">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit , sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </blockquote>
            <figcaption class="blockquote-footer">
              Christopher Sarmiento, <cite title="Source Title">Creator</cite>
            </figcaption>
          </figure>
        </Row>
      </Container>
    </Page>
  );
};

export default Home;
