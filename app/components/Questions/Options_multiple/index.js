import React from 'react'
import { View, FlatList, TouchableOpacity, Image } from 'react-native';
import styles from './styles';
import AppText from '../../../components/Text';
import { CheckBox } from 'react-native-elements';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../../../config/colors';
import { resize } from '../../../config/resize';

const OptionsMultiple = ({
	review,
	answersArray,
	answersReview,
	setChecked,
	checked,
	questionCount
}) => {
	return (
		<View style={styles.answerContainer}>
			{review && <AppText>La respuesta correcta es:</AppText>}
			<FlatList
				data={answersArray}
				renderItem={({ item, index }) => (
					<View
						key={index}
						style={[
							(review &&
								answersReview[questionCount] === item.id &&
								item.es_respuesta_correcta) ||
								(review && item.es_respuesta_correcta)
								? styles.radioButtonContainerCorrect
								: review &&
									answersReview[questionCount] === item.id &&
									!item.es_respuesta_correcta
									? styles.radioButtonContainerWrong
									: styles.radioButtonContainer,
						]}
					>
						<View
							style={{
								flexDirection: !item.imagen ? 'column' : 'row',
								flex: 1,
							}}
						>
							<CheckBox
								title={item.texto}
								checkedIcon="dot-circle-o"
								uncheckedIcon="circle-o"
								checkedColor={colors.primary}
								containerStyle={styles.checkBoxContainer}
								checked={
									review
										? answersReview[questionCount] === item.id
											? true
											: false
										: checked === item.id
											? true
											: false
								}
								onPress={() => (review ? {} : setChecked(item))}
							/>
							{item.imagen && (
								<TouchableOpacity
									onPress={() => (review ? {} : setChecked(item))}
									style={{ height: resize(100), width: resize(250) }}
								>
									<Image
										source={{ uri: item.imagen }}
										style={{ flex: 1 }}
										resizeMode={'contain'}
									/>
								</TouchableOpacity>
							)}
						</View>
						{((review &&
							answersReview[questionCount] === item.id &&
							item.es_respuesta_correcta) ||
							(review && item.es_respuesta_correcta)) && (
								<View
									style={{
										flex: 0.1,
										flexDirection: 'column',
										justifyContent: 'center',
									}}
								>
									<MaterialCommunityIcons
										color={'green'}
										name={'check-circle'}
										size={25}
									/>
								</View>
							)}
						{review &&
							answersReview[questionCount] === item.id &&
							!item.es_respuesta_correcta && (
								<View
									style={{
										flex: 0.1,
										flexDirection: 'column',
										justifyContent: 'center',
									}}
								>
									<MaterialCommunityIcons
										color={'red'}
										name={'close-circle'}
										size={25}
									/>
								</View>
							)}
					</View>
				)}
				showsVerticalScrollIndicator={false}
			/>
		</View>

	)
}
export default OptionsMultiple