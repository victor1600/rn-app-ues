import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from "react-native";

import AppText from "./Text";
import colors from "../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function IconCard({ text, image, icon, onPress, textStyle }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        {/* <View style={styles.imageContainer}> */}
        {image && <Image source={image} style={styles.image} />}
        {/* </View> */}
        {icon && <MaterialCommunityIcons name={icon} color="red" size={40} />}
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
    marginTop: 10,
    paddingBottom: 15,
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    // paddingBottom: 50,
  },
  // imageContainer: {
  //   width: "100%",
  // },
  text: {
    fontWeight: "600",
    fontSize: 20,
  },
});

export default IconCard;
