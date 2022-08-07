import React from "react";

import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
// import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from "@mui/material/Card";
import Paper from '@mui/material/Paper'
import { Avatar } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const ForecastCard = ({ item }) => {
  return (
    <Grid item>
    <Paper > {/* sx={{backgroundImage:`url(${item.icon})`}} */}
      {/* <Card sx={{ height: "100%", display: "flex", flexDirection: "row" }}> */}
        
        
        <CardContent sx={{ backgroundColor: "#edf2f4", flexGrow: 1 }}>
          <Typography gutterBottom variant="h4" component="h2">
            {item.name}
          </Typography>
          <Typography>
            {item.temperature} {item.temperatureUnit}
          </Typography>
          <Avatar
          alt="Remy Sharp"
          src={item.icon}
          sx={{ width: 56, height: 56 }}
        />
          <Typography>{item.detailedForecast}</Typography>
        </CardContent>
      {/* </Card> */}
      </Paper>
    </Grid>
  );
};

export default ForecastCard;
