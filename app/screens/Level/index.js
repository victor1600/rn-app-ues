import React, { useEffect, useState } from "react";
import { View, TouchableOpacity } from "react-native";
import Screen from "../Screen";
import AppButton from "../../components/Button";
import { useLevel } from './hooks'
import ActivityIndicator from "../../components/ActivityIndicator";
import styles from './styles';
import AppText from "../../components/Text";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Modal from '../../components/Modal'
import Swipper from '../../components/Swipper'
import LevelCard from '../../components/LevelCards'

export const LevelScreen = ({ title = "Nivel de dificultad", route, navigation }) => {
	const { params } = route
	const { levelData, loading, getLevel, rulesData } = useLevel(params.id)
	const [showModal, setShowModal] = useState(false)

	useEffect(() => {
		getLevel()
	}, [])

	return (
		<Screen
			scroll={false}
		>
			{
				levelData ?
					<View style={styles.container}>
						<View style={styles.row}>
							<AppText style={styles.subTitle}>Selecciona el nivel de dificultad que deseas estudiar:</AppText>
							<TouchableOpacity style={styles.icon} onPress={() => {
								console.log('entro')
								setShowModal(true)
							}}>
								<MaterialCommunityIcons
									name="information-outline"
									size={20}
									color={'#7d7d7d'} />
							</TouchableOpacity>
						</View>
						{
							levelData.map((i, index) => (
								<LevelCard
									key={index}
									title={i.name}
									onPress={() => { }}
									disabled={!i.available}
								/>
							))
						}
						<Modal visible={showModal} dismiss={() => setShowModal(false)} botton={'Aceptar'}>
							<Swipper items={rulesData} />
						</Modal>
					</View>
					:
					<ActivityIndicator visible={loading} />

			}
		</Screen>
	)
}
export default LevelScreen