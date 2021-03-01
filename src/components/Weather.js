import React, { useState, useEffect } from 'react';
import ReactAnimatedWeather from 'react-animated-weather';

function Weather() {
  const [weather, setWeather] = useState({
    city: undefined,
    temp_current: undefined,
    temp_max: undefined,
    temp_min: undefined,
    current: undefined,
    icon: undefined,
  });

  const convertCelsius = (temp) => {
    let cel = Math.floor(temp - 273.15);
    return cel;
  };

  // icon canvas style
  const defaults = {
    color: 'white',
    size: 100,
    animate: true,
  };

  // icon
  const weatherIcon = (current) => {
    switch (current) {
      case 'Haze':
        return 'CLEAR_DAY';
      case 'Clouds':
        return 'CLOUDY';
      case 'Snow':
        return 'SNOW';
      case 'Drizzle':
        return 'SLEET';
      case 'Dust':
      case 'Tornado':
        return 'WIND';
      case 'Fog':
      case 'Smoke':
        return 'FOG';
      case 'Rain':
      case 'Mist':
        return 'RAIN';
      default:
        return 'CLEAR_DAY';
    }
  };

  const getWeather = async (lat, lon) => {
    const API_KEY = '9916e4e6fd6079aa9a9fec8e0c218fc5';
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&lang=kr`;
    const response = await fetch(API_URL);
    const data = await response.json();

    setWeather({
      city: data.name,
      temp_current: convertCelsius(data.main.temp),
      temp_max: convertCelsius(data.main.temp_max),
      temp_min: convertCelsius(data.main.temp_min),
      current: data.weather[0].main,
      icon: weatherIcon(data.weather[0].main),
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
    <div className="weather">
      <div className="weather-info">
        <h1 className="location">{weather.city}</h1>
        <div className="temperature">
          <p className="current">{weather.temp_current}&deg;</p>
          <ul className="minmax">
            <li>{weather.temp_min}&deg;</li>
            <li>{weather.temp_max}&deg;</li>
          </ul>
        </div>
      </div>
      <div className="weather-icon">
        <ReactAnimatedWeather
          icon={weather.icon ? weather.icon : 'CLEAR_DAY'}
          color={defaults.color}
          size={defaults.size}
          animate={defaults.animate}
        />
        <p className="state">{weather.current}</p>
      </div>
    </div>
  );
}

export default Weather;
