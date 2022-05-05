import { useEffect, useLayoutEffect } from "react";
import { useLocation } from "react-router";

const RestoreScroll = (props) => {
  const location = useLocation();
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return <>{props.children}</>;
};

export default RestoreScroll;
