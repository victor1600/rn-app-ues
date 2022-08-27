import { StyleSheet } from "react-native";
import colors from '../../../config/colors';
import { resize } from '../../../config/resize';

export default StyleSheet.create({
	answerContainer: {
		backgroundColor: colors.white,
		flex: 1,
		paddingVertical: 15,
		paddingHorizontal: 10,
		marginTop: resize(10),
		alignContent: 'center',
		justifyContent: 'space-around'
	},
	input: {
		flex: 1,
		borderWidth: 1,
		borderColor: colors.primary,
		height: resize(30),
		borderRadius: resize(8),
		paddingHorizontal: resize(15)
	},
	answerText: {
		fontWeight: 'bold',
		color: 'green'
	},
	rowInput: {
		width: '100%', flexDirection: 'row',
		justifyContent: 'center',
		alignContent: 'center',
		alignItems: 'center'
	},
	icon: {
		flex: 0.1,
		marginHorizontal: resize(10)
	}
})