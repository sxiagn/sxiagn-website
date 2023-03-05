<template>
  <el-drawer
    :model-value="props.modelValue"
    title="疫情数据说明"
    size="60%"
    direction="btt"
    custom-class="common-drawer"
    :before-close="handleClose"
    destroy-on-close
    append-to-body
  >
    <div class="rource-desc">
      <p class="desc-item">1. 数据来源：国家卫健委、各省市区卫健委、各省市区政府、港澳台官方渠道公开数据。</p>
      <p class="desc-item">
        2. 数据更新时间：实时更新全国、各省市区数据，因核实计算需要，与官方的发布时间相比，将有一定时间延迟。
      </p>
      <p class="desc-item">
        3. 实时数据统计原则：<br />
        <span class="classify">
          ①
          每日上午优先将全国各类数据与国家卫健委公布数据对齐（此时各省市区数据尚未及时更新，会出现全国数据大于各省市区合计数的情况）；
        </span>
        <span class="classify">
          ②
          数据实时更新过程中，各省市区卫健委陆续公布数据，如果各省市区公布数据总和大于之前国家公布数据，则全国数据切换为各省市区合计数；
        </span>
        <span class="classify">
          ③ “较昨日+”的数据以国家卫健委每日公布的新增数据为基线，实时根据各省市区陆续公布的数据进行更新；</span
        >
        <span class="classify">
          ④ 由于各省市区数据发布时间和统计时间各不相同，因此在部分时段可能出现国家总数与各省市区总数不等的情况。
        </span>
      </p>
    </div>
  </el-drawer>
</template>

<script lang="ts" setup>
interface Props {
  modelValue: boolean;
}
const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue']);
const handleClose = () => {
  emit('update:modelValue', false);
};
</script>

<style lang="scss" scoped>
.rource-desc {
  .desc-item {
    font-size: 14px;
    color: #666666;
    margin-bottom: 10px;
    .classify {
      display: block;
      // margin-bottom: 10px;
    }
  }
}
</style>
