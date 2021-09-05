import client from "./client";

const endpoint = "/topics";

const getTopics = (courseId) => client.get(`${endpoint}/?course=${courseId}`);

export default {
  getTopics,
};
