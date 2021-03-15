import React, { useState } from 'react';

// API service
const api = {
  key: 'c7616da4b68205c2f3ae73df2c31d177',
  base: 'http://api.openweathermap.org/data/2.5/'
}

function App() {

  // change city
  const [city, setCity] = useState('');

  // weather info
  const [weather, setWeather] = useState({});


  // Enter
  const search = evt => {
    if (evt.key === 'Enter') {
      fetch(`${api.base}weather?q=${city}&units=metric&appid=${api.key}`) // submit
        .then(res => res.json())  // answer in json
        .then(result => {         // result
          setWeather(result);
          setCity('');
          console.log(result);
        });
    }
  }

  // data formating
  const format_date = (d) => {
    let months = ['January', 'February', 'March', 'April', 'May', 'Jun', 'July', 'August', 'September', 'October', 'November', 'December'];
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  // JSX 
  return (
    <div className={(typeof weather.main != 'undefined') ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
      <main>
        <div className='search-box'>
          <input
            type='text'
            className='search-bar'
            placeholder='Enter the city...'
            onChange={e => setCity(e.target.value)}
            value={city}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != 'undefined') ? (
        <div>
          <div className='location-box'>
            <div className='location'>{weather.name}, {weather.sys.country}</div>
            <div className='date'>{format_date(new Date())}</div>
          </div>
          <div className='weather-box'>
            <div className='temp'>
              {Math.round(weather.main.temp)}°c
            </div>
            <div className='weather'>{weather.weather[0].main}</div>
          </div>
        </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
