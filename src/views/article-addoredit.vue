<template>
  <div class="container">
    <ArticleHeader title="发表文章">
      <template #title>
        <el-button size="small" plain @click="handleSendOrPreview(ruleForm, 'send')">发送</el-button>
        <el-button size="small" plain @click="handleSendOrPreview(ruleForm, 'preview')">预览</el-button>
      </template>
    </ArticleHeader>
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
          <el-col :span="12">
            <el-form-item label="文章类别" prop="textType">
              <el-select v-model="FormData.textType" clearable placeholder="请选择文章类别">
                <el-option v-for="item in contentTypeList" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
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
      <Wangeditor :edit-content="editContent" @editor-html="handleEditorHtml" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { ElMessage } from 'element-plus';
import type { FormInstance, FormRules } from 'element-plus';
import ArticleHeader from '@/components/article-header.vue';
import Wangeditor from '@/components/wangeditor.vue';
import { contentTypeList } from '../utils/article-option';
import { addArticleApi, getArticleDetails, editArticleApi } from '../api/index';

const ruleForm = ref<FormInstance>();
const router = useRouter();
const route = useRoute();
const textEditData = reactive({
  contentDesc: '',
  contentTypeList
});
const FormData = reactive({
  title: '',
  textType: ''
});
const editContent = ref(''); // 编辑的时候，从接口返回的富文本内容
const formRules = reactive<FormRules>({
  title: [
    { required: true, message: '请输入文章标题', trigger: ['blur', 'change'] },
    { min: 1, max: 50, message: '长度不超过50字', trigger: ['blur', 'change'] }
  ],
  textType: [{ required: true, message: '请选择文章类别', trigger: ['blur', 'change'] }]
});
// 编辑功能
// 编辑的时候，通过路由传入id
interface Props {
  id?: string | number;
}
const props = defineProps<Props>();
const handleGetTextDetails = async () => {
  const { data: res } = await getArticleDetails({ id: props.id as string });
  FormData.title = res.title;
  FormData.textType = res.textType;
  editContent.value = res.contentDesc;
};
const isAddArticl = ref(route.name === 'ArticleEdit');
onMounted(() => {
  if (isAddArticl.value) handleGetTextDetails();
});

// 获取富文本内容
const handleEditorHtml = (val: string) => {
  textEditData.contentDesc = val;
};

// 新增与编辑发送请求
interface Params {
  title: string;
  textType: string;
  contentDesc: string;
  id?: string | number;
}
// 准备发送数据
const handleAjaxParams = () => {
  const params: Params = {
    ...FormData,
    contentDesc: textEditData.contentDesc
  };
  if (isAddArticl.value) {
    params.id = props.id;
  }
  return params;
};
// 发送或者编辑发送请求
const handleAddOrEditArticle = async () => {
  const params = handleAjaxParams();
  if (isAddArticl.value) {
    await editArticleApi(params);
  } else {
    await addArticleApi(params);
  }
  ElMessage.success('执行成功');
  router.push('/index');
};
// 预览
const handlePreview = () => {
  const params = handleAjaxParams();
  sessionStorage.setItem('articlePreview', JSON.stringify(params));
  const link = router.resolve({
    path: '/article-preview'
  });
  window.open(link.href, '_blank');
};
// 发送与预览按钮
const handleSendOrPreview = async (formEl: FormInstance | undefined, type: string) => {
  if (!formEl) return;
  await formEl.validate(async valid => {
    if (valid) {
      if (!textEditData.contentDesc) {
        ElMessage.warning('请输入文章内容');
        return;
      }
      type === 'send' ? handleAddOrEditArticle() : handlePreview();
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
