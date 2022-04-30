import NProgress from 'nprogress';
import router from '../router/index';
// 路由进度条插件
import 'nprogress/nprogress.css';
import { useInfoStore } from '../store/user-info';

// 全局路由做权限控制
router.beforeEach(async (to, from, next) => {
  NProgress.start();
  const permissionRoutes = ['/article-send'];
  if (permissionRoutes.includes(to.path)) {
    const userInfoStore = useInfoStore();
    const token = userInfoStore.getTokenFormLocal();
    if (!token) {
      // 需要加replace，不让上一个路由加入路由记录
      next({ path: '/login', replace: true });
    } else {
      next();
    }
  } else {
    next();
  }
});

router.afterEach(() => {
  NProgress.done();
});
