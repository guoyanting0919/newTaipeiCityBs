import axios from "axios";
import router from "../router/index";
import store from "../store/index";
import { toLogin, to404Page } from "./utils";

// 錯誤捕捉
const errorHandle = (status, msg) => {
  switch (status) {
    case 400:
      to404Page();
      break;

    case 401:
      toLogin();
      break;

    case 403:
      to404Page();
      break;

    case 404:
      to404Page();
      break;

    case 500:
      console.log("500");
      break;

    default:
      to404Page();
      break;
  }
};

// 設定 baseURL
let instance = axios.create({
  baseURL: "http://tccdonkeyapi.1966.org.tw/api/",
});

// request 攔截
instance.interceptors.request.use(
  (config) => {
    const token = store.state.token;
    token && (config.headers.Authorization = `Bearer ${token}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// response 攔截
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;

    if (response) {
      errorHandle(response.status, response.data.error);
      return Promise.reject(error);
    } else {
      return Promise.reject(error);
    }
  }
);

export default function(method, url, data = null) {
  method = method.toLowerCase();
  if (method == "post") {
    return instance.post(url, data);
  } else if (method == "get") {
    return instance.get(url, { params: data });
  } else if (method == "delete") {
    return instance.delete(url, { params: data });
  } else if (method == "put") {
    return instance.put(url, data);
  } else {
    console.log("未知的 method");
    return false;
  }
}
