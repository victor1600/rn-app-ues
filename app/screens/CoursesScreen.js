import React, { useEffect } from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import IconCard from "../components/IconCard";
import Screen from "./Screen";
import useApi from "../hooks/useApi";
import coursesApi from "../api/courses";

const courses = [
  { id: 1, name: "chemistry", image: require("../images/chemistry.png") },
  { id: 2, name: "math", image: require("../images/math2.png") },
  { id: 3, name: "chemistry", image: require("../images/chemistry.png") },
  { id: 4, name: "math", image: require("../images/math2.png") },
];

function CoursesScreen(props) {
  const getCoursesApi = useApi(coursesApi.getCourses);

  useEffect(() => {
    getCoursesApi.request();
  }, []);
  return (
    <Screen>
      <FlatList
        data={getCoursesApi.data}
        numColumns={2}
        keyExtractor={(course) => course.id.toString()}
        renderItem={({ item }) => (
          <IconCard text={item.name} image={item.icon} />
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default CoursesScreen;
