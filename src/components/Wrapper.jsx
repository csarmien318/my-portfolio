<<<<<<< HEAD
import React from "react";

export const Wrapper = ({ children }) => {
  return <div>{children}</div>;
=======
import { Outlet } from "react-router-dom";
import { Header } from "./Header";

export const Wrapper = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
>>>>>>> d7b2cb2 (Integrated backend)
};
