import client from "./client";

const endpoint = "/api/topics/";

const getTopics = (courseId) => client.get(`${endpoint}?curso=${courseId}`);
const getLevels = (courseId) => client.get(`${endpoint}get_levels?curso=${courseId}`);
const getCurrentLevel = (courseId) => client.get(`${endpoint}${courseId}/current_user_level/`);

export default {
	getTopics,
	getLevels,
	getCurrentLevel
};
