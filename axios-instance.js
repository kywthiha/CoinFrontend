import axios from "axios";
import {
  getToken,
  isSSR,
  getAnonymousToken,
  setAnonymousToken,
} from "./helper";

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
    const anonymousToken = getAnonymousToken();
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    config.headers["anonymous-token"] = anonymousToken ? anonymousToken : "";
    return config;
  });

  axiosInstance.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      const anonymousToken = getAnonymousToken();
      if (anonymousToken !== response.data.anonymous_token) {
        setAnonymousToken(response.data.anonymous_token);
      }
      return response;
    },
    function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error);
    }
  );
}

export default axiosInstance;
