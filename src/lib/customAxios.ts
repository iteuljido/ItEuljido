import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { getToken, removeToken } from "./token";

const addToken = async (
  config: AxiosRequestConfig
): Promise<AxiosRequestConfig> => {
  const token = getToken();

  if (token) {
    config.headers["access_token"] = token;
  }

  return config;
};

const addTokenErrorHandle = (_err: AxiosError) => {
  removeToken();
};

const Api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
});

Api.defaults.headers = {
  Accept: "application/json",
};

Api.interceptors.request.use(addToken, addTokenErrorHandle);

export default Api;
