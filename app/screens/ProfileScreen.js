import React from "react";
import { StyleSheet } from "react-native";
import AppText from "../components/Text";
import Screen from "./Screen";
import AppButton from "../components/Button";
import useAuth from "../auth/useAuth";

function ProfileScreen({ route, navigation }) {
	const auth = useAuth();
	return (
		<Screen>
			<AppText>Yet to implement Profile Screen</AppText>
			<AppButton
				title="CERRAR SESIÓN"
				onPress={() => auth.logOut()}
			/>
		</Screen>
	);
}

const styles = StyleSheet.create({
	container: {},
});

export default ProfileScreen;
