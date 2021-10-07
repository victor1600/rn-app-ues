import React from "react";
import { View, StyleSheet } from "react-native";
import AppButton from "../components/Button";
import Screen from "./Screen";
import routes from "../navigation/routes";

function QuizConfigScreen({ route, navigation }) {
  return (
    <Screen>
      <AppButton
        title="comenzar"
        onPress={() => navigation.navigate(routes.QUIZ)}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default QuizConfigScreen;
