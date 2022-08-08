import React from "react";

import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
// import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from "@mui/material/Card";
import CardHeader from '@mui/material/CardHeader';
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
import { formateDate } from "../utils/utils";

const ForecastCard = ({ item }) => {
  return (
    // <Box>
    <Card elevation={20} sx={{mb: "1rem"}}> {/* sx={{backgroundImage:`url(${item.icon})`}} */}
      {/* <Card sx={{ height: "100%", display: "flex", flexDirection: "row" }}> */}
      <Grid container  alignItems="center">
      <Grid item xs={9}>
      <CardHeader
        avatar={
          <Avatar  
          alt="Remy Sharp"
          src={item.icon}
          sx={{ width: 56, height: 56 }} aria-label="weather icon" />
            
          
        }
        titleTypographyProps={{variant:'h4' }}
        title={item.name}
        subheader={formateDate(item.startTime)}
      />
      </Grid>
      <Grid item xs={3}>
      <Typography variant="h3" align="center" >{item.temperature}{item.temperatureUnit}</Typography>
      </Grid>
        </Grid>
        <CardContent sx={{ backgroundColor: "#edf2f4", flexGrow: 1 }}>
          
                   
          <Typography>{item.detailedForecast}</Typography>
        </CardContent>
      {/* </Card> */}
      </Card>
    // </Box>
  );
};

export default ForecastCard;
