import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppText from "../Text";
import colors from "../../config/colors";
import LottieView from 'lottie-react-native';
import { resize } from '../../config/resize'

import Basico from '../../assets/animations/bronzeStar.json'
import Intermedio from '../../assets/animations/silverStar.json'
import Avanzado from '../../assets/animations/goldStar.json'

function ListItem({ icon, text, onPress, level = null }) {
	const imageArray = {
		Basico: Basico,
		Intermedio: Intermedio,
		Avanzado: Avanzado
	}
	return (
		<TouchableWithoutFeedback onPress={onPress}>
			<View style={styles.container}>
				{
					level &&
					<LottieView
						source={imageArray[`${level}`]}
						style={styles.image}
						loop={false}
						autoPlay
					/>
				}
				<AppText numberOfLines={1} style={[{ flex: 1 }, level && { marginLeft: resize(-20) }]}>
					{text}
				</AppText>

				<MaterialCommunityIcons color={colors.primary} name={icon} size={25} />
			</View>
		</TouchableWithoutFeedback>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.white,
		flexDirection: "row",
		height: 50,
		alignItems: "center",
		width: "100%",
		paddingRight: 20,
		paddingLeft: 15,
	},
	image: {
		height: resize(80),
		marginHorizontal: resize(-10)
	},
});

export default ListItem;
