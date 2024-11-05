import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import WeatherCard from './components/WeatherCard';  // WeatherCard component

const API_KEY = '8ac5c4d57ba6a4b3dfcf622700447b1e';

const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const getWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
      setError('');  // Clear previous errors
    } catch (err) {
      setError('City not found. Please try again.');
      setWeather(null);  // Clear previous weather data
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    getWeather();
  };

  return (
    <div className="app">
      <div className="container">
        <h1 className="title">Weather App</h1>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button type="submit">Get Weather</button>
        </form>

        {error && <p className="error">{error}</p>}
        
        {weather && <WeatherCard weather={weather} />}
      </div>
    </div>
  );
};

export default App;
