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
	},

	radioButtonContainerCorrect: {
		flexDirection: 'row',
		marginBottom: 10,
		justifyContent: 'flex-start',
		borderWidth: 1,
		borderColor: 'green',
		borderLeftWidth: 10,
	},
	radioButtonContainerWrong: {
		flexDirection: 'row',
		marginBottom: 10,
		justifyContent: 'flex-start',
		borderWidth: 1,
		borderColor: 'red',
		borderLeftWidth: 10,
	},

	radioButtonContainer: {
		flexDirection: 'row',
		marginBottom: 10,
		justifyContent: 'flex-start',
	},
})