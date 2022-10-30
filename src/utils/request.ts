import axios from 'axios';
import { ElMessage, ElLoading, MessageParamsTyped } from 'element-plus';
import router from '../router/index';
import { useInfoStore } from '../store/user-info';

const userInfoStore = useInfoStore();
const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 30000
});

// 请求拦截
let loadingInstance: { close: () => void };
request.interceptors.request.use(
  (config: any) => {
    // loading指定target后，每次返回的loadingInstance都是单独的实例，如果当前有loading先关闭再开启，否则同时发送多个请求的时候loading关闭不了
    if (loadingInstance) loadingInstance.close();
    loadingInstance = ElLoading.service({
      target: document.getElementById('app-main') as HTMLElement,
      text: 'loading'
    });

    // 添加请求头，token
    const token = userInfoStore.getToken();
    // 后台需要token前拼接Bearer
    config.headers.Authorization = `Bearer ${token}`;
    // 添加时间戳
    if (config.method === 'post') {
      config.data = {
        ...config.data,
        _t: new Date().getTime()
      };
    } else if (config.method === 'get') {
      config.params = {
        _t: new Date().getTime(),
        ...config.params
      };
    }
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
      if (res.data.code === -1) {
        ElMessage.error(res.data.msg);
        return Promise.reject(res);
      }
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
function handleError(error: {
  code: string;
  message: string | string[];
  response: { status: any; data: { msg: MessageParamsTyped | undefined } };
}) {
  if (error.code === 'ECONNABORTED' || error.message === 'Network Error' || error.message.includes('timeout')) {
    ElMessage.error('请求超时，请稍后重试');
  }
  if (error.response) {
    switch (error.response.status) {
      case 403:
        ElMessage.error(error.response.data.msg);
        userInfoStore.removeToken();
        router.replace('/login');
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
