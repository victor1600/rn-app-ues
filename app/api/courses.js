import client from "./client";

const endpoint = "/api/courses/";

const getCourses = () => client.get(endpoint);

export default {
  getCourses,
};
