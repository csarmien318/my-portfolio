import React from "react";

export const Page = ({ title, children }) => {
  return (
    <div style={{ padding: "15px 20px" }}>
      <h2>{title}</h2>
      {children}
    </div>
  );
};
