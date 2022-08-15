import { useState } from 'react';
import profileApi from "../../api/profile";
import useApi from "../../hooks/useApi";
import * as ImagePicker from 'expo-image-picker';

export const useProfile = () => {
	const [loading, setLoading] = useState(false)
	const getProfileApi = useApi(profileApi.getProfile);
	const editProfileApi = useApi(profileApi.editProfile);
	const [profileData, setProfileData] = useState(null)
	const [refresh, setRefresh] = useState(false)

	const profile = async (isFromRefresh = false) => {
		try {
			if (!isFromRefresh) {
				setLoading(true)
			}
			const profile = await getProfileApi.request()
			setProfileData(profile.data)
			setLoading(false)
			setRefresh(false)
		} catch (error) {
		}
	}

	const handleOpenPicker = async () => {
		setLoading(true)
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 0.1,
			base64: true
		});
		if (!result.cancelled) {
			await editProfileApi.request({
				imagen: result.base64
			})
			profile()
		} else {
			setLoading(false)
		}
	}


	return {
		loading,
		getProfile: profile,
		profile: profileData,
		handleOpenPicker: handleOpenPicker,
		refresh,
		setRefresh: (value) => setRefresh(value)
	}
}


