import axios from "axios";

const httpClient = axios.create({
  baseURL: "http://localhost:8081/api/",
  headers: {
    "Content-type": "application/json",
  },
});

const getAuthToken = () => `Bearer ${localStorage.getItem("jwt")}`;
const authInterceptor = (config) => {
  config.headers["Authorization"] = getAuthToken();
  return config;
};

httpClient.interceptors.request.use(authInterceptor);

export default httpClient;
