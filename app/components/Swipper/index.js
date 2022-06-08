import React from 'react';
import { View, Image } from 'react-native';
import styles from './styles';
import Swiper from 'react-native-swiper'
import AppText from "../Text";


const CustomSwipper = ({
	items = []
}) => {
	return (
		<View style={styles.container} >
			<Swiper dotColor='#7d7d7d' activeDotColor='#8d2326' >
				{
					items.map((i, index) => (
						<View style={styles.wrapper} key={index}>
							<Image source={{ uri: i.image }} style={styles.image} resizeMode={'contain'} />
							<AppText>{i.ruler}</AppText>
						</View>
					))
				}
			</Swiper>
		</View>
	)
}
export default CustomSwipper