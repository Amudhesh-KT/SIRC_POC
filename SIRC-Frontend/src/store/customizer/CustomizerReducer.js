import { THEME_COLOR, DIRECTION } from "../constants/constants";

const INIT_STATE = {
  // activeDir: "ltr",
  activeMode: "light",
  // activeLanguage: "enUS",
  activeTheme: "DEFAULT_THEME", // BLUE_THEME, GREEN_THEME, RED_THEME, BLACK_THEME, PURPLE_THEME, INDIGO_THEME
};

const CustomizerReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case THEME_COLOR:
      return {
        ...state,
        activeTheme: action.payload,
      };
    case "DARK_THEME":
      return {
        ...state,
        activeMode: action.payload,
      };
    // case DIRECTION:
    //   return {
    //     ...state,
    //     activeDir: action.payload,
    //   };
    // case "LANGUAGE":
    //   return {
    //     ...state,
    //     activeLanguage: action.payload,
    //   };

    default:
      return state;
  }
};

export default CustomizerReducer;
