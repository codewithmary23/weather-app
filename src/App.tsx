import React, { useEffect, useState } from "react";
import Loader from "./components/Loader/Loader";
import SearchBar from "./components/SearchBar/SearchBar";
import CurrentWeather from "./components/CurrentWeather/CurrentWeather";
import { getForecast, getWeather } from "./services/WeatherService";
import "./App.css";

import clouds from "./assets/images/clouds.jpg";
import fog from "./assets/images/fog.jpg";
import rain from "./assets/images/rain.jpg";
import sky from "./assets/images/sky.jpg";
import snow from "./assets/images/snow.jpg";
import thunder from "./assets/images/thunder.jpg";
import sun from "./assets/images/sun.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarning } from "@fortawesome/free-solid-svg-icons";
import Forecast from "./components/Forecast/Forecast";

const App = () => {
  const [data, setData] = useState<any>(null);
  const [forecastData, setForecastData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const weatherImages: Record<string, string> = {
    "clear sky": sky,
    "few clouds": clouds,
    "scattered clouds": clouds,
    "partly cloudy": clouds,
    "overcast clouds": clouds,
    "broken clouds": clouds,
    "light rain": rain,
    "moderate rain": rain,
    "heavy rain": rain,
    showers: rain,
    thunderstorm: thunder,
    snow: snow,
    mist: fog,
    fog: fog,
    haze: fog,
    smoke: fog,
  };

  const generateBackgroundStyle = {
    backgroundImage: `url(${
      weatherImages[data?.weather[0]?.description] || sun
    })`,
  };

  const getAllData = (cityName: string) => {
    setIsLoading(true);

    getWeather(cityName)
      .then((result) => {
        setData(result.data);

        const lat = result.data.coord.lat;
        const lon = result.data.coord.lon;

        getForecast(lat, lon).then((result) => {
          setForecastData(result.data);
        });
      })
      .catch(() => {
        setErrorMessage("Please enter the correct city name.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleSearch = (city: string) => {
    getAllData(city);
  };

  useEffect(() => {
    const defaultCity = "Belgrade";

    getAllData(defaultCity);
  }, []);

  return (
    <div className="weather-app">
      {isLoading && <Loader />}
      <div className="background" style={generateBackgroundStyle}></div>
      <div className="container">
        {errorMessage && (
          <p className="error-message">
            <FontAwesomeIcon icon={faWarning} className="icon-warning" />
            {errorMessage}
          </p>
        )}
        <SearchBar onSearchClick={handleSearch} />
        <CurrentWeather data={data} />
        <Forecast forecastData={forecastData} />
      </div>
    </div>
  );
};

export default App;
