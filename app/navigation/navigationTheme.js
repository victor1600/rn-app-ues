import { DefaultTheme } from "@react-navigation/native";
import colors from "../config/colors";

export default {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.white,
    // card: "rgb(255, 255, 255)",
    // text: "rgb(28, 28, 30)",
    // background: colors.primary,
  },
};
