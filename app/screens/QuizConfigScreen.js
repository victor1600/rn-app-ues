import React from "react";
import { View, StyleSheet } from "react-native";
import AppButton from "../components/Button";
import Screen from "./Screen";
import routes from "../navigation/routes";
import AppText from "../components/Text";
import colors from "../config/colors";

function QuizConfigScreen({ route, navigation }) {
  return (
    <Screen>
      <View style={styles.textContainer}>
        <AppText style={styles.title}> Realizar cuestionario</AppText>
        <AppText>
          Este modulo permite contestar todas las preguntas disponibles para
          todas las materias.{"\n"}
          {"\n"}
          Las preguntas se mostraran en orden aleatorio. Cada pregunta tiene una
          sola respuesta correcta.
          {"\n"}
          {"\n"}La calificacion se muestra cuando se contesta la ultima
          pregunta.
        </AppText>
      </View>

      <AppButton
        title="comenzar"
        onPress={() => navigation.navigate(routes.QUIZ)}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  bulletPointList: {
    // flex: 1,
    flex: 1,
    flexDirection: "row",
    paddingLeft: 5,
  },
  container: {},
  textContainer: {
    backgroundColor: colors.white,
    marginTop: 20,
    marginBottom: 15,
    padding: 30,
    alignItems: "center",
  },
  title: {
    alignSelf: "center",
    fontSize: 28,
    fontWeight: "500",
    marginBottom: 15,
  },
});

export default QuizConfigScreen;
