import { useState } from "react";
import axios from "axios";

const baseUrl = "https://api.weatherapi.com/v1/current.json";
const apiKey = process.env.REACT_APP_API_KEY;

const useWeather = () => {
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false);
  const [weather, setWeather] = useState(null);

  const getData = async (location) => {
    try {
      await axios(`${baseUrl}`, {
        withCredentials: false,
        params: { key: apiKey, q: location },
      });
    } catch (error) {
      if (location === "") {
        setError("Enter a city");
        console.log(error);
      } else if (error.response && error.response.status >= "400") {
        setError("Sorry, we couldn't find the city you entered.");
        console.log(error);
      } else {
        setError("An unexpected error occurred.");
        console.log(error);
      }
      setLoader(false);
      return;
    }
    return await axios(`${baseUrl}`, {
      withCredentials: false,
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
      precipitation: data.current.precip_in,
      icon: data.current.condition.icon,
      humidity: data.current.humidity,
      feelsLike: data.current.feelslike_f,
      windSpeed: data.current.wind_mph,
      windDirection: data.current.wind_dir,
      pressure: data.current.pressure_in,
      visibility: data.current.vis_miles,
      uvIndex: data.current.uv,
      date: data.current.last_updated,
    });
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
