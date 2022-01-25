import React from "react";
import { View, StyleSheet } from "react-native";
import AppText from "./Text";
import colors from "../config/colors";

function ContentNotFound({ title }) {
  return (
    <View style={styles.container}>
      <AppText style={styles.title}>{title}</AppText>
      <AppText style={styles.subtitle}>
        No hay contenido disponible aún.
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: 85,
    padding: 12,
    width: "100%",
  },
  subtitle: {
    color: colors["gray"],
  },
  title: {
    fontWeight: "600",
    fontSize: 20,
    marginBottom: 7,
  },
});

export default ContentNotFound;
