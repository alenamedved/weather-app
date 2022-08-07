import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import {
  Chip,
  Grid,
  TextField,
  Typography,
  Button,
  Paper,
  Container,
  Tooltip,
} from "@mui/material";
import { Box } from "@mui/system";

function App() {
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");

  const [weatherData, setWeatherData] = useState([]);
  const [location, setLocation] = useState("");
  const [warnign, setWarning] = useState("");

  const url = `https://api.weather.gov/points/${lat},${long}`;
  const latitude = "^[-+]?([1-8]?\\d(\\.\\d+)?|90(\\.0+)?)$"; // [-90,90]
  const longitude = "^[-+]?(180(\\.0+)?|((1[0-7]\\d)|([1-9]?\\d))(\\.\\d+)?)$"; // [-180,180]

  //set the values of lat and long
  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "latitude":
        setLat(value);
        break;
      case "longitude":
        setLong(value);
        break;
      default:
        break;
    }
  };
  console.log(lat, long);

  //validate an input for long and lat
  const inputValidation = (pattern, value) => {
    console.log(value.length);
    if (value.length > 0) {
      const regex = new RegExp(pattern);
      const matches = regex.test(value);
      return matches;
    }
    return true;
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    await axios
      .get(url)
      .then((result) => {
        // console.log(result, "result");
        // console.log(result.data.properties.relativeLocation.properties, "result.data.properties.relativeLocation.properties");
        setLocation({
          city: result.data.properties.relativeLocation.properties.city,
          state: result.data.properties.relativeLocation.properties.state,
        });
        if (result.data.properties.forecast) {
          //send another request if valid response is received
          axios
            .get(result.data.properties.forecast)
            .then((data) => {
              // console.log(data.data.properties.periods, "data prop");
              setWeatherData(data.data.properties.periods);
            })
            .catch((error) => console.log(error, "error fetching the weather"));
        } else if (result.data.title === "Not Found") {
          setWarning("Sorry, we coulnd't retrieve location's data ");
        }
      })
      .catch((error) => {
        setWarning(error.response.data.detail);
        setTimeout(() => {
          //clear the message in 5 sec
          setWarning("");
        }, 5000);
        console.log(error, "error receiving a link");
      });

    console.log(lat, "lat", long, "long");
    setLat(""); //reset the values
    setLong(""); //reset the values
  };

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log("latitude is: ", position.coords.latitude);
      console.log("longitude is: ", position.coords.longitude);
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });
  };

  const displayWeatherForecast = (array) => {
    return array.map((period) => (
      <div key={period.number}>
        <p>{period.detailedForecast}</p>
        <img src={period.icon} alt="icon" />
      </div>
    ));
  };
  console.log(weatherData, "weather");
  console.log(location, "location");
  return (
    <div className="App">
      {warnign && <div>{warnign}</div>}
      <form type="submit" onSubmit={(e) => handleSubmitForm(e)}>
        <Box noValidate>
          <TextField
            type="number"
            name="latitude"
            placeholder="latitude"
            label="latitude"
            required
            size="small"
            InputLabelProps={{ shrink: true }}
            value={lat}
            onChange={(e) => handleChange(e)}
            error={!inputValidation(latitude, lat)}
            helperText={!inputValidation(latitude, lat) && "Latitude should be in '-90.00'-'90.00' range"}
          />
          <TextField
            type="number"
            name="longitude"
            placeholder="longitude"
            label="longitude"
            required
            size="small"
            InputLabelProps={{ shrink: true }}
            value={long}
            onChange={(e) => handleChange(e)}
            error={!inputValidation(longitude, long)}
            helperText={!inputValidation(longitude, long) && "Longitude should be in '-180.00'-'180.00' range"}
          />
        </Box>
        
        <button>Get the weather</button>
      </form>
      <button onClick={getCurrentLocation}>Get current coordinates</button>
      {displayWeatherForecast(weatherData)}
    </div>
  );
}

export default App;
