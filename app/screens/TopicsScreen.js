import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";

import AppText from "../components/Text";
import ListItem from "../components/lists/ListItem";
import ListItemSeparator from "../components/lists/ListItemSeparator";
import Screen from "./Screen";
import routes from "../navigation/routes";
import colors from "../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Modal from '../components/Modal'
import Swipper from '../components/Swipper'
import rulesApi from '../api/rules'
import useApi from "../hooks/useApi";
import ActivityIndicator from "../components/ActivityIndicator";
import { resize } from '../config/resize'

function TopicsScreen({ title = "Topics", route, navigation }) {
	const { items, texto } = route.params;
	const [rulesData, setRulesData] = useState([])
	const getRulesApi = useApi(rulesApi.getRules);
	const [showModal, setShowModal] = useState(false)

	useEffect(() => {
		getRulersData()
	}, [])

	const getRulersData = async () => {
		const rules = await getRulesApi.request()
		setRulesData(rules.data.filter(e => e.type === 'Tema'))
	}

	return (
		<Screen>
			{
				getRulesApi.loading ?
					<ActivityIndicator visible={getRulesApi.loading} />
					:
					<>
						<View style={styles.text_container}>
							<AppText style={styles.title}>{texto}</AppText>
							<TouchableOpacity style={styles.icon} onPress={() => {
								setShowModal(true)
							}}>
								<MaterialCommunityIcons
									name="information-outline"
									size={20}
									color={'#7d7d7d'} />
							</TouchableOpacity>
						</View>
						<FlatList
							data={items}
							keyExtractor={(topic) => topic.id.toString()}
							ItemSeparatorComponent={ListItemSeparator}
							renderItem={({ item }) => (
								<ListItem
									text={item.texto}
									icon="chevron-right"
									onPress={() => navigation.navigate(routes.TOPICS_SUBMENU, item)}
									level={item.nivel_usuario_actual}
								/>
							)}
							ListEmptyComponent={() => (
								<AppText>No topics found for {texto}</AppText>
							)}
						/>
						<Modal visible={showModal} dismiss={() => setShowModal(false)} botton={'Aceptar'}>
							<Swipper items={rulesData} />
						</Modal>
					</>
			}
		</Screen>
	);
}

const styles = StyleSheet.create({
	text_container: {
		marginTop: 10,
		paddingHorizontal: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	title: {
		fontWeight: "800",
		fontSize: 20,
		marginBottom: 20,
		color: colors.black
	},
	icon: {
		marginHorizontal: resize(5),
		marginVertical: resize(5)
	}
});

export default TopicsScreen;
