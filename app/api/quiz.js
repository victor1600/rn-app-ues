import client from "./client";

const get_questions_endpoint = "/api/exam-questions/";
const grade_quiz_endpoint = "/api/calculate-grade/";

const getQuiz = (topicId) => {
  let url = `${get_questions_endpoint}`;
  if (topicId) {
    url += `?tema=${topicId}`;
  }
  return client.get(url);
};

const gradeQuiz = (answers) => client.post(grade_quiz_endpoint, answers);

export default {
  getQuiz,
  gradeQuiz,
};
