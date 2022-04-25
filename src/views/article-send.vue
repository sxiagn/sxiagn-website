<template>
  <div class="container">
    <ArticleHeader title="发表文章" />
    <div class="text-add">
      <el-form
        ref="ruleForm"
        :model="FormData"
        :rules="formRules"
        label-position="top"
        class="content-form"
        label-width="100px"
      >
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="文章类别" prop="textType">
              <el-select v-model="FormData.textType" clearable placeholder="请选择文章类别">
                <el-option v-for="item in contentTypeList" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item class="send-content" label="发送">
              <el-button type="primary" @click="handleSend(ruleForm)">发送</el-button>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="文章标题" prop="title">
          <el-input
            v-model="FormData.title"
            clearable
            type="textarea"
            :rows="1"
            placeholder="请输入文章标题，尽可能简洁提炼"
          />
        </el-form-item>
      </el-form>
      <Wangeditor @editor-html="handleEditorHtml" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import type { FormInstance, FormRules } from 'element-plus';
import ArticleHeader from '@/components/article-header.vue';
import Wangeditor from '@/components/wangeditor.vue';
import { contentTypeList } from '../utils/text-option';
import { AddarticleApi } from '../api/index';

const ruleForm = ref<FormInstance>();
const router = useRouter();
const textEditData = reactive({
  contentDesc: '',
  contentTypeList
});
const FormData = reactive({
  title: '',
  textType: ''
});
const formRules = reactive<FormRules>({
  title: [
    { required: true, message: '请输入文章标题', trigger: ['blur', 'change'] },
    { min: 1, max: 50, message: '长度不超过50字', trigger: ['blur', 'change'] }
  ],
  textType: [{ required: true, message: '请选择文章类别', trigger: ['blur', 'change'] }]
});

// 获取富文本内容
const handleEditorHtml = (val: string) => {
  textEditData.contentDesc = val;
};

// 发送文章
const handleSend = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async valid => {
    if (valid) {
      if (!textEditData.contentDesc) {
        ElMessage.warning('请输入文章内容');
        return;
      }
      const params = {
        ...FormData,
        contentDesc: textEditData.contentDesc
      };
      await AddarticleApi(params);
      ElMessage.success('执行成功');
      router.push('/index');
    }
  });
};
</script>

<style lang="scss" scoped>
.container {
  .text-add {
    width: 100%;
    color: #333;
    font-size: 14px;
  }
  .content-form {
    :deep(.el-select) {
      width: 100%;
    }
  }
  :deep(.send-content) {
    .el-form-item__label {
      visibility: hidden;
    }
  }
}
</style>
