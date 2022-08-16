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
	imageContainer: {
		height: resize(100),
		width: resize(100),
		backgroundColor: colors.gray,
		borderRadius: resize(100),
		borderWidth: 3,
		borderColor: colors.white
	},
	headerContainer: {
		width: resize(350),
		borderRadius: resize(7),
		backgroundColor: colors.primary,
		paddingVertical: resize(3),
		alignSelf: 'center'
	},
	title: {
		fontWeight: 'bold',
		color: colors.white,
		textAlign: 'center'
	},
	column: {
		flexDirection: 'column',
		alignContent: 'center',
		alignItems: 'center',
		paddingHorizontal: resize(20),
		paddingVertical: resize(10)
	},
	emptyText: {
		textAlign: 'center',
		marginVertical: resize(50)
	},
	divider: {
		height: resize(1),
		width: '100%',
		backgroundColor: colors.primary,
		marginTop: resize(3)
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignContent: 'space-between',
	},
	grade: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		flex: 1
	},
	course: {
		flex: 1,
		flexDirection: 'row',
		paddingLeft: resize(10)
	},
	editIcon: {
		height: resize(30),
		width: resize(30),
		borderRadius: resize(15),
		backgroundColor: colors.white,
		position: 'absolute',
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 2
	},
	image: {
		flex: 1,
		borderRadius: resize(100)
	}
})
