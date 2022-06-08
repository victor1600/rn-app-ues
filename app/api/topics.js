import client from "./client";

const endpoint = "/api/topics/";

const getTopics = (courseId) => client.get(`${endpoint}?curso=${courseId}`);
const getLevels = (courseId) => client.get(`${endpoint}get_levels?curso=${courseId}`);

export default {
	getTopics,
	getLevels
};
