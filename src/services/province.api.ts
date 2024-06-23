import axios from "axios";

const provinceApi = axios.create({
  baseURL: "https://province-api.site//api",
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  },
});

provinceApi.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.log("error.response.data", error);
    if (error.response?.status >= 300 && error.response?.status < 500) {
      delete error.response.data.data;
      return {
        ...error.response.data,
        status: error.response.status,
      };
    }
  }
);

export default provinceApi;
