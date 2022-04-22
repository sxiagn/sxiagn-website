import { createRouter, createWebHashHistory } from 'vue-router';

let routes: any[] = [];
// const routeList = require.context('./routes', true, /.ts$/);
const routeList = import.meta.globEager('./routes/*.ts');
Object.keys(routeList).forEach(key => {
  const routeConfig = routeList[key].default;
  routes = [...routes, ...routeConfig];
});
const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
