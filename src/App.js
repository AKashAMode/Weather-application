import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState({
    celcius:10,
    name:'London',
    humidity:10,
    speed:2,
    image:'/images/cloud.png'
    
  })
  const [name, setName] = useState('');
  const [error, setError] = useState('');

   const handleclick = () => {
    if(name !== "") {
     
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=5373a1442d7e0bc410d1dcbc57b58c0d&units=metric`;   
      axios.get(apiUrl)
      .then(res => {
        let imagepath = '';
        if(res.data.weather[0].main == "cloudss") {
          imagepath ="/images/clouds.png"
        }else if(res.data.weather[0].main == "Clear") {
          imagepath ="/images/clear-cloud.png"
        }else if(res.data.weather[0].main == "Rain") {
          imagepath ="/images/rain.png"
        }else if(res.data.weather[0].main == "Drizzle") {
          imagepath ="/images/drizzle.png"
        }else if(res.data.weather[0].main == "Mist") {
          imagepath ="/images/mist.png"
        }else {
          imagepath ='/images/cloudss.png'
        }

        console.log(res.data);
        setData({...data, celcius: res.data.main.temp, name:res.data.name, 
          humidity: res.data.main.humidity, speed: res.data.wind.speed,
        image: imagepath})
        setError('');
      })
      .catch( err => {
        if(err.response.status == 404) {
          setError("Invalid city Name")
        }
        console.log(err)
      
      });


    }
   }


  return (
    <div className='container'>

        <div className="weather">
            <div className="search">
                <input type="text" placeholder='Enter city name' onChange={e => setName(e.target.value)} />
                <button><img src="/images/magnifying-glass-solid.svg" onClick={handleclick} alt='searchimg'></img></button>
            </div>
            
            <div className="error">
              <p>{error}</p>
            </div>
          


            <div className="winfo">
              <img src={data.image} alt="cloud" className='icon'/>
              <h1>{Math.round(data.celcius)}°c</h1>
              <h2>{data.name}</h2>
              <div className="details">
              <div className="col">
                <img src="/images/icon-humidity-icon.png" alt="humi"/>
                <div className='humidity'>
                <p>{Math.round(data.humidity)}%</p>
                  <p>Humadity</p>
                </div>
              </div>
              <div className="col">
              <img src="/images/wind-solid.svg" alt="windimg"/>
              <div className='wind'>
              <p>{Math.round(data.speed)} km/h</p>
              <p>Wind</p>
              </div>
              </div>
              </div>
              
            </div>
        </div>
    </div>
  )
}

export default App