import React from "react";
import Jumbotron from "../components/Jumbotron";

export const Page = ({ title, children }) => {
  return (
    <React.Fragment>
      <Jumbotron title={title} />
      <div style={{ padding: "0 20px" }}>{children}</div>
    </React.Fragment>
  );
};
