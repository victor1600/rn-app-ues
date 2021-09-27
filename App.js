import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppLoading from "expo-app-loading";
import navigationTheme from "./app/navigation/navigationTheme";
import QuizNavigator from "./app/navigation/QuizNavigator";
import OfflineNotice from "./app/components/OfflineNotice";
import LoginScreen from "./app/screens/LoginScreen";
import AuthContext from "./app/auth/context";
import authStorage from "./app/auth/storage";
import { useState } from "react";

export default function App() {
  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false);

  const restoreUser = async () => {
    const user = await authStorage.getUser();
    if (user) setUser(user);
  };

  if (!isReady)
    return (
      <AppLoading
        startAsync={restoreUser}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );
  // TODO: Expired jwt raises invalid signature error.

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <OfflineNotice />
      <NavigationContainer theme={navigationTheme}>
        {user ? <QuizNavigator /> : <LoginScreen />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
