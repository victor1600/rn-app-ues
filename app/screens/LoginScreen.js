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

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function LoginScreen(props) {
  const auth = useAuth();

  const [loginFailed, setLoginFailed] = useState(false);

  const handleSubmit = async ({ email, password }) => {
    const result = await authApi.login(email, password);
    console.log(result.data.token);
    if (!result.ok) return setLoginFailed(true);
    setLoginFailed(false);
    auth.logIn(result.data.token);
  };

  return (
    <Screen styles={styles.container}>
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
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  image: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 20,
    resizeMode: "contain",
  },
  inputs: {},
});

export default LoginScreen;
