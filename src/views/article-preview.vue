<template>
  <div class="container">
    <ArticleHeader :title="articleDetailData.title">
      <template #title>
        <el-button size="small" plain @click="handleSend">发送</el-button>
      </template>
    </ArticleHeader>
    <template v-if="showHighLight">
      <div v-highlight class="text-content">
        <div class="v-html" v-html="articleDetailData.contentDesc" />
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted, ref, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import ArticleHeader from '../components/article-header.vue';
import { addArticleApi, editArticleApi } from '../api/index';

const showHighLight = ref(false);
const articleDetailData = reactive({
  title: '',
  contentDesc: '',
  textType: '',
  id: ''
});
const router = useRouter();
const handleSend = async () => {
  if (articleDetailData.id) {
    await editArticleApi(articleDetailData);
  } else {
    await addArticleApi(articleDetailData);
  }
  ElMessage.success('执行成功');
  sessionStorage.removeItem('articlePreview');
  // 如果有父窗口就关闭父窗口
  if (window.opener && !window.opener.closed) window.opener.close();
  router.replace('/index');
};
onMounted(async () => {
  // 加入showHighLight主要是解决插件highlight.js控制台HTML警告
  const articleInfo = JSON.parse(sessionStorage.getItem('articlePreview') as string);
  Object.assign(articleDetailData, articleInfo);
  await nextTick();
  showHighLight.value = true;
});
</script>
<style lang="scss">
.v-html {
  table {
    border-collapse: collapse;
  }
  td,
  th {
    border: 1px solid #ccc;
    padding: 8px 12px;
  }
  th {
    background-color: #f1f1f1;
  }
  img {
    width: 100%;
  }
}
</style>
<style lang="scss" scoped>
.container {
  position: relative;
  .text-content {
    width: 100%;
  }
}
</style>
