<template>
  <div class="container">
    <ArticleHeader title="博文管理" />
    <div class="article-list">
      <div v-for="(item, index) in ArticleList" :key="index" class="article-item">
        <div class="article-title">
          <span class="title-desc" @click="handleToDetails(item)">{{ item['title'] }}</span>
        </div>
        <div class="operation">
          <el-popconfirm
            confirm-button-text="确定"
            cancel-button-text="取消"
            :icon="InfoFilled"
            icon-color="red"
            title="确认删除该条博文吗？"
            @confirm="handleDelete(item, index)"
          >
            <template #reference>
              <el-button type="primary" size="small">删除</el-button>
            </template>
          </el-popconfirm>
        </div>
      </div>
    </div>
    <div v-if="!ArticleList.length" class="no-data">暂无数据</div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { InfoFilled } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import ArticleHeader from '../components/article-header.vue';
import { getAllArticleList, deleteArticle } from '../api/index';

const router = useRouter();
const ArticleList = ref([]);

const handleGetArticleList = async () => {
  ArticleList.value = [];
  const { data } = await getAllArticleList();
  ArticleList.value = data || [];
};
onMounted(() => {
  handleGetArticleList();
});
const handleDelete = async (item: { id: number; textType: string }, index: number) => {
  const params = {
    id: item.id,
    textType: item.textType
  };
  await deleteArticle(params);
  ElMessage.success('执行成功');
  // 页面采用前端内存删除，不重新请求初始化数据
  ArticleList.value.splice(index, 1);
};
const handleToDetails = (item: { id: any }) => {
  router.push({
    name: 'ArticleDetails',
    query: {
      id: item.id
    }
  });
};
</script>

<style lang="scss" scoped>
.container {
  .article-list {
    width: 100%;
    color: #333;
    font-size: 14px;
    padding: 0 2px;
    .article-item {
      width: 100%;
      border-bottom: 1px solid #dedede;
      padding: 10px 0;
      display: flex;
      justify-content: space-between;
      .article-title {
        flex: 1;
        padding: 0 5px 0 2px;
        white-space: nowrap; //不换行
        overflow: hidden; //超出隐藏
        text-overflow: ellipsis; //变成...
        &:hover {
          text-decoration: underline;
          color: #409eff;
        }
        .title-desc {
          cursor: pointer;
        }
      }
    }
  }
  .no-data {
    padding: 30px 0;
    background-color: #ebebeb;
    text-align: center;
    font-size: 12px;
  }
}
</style>
