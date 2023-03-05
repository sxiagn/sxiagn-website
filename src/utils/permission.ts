import NProgress from 'nprogress';
import router from '../router/index';
// 路由进度条插件
import 'nprogress/nprogress.css';
import { useInfoStore } from '../store/user-info';
import { routeInfoStore } from '../store/route-info';
import { PERMISSION_ROUTES } from './const';

// 全局路由做权限控制
router.beforeEach(async (to, from, next) => {
  NProgress.start();
  const permissionRoutes = Object.keys(PERMISSION_ROUTES);
  if (permissionRoutes.includes(to.name as string)) {
    const userStore = useInfoStore();
    const token = userStore.getToken();
    if (!token) {
      const routeStore = routeInfoStore();
      routeStore.setBeforeRouteTolocal(to.fullPath);
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
