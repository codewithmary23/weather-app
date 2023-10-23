import axios from "axios";

const apiKey = "YOUR_API_KEY";
const baseUrl = "https://api.openweathermap.org/data/2.5";

const getWeather = (cityName: string) => {
  return axios.get(`${baseUrl}/weather?q=${cityName}&appid=${apiKey}`);
};

const getForecast = (lat: number, lon: number) => {
  return axios.get(`${baseUrl}/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`);
};

export { getWeather, getForecast };
