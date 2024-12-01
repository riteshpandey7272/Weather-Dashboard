export interface WeatherData {
  city: string;
  current: {
    temp: number;
    humidity: number;
    windSpeed: number;
    description: string;
    icon: string;
  };
  forecast: Array<{
    date: string;
    temp: number;
    humidity: number;
    description: string;
    icon: string;
  }>;
}

export interface FavoriteCity {
  id: number;
  name: string;
}