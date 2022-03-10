import { Dimensions, Platform } from 'react-native';

//env

export const { width, height } = Dimensions.get(Platform.OS === 'ios' ? 'screen' : 'window');

export const resize = (size, type = 'width') => {
	const currentSize = type === 'width' ? 375 : 812
	const deviceSize = type === 'width' ? width : height
	const percent = (size * 100) / currentSize
	const percentJS = percent / 100

	return deviceSize * percentJS
}