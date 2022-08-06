import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");

  const [weatherData, setWeatherData] = useState('')
const [warnign, setWarning] = useState('')

  const url = `https://api.weather.gov/points/${lat},${long}`;
const regex = "^(-?\\d+(?:\\.\\d+)?),(-?\\d+(?:\\.\\d+)?)$"


  //set the values of lat and long
  const handleChange = (e) => {
    if (e.target.name === "latitude") {
      setLat(e.target.value);
    } else {
      setLong(e.target.value);
    }
  };

  const handleSubmitForm = async (e) => {
    console.log('fetch data')
    e.preventDefault();
    await axios
      .get(url)
      .then((result) => {
        console.log(result, 'result')
        if(result.data.properties.forecast) { //send another request if valid response is received
          axios
            .get(result.data.properties.forecast)
            .then((data) => {
              console.log(data.data.properties.periods, 'data prop')
              // setWeatherData(data.data.properties.periods)
            })
            .catch(error => console.log(error, 'error fetching the weather'))

        } else if(result.data.title === "Not Found") {
          setWarning("Sorry, we coulnd't retrieve location's data ")
        }
  })
      .catch(error => {
        
        setWarning(error.response.data.title)
        setTimeout(()=> { //clear the message in 5 sec
          setWarning('')
        }, 5000)
        console.log(error, 'error receiving a link')
      });

    console.log(lat, "lat", long, "long");
    setLat('') //reset the values
    setLong('') //reset the values
  };

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log("latitude is: ", position.coords.latitude);
      console.log("longitude is: ", position.coords.longitude);
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });
  };
console.log(weatherData, 'weather')
  return (
    <div className="App">
    {warnign && <div>{warnign}</div>}
      <form type="submit" onSubmit={(e) => handleSubmitForm(e)}>
        <input
          type="number"
          name="latitude"
          onChange={(e) => handleChange(e)}
          value={lat}
          placeholder="latitude"
        />
        <input
          type="number"
          name="longitude"
          pattern='d\+\.\d\d$'
          onChange={(e) => handleChange(e)}
          value={long}
          placeholder="longtitude"
        />
        <button>Get the weather</button>
      </form>
      <button onClick={getCurrentLocation}>Get current coordinates</button>
    </div>
  );
}

export default App;
