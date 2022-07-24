<template>
  <div class="container">
    <ArticleHeader title="问题反馈管理" />
    <div v-for="(item, index) in problemList" :key="index" class="problem-list">
      <div class="problem-item">
        <div class="problem-title">
          <span class="title-desc" @click="handleToViewOrAnswer(item, index)">{{ item['problemDesc'] }}</span>
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
              <el-button type="danger" size="small">删除</el-button>
            </template>
          </el-popconfirm>
          <el-button v-if="item['isFinish'] === 1" type="success" size="small" @click="handleView(index)"
            >查看</el-button
          >
          <el-button v-else type="primary" size="small" @click="handleToAnswer(item)">答复</el-button>
        </div>
      </div>
      <div v-if="showAnswerIndex === index" class="show-answer">
        <el-input v-model="item['problemAnswer']" disabled type="textarea" />
      </div>
    </div>
    <NoData :list="problemList" />
    <ProblemAnswer :id="id" v-model="showDrawer" :problem-desc="problemDesc" @answered="handleAnswered" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { InfoFilled } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import ArticleHeader from '../components/article-header.vue';
import ProblemAnswer from '../components/problem-answer.vue';
import { getAllProblemList, deleteProblem } from '../api/index';
import NoData from '../components/no-data.vue';

const problemList = ref([]);
const showDrawer = ref(false);
const showAnswerIndex = ref(-1);

const handleGetArticleList = async () => {
  problemList.value = [];
  showAnswerIndex.value = -1;
  const { data } = await getAllProblemList();
  problemList.value = data || [];
};
onMounted(() => {
  handleGetArticleList();
});

const handleDelete = async (item: { id: number }, index: number) => {
  const params = {
    id: item.id
  };
  await deleteProblem(params);
  ElMessage.success('执行成功');
  // 页面采用前端内存删除，不重新请求初始化数据
  problemList.value.splice(index, 1);
};

const id = ref(0);
const problemDesc = ref('');
interface Item {
  id: number;
  problemDesc: string;
  createTime: string;
  isFinish?: number;
}
const handleToAnswer = (item: Item) => {
  showDrawer.value = true;
  id.value = item.id;
  problemDesc.value = item.problemDesc;
};
const handleAnswered = () => {
  handleGetArticleList();
};
// 查看按钮
const handleView = (index: number) => {
  showAnswerIndex.value = showAnswerIndex.value === index ? -1 : index;
};
// 点击问题描述
const handleToViewOrAnswer = (item: Item, index: number) => {
  item.isFinish === 1 ? handleView(index) : handleToAnswer(item);
};
</script>

<style lang="scss" scoped>
.container {
  .problem-list {
    width: 100%;
    color: #333;
    font-size: 14px;
    padding: 0 2px;
    border-bottom: 1px solid #dedede;
    .problem-item {
      width: 100%;
      padding: 10px 0;
      display: flex;
      justify-content: space-between;
      .problem-title {
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
    .show-answer {
      padding-bottom: 10px;
    }
  }
}
</style>
