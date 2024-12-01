import React, { useState, useEffect } from 'react';
import { SearchBar } from './components/SearchBar';
import { WeatherDisplay } from './components/WeatherDisplay';
import { Favorites } from './components/Favorites';
import { WeatherData, FavoriteCity } from './types/weather';
import { fetchWeatherData, getFavorites, addFavorite, removeFavorite } from './services/api';
import { Star } from 'lucide-react';

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [favorites, setFavorites] = useState<FavoriteCity[]>([]);
  const [unit, setUnit] = useState<'C' | 'F'>('C');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const lastCity = localStorage.getItem('lastCity');
    if (lastCity) {
      handleSearch(lastCity);
    }
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const favs = await getFavorites();
      setFavorites(favs);
    } catch (err) {
      setError('Failed to load favorites');
    }
  };

  const handleSearch = async (city: string) => {
    try {
      setError('');
      const data = await fetchWeatherData(city);
      setWeatherData(data);
      localStorage.setItem('lastCity', city);
    } catch (err) {
      setError('Failed to fetch weather data');
    }
  };

  const handleAddFavorite = async () => {
    if (!weatherData) return;
    try {
      await addFavorite(weatherData.city);
      await loadFavorites();
    } catch (err) {
      setError('Failed to add to favorites');
    }
  };

  const handleRemoveFavorite = async (id: number) => {
    try {
      await removeFavorite(id);
      await loadFavorites();
    } catch (err) {
      setError('Failed to remove from favorites');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-3xl font-bold mb-6">Weather Dashboard</h1>
          <div className="flex items-center gap-4 mb-6">
            <SearchBar onSearch={handleSearch} />
            <button
              onClick={() => setUnit(unit === 'C' ? 'F' : 'C')}
              className="px-4 py-2 bg-white rounded-lg shadow-sm hover:bg-gray-50"
            >
              °{unit}
            </button>
          </div>
          {error && (
            <p className="text-red-500 mb-4">{error}</p>
          )}
          {weatherData && (
            <button
              onClick={handleAddFavorite}
              className="flex items-center gap-2 text-yellow-500 hover:text-yellow-600"
            >
              <Star />
              Add to favorites
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            {weatherData && <WeatherDisplay data={weatherData} unit={unit} />}
          </div>
          <div>
            <Favorites
              favorites={favorites}
              onSelect={handleSearch}
              onRemove={handleRemoveFavorite}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;