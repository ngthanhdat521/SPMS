import { createTheme } from "@mui/material/styles";
import { blueGrey,grey } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: blueGrey[100],
    },
    secondary: {
      // This is green.A700 as hex.
      main: "#11cb5f",
    },
    background: {
      default: "#283142",
    },
    text: {
      default: grey[100],
    },
    mode: "dark",
  },
});

export default theme;
