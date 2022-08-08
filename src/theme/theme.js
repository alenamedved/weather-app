import { createTheme, responsiveFontSizes } from "@mui/material/styles";

// A custom theme for this app
const theme = responsiveFontSizes(
  createTheme({
  palette: {
    primary: {
      main: "#6d87a6",
    },
  },
  typography: {
    h2: {
      fontWeight: 600 // or 'bold'
    },
    h3: {
      fontWeight: 500 // or 'bold'
    }
  }
}))

export default theme;
