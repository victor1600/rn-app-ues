import React from "react";
import CoursesScreen from "../screens/CoursesScreen";
import TopicsScreen from "../screens/TopicsScreen";

import { createStackNavigator } from "@react-navigation/stack";
import navigationTheme from "./navigationTheme";
import colors from "../config/colors";
import SubMenuTopicsScreen from "../screens/SubMenuTopicsScreen";
import SupplementaryMaterialScreen from "../screens/SupplementaryMaterialScreen";
import QuizScreen from "../screens/QuizScreen";

const Stack = createStackNavigator();

const QuizNavigator = () => (
  <Stack.Navigator
    theme={navigationTheme}
    screenOptions={{
      headerTintColor: colors.white,
      headerStyle: { backgroundColor: colors.primary },
      headerBackTitle: "",
    }}
  >
    <Stack.Screen
      name="Courses"
      component={CoursesScreen}
      options={{ title: "Materias" }}
    />
    <Stack.Screen
      name="Topics"
      component={TopicsScreen}
      options={{ title: "Temas" }}
    />
    <Stack.Screen
      name="Topics_SubMenu"
      component={SubMenuTopicsScreen}
      options={{ title: "" }}
    />
    <Stack.Screen
      name="Supplementary"
      component={SupplementaryMaterialScreen}
      options={{ title: "Material de apoyo" }}
    />
    <Stack.Screen
      name="Quiz"
      component={QuizScreen}
      // screenOptions={{
      //   headerBackTitle: "",
      // }}
      // screenOptions= {{
      //   header
      // }}
      options={{ headerLeft: null }}
    />
  </Stack.Navigator>
);

export default QuizNavigator;
