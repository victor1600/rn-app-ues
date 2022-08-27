import React, { useEffect } from "react";
import { View, TouchableOpacity, Image } from "react-native";
import AppText from "../../components/Text";
import Screen from "../Screen";
import AppButton from "../../components/Button";
import useAuth from "../../auth/useAuth";
import { useProfile } from './hooks'
import styles from './styles';
import stylesText from '../../components/Text/styles'
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ActivityIndicator from "../../components/ActivityIndicator";

export const ProfileScreen = () => {
	const { loading, profile, getProfile, handleOpenPicker, refresh } = useProfile()
	const auth = useAuth();

	useEffect(() => {
		getProfile()
	}, [])

	return (
		<Screen
			scroll={true}
			onRefresh={() => getProfile(true)}
			refreshing={refresh}
		>
			{
				profile ?
					<>
						<ActivityIndicator visible={loading} />
						<View style={styles.header}>
							<View style={styles.imageContainer}>
								<TouchableOpacity style={styles.editIcon} onPress={() => handleOpenPicker()}>
									<MaterialCommunityIcons
										color={'#7d7d7d'}
										name={'pencil'}
										size={20}
									/>
								</TouchableOpacity>
								<Image source={{ uri: `data:image/png;base64,${profile.imagen}` }} style={styles.image} />
							</View>
						</View>
						<AppText style={stylesText.title}>{profile.first_name} {profile.last_name}</AppText>
						<AppText style={stylesText.subTitle}>Score: {profile.score.toFixed(2)}</AppText>
						<View style={styles.headerContainer}>
							<AppText style={styles.title}>Mis Cursos</AppText>
						</View>
						{
							profile.average_grades.length > 0 ?
								profile.average_grades.map((e, index) => {
									return (
										<View style={styles.column} key={index}>
											<View style={styles.row}>
												<MaterialCommunityIcons
													color={'#000'}
													name={'school'}
													size={20}
												/>
												<View style={styles.course}>

													<AppText>{e.course}</AppText>
												</View>
												<View style={styles.grade}>
													<AppText>{e.grade}</AppText>
												</View>
											</View>
											<View style={styles.divider}></View>
										</View>
									)
								})
								:
								<AppText style={styles.emptyText}>
									No tienes cursos disponibles
								</AppText>
						}
						<AppButton
							title="CERRAR SESIÓN"
							onPress={() => auth.logOut()}
						/>
					</>
					:
					<>
					</>
			}
		</Screen>
	);
}


export default ProfileScreen;
