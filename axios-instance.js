import axios from "axios";
import { getToken, isSSR } from "./helper";

const is_ssr = isSSR();

const axiosInstance = axios.create({
  baseURL: is_ssr
    ? process.env.BACKEND_URL
    : process.env.NEXT_PUBLIC_BACKEND_URL,
});

axiosInstance.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

if (!is_ssr) {
  axiosInstance.interceptors.request.use(function (config) {
    const token = getToken();
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
  });
}

export default axiosInstance;
