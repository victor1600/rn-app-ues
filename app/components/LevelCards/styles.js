import { StyleSheet } from "react-native";
import { resize } from '../../config/resize'

export default StyleSheet.create({
	container: {
		borderRadius: resize(10),
		paddingVertical: resize(15),
		paddingHorizontal: resize(20),
		width: resize(300),
		marginTop: resize(30),
		flexDirection: 'row',
		alignItems: 'center'
	},
	title: {
		fontSize: resize(20),
		lineHeight: resize(24),
		fontWeight: 'bold'
	},
	image: {
		height: resize(80)
	},
	imageContainer: {
		height: resize(80),
		width: resize(80)
	}
})