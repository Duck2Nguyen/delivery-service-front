import { store } from "@App/store";
import axios from "axios";

const api = axios.create({
  baseURL: "http://34.142.174.8:8081/api/",
  headers: {
    "Content-type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.log("error", error);

    if (error.response?.status >= 300 && error.response?.status <= 500) {
      delete error.response.data.data;
      return {
        ...error.response.data,
        status: error.response.status,
      };
    }
  }
);

api.interceptors.request.use(function (config): any {
  const token: string | undefined = store.getState().user.token;

  if (token) {
    config.headers.Authorization = "Bearer " + token;
  }

  return config;
});

export default api;
