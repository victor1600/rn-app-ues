import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import AppText from "./Text";

function IconCard({ text, image }) {
  return (
    <TouchableWithoutFeedback onPress={() => console.log("hola")}>
      <View style={styles.container}>
        {image && <Image source={{ uri: image }} style={styles.image} />}
        <AppText style={styles.text}>{text}</AppText>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffff",
    width: 180,
    height: 130,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 16,
    marginTop: 30,
    borderRadius: 10,
  },
  image: {
    width: 80,
    height: 80,
    marginBottom: 5,
  },
  text: {
    fontWeight: "500",
  },
});

export default IconCard;
