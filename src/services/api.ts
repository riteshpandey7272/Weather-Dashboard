import axios from 'axios';
import { WeatherData, FavoriteCity } from '../types/weather';

const WEATHER_API_KEY = '7d3a8f1edb50267eca4ccdadb3d22f10'; // Replace with actual API key
const WEATHER_API_BASE = 'https://api.openweathermap.org/data/2.5';
const JSON_SERVER_BASE = 'http://localhost:3001';

export const fetchWeatherData = async (city: string): Promise<WeatherData> => {
  const currentResponse = await axios.get(
    `${WEATHER_API_BASE}/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`
  );

  const forecastResponse = await axios.get(
    `${WEATHER_API_BASE}/forecast?q=${city}&appid=${WEATHER_API_KEY}&units=metric`
  );

  const current = {
    temp: currentResponse.data.main.temp,
    humidity: currentResponse.data.main.humidity,
    windSpeed: currentResponse.data.wind.speed,
    description: currentResponse.data.weather[0].description,
    icon: currentResponse.data.weather[0].icon,
  };

  const forecast = forecastResponse.data.list
    .filter((_: any, index: number) => index % 8 === 0)
    .slice(0, 5)
    .map((item: any) => ({
      date: new Date(item.dt * 1000).toLocaleDateString(),
      temp: item.main.temp,
      humidity: item.main.humidity,
      description: item.weather[0].description,
      icon: item.weather[0].icon,
    }));

  return {
    city,
    current,
    forecast,
  };
};

export const getFavorites = async (): Promise<FavoriteCity[]> => {
  const response = await axios.get(`${JSON_SERVER_BASE}/favorites`);
  return response.data;
};

export const addFavorite = async (city: string): Promise<FavoriteCity> => {
  const response = await axios.post(`${JSON_SERVER_BASE}/favorites`, { name: city });
  return response.data;
};

export const removeFavorite = async (id: number): Promise<void> => {
  await axios.delete(`${JSON_SERVER_BASE}/favorites/${id}`);
};