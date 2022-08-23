import { createTheme } from "@mui/material/styles";
import { deepOrange } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: deepOrange[500],
    },
    // secondary: {
    //   // This is green.A700 as hex.
    //   main: "#11cb5f",
    // },
    // background: {
    //   default: deepOrange[900],
    // },
    // mode: "dark",
  },
});

export default theme;
