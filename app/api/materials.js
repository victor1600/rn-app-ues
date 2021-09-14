import client from "./client";

const endpoint = "/api/materials/";

const getMaterials = (topicId) => client.get(`${endpoint}?topic=${topicId}`);

export default {
  getMaterials,
};
