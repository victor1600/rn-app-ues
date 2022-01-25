import React from "react";
import { Text, View } from "react-native";
import Screen from "./Screen";
import ActivityIndicator from "../components/ActivityIndicator";
import { StyleSheet, FlatList, Button } from "react-native";
import AppText from "../components/Text";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SmallCard from "../components/SmallCard";

const data = [
  { id: "1", name: "sociales" },
  { id: "2", name: "mate" },
  { id: "3", name: "fisica" },
  { id: "4", name: "quimica" },
  { id: "5", name: "prueba" },
  //   { id: "6", name: "prueba" },
];

function NewCoursesScreen(props) {
  return (
    <>
      <ActivityIndicator visible={false} />
      <Screen>
        <View
          style={{
            display: "flex",
            // justifyContent: "space-around",
            marginTop: 30,
          }}
        >
          <FlatList
            data={data}
            numColumns={2}
            keyExtractor={(course) => course.id.toString()}
            renderItem={({ item }) => <SmallCard title={item.name} />}
            ListEmptyComponent={() => <></>}
          />
        </View>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
  card: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "white",
    paddingVertical: 10,
    margin: 20,
    height: 100,
    width: "40%",
  },
});

export default NewCoursesScreen;
