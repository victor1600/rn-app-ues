import React, { useEffect } from "react";
import { View, StyleSheet, Text, FlatList, Button } from "react-native";
import IconCard from "../components/IconCard";
import Screen from "./Screen";
import useApi from "../hooks/useApi";
import coursesApi from "../api/courses";
import AppText from "../components/Text";
import ActivityIndicator from "../components/ActivityIndicator";

function CoursesScreen(props) {
  const getCoursesApi = useApi(coursesApi.getCourses);

  useEffect(() => {
    getCoursesApi.request();
  }, []);
  return (
    <>
      <ActivityIndicator visible={getCoursesApi.loading} />
      <Screen>
        {getCoursesApi.error && (
          <>
            <AppText>Couldn't retrieve the courses</AppText>
            <Button title="Retry" onPress={getCoursesApi.request} />
          </>
        )}
        <FlatList
          data={getCoursesApi.data}
          numColumns={2}
          keyExtractor={(course) => course.id.toString()}
          renderItem={({ item }) => (
            <IconCard text={item.name} image={item.icon} />
          )}
        />
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default CoursesScreen;
