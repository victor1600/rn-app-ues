import React, { useEffect } from "react";
import { View, StyleSheet, FlatList, Linking, Alert } from "react-native";
import Screen from "./Screen";
import colors from "../config/colors";
import quizApi from "../api/quiz";
import { useState } from "react";
import useApi from "../hooks/useApi";
import AppText from "../components/Text";
import AppButton from "../components/Button";
import { CheckBox } from "react-native-elements";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

let answers = [];
function QuizScreen({ route, navigation }) {
  const topic = route.params;
  const getQuizApi = useApi(quizApi.getQuiz);
  const gradeQuizApi = useApi(quizApi.gradeQuiz);
  const [questionCount, setQuestionCount] = useState(0);
  const [checked, setChecked] = useState("");
  const [error, setError] = useState();
  // const [answers, setAnswers] = useState([]);
  useEffect(() => {
    getQuizApi.request(topic.id);
  }, []);

  const getNextQuestion = async () => {
    if (!checked) {
      Alert.alert("Error", "Por favor selecciona una respuesta.", {
        cancellable: false,
      });
      return;
    }
    answers.push(checked);
    setChecked("");
    if (questionCount < getQuizApi.data.length - 1) {
      setQuestionCount(questionCount + 1);
      return;
    }

    console.log(answers);
    const result = await gradeQuizApi.request({ answers });
    answers = [];

    if (!result.ok) {
      if (result.data) setError(result.data.error);
      else {
        setError("An unexpected error occurred.");
        console.log(result);
      }
      return;
    }
    const grade = result.data.grade;

    Alert.alert(
      "Nota",
      grade.toString(),
      [{ text: "OK", onPress: () => navigation.goBack() }],
      { cancellable: false }
    );
  };

  return (
    <Screen>
      {getQuizApi.data[0] && (
        <>
          <View style={styles.questionContainer}>
            <AppText>{getQuizApi.data[questionCount].question_text}</AppText>

            {getQuizApi.data[questionCount].question_image && (
              <TouchableWithoutFeedback
                onPress={() =>
                  Linking.openURL(getQuizApi.data[questionCount].question_image)
                }
              >
                <AppText style={styles.link}>Imagen de apoyo</AppText>
              </TouchableWithoutFeedback>

              // <Image
              //   source={{ uri: getQuizApi.data[questionCount].question_image }}
              //   style={styles.image}
              // />
            )}
          </View>
          <View style={styles.answerContainer}>
            <FlatList
              data={getQuizApi.data[questionCount].answers}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.radioButtonContainer}>
                  <CheckBox
                    title={item.answer_text}
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    checkedColor={colors.primary}
                    containerStyle={styles.checkBoxContainer}
                    checked={checked === item.id ? true : false}
                    onPress={() => setChecked(item.id)}
                  />
                </View>
              )}
            />
          </View>

          <AppButton title="Siguiente" onPress={getNextQuestion} />
        </>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  answerContainer: {
    backgroundColor: colors.white,
  },
  checkBoxContainer: {
    backgroundColor: colors.white,
    borderWidth: 0,
  },
  link: {
    color: "blue",
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
