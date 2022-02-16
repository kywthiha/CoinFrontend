import axios from "axios";
import { getToken, isSSR } from "./helper";

const is_ssr = isSSR();

const axiosInstance = axios.create({
  baseURL: is_ssr
    ? process.env.BACKEND_URL
    : process.env.NEXT_PUBLIC_BACKEND_URL,
});

axiosInstance.defaults.withCredentials = true
axiosInstance.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

export default axiosInstance;
