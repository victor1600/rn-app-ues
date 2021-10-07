import React from "react";
import { View, StyleSheet, Image } from "react-native";
import * as Yup from "yup";

import {
  FormField,
  Form,
  SubmitButton,
  ErrorMessage,
} from "../components/forms";
import Screen from "./Screen";
import useAuth from "../auth/useAuth";
import authApi from "../api/auth";
import { useState } from "react";
import colors from "../config/colors";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function LoginScreen(props) {
  const auth = useAuth();

  const [loginFailed, setLoginFailed] = useState(false);

  const handleSubmit = async ({ email, password }) => {
    console.log(email, password);
    const result = await authApi.login(email, password);
    console.log(result);
    if (!result.ok) return setLoginFailed(true);
    setLoginFailed(false);
    auth.logIn(result.data.token);
  };

  return (
    <Screen style={styles.container}>
      <View style={styles.cardContainer}>
        <Image style={styles.image} source={require("../assets/ues.png")} />
        <Form
          initialValues={{ email: "", password: "" }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="email"
            keyboardType="email-address"
            name="email"
            placeholder="Email"
            textContentType="emailAddress"
          />
          <ErrorMessage
            error="Invalid email and/or password."
            visible={loginFailed}
          />

          <FormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            name="password"
            placeholder="Password"
            secureTextEntry
            textContentType="password"
          />
          <SubmitButton title="Login" />
        </Form>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "white",
    padding: 15,
    marginHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 10,
  },
  container: {
    justifyContent: "center",
    backgroundColor: colors.primary,
  },
  image: {
    width: 120,
    height: 120,
    alignSelf: "center",
    marginBottom: 20,
    resizeMode: "contain",
  },
  inputs: {},
});

export default LoginScreen;
