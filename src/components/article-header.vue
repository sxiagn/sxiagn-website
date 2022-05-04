<template>
  <div class="article-header">
    <div class="article-title">
      <div class="title-desc">{{ title }}</div>
      <div class="title-slot">
        <slot name="title" />
      </div>
    </div>
    <div class="bg-line">
      <div v-for="item in 3" :key="item" />
    </div>
  </div>
</template>

<script lang="ts" setup>
// props使用
interface Props {
  title: string;
}
withDefaults(defineProps<Props>(), {
  title: 'Javascript/HTML/CSS'
  // labels: () => ['one', 'two']
});
</script>

<style lang="scss" scoped>
.article-header {
  position: sticky;
  top: 0;
  padding-top: 30px;
  background-color: #fff;
  z-index: 1;
  .article-title {
    min-height: 50px;
    line-height: 2;
    width: 100%;
    background-color: #409eff;
    line-height: 50px;
    color: #fff;
    font-weight: 600;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
  }

  .bg-line {
    div {
      width: 100%;
      height: 2px;
      background-color: #06f0de;
      margin-bottom: 10px;
    }

    :nth-child(2) {
      background-color: #409eff;
    }
  }
}
</style>
