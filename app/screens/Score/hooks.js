import { useState } from 'react';
import scoreApi from "../../api/score";
import useApi from "../../hooks/useApi";

export const useScore = () => {
	const [loading, setLoading] = useState(false)
	const getScoreApi = useApi(scoreApi.getScore);
	const [scoreData, setScoreData] = useState(null)
	const [refresh, setRefresh] = useState(false)

	const score = async (isFromRefresh = false) => {
		try {
			if (!isFromRefresh) {
				setLoading(true)
			}
			const score = await getScoreApi.request()
			setScoreData(score.data)
			setLoading(false)
			setRefresh(false)
		} catch (error) {
		}
	}
	return {
		getScore: score,
		score: scoreData,
		loading
	}
}