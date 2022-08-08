import React from "react";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import { Avatar } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { formateDate } from "../utils/utils";

const ForecastCard = ({ item }) => {
  return (
    <Card elevation={20} sx={{ mb: "1rem" }}>
      <Grid container alignItems="center">
        <Grid item xs={9}>
          <CardHeader
            avatar={
              <Avatar
                alt="Remy Sharp"
                src={item.icon}
                sx={{ width: 56, height: 56 }}
                aria-label="weather icon"
              />
            }
            titleTypographyProps={{ variant: "h4" }}
            title={item.name}
            subheader={formateDate(item.startTime)}
          />
        </Grid>
        <Grid item xs={3}>
          <Typography variant="h3" align="center">
            {item.temperature}
            {item.temperatureUnit}
          </Typography>
        </Grid>
      </Grid>
      <CardContent sx={{ backgroundColor: "#edf2f4", flexGrow: 1 }}>
        <Typography>{item.detailedForecast}</Typography>
      </CardContent>
    </Card>
  );
};

export default ForecastCard;
