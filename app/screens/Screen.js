import React from "react";
import Constants from "expo-constants";
import { StyleSheet, SafeAreaView, View, ScrollView, RefreshControl } from "react-native";

const Screen = ({ children, style, refreshing, onRefresh, scroll }) => {
	return (
		<SafeAreaView style={[styles.screen, style, scroll && { justifyContent: 'center' }]}>
			{
				scroll ?
					<ScrollView
						bounces={true}
						contentContainerStyle={{
							flexGrow: 1,
							backgroundColor: '#fff'
						}}
						refreshControl={
							<RefreshControl
								refreshing={refreshing}
								onRefresh={onRefresh}
							/>
						}
					>
						{
							children
						}
					</ScrollView>
					:
					<View style={[styles.view, style]}>{children}</View>
			}
		</SafeAreaView>
	);
}


const styles = StyleSheet.create({
	screen: {
		paddingTop: Constants.statusBarHeight,
		flex: 1,
		backgroundColor: "#f1f1f2",
	},
	view: {
		flex: 1,
		backgroundColor: "#f1f1f2",
		// justifyContent: "center",
	},
});
Screen.defaultProps = {
	refreshing: false,
	onRefresh: () => { },
	scroll: false
}

export default Screen;
