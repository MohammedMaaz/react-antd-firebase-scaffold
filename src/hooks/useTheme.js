import { useContext } from "react";
import { ThemeContext } from "../components/RootWrapper";

export const useTheme = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  return [theme, setTheme];
};
