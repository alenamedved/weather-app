import { createTheme, responsiveFontSizes } from '@mui/material/styles';

// A custom theme for this app
const theme = responsiveFontSizes(createTheme({
    palette: {
      primary: {
        main: '#556cd6',
      },
      secondary: {
        main: '#19857b',
      },
      
    },
  }));
  
  export default theme;