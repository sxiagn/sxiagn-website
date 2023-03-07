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
    <div class="problem-wrap">
      <div class="problem-item">
        <div class="title">问题：</div>
      </div>
      <div class="problem-item">
        <div class="title">回复：</div>
        <div class="problem-desc">
          <el-input v-model="problemAnswer" clearable type="textarea" :rows="12" placeholder="请认真解答该问题~~" />
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

const problemAnswer = ref('');

interface Props {
  modelValue: boolean;
}
const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue', 'confirm']);
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
  ElMessage.success('执行成功');
  emit('confirm');
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
