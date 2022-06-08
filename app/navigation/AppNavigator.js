import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CoursesNavigator from "./CoursesNavigator";
import navigationTheme from "./navigationTheme";
import colors from "../config/colors";
import ProfileScreen from "../screens/Profile/index";
import QuizConfigScreen from "../screens/QuizConfigScreen";
import ScoreScreen from "../screens/Score";

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
					} else if (route.name === 'Score') {
						iconName = 'gamepad-variant'
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
			{/* TODO: Fix Exam navigations, is not working. */}

			<Tab.Screen
				name="Examen"
				component={QuizConfigScreen}
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
			<Tab.Screen
				name="Score"
				component={ScoreScreen}
				options={{
					title: "Score",
					headerShown: true,
					headerTintColor: colors.white,
					headerStyle: { backgroundColor: colors.primary },
				}}
			/>

		</Tab.Navigator>
	);
};

export default AppNavigator;
