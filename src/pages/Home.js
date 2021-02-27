import React from 'react';
import greeting from '../images/greeting.svg';
import Weather from '../components/Weather';
import '@babel/polyfill';

function Home() {
  return (
    <div className="home">
      <img src={greeting} alt="greeting" />
      <Weather />
    </div>
  );
}

export default Home;
