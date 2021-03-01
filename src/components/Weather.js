import React, { useState, useEffect } from 'react';

function Weather() {
  const [weather, setWeather] = useState({
    city: undefined,
    country: undefined,
    temp_current: undefined,
    temp_max: undefined,
    temp_min: undefined,
  });

  const convertCelsius = (temp) => {
    let cel = Math.floor(temp - 273.15);
    return cel;
  };

  const getWeather = async (lat, lon) => {
    const API_KEY = '9916e4e6fd6079aa9a9fec8e0c218fc5';
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
    const response = await fetch(API_URL);
    const data = await response.json();

    setWeather({
      city: data.name,
      country: data.country,
      temp_current: convertCelsius(data.main.temp),
      temp_max: convertCelsius(data.main.temp_max),
      temp_min: convertCelsius(data.main.temp_min),
    });
  };

  useEffect(() => {
    // get geolocation
    let lat, lon;
    if ('geolocation' in navigator) {
      console.log('geolocation available');
      navigator.geolocation.getCurrentPosition(async (position) => {
        try {
          lat = position.coords.latitude;
          lon = position.coords.longitude;
          getWeather(lat, lon);
        } catch (error) {
          getWeather(37.53, 127.02);
          console.log(error);
        }
      });
    } else {
      alert('geoloaction not available');
    }
  }, []);

  return (
    <div>
      <h1>
        {weather.city}, {weather.country}
      </h1>
      <h2>{weather.temp_current}&deg;</h2>
      <h3>
        <span>{weather.temp_min}&deg;</span>
        <span>{weather.temp_max}&deg;</span>
      </h3>
      <h3>Slow Rain</h3>
    </div>
  );
}

function minmaxTemp(min, max) {
  return (
    <h3>
      <span>{min}&deg;</span>
      <span>{max}&deg;</span>
    </h3>
  );
}
export default Weather;
