import React from 'react';
import { WeatherData } from '../types/weather';
import { Cloud, Droplets, Wind } from 'lucide-react';

interface WeatherDisplayProps {
  data: WeatherData;
  unit: 'C' | 'F';
}

const convertTemp = (celsius: number, unit: 'C' | 'F'): number => {
  return unit === 'C' ? celsius : (celsius * 9/5) + 32;
};

export const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ data, unit }) => {
  return (
    <div className="w-full max-w-4xl">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">{data.city}</h2>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img
              src={`https://openweathermap.org/img/wn/${data.current.icon}@2x.png`}
              alt={data.current.description}
              className="w-20 h-20"
            />
            <div className="ml-4">
              <p className="text-4xl font-bold">
                {Math.round(convertTemp(data.current.temp, unit))}°{unit}
              </p>
              <p className="text-gray-600 capitalize">{data.current.description}</p>
            </div>
          </div>
          <div className="flex gap-6">
            <div className="flex items-center">
              <Droplets className="text-blue-500 mr-2" />
              <span>{data.current.humidity}%</span>
            </div>
            <div className="flex items-center">
              <Wind className="text-blue-500 mr-2" />
              <span>{data.current.windSpeed} m/s</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-4">
        {data.forecast.map((day, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg p-4 text-center">
            <p className="font-semibold mb-2">{day.date}</p>
            <img
              src={`https://openweathermap.org/img/wn/${day.icon}.png`}
              alt={day.description}
              className="mx-auto"
            />
            <p className="text-xl font-bold">
              {Math.round(convertTemp(day.temp, unit))}°{unit}
            </p>
            <p className="text-sm text-gray-600 capitalize">{day.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};