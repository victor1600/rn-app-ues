import { StatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import navigationTheme from "./app/navigation/navigationTheme";
import QuizNavigator from "./app/navigation/QuizNavigator";
import SubMenuTopicsScreen from "./app/screens/SubMenuTopicsScreen";

export default function App() {
  return (
    <NavigationContainer theme={navigationTheme}>
      <QuizNavigator />
    </NavigationContainer>
    // <SubMenuTopicsScreen />
  );
}
