import React from 'react';
import { Star, X } from 'lucide-react';
import { FavoriteCity } from '../types/weather';

interface FavoritesProps {
  favorites: FavoriteCity[];
  onSelect: (city: string) => void;
  onRemove: (id: number) => void;
}

export const Favorites: React.FC<FavoritesProps> = ({
  favorites,
  onSelect,
  onRemove,
}) => {
  return (
    <div className="w-full max-w-md">
      <div className="flex items-center mb-4">
        <Star className="text-yellow-500 mr-2" />
        <h2 className="text-xl font-semibold">Favorite Cities</h2>
      </div>
      <div className="space-y-2">
        {favorites.map((city) => (
          <div
            key={city.id}
            className="flex items-center justify-between bg-white rounded-lg shadow-sm p-3"
          >
            <button
              onClick={() => onSelect(city.name)}
              className="text-left flex-grow hover:text-blue-500"
            >
              {city.name}
            </button>
            <button
              onClick={() => onRemove(city.id)}
              className="text-gray-400 hover:text-red-500"
            >
              <X size={18} />
            </button>
          </div>
        ))}
        {favorites.length === 0 && (
          <p className="text-gray-500 text-center">No favorite cities yet</p>
        )}
      </div>
    </div>
  );
};