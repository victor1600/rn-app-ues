import React, { useEffect } from "react";
import { View, StyleSheet, FlatList, Linking, Button } from "react-native";

import ActivityIndicator from "../components/ActivityIndicator";
import AppText from "../components/Text";
import ListItem from "../components/lists/ListItem";
import ContentNotFound from "../components/ContentNotFound";

import useApi from "../hooks/useApi";
import useRefresh from "../hooks/useRefresh";

import Screen from "./Screen";
import materials from "../api/materials";

function SupplementaryMaterialScreen({ route }) {
	const { topic } = route.params;
	const getMaterialsApi = useApi(materials.getMaterials);
	const refresh = useRefresh(getMaterialsApi, topic.id);

	useEffect(() => {
		getMaterialsApi.request(topic.id);
	}, []);

	return (
		<Screen>
			<ActivityIndicator visible={getMaterialsApi.loading} />
			{getMaterialsApi.error && (
				<>
					<AppText>Couldn't retrieve Materials</AppText>
					<Button
						title="Retry"
						onPress={() => getMaterialsApi.request(topic.id)}
					/>
				</>
			)}
			<View style={styles.text_container}>
				<AppText style={styles.title}>{topic.name}</AppText>
			</View>
			<FlatList
				data={getMaterialsApi.data}
				keyExtractor={(material) => material.id.toString()}
				onRefresh={refresh.onRefresh}
				refreshing={refresh.refreshing}
				renderItem={({ item }) => (
					<ListItem
						icon="open-in-new"
						text={item.texto}
						onPress={() => Linking.openURL(item.archivo)}
					/>
				)}
				ListEmptyComponent={() => (
					<ContentNotFound title="Material de estudio" />
				)}
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
		marginBottom: 20,
	},
});

export default SupplementaryMaterialScreen;
