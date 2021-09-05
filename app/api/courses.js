import client from "./client";

const endpoint = "/courses";

const getCourses = () => client.get(endpoint);

export default {
  getCourses,
};
