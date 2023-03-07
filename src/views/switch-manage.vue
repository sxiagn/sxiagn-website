<template>
  <div class="container">
    <ArticleHeader title="开关管理">
      <template #title>
        <el-button size="small" plain @click="handleAdd">新增</el-button>
      </template>
    </ArticleHeader>
    <div class="article-list">
      <el-table :data="switchList" stripe style="width: 100%">
        <el-table-column prop="code" label="编码" />
        <el-table-column prop="descirbe" label="描述" />
        <el-table-column prop="status" label="状态">
          <template #default="scope">
            <el-switch v-model="scope.row.status" :before-change="() => handleBeforeChange(scope.row)" />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template #default="scope">
            <el-popconfirm
              confirm-button-text="确定"
              cancel-button-text="取消"
              :icon="InfoFilled"
              icon-color="red"
              title="确认删除该开关吗？"
              @confirm="handleDelete(scope.row)"
            >
              <template #reference>
                <el-button type="danger" size="small">删除</el-button>
              </template>
            </el-popconfirm>
            <el-button link type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <NoData :list="switchList" />
    <SwitchDrawer v-model="showDrawer" @confirm="handleConfirm" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { InfoFilled } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import ArticleHeader from '../components/article-header.vue';
import NoData from '../components/no-data.vue';
import SwitchDrawer from '../components/switch-drawer.vue';

const showDrawer = ref(false);
const switchList = ref([
  {
    code: 'xiasgn454564',
    descirbe: '控制首页疫情防控模块显示与隐藏',
    status: true
  }
]);

const handleBeforeChange = val => {
  console.log('数据', val);
  return false;
};
const handleAdd = () => {
  showDrawer.value = true;
};

const handleEdit = row => {
  console.log('编辑', row);
  showDrawer.value = true;
};
const handleDelete = row => {
  console.log('删除', row);
  ElMessage.success('执行成功');
};
const handleConfirm = () => {
  showDrawer.value = false;
  ElMessage.success('执行成功');
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
}
</style>
