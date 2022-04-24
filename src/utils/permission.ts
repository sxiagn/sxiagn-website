import NProgress from 'nprogress';
import router from '../router/index';
// 进度条插件
import 'nprogress/nprogress.css';

// 全局路由做权限控制
router.beforeEach(async (to, from, next) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});
