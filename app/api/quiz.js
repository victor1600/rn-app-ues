import client from "./client";

const get_questions_endpoint = "/api/exam-questions/";
const grade_quiz_endpoint = "/api/calculate-grade/";

const getQuiz = (topicId) =>
  client.get(`${get_questions_endpoint}?topic=${topicId}`);

const gradeQuiz = (answers) => client.post(grade_quiz_endpoint, answers);

export default {
  getQuiz,
  gradeQuiz,
};
