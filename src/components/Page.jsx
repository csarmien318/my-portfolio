import React from "react";
import { Container } from "react-bootstrap";
import Jumbotron from "../components/Jumbotron";

const Page = ({ title, children }) => {
  return (
    <React.Fragment>
      <Jumbotron title={title} />
      <Container fluid="xxl">{children}</Container>
    </React.Fragment>
  );
};

export default Page;
