import React from "react";
import Jumbotron from "../components/Jumbotron";
import { Container } from "react-bootstrap";

const Page = ({ title, children }) => {
  return (
    <React.Fragment>
      <Jumbotron title={title} />
      <Container fluid="xxl">{children}</Container>
    </React.Fragment>
  );
};

export default Page;
