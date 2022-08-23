import { createTheme } from "@mui/material/styles";
import { green } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: green[700],
    },
    // secondary: {
    //   // This is green.A700 as hex.
    //   main: "#11cb5f",
    // },
    // background: {
    //   default: green[900],
    // },
    // mode: "dark",
  },
});

export default theme;
