import client from "./client";

const endpoint = "/materials";

const getMaterials = (topicId) => client.get(`${endpoint}/?topic=${topicId}`);

export default {
  getMaterials,
};
