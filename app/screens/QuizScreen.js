import React, { useEffect } from "react";
import { View, StyleSheet, Image, Text, FlatList } from "react-native";
import Screen from "./Screen";
import colors from "../config/colors";
import quizApi from "../api/quiz";
import { useState } from "react";
import useApi from "../hooks/useApi";
import AppText from "../components/Text";
import AppButton from "../components/Button";
import { RadioButton } from "react-native-paper";

const radios = [
  { id: 1, name: "name" },
  { id: 2, name: "name" },
];

function QuizScreen(props) {
  const getQuizApi = useApi(quizApi.getQuiz);
  const [questionCount, setQuestionCount] = useState(0);
  const [checked, setChecked] = React.useState("first");

  useEffect(() => {
    getQuizApi.request();
  }, []);
  const getNextQuestion = () => {
    setQuestionCount(questionCount + 1);
  };

  const handleSubmit = () => {};

  return (
    <Screen>
      {getQuizApi.data[0] && (
        <>
          <View style={styles.questionContainer}>
            <AppText>{getQuizApi.data[questionCount].question_text}</AppText>

            {getQuizApi.data[questionCount].question_image && (
              <Image
                source={{ uri: getQuizApi.data[questionCount].question_image }}
                style={styles.image}
              />
            )}
          </View>
          <View style={styles.answerContainer}>
            <FlatList
              data={radios}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.radioButtonContainer}>
                  <RadioButton
                    value="first"
                    color={colors.primary}
                    status={checked === "first" ? "checked" : "unchecked"}
                    onPress={() => setChecked("first")}
                  />
                  <AppText>Hola</AppText>
                </View>
              )}
            />
          </View>
          {questionCount < getQuizApi.data.length - 1 ? (
            <AppButton title="Siguiente" onPress={getNextQuestion} />
          ) : (
            <AppButton title="Finalizar" onPress={handleSubmit} />
          )}
        </>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  answerContainer: {
    backgroundColor: colors.white,

    // padding: 30,
  },
  image: {
    width: "100%",
    height: 250,
    marginTop: 25,
    borderRadius: 10,
  },
  questionContainer: {
    alignItems: "center",
    backgroundColor: colors.white,
    marginTop: 20,
    // marginHorizontal: 10,
    marginBottom: 15,
    padding: 30,
  },
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default QuizScreen;
