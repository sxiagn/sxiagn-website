import axios from 'axios';
import { ElMessage, ElLoading } from 'element-plus';

const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 30000
});

// 请求拦截
let loadingInstance: { close: () => void };
request.interceptors.request.use(
  config => {
    loadingInstance = ElLoading.service({
      target: document.getElementById('app-main') as HTMLElement,
      text: 'loading'
    });
    return config;
  },
  error => {
    loadingInstance.close();
    return Promise.reject(error);
  }
);

// 响应拦截
request.interceptors.response.use(
  res => {
    loadingInstance.close();
    if (res.status === 200) {
      if (res.data.code === -1) ElMessage.error(res.data.msg);
      return res.data;
    }
    return Promise.reject(res);
  },
  err => {
    loadingInstance.close();
    handleError(err.response.status);
    return Promise.reject(err);
  }
);
function handleError(status: number) {
  switch (status) {
    case 403:
      ElMessage.error({ message: '权限不足，请联系管理员' });
      break;
    case 404:
      ElMessage.error({ message: '服务器异常，请尝试' });
      break;
    case 504:
      ElMessage.error({ message: '服务器异常，请尝试' });
      break;
    default:
      ElMessage.error({ message: '未知错误' });
      break;
  }
}

export default request;
