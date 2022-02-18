import client from "./client";

const login = (username, password) =>
  client.post("/auth/jwt/create/", { username, password });

export default {
  login,
};
