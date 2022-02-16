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

export function cookieWrite(value) {
  return encodeURIComponent(value).replace(
    /%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,
    decodeURIComponent
  )
}


export function handleError(error) {
  alert("Error");
  console.log(JSON.stringify(error, null, 2));
}
