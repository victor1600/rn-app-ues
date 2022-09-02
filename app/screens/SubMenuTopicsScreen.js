import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList, View } from "react-native";
import ListItem from "../components/lists/ListItem";
import ListItemSeparator from "../components/lists/ListItemSeparator";
import AppText from "../components/Text";
import routes from "../navigation/routes";
import Screen from "./Screen";
import getCurrentLevel from '../api/topics';
import { useIsFocused } from "@react-navigation/native";
import useApi from '../hooks/useApi';

const options = [
	{
		id: 1,
		text: "Material de estudio",
		route: routes.SUPPLEMENTARY,
	},
	{
		id: 2,
		text: "Cuestionario",
		route: routes.QUIZ,
	},
];

function SubMenuTopicsScreen({ navigation, route }) {
	const getCurrentLevelApi = useApi(getCurrentLevel.getCurrentLevel);
	const { item, curso } = route.params;
	const topic = item
	const [currentLevel, setCurrentLevel] = useState(null);
	const isFocused = useIsFocused();

	useEffect(() => {
		if (getCurrentLevelApi.data) {
			setCurrentLevel(getCurrentLevelApi.data.current_level);
		}
	}, [getCurrentLevelApi.data]);

	useEffect(() => {
		if (topic) {
			getCurrentLevelApi.request(topic.id);
		}
	}, [isFocused === true])


	return (
		<Screen>
			<View style={styles.text_container}>
				<AppText style={styles.title}>Opciones</AppText>
			</View>

			<FlatList
				data={options}
				keyExtractor={(option) => option.id.toString()}
				ItemSeparatorComponent={ListItemSeparator}
				renderItem={({ item }) => (
					<ListItem
						text={item.text}
						icon="chevron-right"
						onPress={() => navigation.navigate(item.route, { topic: topic, curso: curso, userLevel: currentLevel })}
					/>
				)}
				ItemSeparatorComponent={ListItemSeparator}
			/>
		</Screen>
	);
}

const styles = StyleSheet.create({
	text_container: {
		marginTop: 10,
		alignItems: "center",
	},
	title: {
		fontWeight: "800",
		fontSize: 20,
		marginBottom: 25,
	},
});

export default SubMenuTopicsScreen;
