<template>
  <el-container class="app-container">
    <AppASide />
    <AppAMain />
  </el-container>
</template>

<script lang="ts" setup>
import AppASide from './components/app-aside.vue';
import AppAMain from './components/app-main.vue';
</script>

<style lang="scss" scoped>
.app-container {
  height: 100%;
}
</style>
