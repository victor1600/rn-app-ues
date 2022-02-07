import client from "./client";

const endpoint = "/api/topics/";

const getTopics = (courseId) => client.get(`${endpoint}?curso=${courseId}`);

export default {
  getTopics,
};
