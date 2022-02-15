import Cookies from "js-cookie";

export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function isSSR() {
  return typeof window === "undefined";
}

export function getToken() {
  return Cookies.get("token");
}

export function setToken(token) {
  return Cookies.set("token", token);
}

export function removeToken() {
  return Cookies.remove("token");
}


export function handleError(error) {
  alert("Error");
  console.log(JSON.stringify(error, null, 2));
}
