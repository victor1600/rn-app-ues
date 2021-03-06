import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppText from "../Text";
import colors from "../../config/colors";

function ListItem({ icon, text, onPress }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <AppText numberOfLines={1} style={{ flex: 1 }}>
          {text}
        </AppText>

        <MaterialCommunityIcons color={colors.primary} name={icon} size={25} />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flexDirection: "row",
    height: 50,
    alignItems: "center",
    width: "100%",
    paddingRight: 10,
    paddingLeft: 15,
  },
});

export default ListItem;
