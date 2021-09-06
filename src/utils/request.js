import axios from "axios";
//antd
import { message } from "antd";
// cookies
import { getToken, getUsername } from "./cookies";

//创建实例
const service = axios.create({
  baseURL: process.env.REACT_APP_API,
  timeout: 5000,
});

// 添加请求拦截器（请求头）
service.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么 Token, Username
    config.headers["Token"] = getToken();
    config.headers["Username"] = getUsername();
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器（响应头）
service.interceptors.response.use(
  function (response) {
    // http状态为200
    // 对响应数据做点什么
    const data = response.data;
    if (data.resCode !== 0) {
      // resCode不成功，全局的错误拦截提示
      message.info(data.message);
      return Promise.reject(response);
    } else {
      return response;
    }
  },
  function (error) {
    // http状态不为200
    // const data = error.request;
    // 对响应错误做点什么
    return Promise.reject(error.request);
  }
);

export default service;
