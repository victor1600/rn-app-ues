import client from "./client";

const endpoint = "/api/materials/";

const getMaterials = (topicId) => client.get(`${endpoint}?tema=${topicId}`);

export default {
  getMaterials,
};
