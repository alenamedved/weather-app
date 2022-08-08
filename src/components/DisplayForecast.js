import React from "react";
import ForecastCard from "./ForecastCard";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";


const DisplayForecast = ({ weatherReport, location }) => {
  if (weatherReport?.loading) {
    <div>Loading</div>;
  }

  return (
    <Container sx={{ py: 8 }}>
      <Typography variant="h2" align="center" color="#f5f5f7" gutterBottom>
        {location.city} {location.state}
      </Typography>

      {weatherReport?.weather.map((item) => (
        <ForecastCard key={item.number} item={item} />
      ))}
    </Container>
  );
};

export default DisplayForecast;
