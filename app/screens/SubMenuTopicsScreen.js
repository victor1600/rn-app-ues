import React from "react";
import { StyleSheet, FlatList, View } from "react-native";
import ListItem from "../components/lists/ListItem";
import ListItemSeparator from "../components/lists/ListItemSeparator";
import AppText from "../components/Text";
import routes from "../navigation/routes";
import Screen from "./Screen";

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
  const topic = route.params;
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
            onPress={() => navigation.navigate(item.route, topic)}
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
