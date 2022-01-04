import React from "react";

const Like = ({ liked, onClick }) => {
  let classes = "fa fa-heart";
  if (!liked) classes += "-o";
  return (
    <i
      className={classes}
      style={{ cursor: "pointer" }}
      onClick={onClick}
      aria-hidden="true"
    ></i>
  );
};

export default Like;
