import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button"
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper"
import Grid from '@mui/material/Grid'
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme/theme";

import ClearIcon from "@mui/icons-material/Clear";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import Copyright from "./components/Copyright";
import DisplayForecast from "./components/DisplayForecast";
import toast, { Toaster } from "react-hot-toast";

import { inputValidation } from "./utils/utils";

const weatherGovBaseUrl = "https://api.weather.gov/";
const pointsPath = "points/";

const latValidationPattern = "^[-+]?([1-8]?\\d(\\.\\d+)?|90(\\.0+)?)$"; // [-90,90]
const longValidationPattern =
  "^[-+]?(180(\\.0+)?|((1[0-7]\\d)|([1-9]?\\d))(\\.\\d+)?)$"; // [-180.0000,180.0000]

function App() {
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");

  const [weatherReport, setWeatherReport] = useState({
    weather: [],
    loading: false,
  });
  const [location, setLocation] = useState("");

  const weatherUrl = weatherGovBaseUrl.concat(pointsPath, `${lat},${long}`);

  const inputsData = [
    {
      name: "latitude",
      value: lat,
      placeholder: "latitude",
      label: "Latitude",
      helperText: "Try a range of -90 to 90",
      validPattern: latValidationPattern,
      clearInput: () => setLat(""),
    },
    {
      name: "longitude",
      value: long,
      placeholder: "longitude",
      label: "Longitude",
      helperText: "Try a range of -180 to 180",
      validPattern: longValidationPattern,
      clearInput: () => setLong(""),
    },
  ];

  function handleErrorResponse(error) {
    toast.error(`${error.message}. Details:${error.response.data.detail}`);
    setWeatherReport({
      ...weatherReport,
      weather: [],
      loading: false,
    });
  }
  //set the values of lat and long
  const handleInputChange = (e) => {
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
              handleErrorResponse(error);
              // setLocation("");
              console.log(error, "error fetching the weather");
            });
        } else {
          /* if (result.data.title === "Not Found") */

          toast.error("Sorry, forecast for provided location doesn't exist.");
          setWeatherReport({ ...weatherReport, weather: [], loading: false });
          // setLocation("");
        }
      })
      .catch((error) => {
        handleErrorResponse(error);
        setLocation("");

        console.log(error, "error receiving a link");
      });

    setLat(""); //reset the values
    setLong(""); //reset the values
  };

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });
  };

  return (
    <ThemeProvider theme={theme}>
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
              sx={{ backgroundColor: "#B7BFCC" }}
            >
              <Grid container direction="row">
                <Tooltip
                  title="Get your current coordinates"
                  placement="left-end"
                  sx={{ ml: "auto" }}
                >
                  <IconButton onClick={getCurrentLocation} color="info">
                    <MyLocationIcon />
                  </IconButton>
                </Tooltip>

                <form
                  type="submit"
                  style={{ textAlign: "center" }}
                  onSubmit={(e) => handleSubmitForm(e)}
                >
                  {inputsData.map((input) => {
                    return (
                      <TextField
                        key={input.name}
                        sx={{
                          margin: "4px",
                          "& .MuiInputBase-root": {
                            paddingRight: 0,
                          },
                        }}
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
                        onChange={(e) => handleInputChange(e)}
                        error={
                          !inputValidation(input.validPattern, input.value)
                        }
                        helperText={
                          !inputValidation(input.validPattern, input.value) &&
                          input.helperText
                        }
                        InputProps={{
                          endAdornment: (
                            <Button
                              name="videoUrlPreview"
                              style={{ maxWidth: "40px", minWidth: "40px" }}
                              onClick={input.clearInput}
                              size="xsmall"
                              variant="text"
                              color="primary"
                            >
                              <ClearIcon />
                            </Button>
                          ),
                        }}
                      />
                    );
                  })}

                  <Button
                    aria-label="submit button"
                    type="submit"
                    size="large"
                    variant="contained"
                    sx={{ mt: "1rem", width: "60%" }}
                  >
                    Get Weather
                  </Button>
                </form>
              </Grid>

              <DisplayForecast
                weatherReport={weatherReport}
                location={location}
              />

              <Copyright />
            </Paper>
          </Container>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
