import { useSelector } from "react-redux";
import { BuildTheme } from "./Theme";

const ThemeSettings = () => {
  const customizer = useSelector((state) => state.CustomizerReducer);
  const theme = BuildTheme({
    theme: customizer.activeTheme,
  });

  return theme;
};
export default ThemeSettings;
