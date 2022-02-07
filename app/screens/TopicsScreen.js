import React, { useEffect } from "react";
import { View, StyleSheet, FlatList, Button } from "react-native";

import ActivityIndicator from "../components/ActivityIndicator";
import AppText from "../components/Text";
import ListItem from "../components/lists/ListItem";
import ListItemSeparator from "../components/lists/ListItemSeparator";
import Screen from "./Screen";
import topicsApi from "../api/topics";
import useApi from "../hooks/useApi";
import routes from "../navigation/routes";
import useRefresh from "../hooks/useRefresh";

function TopicsScreen({ title = "Topics", route, navigation }) {
  const course = route.params;

  const getTopicsApi = useApi(topicsApi.getTopics);
  const refresh = useRefresh(getTopicsApi, course.id);

  useEffect(() => {
    getTopicsApi.request(course.id);
  }, []);
  return (
    <Screen>
      <ActivityIndicator visible={getTopicsApi.loading} />
      {getTopicsApi.error && (
        <>
          <AppText>Couldn't retrieve the topics</AppText>
          <Button
            title="Retry"
            onPress={() => getTopicsApi.request(course.id)}
          />
        </>
      )}
      <View style={styles.text_container}>
        <AppText style={styles.title}>{course.name}</AppText>
      </View>
      <FlatList
        data={getTopicsApi.data}
        keyExtractor={(topic) => topic.id.toString()}
        ItemSeparatorComponent={ListItemSeparator}
        onRefresh={refresh.onRefresh}
        refreshing={refresh.refreshing}
        renderItem={({ item }) => (
          <ListItem
            text={item.texto}
            icon="chevron-right"
            onPress={() => navigation.navigate(routes.TOPICS_SUBMENU, item)}
          />
        )}
        ListEmptyComponent={() => (
          <AppText>No topics found for {course.texto}</AppText>
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

export default TopicsScreen;
