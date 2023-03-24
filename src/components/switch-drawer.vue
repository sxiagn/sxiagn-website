<template>
  <el-drawer
    :model-value="props.modelValue"
    :with-header="false"
    size="35%"
    direction="rtl"
    custom-class="common-drawer"
    :close-on-click-modal="false"
    :before-close="handleClose"
    destroy-on-close
    append-to-body
  >
    <div class="switch-wrap">
      <div class="title">{{ props.title }}</div>
      <el-form
        ref="ruleForm"
        :model="formData"
        :rules="formRules"
        label-position="top"
        class="content-form"
        label-width="100px"
      >
        <el-form-item label="唯一编码" prop="switchCode">
          <el-input v-model="formData.switchCode" clearable placeholder="请输入，如user_switch" />
        </el-form-item>
        <el-form-item label="开关描述" prop="switchDescribe">
          <el-input
            v-model="formData.switchDescribe"
            clearable
            type="textarea"
            :rows="3"
            placeholder="请输入文章标题，尽可能简洁提炼"
          />
        </el-form-item>
        <el-form-item label="开关状态" prop="switchStatus">
          <el-switch v-model="formData.switchStatus" active-value="1" inactive-value="0" />
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <div style="flex: auto">
        <el-button size="small" @click="handleClose">取消</el-button>
        <el-button size="small" type="primary" @click="handleConfirm">确定</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script lang="ts" setup>
import { ref, watch, reactive } from 'vue';
import { ElMessage } from 'element-plus';
import type { FormInstance, FormRules } from 'element-plus';
import { switchAddApi } from '../api/index';

const ruleForm = ref<FormInstance>();
const formData = reactive({
  switchCode: '',
  switchDescribe: '',
  switchStatus: '0'
});
const formRules = reactive<FormRules>({
  switchCode: [
    { required: true, message: '请输入唯一编码', trigger: 'blur' },
    { min: 1, max: 50, message: '长度不超过50字', trigger: ['blur', 'change'] }
  ],
  switchDescribe: [{ required: true, message: '请输入开关描述', trigger: 'blur' }],
  switchStatus: [{ required: true, message: '请选择开关状态', trigger: 'change' }]
});
interface Props {
  modelValue: boolean;
  title: string;
}
const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  title: '新增开关'
});
const emit = defineEmits(['update:modelValue', 'confirm']);
watch(
  () => props.modelValue,
  n => {
    console.log(n);
  }
);
const handleClose = () => {
  emit('update:modelValue', false);
};

// 确定按钮
const handleConfirm = async () => {
  if (!ruleForm.value) return;
  await ruleForm.value.validate(async valid => {
    if (valid) {
      await switchAddApi(formData);
      ElMessage.success('执行成功');
      emit('confirm');
      handleClose();
    }
  });
};
</script>

<style lang="scss" scoped>
.switch-wrap {
  .title {
    width: 100%;
    border-bottom: 1px solid #dedede;
    padding-bottom: 12px;
    margin-bottom: 24px;
  }
}
</style>
