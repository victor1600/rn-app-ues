import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppLoading from "expo-app-loading";
import navigationTheme from "./app/navigation/navigationTheme";
import CoursesNavigator from "./app/navigation/CoursesNavigator";
import OfflineNotice from "./app/components/OfflineNotice";
import LoginScreen from "./app/screens/LoginScreen";
import AuthContext from "./app/auth/context";
import authStorage from "./app/auth/storage";
import { useState } from "react";
import authApi from "./app/api/auth";
import AppNavigator from "./app/navigation/AppNavigator";

export default function App() {
  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false);

  const restoreUser = async () => {
    const user = await authStorage.getUser();
    // TODO: create endpoint to validate if jwt is still valid.
    if (user) setUser(user);
  };

  // if (!isReady)
  //   return (
  //     <AppLoading
  //       startAsync={restoreUser}
  //       onFinish={() => setIsReady(true)}
  //       onError={console.warn}
  //     />
  //   );
  // TODO: Expired jwt raises invalid signature error.

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <OfflineNotice />
      <NavigationContainer theme={navigationTheme}>
        {user ? <AppNavigator /> : <LoginScreen />}
        {/* <AppNavigator /> */}
        {/* <NewCoursesScreen /> */}
        {/* <CoursesNavigator /> */}
        {/* <AppNavigator /> */}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
