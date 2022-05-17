<template>
  <div class="container">
    <div class="container-center">
      <el-row :gutter="20" class="wrap">
        <el-col v-for="item in ArticleTheme" :key="item.title" :span="8" class="wrap-list">
          <div class="wrap-item" @click="handleToList(item)">
            <div class="item-desc">
              <p>{{ item.title }}</p>
              <div>{{ item.desc }}</div>
            </div>
          </div>
        </el-col>
      </el-row>
      <div class="problem-collection">
        <el-form label-position="top" label-width="80px" :model="formData">
          <el-form-item label="问题反馈">
            <el-input
              v-model="formData.textarea"
              clearable
              type="textarea"
              :rows="3"
              placeholder="请告诉我你想要了解的知识点或者开发过程中遇到的坑，我们一起解决"
            />
          </el-form-item>
          <div class="btn-confirm">
            <el-button type="primary" @click="handleConfirm">确认</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { ArticleTheme } from '../utils/article-option';
import { problemFeedBack } from '../api/index';

const formData = reactive({
  textarea: ''
});
const router = useRouter();
const handleToList = (item: { title: any; textType: any }) => {
  router.push({
    name: 'ArticleList',
    query: {
      title: item.title,
      textType: item.textType
    }
  });
};
const handleConfirm = async () => {
  if (!formData.textarea.trim()) return;
  const params = {
    problemDesc: formData.textarea,
    createTime: Date.now(),
    isFinish: false
  };
  await problemFeedBack(params);
  formData.textarea = '';
  ElMessage.success('执行成功');
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  position: relative;

  .container-center {
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

.wrap {
  .wrap-list {
    padding-bottom: 20px;

    .wrap-item {
      padding: 10px;
      border-radius: 10px;
      background-color: #409eff;
      height: 200px;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;

      .item-desc {
        text-align: center;
        word-wrap: break-word;
        white-space: normal;
        word-break: break-all;

        p {
          transition: font-size 0.2s linear;
          padding-bottom: 10px;
        }

        div {
          font-size: 12px;
          transition: font-size 0.2s linear;
        }
      }
    }

    .wrap-item:hover {
      box-shadow: 2px 2px 8px rgba($color: #000000, $alpha: 0.1);

      .item-desc {
        text-align: center;

        p {
          font-size: 18px;
        }

        div {
          font-size: 14px;
        }
      }
    }
  }
}
.problem-collection {
  .btn-confirm {
    text-align: right;
    margin-bottom: 12px;
  }
}
</style>
