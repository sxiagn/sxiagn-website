<template>
  <el-col :span="props.span" class="desc-item">
    <div class="title pb-6">{{ props.title }}</div>
    <div class="count pb-6" :class="{ 'border-r': isBorder }" :style="{ color: props.color }">
      <VueCountTo :end-val="props.amount" :duration="600" />
    </div>
    <div class="add pb-6">
      <span>较上日</span>
      <span :style="{ color: props.color }">
        <span>{{ isAdd(props.addAmount) }}</span>
        <VueCountTo :end-val="props.addAmount" :duration="600" />
      </span>
    </div>
  </el-col>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import VueCountTo from '../vue-count-to.vue';

interface Props {
  span?: number;
  title?: string;
  amount?: number;
  addAmount?: number;
  isBorder?: boolean;
  color?: string;
}
const props = withDefaults(defineProps<Props>(), {
  span: 8,
  title: '境外输入',
  amount: 8,
  addAmount: 8,
  isBorder: true,
  color: '#000000'
});
const isAdd = computed(() => (addAmount: number) => {
  // 计算属性传递参数
  return addAmount < 0 ? '-' : '+';
});
</script>

<style lang="scss" scoped>
.desc-item {
  text-align: center;
  margin-bottom: 20px;
  .title {
    font-size: 12px;
  }
  .count {
    font-weight: 600;
    font-size: 16px;
  }
  .border-r {
    border-right: 1px solid #cecece;
  }
  .add {
    font-size: 12px;
    color: #333333;
  }
  .pb-6 {
    padding-bottom: 6px;
  }
}
</style>
