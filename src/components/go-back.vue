<template>
  <div class="right-button go-back" @click="$router.back()">
    <el-icon size="20" color="#fff"><arrow-left-bold /></el-icon>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.go-back {
  bottom: 110px;
}
</style>
