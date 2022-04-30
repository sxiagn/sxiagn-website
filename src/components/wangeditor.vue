<template>
  <div style="border: 1px solid #ccc">
    <Toolbar
      id="toolbar-container"
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :default-config="toolbarConfig"
    />
    <Editor
      v-model="editorHtml"
      style="height: 500px; overflow-y: hidden"
      :default-config="editorConfig"
      @on-created="handleCreated"
    />
  </div>
</template>
<script lang="ts" setup>
// wangeditor官网：
// https://www.wangeditor.com/v5/getting-started.html#%E5%88%9B%E5%BB%BA%E7%A9%BA%E7%99%BD%E7%BC%96%E8%BE%91%E5%99%A8
import '@wangeditor/editor/dist/css/style.css';
import { onBeforeUnmount, ref, shallowRef, watch } from 'vue';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
import { IEditorConfig, IToolbarConfig, createToolbar } from '@wangeditor/editor';

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();
// 内容 HTML
const editorHtml = ref('');

// 将输入内容抛出去
const emits = defineEmits(['editor-html']);
watch(editorHtml, n => {
  emits('editor-html', n);
});
// 工具栏配置，excludeKeys为不想要展示的工具
const toolbarConfig: Partial<IToolbarConfig> = {
  // excludeKeys: ['group-image', 'group-video', 'emotion']
  excludeKeys: ['group-video', 'emotion']
};
// 编辑器配置
const editorConfig: Partial<IEditorConfig> = {
  MENU_CONF: {
    uploadImage: {
      server: 'http://localhost:3000/text/upload',
      fieldName: 'fileName',
      // 小于该值就插入 base64 格式（而不上传），默认为 0
      base64LimitSize: 5 * 1024 * 1024 // 5mb
    }
  },
  placeholder: '请输入内容...'
};
// 初始化编辑器
const handleCreated = (editor: any) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
  const toolbar = createToolbar({
    editor,
    selector: '#toolbar-container',
    config: toolbarConfig
  });
  console.log('数据', toolbar.getConfig().toolbarKeys); // 工具栏keys
};

// 销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor === null) return;
  editor.destroy();
});
</script>
