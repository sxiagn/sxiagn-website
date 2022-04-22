<template>
  <div class="to-home" @click="$router.push({ name: 'Index' })">
    <el-icon size="20" color="#fff"><home-filled /></el-icon>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.to-home {
  background-color: #67c23a;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  color: #fff;
  text-align: center;
  line-height: 30px;
  font-size: 14px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
  cursor: pointer;

  &:hover {
    background-color: #85ce61;
  }
}
</style>
