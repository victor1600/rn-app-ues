import React from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import AppText from "../components/Text";

function SmallCard({ text, onPress, image }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        {image && <Image source={image} style={styles.image} />}
        <AppText style={{ paddingVertical: 3 }}>{text}</AppText>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "white",
    margin: 20,
    width: "40%",
  },
  image: {
    width: "100%",
    height: 50,
    marginBottom: 10,
  },
});

export default SmallCard;
