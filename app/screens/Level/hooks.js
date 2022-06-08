import { useState } from 'react';
import topicsApi from "../../api/topics";
import useApi from "../../hooks/useApi";

export const useLevel = (id) => {
	const [loading, setLoading] = useState(false)
	const getLevelApi = useApi(topicsApi.getLevels);
	const [levelData, setLevelData] = useState([])

	const getLevel = async () => {
		try {
			setLoading(true)
			const level = await getLevelApi.request(id)
			setLevelData(level.data)
			setLoading(false)
		} catch (error) {
			setLoading(false)
		}
	}

	return {
		loading,
		levelData,
		getLevel
	}
}
