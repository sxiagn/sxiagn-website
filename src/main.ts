import { createApp } from 'vue';
import './styles/index.scss';
import ElementPlus from 'element-plus';
import * as ElIcons from '@element-plus/icons-vue';
import 'element-plus/dist/index.css';
import hljs from 'highlight.js';
import App from './App.vue';
import router from './router';
// 代码高亮的js
import 'highlight.js/styles/googlecode.css';
// 样式文件
const app = createApp(App);
Object.keys(ElIcons).forEach(name => {
  app.component(name, (ElIcons as any)[name]);
});
// 定义一个全局指令
app.directive('highlight', el => {
  const blocks = el.querySelectorAll('pre code');
  blocks.forEach((block: HTMLElement) => {
    hljs.highlightBlock(block);
  });
});

app.use(ElementPlus, { size: 'mini' }).use(router).mount('#app');
