
Front End Assignment for Associate Software Developer at Aviara Labs

# Weather Dashboard

A React-based weather dashboard application that shows current weather and 5-day forecast for cities worldwide.

## Features

- Search for cities to view weather information
- View current weather conditions including temperature, humidity, and wind speed
- See 5-day weather forecast
- Save favorite cities
- Toggle between Celsius and Fahrenheit
- Remembers last searched city
- Responsive design

## Prerequisites

- Node.js 
- npm or yarn
- OpenWeatherMap API key

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Get an API key from [OpenWeatherMap](https://openweathermap.org/api)
4. Update the API key in `src/services/api.ts`:
   ```typescript
   const WEATHER_API_KEY = '7d3a8f1edb50267eca4ccdadb3d22f10';
   ```
5. Start the JSON server (for favorites functionality):
   ```bash
   npm run server
   ```
6. Start the development server:
   ```bash
   npm run dev
   ```

## Technologies Used

- React
- TypeScript
- Tailwind CSS
- Axios
- JSON Server
- Lucide React Icons

## API Reference

This project uses the OpenWeatherMap API. You'll need to sign up for a free API key at [https://openweathermap.org/api](https://openweathermap.org/api).

## License

MIT# Weather-Dashboard
