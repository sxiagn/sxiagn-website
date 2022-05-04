<template>
  <div class="container">
    <ArticleHeader :title="articleDetailData.title" />
    <div v-highlight class="text-content">
      <div class="v-html" v-html="articleDetailData.contentDesc" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive } from 'vue';
import { getArticleDetails } from '../api/index';
import ArticleHeader from '../components/article-header.vue';

const articleDetailData = reactive({
  title: '',
  contentDesc: '',
  createTime: ''
});
interface Props {
  id: number | string;
}
const props = defineProps<Props>();

const handleGetTextDetails = async () => {
  const { data: res } = await getArticleDetails({ id: props.id });
  if (res.length) return;
  articleDetailData.title = res.title;
  articleDetailData.contentDesc = res.contentDesc;
  articleDetailData.createTime = res.createTime;
};
onMounted(() => {
  handleGetTextDetails();
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
