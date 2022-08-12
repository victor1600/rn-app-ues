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
import ActivityIndicator from "../components/ActivityIndicator";
import ContentNotFound from "../components/ContentNotFound";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { resize } from '../config/resize'
import Modal from '../components/Modal'
import LottieView from 'lottie-react-native';
import Congratulation from '../assets/animations/Congratulation.json'
import getCurrentLevel from "../api/topics";


let answers = [];

function QuizScreen({ route, navigation }) {
	const { topic, curso } = route.params;
	const numberQuestions = route.params
	const getQuizApi = useApi(quizApi.getQuiz);
	const getCurrentLevelApi = useApi(getCurrentLevel.getCurrentLevel);
	const gradeQuizApi = useApi(quizApi.gradeQuiz);
	const [questionCount, setQuestionCount] = useState(0);
	const [checked, setChecked] = useState("");
	const [error, setError] = useState();
	const [review, setReview] = useState(false)
	const [answersReview, setAnswersReview] = useState([])
	const [skipQuestion, setSkipQuestion] = useState(true)
	const [deleteAnswers, setDeleteAnswers] = useState(true)
	const [answersArray, setAnswersArray] = useState([])
	const [showModal, setShowModal] = useState(false)
	const [grade, setGrade] = useState(0)
	const [currentLevel, setCurrentLevel] = useState(null)

	useEffect(() => {
		if (topic) {
			getQuizApi.request(topic.id, numberQuestions.number);
		} else {
			getQuizApi.request();
		}
	}, []);

	useEffect(() => {
		if (currentLevel) {
			setShowModal(true)
		}
	}, [currentLevel])

	useEffect(() => {
		if (getQuizApi.data) {
			setAnswersArray(getQuizApi.data[questionCount]?.answers)
		}
	}, [getQuizApi.data])
	useEffect(() => {
		if (getCurrentLevelApi.data) {
			setCurrentLevel(getCurrentLevelApi.data.current_level)
		}
	}, [getCurrentLevelApi.data])

	const skipQuestionMethod = () => {
		setSkipQuestion(false)
		const rightAnswer = getQuizApi.data[questionCount].answers.find(e => e.es_respuesta_correcta)
		getNextQuestion(rightAnswer.id)
	}

	const deleteAnswersMethod = () => {
		setDeleteAnswers(false)
		const rightAnswer = getQuizApi.data[questionCount].answers.find(e => e.es_respuesta_correcta)
		const wrongAnswer = getQuizApi.data[questionCount].answers.find(e => !e.es_respuesta_correcta)
		const answers = [rightAnswer, wrongAnswer]
		setAnswersArray(answers)
	}

	const getNextQuestion = async (answer = checked) => {
		if (!answer && !review) {
			Alert.alert("Error", "Por favor selecciona una respuesta.", {
				cancellable: false,
			});
			return;
		}
		if (!review) {
			answers.push(answer);
		}
		setChecked("");
		if (questionCount < getQuizApi.data.length - 1) {
			setQuestionCount(questionCount + 1);
			setAnswersArray(getQuizApi.data[questionCount + 1].answers)
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
			}
			return;
		}
		const grade = result.data.grade;
		setGrade(grade)
		getCurrentLevelApi.request(topic.id)
	};
	return (
		<Screen>
			<View style={{ height: '100%' }}>
				<ActivityIndicator visible={getQuizApi.loading || gradeQuizApi.loading} />
				{(getQuizApi.data[0] && (
					<View style={{ flex: 1 }}>
						<View style={styles.questionContainer}>
							<AppText>{getQuizApi.data[questionCount].texto}</AppText>
							{getQuizApi.data[questionCount].imagen && (
								<>
									<TouchableOpacity
										onPress={() =>
											Linking.openURL(getQuizApi.data[questionCount].imagen)
										}
										style={{ height: resize(100), width: resize(300) }}
									>
										<Image source={{ uri: getQuizApi.data[questionCount].imagen }} style={{ flex: 1 }} resizeMode={'contain'} />
									</TouchableOpacity>
								</>
							)}
						</View>
						{
							(skipQuestion || deleteAnswers) && !review && answersArray && answersArray.length > 2 &&
							<View style={styles.wildcardContainer}>
								{
									skipQuestion &&
									<TouchableOpacity style={[styles.wildcardContainer, styles.wildcard]} onPress={() => skipQuestionMethod()}>
										<MaterialCommunityIcons
											color={'#fff'}
											name={'page-next-outline'}
											size={25}
										/>
										<AppText style={styles.wildcardText}>Saltar Pregunta</AppText>
									</TouchableOpacity>
								}
								{
									deleteAnswers &&
									<TouchableOpacity style={[styles.wildcardContainer, styles.wildcard]} onPress={() => deleteAnswersMethod()}>
										<MaterialCommunityIcons
											color={'#fff'}
											name={'sticker-remove-outline'}
											size={25}
										/>
										<AppText style={styles.wildcardText}>{`Eliminar 1\nrespuesta\nincorrecta`}</AppText>
									</TouchableOpacity>
								}
							</View>
						}
						<View style={styles.answerContainer}>
							{
								review &&
								<AppText>La respuesta correcta es:</AppText>
							}
							<FlatList
								data={answersArray}
								renderItem={({ item, index }) => (
									<View
										key={index}
										style={[
											(review && answersReview[questionCount] === item.id && item.es_respuesta_correcta) || (review && item.es_respuesta_correcta) ? styles.radioButtonContainerCorrect :
												(review && answersReview[questionCount] === item.id && !item.es_respuesta_correcta) ? styles.radioButtonContainerWrong :
													styles.radioButtonContainer]}>
										<View style={{ flexDirection: !item.imagen ? 'column' : 'row', flex: 1 }}>
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
											{item.imagen &&
												<TouchableOpacity onPress={() => review ? {} : setChecked(item.id)}
													style={{ height: resize(100), width: resize(250) }}>
													<Image source={{ uri: item.imagen }} style={{ flex: 1 }} resizeMode={'contain'} />
												</TouchableOpacity>
											}
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

					</View>
				)) || <ContentNotFound title="Cuestionario" />}
			</View>
			<Modal visible={showModal}
				dismiss={() => {
					setQuestionCount(0)
					setAnswersArray(getQuizApi.data[0]?.answers)
					setReview(true)
					setShowModal(false)
				}}
				botton={'Si'}
				secondaryBotton={'No'}
				secondaryBottonOnPress={() => {
					setShowModal(false)
					if (route && currentLevel !== topic?.nivel_usuario_actual) {
						return navigation.navigate('Level', curso)
					} else {
						if (route) return navigation.goBack()
					}
					navigation.reset();
				}}
			>
				<View style={styles.modalContainer}>
					<AppText style={styles.textModal}>{
						`Su calificación es ${grade.toString()} ¿Desea hacer una revisión?`
					}</AppText>
					{
						currentLevel !== topic?.nivel_usuario_actual &&
						<>
							<LottieView
								source={Congratulation}
								style={styles.imageLottie}
								autoPlay
							/>
							<AppText style={styles.congratulationText}>¡Felicidades has subido de nivel!</AppText>
						</>
					}
				</View>
			</Modal>
		</Screen>
	);
}

const styles = StyleSheet.create({
	answerContainer: {
		backgroundColor: colors.white,
		flex: 1,
		paddingVertical: 15,
		paddingHorizontal: 10,
		marginTop: resize(10)
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
		padding: 10,
		flex: 1,
		justifyContent: 'center',
		marginBottom: resize(10)
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
	wildcardContainer: {
		paddingVertical: 10,
		paddingHorizontal: 10,
		flexDirection: 'row',
		justifyContent: 'space-around'
	},
	wildcardText: {
		color: colors.white,
		fontSize: resize(12),
		lineHeight: resize(16),
		fontWeight: 'bold'
	},
	wildcard: {
		backgroundColor: colors.primary,
		flex: 0.4,
		borderRadius: resize(7),
		alignItems: 'center'
	},
	modalContainer: {
		height: resize(250),
		backgroundColor: colors.white,
		justifyContent: 'center'
	},
	imageLottie: {
		height: resize(120),
		alignSelf: 'center'
	},
	congratulationText: {
		fontSize: resize(20),
		lineHeight: resize(24),
		fontWeight: 'bold',
		textAlign: 'center',
		marginBottom: resize(30)
	},
	textModal: {
		textAlign: 'center'
	}
});

export default QuizScreen;
