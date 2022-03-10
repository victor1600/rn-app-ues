import client from "./client";

const get_score = "/api/aspirantes/";

const getScore = () => client.get(get_score);

export default {
	getScore,
};
