import React from 'react';
import { Modal, View } from 'react-native';
import styles from './styles';
import AppButton from "../Button";

const CustomModal = ({
	children,
	visible,
	dismiss = () => { },
	botton = 'OK',
	secondaryBotton = null,
	secondaryBottonOnPress = () => { }
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
						<View style={styles.bottonContainer}>

							<AppButton
								title={botton}
								onPress={() => dismiss()}
							/>
							{
								secondaryBotton &&
								<AppButton
									title={secondaryBotton}
									onPress={() => secondaryBottonOnPress()}
								/>
							}
						</View>
					</View>
				</View>
			</Modal>
		</View>

	)
}

export default CustomModal