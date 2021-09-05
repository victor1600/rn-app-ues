import React from "react";
import { View, StyleSheet, FlatList } from "react-native";

import IconCard from "../components/IconCard";
import Screen from "./Screen";

const options = [
  { id: "1", image: require("../assets/books.png"), text: "hola" },
  { id: "2", image: require("../assets/books.png"), text: "bye bye" },
];

function SubMenuTopicsScreen(props) {
  return (
    <Screen>
      <View style={styles.container}>
        <FlatList
          data={options}
          keyExtractor={(option) => option.id}
          renderItem={({ item }) => (
            <IconCard
              text={item.text}
              image={item.image}
              textStyle={{ fontSize: 22 }}
            />
          )}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default SubMenuTopicsScreen;
