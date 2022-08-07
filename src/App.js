import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Box from "@mui/system/Box";
import FormControl from "@mui/material/FormControl";
import {
  Button,
  Container,
  Paper,
  Grid,
  Tooltip,
  IconButton,
} from "@mui/material";


import MyLocationIcon from "@mui/icons-material/MyLocation";
import Copyright from "./components/Copyright";
import DisplayForecast from "./components/DisplayForecast";
import toast, { Toaster } from 'react-hot-toast';


import { inputValidation } from "./utils/utils";

const transformInput = (str) => {
  return str.concat('N')
}



function App() {
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");

  const [weatherReport, setWeatherReport] = useState({
    weather: [],
    loading: false,
  });
  const [location, setLocation] = useState("");



  const weatherGovBaseUrl = 'https://api.weather.gov/';
  const pointsPath = 'points/'
  const weatherUrl = weatherGovBaseUrl.concat(pointsPath,`${lat},${long}`); 
  
  const latValidationPattern = "^[-+]?([1-8]?\\d(\\.\\d+)?|90(\\.0+)?)$"; // [-90,90]
  const longValidationPattern = "^[-+]?(180(\\.0+)?|((1[0-7]\\d)|([1-9]?\\d))(\\.\\d+)?)$"; // [-180,180]

  const inputsData = [
    {
      name:"latitude",
      value: lat,
      placeholder:"latitude",
      label:"Latitude",
      helperText:"Try a range of -90 to 90", 
      validPattern:latValidationPattern
    },
    {
      name:"longitude",
      value:long,
      placeholder:"longitude",
      label:"Longitude",
      helperText:"Try a range of -180 to 180",
      validPattern:longValidationPattern
    },
    
  ]

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

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setWeatherReport({ ...weatherReport, loading: true });

    await axios
      .get(weatherUrl)
      .then((result) => {
        console.log(result, 'result')
        
        setLocation({
          city: result.data.properties.relativeLocation.properties.city,
          state: result.data.properties.relativeLocation.properties.state,
        });

        if (result.data.properties.forecast) {
          //send another request if valid response is received and has forecast prop
          axios
            .get(result.data.properties.forecast)
            .then((data) => {
              setWeatherReport({
                ...weatherReport,
                weather: data.data.properties.periods,
                loading: false,
              });
            })
            .catch((error) => {
              toast.error(`${error.message}. Details:${error.response.data.detail}`)
              setWeatherReport({ ...weatherReport,  loading:false, weather:[]});
              setLocation("")
              console.log(error, "error fetching the weather");
            });
        } else  {  /* if (result.data.title === "Not Found") */

          toast.error("Sorry, forecast for provided location doesn't exist.")
          setWeatherReport({...weatherReport, weather:[], loading:false})
          setLocation("")
        }
   
      })
      .catch((error) => {
        // setWarning(error.response.data.detail);
        setWeatherReport({
          ...weatherReport,
          weather: [],
          loading:false,

        });
        setLocation("")
        toast.error(`${error.message}. Details:${error.response.data.detail}`)
      
        console.log(error, "error receiving a link");
      });

    console.log(lat, "lat", long, "long");
    setLat(""); //reset the values
    setLong(""); //reset the values
  };

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });
  };
console.log(transformInput(lat), 'transformed')

  console.log(weatherReport, "weather");
  console.log(location, "location");
  return (

    <div className="App">
     <Toaster />
      <main>
        <Container
        maxWidth="sm"
          sx={{
            pt: 8,
            pb: 6,
          }}
        >
          <Paper
            elevation={15}
            // maxWidth="sm"
            sx={{ backgroundColor: "#B7BFCC" }}
          >
            {/* {weatherReport.error && <div>{weatherReport.error}</div>} */}
            <Grid container direction="row">
            <Tooltip title="Get your current coordinates" placement="left-end" sx={{ml: "auto"}}>
                <IconButton onClick={getCurrentLocation} color="success">
                  <MyLocationIcon />
                </IconButton>
              </Tooltip>

              <form type="submit" style={{textAlign: "center"}} onSubmit={(e) => handleSubmitForm(e)}>
                <FormControl type="submit" fullWidth sx={{paddingTop:"2rem" ,flexDirection: 'row', justifyContent: "space-around"}}>
                  {inputsData.map(input => {
                    return <TextField
                    sx={{margin: '4px' }}  //backgroundColor: "#edf2f4", borderRadius: "4px"
                    variant="outlined"
                    type="number"
                    name={input.name}
                    placeholder={input.placeholder}
                    label={input.label}
                    required
                    size="small"
                    autoFocus={input.name === "latitude"}
                    InputLabelProps={{ shrink: true }}
                    value={input.value}
                    onChange={(e) => handleChange(e)}
                    error={!inputValidation(input.validPattern, input.value)}
                    helperText={
                      !inputValidation(input.validPattern, input.value) &&
                      input.helperText
                    }
                  />
                  })}
                                  
                </FormControl>
                <Button aria-label="submit button" type="submit" size="large" variant="outlined" sx={{mt:"1rem"}}>Get Weather</Button>
            
              </form>
             
            </Grid>

            <DisplayForecast
              weather={weatherReport.weather}
              location={location}
            />
 
            <Copyright />
          </Paper>
        </Container>
      </main>
    </div>

  );
}

export default App;
