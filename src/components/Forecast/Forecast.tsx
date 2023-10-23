import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import "./forecast.css";

export type ForecastData = {
  forecastData: any;
};
const Forecast: React.FC<ForecastData> = ({ forecastData }) => {
  const extractTime = (datetimeString: string) => {
    const dateObj = new Date(datetimeString);
    const hours = dateObj.getHours().toString().padStart(2, "0");
    const minutes = dateObj.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  return (
    <ul className="forecast">
      {forecastData?.list.slice(1, 7).map((item: any, index: number) => {
        const time = extractTime(item.dt_txt);

        return (
          <li className="forecast-item" key={index}>
            <span className="time">
              <FontAwesomeIcon icon={faClock} className="icon-clock" />
              {time}
            </span>

            <img
              src={`icons/${item.weather[0].icon}.png`}
              alt="icon"
              className="icon-image"
            />

            <span className="temperature">
              {Math.round(item?.main?.temp - 273.15)} °C
            </span>

            <span className="text">{item?.weather[0]?.main}</span>
          </li>
        );
      })}
    </ul>
  );
};

export default Forecast;
