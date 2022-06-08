import { StyleSheet } from "react-native";
import colors from '../../config/colors'
import { resize } from '../../config/resize'

export default StyleSheet.create({
	container: {
		paddingHorizontal: resize(10),
		paddingVertical: resize(10),
		height: resize(500)
	},
	wrapper: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	image: {
		height: resize(300),
		width: resize(300)
	}
})