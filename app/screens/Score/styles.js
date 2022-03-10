import { StyleSheet } from "react-native";
import colors from '../../config/colors'
import { resize } from '../../config/resize'

export default StyleSheet.create({
	flatlist: {
		flex: 1,
	},
	card: {
		flexDirection: 'row',
		paddingVertical: resize(20),
		paddingHorizontal: resize(10),
		borderWidth: 0.5,
		borderRadius: resize(8),
		marginVertical: resize(10),
		marginHorizontal: resize(10),
		alignItems: 'center',
		borderColor: colors.gray,
		backgroundColor: colors.white
	},
	imageContainer: {
		height: resize(50),
		width: resize(50),
		backgroundColor: colors.gray,
		borderRadius: resize(50),
		borderWidth: 3,
		borderColor: colors.white,
		marginHorizontal: resize(8)
	},
	editIcon: {
		height: resize(30),
		width: resize(30),
		borderRadius: resize(15),
		backgroundColor: colors.white,
		position: 'absolute',
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 2,
		top: resize(-20),
		right: resize(-10)
	},
	image: {
		flex: 1,
		borderRadius: resize(50)
	},
	name: {
		fontWeight: 'bold',
		textTransform: 'capitalize',
	},
	leftCard: {
		flex: 0.8,
		flexDirection: 'row',
		alignItems: 'center',
	},
	rightCard: {
		flex: 0.2,
		flexDirection: 'column',
		justifyContent: 'flex-end',
		alignItems: 'center'
	},
	first: {
		borderWidth: 3,
		borderColor: '#FFD700',
		flexDirection: 'row',
		paddingVertical: resize(20),
		paddingHorizontal: resize(10),
		borderRadius: resize(8),
		marginVertical: resize(10),
		marginHorizontal: resize(10),
		alignItems: 'center',
		backgroundColor: colors.white

	},
	second: {
		borderWidth: 3,
		borderColor: '#C0C0C0',
		flexDirection: 'row',
		paddingVertical: resize(20),
		paddingHorizontal: resize(10),
		borderRadius: resize(8),
		marginVertical: resize(10),
		marginHorizontal: resize(10),
		alignItems: 'center',
		backgroundColor: colors.white

	},
	third: {
		borderWidth: 3,
		borderColor: '#B87333',
		flexDirection: 'row',
		paddingVertical: resize(20),
		paddingHorizontal: resize(10),
		borderRadius: resize(8),
		marginVertical: resize(10),
		marginHorizontal: resize(10),
		alignItems: 'center',
		backgroundColor: colors.white
	},

	cardHeader: {
		flexDirection: 'column',
		paddingVertical: resize(20),
		paddingHorizontal: resize(10),
		borderWidth: 0.5,
		borderRadius: resize(8),
		marginVertical: resize(10),
		marginHorizontal: resize(10),
		borderColor: colors.gray,
		backgroundColor: colors.primary
	},

})