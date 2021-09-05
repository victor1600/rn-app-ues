import React from "react";
import { StyleSheet, FlatList, TouchableWithoutFeedback } from "react-native";
import IconCard from "../components/IconCard";
import ListItemSeparator from "../components/lists/ListItemSeparator";
import routes from "../navigation/routes";
import Screen from "./Screen";

const options = [
  {
    id: 1,
    text: "Material de estudio",
    image: require("../assets/books.jpg"),
    route: routes.SUPPLEMENTARY,
  },
  {
    id: 2,
    text: "Preguntas",
    image: require("../assets/exam.jpg"),
    route: routes.QUIZ,
  },
];

function SubMenuTopicsScreen({ navigation, route }) {
  const topic = route.params;
  return (
    <Screen>
      <FlatList
        data={options}
        keyExtractor={(option) => option.id.toString()}
        renderItem={({ item }) => (
          <IconCard
            text={item.text}
            image={item.image}
            onPress={() => navigation.navigate(item.route, topic)}
          />
        )}
        ItemSeparatorComponent={ListItemSeparator}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default SubMenuTopicsScreen;
