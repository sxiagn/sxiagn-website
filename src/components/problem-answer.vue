<template>
  <el-drawer
    :model-value="props.modelValue"
    :with-header="false"
    size="60%"
    direction="btt"
    custom-class="common-drawer"
    :close-on-click-modal="false"
    :before-close="handleClose"
    destroy-on-close
  >
    <div class="problem-wrap">
      <div class="problem-item">
        <div class="title">问题：</div>
        <div class="problem-desc">{{ props.problemDesc }}</div>
      </div>
      <div class="problem-item">
        <div class="title">回复：</div>
        <div class="problem-desc">
          <el-input v-model="problemAnswer" clearable type="textarea" :rows="5" placeholder="请认真解答该问题~~" />
        </div>
      </div>
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
import { ref, watch } from 'vue';
import { ElMessage } from 'element-plus';
import { problemAnswerApi } from '../api/index';

const problemAnswer = ref('');

interface Props {
  modelValue: boolean;
  id: number;
  problemDesc: string;
}
const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue', 'answered']);
watch(
  () => props.modelValue,
  n => {
    if (n) problemAnswer.value = '';
  }
);
const handleClose = () => {
  emit('update:modelValue', false);
};

// 确定按钮
const handleConfirm = async () => {
  if (!problemAnswer.value.trim()) {
    ElMessage.error('请认真解答该问题~~');
    return;
  }
  const params = {
    id: props.id,
    problemAnswer: problemAnswer.value
  };
  await problemAnswerApi(params);
  ElMessage.success('执行成功');
  emit('answered');
  handleClose();
};
</script>

<style lang="scss" scoped>
.problem-item {
  font-size: 14px;
  display: flex;
  margin-bottom: 20px;
  .title {
    width: 45px;
  }
  .problem-desc {
    color: #606266;
    flex: 1;
    line-height: 1.5;
  }
}
</style>
