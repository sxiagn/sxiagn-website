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
  error => {
    loadingInstance.close();
    handleError(error);
    return Promise.reject(error);
  }
);
function handleError(error: { code: string; message: string; response: { status: number } }) {
  if (error.code === 'ECONNABORTED' || error.message === 'Network Error' || error.message.includes('timeout')) {
    ElMessage.error('请求超时，请稍后重试');
  }
  if (error.response) {
    switch (error.response.status) {
      case 403:
        ElMessage.error('权限不足，请联系管理员');
        break;
      case 404:
        ElMessage.error('请求路径错误，请检查');
        break;
      case 504:
        ElMessage.error('服务器异常，请稍后重试');
        break;
      default:
        ElMessage.error('系统异常，请稍后重试');
        break;
    }
  }
}

export default request;
