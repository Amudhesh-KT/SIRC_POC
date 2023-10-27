import { createTheme } from "@mui/material/styles";
import { components, typography } from "./ComponentsOverride";
import _ from "lodash";
import { useSelector } from "react-redux";

const baseTheme = {
  palette: {
    primary: {
      main: "#00A887",
      light: "#CCEEE7",
      dark: "#00964b",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#fb9678",
      light: "#fcf1ed",
      dark: "#e67e5f",
      contrastText: "#ffffff",
    },
    success: {
      main: "#00c292",
      light: "#ebfaf2",
      dark: "#00964b",
      contrastText: "#ffffff",
    },
    danger: {
      main: "#e46a76",
      light: "#fdf3f5",
    },
    info: {
      main: "#0bb2fb",
      light: "#a7e3f4",
    },
    error: {
      main: "#e46a76",
      light: "#fdf3f5",
      dark: "#e45a68",
    },
    warning: {
      main: "#fec90f",
      light: "#fff4e5",
      dark: "#dcb014",
      contrastText: "#ffffff",
    },
    text: {
      secondary: "#777e89",
      danger: "#fc4b6c",
    },
    grey: {
      A100: "#ecf0f2",
      A200: "#99abb4",
      A400: "#767e89",
      A700: "#e6f4ff",
    },
    action: {
      disabledBackground: "rgba(73,82,88,0.12)",
      hoverOpacity: 0.02,
      hover: "rgba(0, 0, 0, 0.03)",
    },
    background: {
      default: "#fafbfb",
    },
  },
  mixins: {
    toolbar: {
      color: "#949db2",
      "@media(min-width:1280px)": {
        minHeight: "64px",
        padding: "0 30px",
      },
      "@media(max-width:1280px)": {
        minHeight: "64px",
      },
    },
  },
  components,
  //   shadows,
  typography,
};

const themesOptions = [
  {
    name: "DEFAULT_THEME",
    palette: {
      primary: {
        main: "#00A887",
        light: "#CCEEE7",
        dark: "#00964b",
        contrastText: "#ffffff",
      },
      secondary: {
        main: "#fb9678",
        light: "#fcf1ed",
        dark: "#e67e5f",
        contrastText: "#ffffff",
      },
    },
  },
];

export const BuildTheme = (config = {}) => {
  let themeOptions = themesOptions.find((theme) => theme.name === config.theme);
  const customizer = useSelector((state) => state.CustomizerReducer);

  const baseMode = {
    palette: {
      mode: customizer.activeMode,
      background: {
        default: customizer.activeMode === "dark" ? "#20232a" : "#fafbfb",
        dark: customizer.activeMode === "dark" ? "#1c2025" : "#ffffff",
        paper: customizer.activeMode === "dark" ? "#282C34" : "#ffffff",
      },
      text: {
        primary:
          customizer.activeMode === "dark" ? "#e6e5e8" : "rgba(0, 0, 0, 0.87)",
        secondary: customizer.activeMode === "dark" ? "#adb0bb" : "#777e89",
      },
    },
  };
  if (!themeOptions) {
    console.warn(new Error(`The theme ${config.theme} is not valid`));
    [themeOptions] = themesOptions;
  }

  const theme = createTheme(_.merge({}, baseTheme, baseMode, themeOptions));
  return theme;
};
