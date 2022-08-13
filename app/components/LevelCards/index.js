import React, { useRef } from 'react';
import { View, TouchableOpacity } from 'react-native';
import styles from './styles';
import AppText from "../../components/Text";
import LottieView from 'lottie-react-native';
import Basico from '../../assets/animations/bronzeTrophy.json'
import Intermedio from '../../assets/animations/silverTrophy.json'
import Avanzado from '../../assets/animations/goldTrophy.json'


const LevelCard = ({
	title,
	onPress = () => { },
	disabled,

}) => {
	const animation = useRef(null);
	const imageArray = {
		Basico: Basico,
		Intermedio: Intermedio,
		Avanzado: Avanzado
	}
	return (
		<TouchableOpacity style={[styles.container,
		{ backgroundColor: disabled ? '#fff' : '#8d2326' },
		disabled && { borderWidth: 5, borderColor: '#7d7d7d' }]}
			onPress={() => !disabled ? onPress() : {}}>
			<View style={styles.imageContainer}>
				{
					!disabled &&
					<LottieView
						source={imageArray[`${title}`]}
						ref={animation}
						style={styles.image}
						autoPlay
					/>
				}
			</View>
			<AppText style={[styles.title, { color: disabled ? '#7d7d7d' : '#fff' }]}>{title}</AppText>
		</TouchableOpacity>
	)
}
export default LevelCard