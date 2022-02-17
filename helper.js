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

export function getAnonymousToken() {
  return Cookies.get("anonymous_token");
}

export function setAnonymousToken(token) {
  return Cookies.set("anonymous_token", token);
}

export function cookieWrite(value) {
  return encodeURIComponent(value).replace(
    /%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,
    decodeURIComponent
  );
}

export function handleError(error) {
  alert("Error");
  console.log(JSON.stringify(error, null, 2));
}

export function createMarkup(element) {
  return { __html: element };
}

export function handleInputEvent(e) {
  if (e.target.type == "checkbox") {
    return { [e.target.name]: e.target.checked };
  } else {
    return { [e.target.name]: e.target.value };
  }
}


export function numberFormat(number) {
  if (number) {
      return Number(number).toLocaleString("en-US", {});
  }
  return number;
}