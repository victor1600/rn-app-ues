import { StatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import navigationTheme from "./app/navigation/navigationTheme";
import QuizNavigator from "./app/navigation/QuizNavigator";

export default function App() {
  return (
    <NavigationContainer theme={navigationTheme}>
      <QuizNavigator />
    </NavigationContainer>
  );
}
