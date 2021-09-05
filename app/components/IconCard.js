import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from "react-native";

import AppText from "./Text";
import colors from "../config/colors";

function IconCard({ text, image, onPress, textStyle }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        {image && <Image source={image} style={styles.image} />}
        <AppText style={[textStyle, styles.text]}>{text}</AppText>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    overflow: "hidden",
    marginHorizontal: 40,
    marginBottom: 10,
    marginTop: 20,
    paddingBottom: 15,
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 10,
  },
  text: {
    fontWeight: "600",
    fontSize: 20,
  },
});

export default IconCard;
