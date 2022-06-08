import { StyleSheet } from "react-native";
import colors from '../../config/colors'
import { resize } from '../../config/resize'

export default StyleSheet.create({
	header: {
		width: '100%',
		height: resize(150),
		backgroundColor: colors.primary,
		justifyContent: 'center',
		alignItems: 'center',
	},
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		marginVertical: resize(40)
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginHorizontal: resize(15),
		marginLeft: resize(25)
	},
	icon: {
		marginHorizontal: resize(5),
		marginVertical: resize(5)
	}
})