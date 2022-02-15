import React from "react";

export const Page = ({ title, children }) => {
  return (
    <div style={{ height: "50vh" }}>
      <h2>{title}</h2>
      {children}
    </div>
  );
};
