import { createTheme } from "@mui/material/styles";
import { green, blue, grey } from "@mui/material/colors";

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: blue[700],
    },
    secondary: {
      main: green[500],
    },
    text: {
      default: grey[100],
    },
  },
});

export default defaultTheme;
