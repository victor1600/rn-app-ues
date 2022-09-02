import React, { useEffect } from 'react';
import {
	View,
	StyleSheet,
	Linking,
	Alert,
	TouchableOpacity,
	Image,
	KeyboardAvoidingView
} from 'react-native';
import Screen from './Screen';
import colors from '../config/colors';
import quizApi from '../api/quiz';
import { useState } from 'react';
import useApi from '../hooks/useApi';
import AppText from '../components/Text';
import AppButton from '../components/Button';
import ActivityIndicator from '../components/ActivityIndicator';
import ContentNotFound from '../components/ContentNotFound';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { resize } from '../config/resize';
import Modal from '../components/Modal';
import LottieView from 'lottie-react-native';
import Congratulation from '../assets/animations/Congratulation.json';
import getCurrentLevel from '../api/topics';
import OptionsMultiple from '../components/Questions/Options_multiple/index'
import ComplementaryAnswer from '../components/Questions/Complementary_answer'
let answers = [];
let questions = [];

function QuizScreen({ route, navigation }) {
	const { topic, curso, number, userLevel } = route.params;
	const getQuizApi = useApi(quizApi.getQuiz);
	const getCurrentLevelApi = useApi(getCurrentLevel.getCurrentLevel);
	const gradeQuizApi = useApi(quizApi.gradeQuiz);
	const [questionCount, setQuestionCount] = useState(0);
	const [checked, setChecked] = useState('');
	const [error, setError] = useState();
	const [review, setReview] = useState(false);
	const [answersReview, setAnswersReview] = useState([]);
	const [skipQuestion, setSkipQuestion] = useState(true);
	const [deleteAnswers, setDeleteAnswers] = useState(true);
	const [answersArray, setAnswersArray] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [grade, setGrade] = useState(0);
	const [currentLevel, setCurrentLevel] = useState(null);
	const [text, onChangeText] = useState('')
	const [answersForReview, setAnswersForReview] = useState([])

	useEffect(() => {
		if (topic) {
			getQuizApi.request(topic.id, number);
		} else {
			getQuizApi.request(null, number);
		}
	}, []);

	useEffect(() => {
		if (currentLevel) {
			setShowModal(true);
		}
	}, [currentLevel]);

	useEffect(() => {
		if (getQuizApi.data) {
			setAnswersArray(getQuizApi.data[questionCount]?.answers);
		}
	}, [getQuizApi.data]);
	useEffect(() => {
		if (getCurrentLevelApi.data) {
			setCurrentLevel(getCurrentLevelApi.data.current_level);
		}
	}, [getCurrentLevelApi.data]);

	const skipQuestionMethod = () => {
		setSkipQuestion(false);
		const rightAnswer = getQuizApi.data[questionCount].answers.find(
			(e) => e.es_respuesta_correcta
		);
		if (getQuizApi.data[questionCount].tipo === 'Complementar') {
			getNextQuestion(rightAnswer, rightAnswer.texto);
		} else {
			getNextQuestion(rightAnswer);
		}
	};

	const deleteAnswersMethod = () => {
		setDeleteAnswers(false);
		const rightAnswer = getQuizApi.data[questionCount].answers.find(
			(e) => e.es_respuesta_correcta
		);
		const wrongAnswer = getQuizApi.data[questionCount].answers.filter(
			(e) => !e.es_respuesta_correcta
		);
		const answers = [rightAnswer, ...wrongAnswer.slice(0, wrongAnswer.length - 1)];
		setAnswersArray(answers);
	};

	const getNextQuestion = async (answer = checked, isComplementary = null) => {
		if (!answer && text.trim() === '' && !review) {
			Alert.alert('Error', 'Debes seleccionar una opción o responder a la pregunta para continuar.', {
				cancellable: false,
			});
			return;
		}
		if (!review) {
			if (text !== '' || isComplementary) {
				answers.push(text || isComplementary)
				questions.push(getQuizApi.data[questionCount].id)
			} else {
				answers.push(answer.id)
				questions.push(answer.pregunta)
			}
		}
		setChecked('');
		onChangeText('')
		if (questionCount < getQuizApi.data.length - 1) {
			setQuestionCount(questionCount + 1);
			setAnswersArray(getQuizApi.data[questionCount + 1].answers);
			return;
		}
		if (review) {
			if (route) return navigation.goBack();
			navigation.reset();
			return;
		}
		const answersRequest = {
			questions,
			answers
		}
		setAnswersForReview(answers)
		const result = await gradeQuizApi.request(answersRequest);
		setAnswersReview(answers);
		answers = [];
		questions = []
		if (!result.ok) {
			if (result.data) setError(result.data.error);
			else {
				setError('An unexpected error occurred.');
			}
			return;
		}
		const grade = result.data.grade;
		setGrade(grade);
		if (topic) {
			getCurrentLevelApi.request(topic.id);
		} else {
			setShowModal(true);
		}
	};
	return (
		<Screen>
			<View style={{ height: '100%' }}>
				<ActivityIndicator
					visible={getQuizApi.loading || gradeQuizApi.loading}
				/>
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
										<Image
											source={{ uri: getQuizApi.data[questionCount].imagen }}
											style={{ flex: 1 }}
											resizeMode={'contain'}
										/>
									</TouchableOpacity>
								</>
							)}
							<AppText style={styles.textNivel}>Nivel: {getQuizApi.data[questionCount].nivel}</AppText>

						</View>
						{(skipQuestion || deleteAnswers) &&
							!review &&
							answersArray && (
								<View style={styles.wildcardContainer}>
									{skipQuestion && (
										<TouchableOpacity
											style={[styles.wildcardContainer, styles.wildcard]}
											onPress={() => skipQuestionMethod()}
										>
											<MaterialCommunityIcons
												color={'#fff'}
												name={'page-next-outline'}
												size={25}
											/>
											<AppText style={styles.wildcardText}>
												Saltar Pregunta
											</AppText>
										</TouchableOpacity>
									)}
									{deleteAnswers &&
										answersArray.length > 2 && (
											<TouchableOpacity
												style={[styles.wildcardContainer, styles.wildcard]}
												onPress={() => deleteAnswersMethod()}
											>
												<MaterialCommunityIcons
													color={'#fff'}
													name={'sticker-remove-outline'}
													size={25}
												/>
												<AppText
													style={styles.wildcardText}
												>{`Eliminar 1\nrespuesta\nincorrecta`}</AppText>
											</TouchableOpacity>
										)}
								</View>
							)}
						<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }} keyboardVerticalOffset={100}>
							{
								getQuizApi.data[questionCount].tipo === 'Complementar' ?
									<ComplementaryAnswer
										review={review}
										question={getQuizApi.data[questionCount]}
										answer={answersForReview[questionCount]}
										text={text}
										onChangeText={(value) => onChangeText(value)}
									/>
									:
									<OptionsMultiple
										review={review}
										answersArray={answersArray}
										answersReview={answersReview}
										setChecked={(value) => { setChecked(value) }}
										checked={checked.id}
										questionCount={questionCount}
									/>
							}

							<AppButton
								title={
									questionCount < getQuizApi.data.length - 1
										? 'Siguiente'
										: 'Finalizar'
								}
								onPress={getNextQuestion}
							/>
						</KeyboardAvoidingView>
					</View>
				)) || <ContentNotFound title="Cuestionario" />}
			</View>
			<Modal
				visible={showModal}
				dismiss={() => {
					setQuestionCount(0);
					setAnswersArray(getQuizApi.data[0]?.answers);
					setReview(true);
					setShowModal(false);
				}}
				botton={'Si'}
				secondaryBotton={'No'}
				secondaryBottonOnPress={() => {
					setShowModal(false);
					if (route && currentLevel !== userLevel) {
						return navigation.navigate('Level', curso);
					} else {
						if (route) return navigation.goBack();
					}
					navigation.reset();
				}}
			>
				<View style={styles.modalContainer}>
					<AppText
						style={styles.textModal}
					>{`Su calificación es ${grade.toString()} ¿Desea hacer una revisión?`}</AppText>
					{currentLevel !== userLevel && (
						<>
							<LottieView
								source={Congratulation}
								style={styles.imageLottie}
								autoPlay
							/>
							<AppText style={styles.congratulationText}>
								¡Felicidades has subido de nivel!
							</AppText>
						</>
					)}
				</View>
			</Modal>
		</Screen>
	);
}

const styles = StyleSheet.create({
	checkBoxContainer: {
		backgroundColor: colors.white,
		borderWidth: 0,
	},
	link: {
		color: '#0645AD',
	},
	image: {
		width: '100%',
		height: 250,
		marginTop: 25,
		borderRadius: 10,
	},
	questionContainer: {
		backgroundColor: colors.white,
		padding: 10,
		flex: 1,
		justifyContent: 'space-around',
		marginBottom: resize(10),
	},
	wildcardContainer: {
		paddingVertical: 10,
		paddingHorizontal: 10,
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
	wildcardText: {
		color: colors.white,
		fontSize: resize(12),
		lineHeight: resize(16),
		fontWeight: 'bold',
	},
	wildcard: {
		backgroundColor: colors.primary,
		flex: 0.4,
		borderRadius: resize(7),
		alignItems: 'center',
	},
	modalContainer: {
		height: resize(250),
		backgroundColor: colors.white,
		justifyContent: 'center',
	},
	imageLottie: {
		height: resize(120),
		alignSelf: 'center',
	},
	congratulationText: {
		fontSize: resize(20),
		lineHeight: resize(24),
		fontWeight: 'bold',
		textAlign: 'center',
		marginBottom: resize(30),
	},
	textModal: {
		textAlign: 'center',
	},
	textNivel: {
		fontSize: resize(10),
		fontStyle: 'italic',
		textAlign: 'left'
	}
});

export default QuizScreen;
