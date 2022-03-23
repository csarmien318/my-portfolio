import { Outlet } from "react-router-dom";
import { Header } from "./Header";

export const Wrapper = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};
