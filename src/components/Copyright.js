import { Typography, Link } from "@mui/material";

export default function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Weather App
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}