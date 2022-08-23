import { createTheme } from "@mui/material/styles";
import { green, blueGrey, grey } from "@mui/material/colors";

const lightTheme = createTheme({
  palette: {
    primary: {
      main: grey[100],
    },
    secondary: {
      main: green[500],
    },
    text: {
      default: grey[900],
    },
  },
});

export default lightTheme;
