import * as path from 'path';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';

function resolve(dir) {
  return path.join(__dirname, dir);
}
export default defineConfig(({ mode }) => {
  const envConfig = loadEnv(mode, './');
  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': resolve('src') // 配置别名
      }
    },
    server: {
      port: 8088,
      proxy: {
        [envConfig.VITE_APP_BASE_API]: {
          target: 'http://localhost:3000/', // API服务器的地址（可以理解成请求根路径）
          ws: true, // 代理websockets
          changeOrigin: true, // 虚拟的站点需要更管origin
          // 入参一般定义为path，因为这里path会报重复定义的eslint警告，换成url避免eslint报错
          rewrite: url => url.replace(new RegExp(`^${envConfig.VITE_APP_BASE_API}`), '')
        }
      }
    },
    css:{
      postcss:{
        plugins: [
          // css自动添加浏览器前缀
          require('autoprefixer')({
            overrideBrowserslist: [
              'Android 4.1',
              'iOS 7.1',
              'Chrome > 31',
              'ff > 31',
              'ie >= 8',
              '> 1%',
            ],
            grid: true,
          }),
          require('postcss-flexbugs-fixes'),
        ],
      }
    }
  };
});
