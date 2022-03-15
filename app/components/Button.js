import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import colors from "../config/colors";

function AppButton({
	title,
	onPress,
	color = "primary",
	// marginHorizontal = 10,
}) {
	return (
		<TouchableOpacity
			style={[styles.button, { backgroundColor: colors[color] }]}
			onPress={onPress}
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
		// width: "98%",
		// marginVertical: 10,
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
