import { defineStore } from 'pinia';

export const routeInfoStore = defineStore({
  id: 'RouteInfo',
  state: () => {
    return {
      beforeRoute: ''
    };
  },
  actions: {
    setBeforeRouteTolocal(route: string) {
      this.beforeRoute = route;
      sessionStorage.setItem('beforeRoute', route);
    },
    getBeforeRouteFormLocal() {
      const route = sessionStorage.getItem('beforeRoute') || '';
      if (!this.beforeRoute && sessionStorage.getItem('beforeRoute')) {
        this.beforeRoute = route;
      }
      return this.beforeRoute;
    }
  }
});
