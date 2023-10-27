import { THEME_COLOR } from "../constants/constants";

export const setTheme = (payload) => ({
  type: THEME_COLOR,
  payload,
});

export const setDarkMode = (payload) => ({
  type: "DARK_THEME",
  payload,
});

// export const setDir = (payload) => ({
//   type: DIRECTION,
//   payload,
// });

// export const setLanguage = (payload) => ({
//   type: "LANGUAGE",
//   payload,
// });
