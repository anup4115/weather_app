import {useState} from 'react'
import axios from 'axios'

function App() {

  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
  const [data,setData] = useState({})
  const [location,setLocation] = useState('')
  const [error, setError] = useState('')
  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toUTCString();
  };

  const url=`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`

  const searchCity=(event)=>{
    if (event.key === 'Enter'){
      axios.get(url).then((response)=>{
        setData(response.data)
        setError('')
      }).catch((error)=>{
        setError('Unknown location !!! Please type correct location')
      })
      setLocation('')
    }
  }
  return (
    <div className="App">
      <div className="search">
        <input type='text'
        value={location}
        onChange={event=>setLocation(event.target.value)}
        onKeyDown={searchCity}
        placeholder='Enter location'/>
      </div>
      
      <div className="location">
        {error ? <h1>{error}</h1> : <h1>{data.name}</h1>}
      </div>
      {data.main && !error && (
        <>
          <div className="temp">
            <p className="bold">Temperature: {data.main.temp}°C</p>
          </div>
          <div className="humidity">
            <p className="bold">Humidity: {data.main.humidity} KMPH</p>
          </div>
          <div className="description">
            <p className="bold">Feels Like: {data.weather[0].description}</p>
          </div>
          <div className="sunrise">
            {data.sys && (
              <p className="bold">Sunrise: {formatTime(data.sys.sunrise)}</p>
            )}
          </div>
          <div className="sunset">
            {data.sys && (
              <p className="bold">Sunset: {formatTime(data.sys.sunset)}</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default App;