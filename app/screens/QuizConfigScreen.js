import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import AppButton from "../components/Button";
import Screen from "./Screen";
import routes from "../navigation/routes";
import AppText from "../components/Text";
import colors from "../config/colors";
import RNPickerSelect from 'react-native-picker-select';
function QuizConfigScreen({ route, navigation }) {
	const [number, setNumber] = useState(0)
	const showError = () => {
		Alert.alert(
			"Error",
			'Debe seleccionar un número de pregunta',
			[
				{
					text: "OK",
					onPress: () => {
					}
				},
			],
			{ cancellable: false }
		);
	}

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

				<RNPickerSelect
					onValueChange={(value) => setNumber(value)}
					items={[
						{ label: '10', value: 10 },
						{ label: '25', value: 25 },
						{ label: '50', value: 50 },
						{ label: '100', value: 100 },
						{ label: '200', value: 200 },
					]}
					placeholder={{ label: 'Selecciona el número de preguntas', value: null }}
					style={picker}
				/>
			</View>

			<AppButton
				title="comenzar"
				onPress={() => number > 0 ? navigation.navigate(routes.QUIZ, { number }) : showError()}
				disable={number <= 0 ? true : false}
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

const picker = StyleSheet.create({
	inputIOS: {
		flexGrow: 1,
		fontSize: 16,
		color: '#fff',
		borderWidth: 1,
		marginTop: 20,
		paddingVertical: 10,
		borderRadius: 7,
		borderColor: colors.primary,
		textAlign: 'center',
		backgroundColor: colors.primary,
		fontWeight: 'bold'

	},
	inputAndroid: {
		flexGrow: 1,
		fontSize: 16,
		color: '#fff',
		borderWidth: 1,
		marginTop: 20,
		paddingVertical: 10,
		borderRadius: 7,
		borderColor: colors.primary,
		textAlign: 'center',
		backgroundColor: colors.primary,
		fontWeight: 'bold'

	},
	placeholder: {
		color: '#fff',
		fontWeight: 'bold'
	},

})

export default QuizConfigScreen;
