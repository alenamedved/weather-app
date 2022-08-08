import React from "react";
import ForecastCard from "./ForecastCard";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const DisplayForecast = ({ weather, location }) => {
  console.log(weather);
  return (
    <Container sx={{ py: 8 }} >
      {/* End hero unit */}
      <Typography
        component="h1"
        variant="h2"
        align="center"
        color="white"
        gutterBottom
      >
        {location.city} {location.state}
      </Typography>
      {/* <Grid container spacing={4} direction="column"> */}
        {weather?.map((item) => (
          <ForecastCard key={item.number} item={item} />
        ))}
      {/* </Grid> */}
    </Container>
  );
};

export default DisplayForecast;
