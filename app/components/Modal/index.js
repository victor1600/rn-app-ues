import React, { useState } from 'react';
import { Modal, View, TouchableOpacity } from 'react-native';
import styles from './styles';
import AppButton from "../Button";

const CustomModal = ({
	children,
	visible,
	dismiss = () => { }
}) => {
	return (
		<View style={styles.centeredView} >
			<Modal
				animationType='fade'
				transparent={true}
				visible={visible}
			>
				<View style={styles.centeredView}>
					<View style={styles.modalView}>
						{children}
						<AppButton
							title={'OK'}
							onPress={() => dismiss()}
						/>
					</View>
				</View>
			</Modal>

		</View>

	)

}

export default CustomModal