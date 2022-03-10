import { StyleSheet } from "react-native";
import colors from '../../config/colors'
import { resize } from '../../config/resize'

export default StyleSheet.create({
	title: {
		fontSize: resize(25),
		lineHeight: resize(30),
		fontWeight: 'bold',
		textAlign: 'center',
		marginVertical: resize(10),
		textTransform: 'capitalize'
	},
	subTitle: {
		fontSize: resize(20),
		lineHeight: resize(25),
		fontWeight: 'bold',
		textAlign: 'center',
		marginVertical: resize(5),
		textTransform: 'capitalize'
	}
})