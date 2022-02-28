import { create } from "apisauce";
import cache from "../utility/cache";
import authStorage from "../auth/storage";

const apiClient = create({
  baseURL: "http://52.0.99.123:8000/",
});

apiClient.addAsyncRequestTransform(async (request) => {
  const authToken = await authStorage.getToken();
  if (!authToken) return;
  const bearer = `Bearer ${authToken}`;
  request.headers["Authorization"] = bearer;
});

const get = apiClient.get;
apiClient.get = async (url, params, axiosConfig) => {
  const response = await get(url, params, axiosConfig);
  if (response.ok) {
    cache.store(url, response.data);
    return response;
  }

  const data = await cache.get(url);

  // if (data === null) {
  //   // If data is null, this means you received a 401 code, so
  //   // the jwt is not valid anymore.
  //   return authStorage.removeToken();
  // }
  return data ? { ok: true, data } : response;
};

export default apiClient;
