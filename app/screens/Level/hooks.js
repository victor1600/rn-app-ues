import { useState } from 'react';
import topicsApi from "../../api/topics";
import rulesApi from '../../api/rules'
import useApi from "../../hooks/useApi";

export const useLevel = (id) => {
	const getLevelApi = useApi(topicsApi.getLevels);
	const getRulesApi = useApi(rulesApi.getRules);
	const [levelData, setLevelData] = useState([])
	const [rulesData, setRulesData] = useState([])

	const getLevel = async () => {
		try {
			const level = await getLevelApi.request(id)
			const rules = await getRulesApi.request()
			setRulesData(rules.data.filter(e => e.type === 'Curso'))
			setLevelData(level.data)
		} catch (error) {
		}
	}

	return {
		loading: getLevelApi.loading || getRulesApi.loading,
		levelData,
		getLevel,
		rulesData
	}
}
