import { useState } from 'react';
import topicsApi from "../../api/topics";
import rulesApi from '../../api/rules'
import useApi from "../../hooks/useApi";

export const useLevel = (id) => {
	const [loading, setLoading] = useState(false)
	const getLevelApi = useApi(topicsApi.getLevels);
	const getRulesApi = useApi(rulesApi.getRules);
	const [levelData, setLevelData] = useState([])
	const [rulesData, setRulesData] = useState([])

	const getLevel = async () => {
		try {
			setLoading(true)
			const level = await getLevelApi.request(id)
			const rules = await getRulesApi.request()
			setRulesData(rules.data)
			setLevelData(level.data)
			setLoading(false)
		} catch (error) {
			setLoading(false)
		}
	}

	return {
		loading,
		levelData,
		getLevel,
		rulesData
	}
}
