import client from "./client";

const get_profile = "/api/aspirantes/me/";

const getProfile = () => client.get(get_profile);
const editProfile = (imagen) => client.patch(get_profile, imagen);

export default {
	getProfile,
	editProfile
};
