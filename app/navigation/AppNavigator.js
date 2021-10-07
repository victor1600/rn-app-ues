import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CoursesNavigator from "./CoursesNavigator";
import navigationTheme from "./navigationTheme";
import colors from "../config/colors";
import ProfileScreen from "../screens/ProfileScreen";
import QuizScreen from "../screens/QuizScreen";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator
      theme={navigationTheme}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Profile") {
            iconName = "account-circle";
          } else if (route.name === "Examen") {
            iconName = "file-document-edit-outline";
          }

          // You can return any component that you like here!
          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Home" component={CoursesNavigator} />
      <Tab.Screen
        name="Examen"
        component={QuizScreen}
        options={{
          title: "Examen",
          headerShown: true,
          headerTintColor: colors.white,
          headerStyle: { backgroundColor: colors.primary },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: "Perfil",
          headerShown: true,
          headerTintColor: colors.white,
          headerStyle: { backgroundColor: colors.primary },
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
