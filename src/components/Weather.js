import React, { useState, useEffect } from 'react';
// import 'weather-icons/css/weather-icons.css';

function Weather() {
  const [weather, setWeather] = useState({
    city: undefined,
    country: undefined,
  });

  const getWeather = async () => {
    const API_KEY = '9916e4e6fd6079aa9a9fec8e0c218fc5';
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=${API_KEY}`;
    const response = await fetch(API_URL);
    const data = await response.json();

    console.log(data);
  };

  useEffect(() => {
    getWeather();
  }, []);
  // const weather_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

  return (
    <div>
      <h1>Seoul</h1>
      <i className="wi-day-sunny"></i>
      <h2>25&deg;</h2>

      {minmaxTemp(24, 10)}

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
