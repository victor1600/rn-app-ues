import React, { useEffect } from "react";
import {
	View,
	StyleSheet,
	FlatList,
	Linking,
	Alert,
	TouchableOpacity,
	Image,
} from "react-native";
import Screen from "./Screen";
import colors from "../config/colors";
import quizApi from "../api/quiz";
import { useState } from "react";
import useApi from "../hooks/useApi";
import AppText from "../components/Text";
import AppButton from "../components/Button";
import { CheckBox } from "react-native-elements";
// import { TouchableOpacity } from "react-native-gesture-handler";
import ActivityIndicator from "../components/ActivityIndicator";
import ContentNotFound from "../components/ContentNotFound";
import { MaterialCommunityIcons } from "@expo/vector-icons";

let answers = [];
function QuizScreen({ route, navigation }) {
	const topic = route.params;
	const getQuizApi = useApi(quizApi.getQuiz);
	const gradeQuizApi = useApi(quizApi.gradeQuiz);
	const [questionCount, setQuestionCount] = useState(0);
	const [checked, setChecked] = useState("");
	const [error, setError] = useState();
	const [review, setReview] = useState(false)
	const [answersReview, setAnswersReview] = useState([])

	useEffect(() => {
		if (topic) {
			getQuizApi.request(topic.id);
		} else {
			getQuizApi.request();
		}
	}, []);

	const getNextQuestion = async () => {
		if (!checked && !review) {
			Alert.alert("Error", "Por favor selecciona una respuesta.", {
				cancellable: false,
			});
			return;
		}
		if (!review) {
			answers.push(checked);
		}
		setChecked("");
		if (questionCount < getQuizApi.data.length - 1) {
			setQuestionCount(questionCount + 1);
			return;
		}
		if (review) {
			if (route) return navigation.goBack();
			navigation.reset();
			return
		}
		const result = await gradeQuizApi.request({ answers });
		setAnswersReview(answers)
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
		// TODO: fix this
		Alert.alert(
			"Calificación",
			`Su calificación es ${grade.toString()}\n¿Desea hacer una revisión?`,
			[
				{
					text: "Si",
					onPress: () => {
						setQuestionCount(0)
						setReview(true)
					}
				},
				{
					text: "No",
					onPress: () => {
						if (route) return navigation.goBack();
						navigation.reset();
					},
				},
			],
			{ cancellable: false }
		);
	};
	return (
		<>
			<ActivityIndicator visible={getQuizApi.loading || gradeQuizApi.loading} />
			<Screen>
				{(getQuizApi.data[0] && (
					<>
						<View style={styles.questionContainer}>
							<AppText>{getQuizApi.data[questionCount].texto}</AppText>
							{getQuizApi.data[questionCount].imagen && (
								<>
									<TouchableOpacity
										onPress={() =>
											Linking.openURL(getQuizApi.data[questionCount].imagen)
										}
										style={{ height: 100, width: 300 }}
									>
										<Image source={{ uri: getQuizApi.data[questionCount].imagen }} style={{ flex: 1 }} resizeMode={'contain'} />
									</TouchableOpacity>
								</>
							)}
						</View>
						<View style={styles.answerContainer}>
							{
								review &&
								<AppText>La respuesta correcta es:</AppText>
							}
							<FlatList
								data={getQuizApi.data[questionCount].answers}
								keyExtractor={(item) => item.id.toString()}
								renderItem={({ item, index }) => (
									<View style={[
										(review && answersReview[questionCount] === item.id && item.es_respuesta_correcta) || (review && item.es_respuesta_correcta) ? styles.radioButtonContainerCorrect :
											(review && answersReview[questionCount] === item.id && !item.es_respuesta_correcta) ? styles.radioButtonContainerWrong :
												styles.radioButtonContainer]}>
										<View style={{ flexDirection: 'row', flex: 1 }}>
											<CheckBox
												title={item.texto}
												checkedIcon="dot-circle-o"
												uncheckedIcon="circle-o"
												checkedColor={colors.primary}
												containerStyle={styles.checkBoxContainer}
												checked={review ?
													answersReview[questionCount] === item.id ? true : false
													:
													checked === item.id ? true : false}
												onPress={() => review ? {} : setChecked(item.id)}
											/>
											<TouchableOpacity onPress={() => review ? {} : setChecked(item.id)} style={{ height: 50, width: 100 }}>
												<Image source={{ uri: item.imagen }} style={{ flex: 1 }} resizeMode={'contain'} />
											</TouchableOpacity>
										</View>
										{
											((review && answersReview[questionCount] === item.id && item.es_respuesta_correcta) || (review && item.es_respuesta_correcta)) &&
											<View style={{ flex: 0.1, flexDirection: 'column', justifyContent: 'center' }}>
												<MaterialCommunityIcons
													color={'green'}
													name={'check-circle'}
													size={25}
												/>
											</View>
										}
										{
											review && answersReview[questionCount] === item.id && !item.es_respuesta_correcta &&
											<View style={{ flex: 0.1, flexDirection: 'column', justifyContent: 'center' }}>
												<MaterialCommunityIcons
													color={'red'}
													name={'close-circle'}
													size={25}
												/>
											</View>
										}
									</View>
								)}
								showsVerticalScrollIndicator={false}
							/>
						</View>

						<AppButton
							title={questionCount < getQuizApi.data.length - 1 ? "Siguiente" : 'Finalizar'} onPress={getNextQuestion} />
					</>
				)) || <ContentNotFound title="Cuestionario" />}
			</Screen>
		</>
	);
}

const styles = StyleSheet.create({
	answerContainer: {
		backgroundColor: colors.white,
		flex: 1,
		paddingVertical: 15,
		paddingHorizontal: 10,
	},
	checkBoxContainer: {
		backgroundColor: colors.white,
		borderWidth: 0,
	},
	link: {
		color: "#0645AD",
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
		marginBottom: 15,
		padding: 10,
		flex: 1,
		justifyContent: 'center'
	},
	radioButtonContainer: {
		flexDirection: "row",
		marginBottom: 10,
		justifyContent: 'flex-start'
	},
	radioButtonContainerWrong: {
		flexDirection: "row",
		marginBottom: 10,
		justifyContent: 'flex-start',
		borderWidth: 1,
		borderColor: 'red',
		borderLeftWidth: 10

	},
	radioButtonContainerCorrect: {
		flexDirection: "row",
		marginBottom: 10,
		justifyContent: 'flex-start',
		borderWidth: 1,
		borderColor: 'green',
		borderLeftWidth: 10
	},
});

export default QuizScreen;
