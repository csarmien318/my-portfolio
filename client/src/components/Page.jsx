import React from "react";
import { Container } from "react-bootstrap";
import Jumbotron from "../components/Jumbotron";

export const Page = ({ title, children }) => {
  return (
    <React.Fragment>
      <Jumbotron title={title} />
      <Container
        fluid="xxl"
        // style={{
        //   width: "100vw",
        //   maxHeight: "min-content",
        //   height: "auto",
        // }}
      >
        {children}
      </Container>
    </React.Fragment>
  );
};
