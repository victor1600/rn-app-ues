import React, { useEffect } from "react";
import { View, StyleSheet, FlatList, Button } from "react-native";

import ActivityIndicator from "../components/ActivityIndicator";
import AppText from "../components/Text";
import ListItem from "../components/lists/ListItem";
import ListItemSeparator from "../components/lists/ListItemSeparator";
import Screen from "./Screen";
import topicsApi from "../api/topics";
import useApi from "../hooks/useApi";

function TopicsScreen({ title = "Topics", route }) {
  const course = route.params;

  const getTopicsApi = useApi(topicsApi.getTopics);

  useEffect(() => {
    getTopicsApi.request(course.id);
  }, []);
  console.log(getTopicsApi.data);
  console.log(getTopicsApi.request);
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
        renderItem={({ item }) => <ListItem text={item.name} />}
        ListEmptyComponent={() => (
          <AppText>No topics found for {course.name}</AppText>
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
