import { useLayoutEffect } from "react";
import { useLocation } from "react-router";

const RestoreScroll = (props) => {
  const location = useLocation();
  useLayoutEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [location.pathname]);

  return <>{props.children}</>;
};

export default RestoreScroll;
