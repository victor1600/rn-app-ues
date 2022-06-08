import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import colors from "../config/colors";

function AppButton({
	title,
	onPress,
	color = "primary",
	disabled = false,
	disabledFunction = () => console.log('no disponible')
}) {
	return (
		<TouchableOpacity
			style={[styles.button, { backgroundColor: disabled ? colors.gray : colors[color] }]}
			onPress={() => disabled ? disabledFunction() : onPress()}
		>
			<Text style={styles.text}>{title}</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: colors.primary,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 5,
		padding: 10,
		margin: 12,
	},
	text: {
		color: colors.white,
		fontSize: 18,
		textTransform: "uppercase",
		fontWeight: "bold",
	},
});

export default AppButton;
