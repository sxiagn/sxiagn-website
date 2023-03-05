<template>
  <div v-if="!list.length" class="no-data">暂无数据</div>
</template>

<script lang="ts" setup>
// type list = object[];
interface Props {
  list: any[];
}
withDefaults(defineProps<Props>(), {
  list: () => []
});
</script>

<style lang="scss" scoped>
.no-data {
  padding: 30px 0;
  background-color: #ebebeb;
  text-align: center;
  font-size: 12px;
}
</style>
