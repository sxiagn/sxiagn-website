import { defineStore } from 'pinia';

export const useInfoStore = defineStore({
  id: 'UserInfo',
  state: () => {
    return {
      token: ''
    };
  },
  actions: {
    setTokenTolocal(token: string) {
      this.token = token;
      sessionStorage.setItem('token', token);
    },
    getTokenFormLocal() {
      const token = sessionStorage.getItem('token') || '';
      if (!this.token && sessionStorage.getItem('token')) {
        this.token = token;
      }
      return this.token;
    }
  }
});
