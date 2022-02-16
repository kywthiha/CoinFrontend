import axios from "axios";
import axiosInstance from "./axios-instance";

export default function axiosInstanceSSR(context) {
  if (context.req && context.req.header && context.req.headers.cookie) {
    axiosInstance.defaults.headers.common["Cookie"] =
      context.req.headers.cookie;
  }

  return axiosInstance;
}
