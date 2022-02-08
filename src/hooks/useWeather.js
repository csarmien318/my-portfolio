import { useState } from "react";
import axios from "axios";

const baseUrl = "https://api.weatherapi.com/v1/current.json";
const apiKey = "3a85ac2320ee43aba5f220038220302";

const useWeather = () => {
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false);
  const [weather, setWeather] = useState(null);

  const getData = async (location) => {
    try {
      await axios(`${baseUrl}`, {
        params: { key: apiKey, q: location },
      });
    } catch (error) {
      if (location === "") {
        setError("Enter a city");
        console.log(error);
      } else if (error.response && error.response.status >= "400") {
        setError("City not found");
        console.log(error);
      } else {
        console.log("Logging error...", error);
        alert("An unexpected error occurred.");
      }
      setLoader(false);
      return;
    }
    return await axios(`${baseUrl}`, {
      params: { key: apiKey, q: location },
    });
  };

  const gatherData = (data) => {
    setLoader(false);
    setWeather({
      city: data.location.name,
      state: data.location.region,
      country: data.location.country,
      temperature: data.current.temp_f,
      conditions: data.current.condition.text,
      icon: data.current.condition.icon,
    });
    console.log(data);
    console.log(
      `Showing weather for ${data.location.name}, ${data.location.region}`
    );
    console.log("Temperature: ", data.current.temp_f, "degrees Fahrenheit");
    console.log("Conditions: ", data.current.condition.text);
  };

  const submitRequest = async (location) => {
    setLoader(true);
    setError(false);

    const response = await getData(location);
    if (!response) return;

    const { data } = response;
    gatherData(data);
  };

  return {
    error,
    loader,
    weather,
    submitRequest,
  };
};

export default useWeather;
