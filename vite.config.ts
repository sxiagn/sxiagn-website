// const path = require('path')
import * as path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

function resolve(dir) {
  return path.join(__dirname, dir);
}
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve('src')
    }
  },
  server: {
    port: 8088,
    proxy: {
      '/api': {
        target: 'http://localhost:3000/', // API服务器的地址（可以理解成请求根路径）
        ws: true, // 代理websockets
        changeOrigin: true, // 虚拟的站点需要更管origin
        // eslint-disable-next-line @typescript-eslint/no-shadow
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  }
});
