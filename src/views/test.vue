<template>
  <div style="border: 1px solid #ccc">
    <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :default-config="toolbarConfig" />
    <Editor
      v-model="editorHtml"
      style="height: 500px; overflow-y: hidden"
      :default-config="editorConfig"
      @on-created="handleCreated"
    />
  </div>
</template>
<script lang="ts" setup>
import '@wangeditor/editor/dist/css/style.css'; // 引入 css

import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
import { IEditorConfig } from '@wangeditor/editor';

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();

// 内容 HTML
const editorHtml = ref('');

// 模拟 ajax 异步获取内容
onMounted(() => {
  // setTimeout(() => {
  //   editorHtml.value = '<p>模拟 Ajax 异步设置内容</p>';
  // }, 1500);
});
const toolbarConfig = {};
const editorConfig: Partial<IEditorConfig> = {
  MENU_CONF: {
    uploadImage: {
      server: '/api/upload',
      // 小于该值就插入 base64 格式（而不上传），默认为 0
      base64LimitSize: 5 * 1024 * 1024 // 5kb
    }
  },
  placeholder: '请输入内容...'
};

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});

const handleCreated = (editor: any) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};
</script>
