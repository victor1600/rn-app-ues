import React from "react";
import CoursesScreen from "../screens/CoursesScreen";
import TopicsScreen from "../screens/TopicsScreen";

import { createStackNavigator } from "@react-navigation/stack";
import navigationTheme from "./navigationTheme";
import colors from "../config/colors";

const Stack = createStackNavigator();

const QuizNavigator = () => (
  <Stack.Navigator
    theme={navigationTheme}
    screenOptions={{
      headerTintColor: colors.white,
      headerStyle: { backgroundColor: colors.primary },
    }}
  >
    <Stack.Screen name="Courses" component={CoursesScreen} />
    <Stack.Screen name="Topics" component={TopicsScreen} />
  </Stack.Navigator>
);

export default QuizNavigator;
