import Cookies from "js-cookie";

export const setToken = (value: string) => {
  const expires = new Date();
  expires.setDate(Date.now() + 1000 * 60 * 60 * 24 * 30);

  Cookies.set("session", value);
};

export const getToken = (): string => {
  return Cookies.get("session") ?? "";
};

export const removeToken = () => {
  Cookies.remove("session");
};
