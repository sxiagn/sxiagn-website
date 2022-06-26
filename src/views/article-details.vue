<template>
  <div class="container">
    <ArticleHeader :title="articleDetailData.title">
      <template #title>
        <el-dropdown class="look-more" max-height="250px" placement="bottom-end" size="small" @command="handleCommand">
          <el-button size="small" plain>
            查看其他文章<el-icon class="el-icon--right"><arrow-down /></el-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu class="look-menu">
              <el-dropdown-item
                v-for="item in textList"
                :key="item['id']"
                class="look-item"
                :command="item['id']"
                :disabled="props.id === String(item['id'])"
                >{{ item['title'] }}</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
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
import { onMounted, reactive, ref, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getArticleDetails, getArticleList } from '../api/index';
import ArticleHeader from '../components/article-header.vue';

const articleDetailData = reactive({
  title: '',
  contentDesc: '',
  createTime: ''
});
interface Props {
  id: string;
  textType: string;
}
const props = defineProps<Props>();
const showHighLight = ref(false);

// 文章详情
const handleGetTextDetails = async (id: string) => {
  // 加入showHighLight主要是解决插件highlight.js控制台HTML警告
  showHighLight.value = false;
  const { data: res } = await getArticleDetails({ id });
  articleDetailData.title = res.title;
  articleDetailData.contentDesc = res.contentDesc;
  articleDetailData.createTime = res.createTime;
  await nextTick();
  showHighLight.value = true;
};
// 文章列表
const textList = ref([]);
const handleGetTextlist = async () => {
  const res = await getArticleList({ textType: props.textType });
  textList.value = res.data || [];
};

// 点击查看其他文章
const route = useRoute();
const router = useRouter();
const handleCommand = async (command: string) => {
  handleGetTextDetails(command);
  const query = { ...route.query, id: command };
  router.replace({ query });
};
onMounted(() => {
  handleGetTextlist();
  handleGetTextDetails(props.id);
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
.look-more {
  line-height: 50px;
}
</style>
