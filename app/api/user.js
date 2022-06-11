import client from "./client";

const endpoint = "/auth/users/";

const getLevelUser = () => client.get(`${endpoint}me/`);

export default {
	getLevelUser
};
