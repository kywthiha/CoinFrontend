import axios from "axios";
import axiosInstance from "./axios-instance";

export default function axiosInstanceSSR(context) {
  const { token, anonymous_token } = context.req.cookies;
  axiosInstance.defaults.headers.common["anonymous-token"] = anonymous_token
    ? anonymous_token
    : "";
  axiosInstance.defaults.headers.common["Authorization"] = token
    ? `Bearer ${token}`
    : "";

  return axiosInstance;
}
