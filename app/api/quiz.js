import client from "./client";

const endpoint = "/api/exam-questions/";

const getQuiz = () => client.get(`${endpoint}`);

export default {
  getQuiz,
};
