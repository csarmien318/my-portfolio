import { useState } from "react";

const useWeather = () => {
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  const submitRequest = (location) => {
    if (!location || location === "") {
      setError(true);
      setMessage(
        location === "" ? "Please enter a city!" : "An error occurred"
      );
      return;
    }

    setMessage("");
    console.log({ location });
  };

  return {
    error,
    message,
    submitRequest,
    setMessage,
  };
};

export default useWeather;
