import React, { useEffect, useState } from 'react'
import { View, TextInput } from 'react-native';
import styles from './styles';
import AppText from '../../../components/Text';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../../../config/colors';

const ComplementaryAnswer = ({
	review,
	question,
	answer,
	text,
	onChangeText
}) => {
	const [rightAnswers, setRightAnwers] = useState([])
	const [wrong, setWrong] = useState(false)

	useEffect(() => {
		const answers = []
		question.answers.map(e =>
			answers.push(e.texto.toLowerCase())
		)
		if (typeof answer === "string") {
			const isWrong = answers.includes(answer.toLowerCase())
			setWrong(!isWrong)
		}
		setRightAnwers(answers)
	}, [])

	return (
		<View style={styles.answerContainer}>
			<View style={styles.rowInput}>

				<TextInput
					style={[styles.input, { borderColor: !review ? colors.primary : wrong ? 'red' : 'green' }]}
					onChangeText={(value) => onChangeText(value)}
					value={review ? answer : text}
					placeholder={'Escribe tu respuesta'}
					editable={!review}
				/>
				{
					review &&
					<View style={styles.icon}>
						{
							!wrong ?
								<MaterialCommunityIcons
									color={'green'}
									name={'check-circle'}
									size={25}
								/>
								:
								<MaterialCommunityIcons
									color={'red'}
									name={'close-circle'}
									size={25}
								/>
						}

					</View>
				}

			</View>
			{(review && rightAnswers.length > 0 && wrong) && <>
				<AppText>La respuesta correcta es:</AppText>
				<AppText style={styles.answerText}>{rightAnswers[0]}</AppText>
			</>}
		</View>

	)
}
export default ComplementaryAnswer