import client from "./client";

const endpoint = "/api/rules/";

const getRules = () => client.get(`${endpoint}`);

export default {
	getRules
};
