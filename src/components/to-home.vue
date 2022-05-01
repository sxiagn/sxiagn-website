<template>
  <div class="right-button to-home" @click="$router.push({ name: 'Index' })">
    <el-icon size="20" color="#fff"><home-filled /></el-icon>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.to-home {
  bottom: 30px;
}
</style>
