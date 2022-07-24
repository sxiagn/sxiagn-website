<template>
  <div class="container-hot">
    <ArticleHeader title="热门推荐" :is-sticky="false" />
    <div class="article-list">
      <div v-for="(item, index) in textList" :key="index" class="article-item" @click="handleToDetails(item)">
        <div class="article-title">{{ item['title'] }}</div>
        <div class="create-time">{{ item['createTime'] }}</div>
      </div>
    </div>
    <NoData :list="textList" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { getHotArticleList } from '../api/index';
import ArticleHeader from './article-header.vue';
import NoData from './no-data.vue';

const router = useRouter();
const textList = ref([]);

const handleGetTextlist = async () => {
  const res = await getHotArticleList();
  textList.value = res.data || [];
};
onMounted(() => {
  handleGetTextlist();
});
const handleToDetails = (item: { id: any }) => {
  router.push({
    name: 'ArticleDetails',
    query: {
      id: item.id,
      textType: '3'
    }
  });
};
</script>

<style lang="scss" scoped>
.container-hot {
  .article-list {
    width: 100%;
    color: #333;
    font-size: 14px;
    padding: 0 2px 30px 2px;
    .article-item {
      width: 100%;
      border-bottom: 1px solid #dedede;
      padding: 10px 0;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      .article-title {
        flex: 1;
        padding: 0 2px;
        white-space: nowrap; //不换行
        overflow: hidden; //超出隐藏
        text-overflow: ellipsis; //变成...
        &:hover {
          text-decoration: underline;
          color: #409eff;
        }
      }
      .create-time {
        color: #409eff;
        font-size: 12px;
        width: 106px;
      }
    }
  }
}
</style>
