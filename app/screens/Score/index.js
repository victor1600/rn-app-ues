import React, { useEffect } from "react";
import { View, RefreshControl, Image, FlatList } from "react-native";
import AppText from "../../components/Text";
import Screen from "../Screen";
import { useScore } from './hooks'
import ActivityIndicator from "../../components/ActivityIndicator";
import styles from "./styles";
import stylesText from '../../components/Text/styles'
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ScoreScreen = () => {
	const { loading, score, getScore } = useScore()

	useEffect(() => {
		getScore()
	}, [])

	return (
		<Screen
			onRefresh={() => { }}
			refreshing={false}
		>
			{
				score ?
					<FlatList
						data={score.leaderboard}
						renderItem={
							({ item, index }) => (
								<View style={[
									index === 0 ? styles.first :
										index === 1 ? styles.second :
											index === 2 ? styles.third :
												styles.card]
								} key={item.id}>
									<View style={styles.leftCard}>
										<AppText style={stylesText.subTitle}>{index + 1}</AppText>
										<View style={[styles.imageContainer, { borderColor: index === 0 ? '#FFD700' : index === 1 ? '#C0C0C0' : index === 2 ? '#B87333' : '#fff' }]}>
											{
												(index === 0 || index === 1 || index === 2) &&
												<View style={styles.editIcon} >
													<MaterialCommunityIcons
														color={
															index === 0 ? '#FFD700' :
																index === 1 ? '#C0C0C0' : '#B87333'}
														name={'crown'}
														size={20}
													/>
												</View>
											}
											{
												item.imagen !== null && item.imagen !== '' &&
												<Image source={{ uri: `data:image/png;base64,${item.imagen}` }} style={styles.image} />
											}
										</View>
										<View style={styles.nameContainer}>
											<AppText style={styles.name}>{item.first_name} {item.last_name}</AppText>
										</View>
									</View>
									<View style={styles.rightCard}>
										<AppText>Score</AppText>
										<AppText style={stylesText.subTitle}>{String(item.score)}</AppText>
									</View>
								</View>
							)
						}
						keyExtractor={item => item.id}
						style={styles.flatlist}
						showsVerticalScrollIndicator={false}
						ListHeaderComponent={
							<View style={styles.cardHeader}>
								<AppText style={[stylesText.title, { color: '#fff', textAlign: 'left' }]}>Tu posición </AppText>
								<View style={{ flexDirection: 'row' }}>
									<View style={styles.leftCard}>
										<View style={[styles.imageContainer]}>
											{
												score.me.imagen !== null && score.me.imagen !== '' &&
												<Image source={{ uri: `data:image/png;base64,${score.me.imagen}` }} style={styles.image} />
											}
										</View>
										<AppText style={[styles.name, { color: '#fff' }]}>{score.me.first_name} {score.me.last_name}</AppText>
									</View>
									<View style={styles.rightCard}>
										<AppText style={{ color: '#fff' }}>Score</AppText>
										<AppText style={[stylesText.subTitle, { color: '#fff' }]}>{String(score.me.score)}</AppText>
									</View>
								</View>
							</View>
						}
						refreshControl={
							<RefreshControl
								onRefresh={() => getScore()}
								refreshing={loading}
							/>
						}
						bounces={true}
					/>
					:
					<ActivityIndicator visible={loading} />
			}
		</Screen >
	)

}


export default ScoreScreen;