import { createTheme, PaletteOptions } from "@mui/material";

const commonThemeOptions = {
  typography: {
    fontFamily: "Gill Sans",
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1465,
    },
  },
};
const BASE_PALETTE = {
  mode: "light",
  text: {
    primary: "#354f52",
    secondary: "#50786e",
  },
  success: {
    main: "#66bb6a",
    contrastText: "#fff",
  },
  error: {
    main: "#d32f2f",
    contrastText: "#fff",
  },
  warning: {
    main: "#ffa726",
    contrastText: "#fff",
  },
} as PaletteOptions;

export const lightTheme = createTheme({
  palette: {
    primary: {
      main: "#50786e",
      light: "#84a98c",
      dark: "#354f52",
    },
    secondary: {
      main: "#cad2c5",
    },
    ...BASE_PALETTE,
  },
  ...commonThemeOptions,
});
