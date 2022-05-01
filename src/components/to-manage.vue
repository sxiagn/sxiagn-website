<template>
  <div class="right-button to-top" @click="$router.push({ name: 'ArticleManage' })">
    <el-icon size="20" color="#fff"><management /></el-icon>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.to-top {
  bottom: 70px;
}
</style>
