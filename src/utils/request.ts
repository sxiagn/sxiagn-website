import axios from 'axios';
import { ElMessage } from 'element-plus';

const request = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 30000
});

// 请求拦截
request.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截
request.interceptors.response.use(
  res => {
    if (res.status === 200) {
      if (res.data.code === -1) ElMessage.error(res.data.msg);
      return res.data;
    }
    return Promise.reject(res);
  },
  err => {
    if (err.response.status === 504 || err.response.status === 404) {
      ElMessage.error({ message: '服务器异常，请尝试' });
    } else if (err.response.status === 403) {
      ElMessage.error({ message: '权限不足，请联系管理员!' });
    } else {
      ElMessage.error({ message: '未知错误' });
    }
    return Promise.reject(err);
  }
);

export default request;
