<template>
  <div class="api-header">
    <div class="user-info">
      <div class="use-info">
        <div class="use-name">年年有余</div>
        <div>擦亮心情，健康阳光的生活</div>
      </div>
      <img src="../../assets/img/user-head.png" alt="头像" @click="$router.push({ name: 'Index' })" />
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.api-header {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 160px;
  // background-color: #409eff;
  display: none;
  background: url('../../assets/img/user-head.png') no-repeat;
  background-size: cover;
  .user-info {
    position: absolute;
    bottom: -40px;
    right: 20px;
    display: flex;
    > img {
      width: 120px;
      border: 2px solid #ffff;
      border-radius: 5px;
      cursor: pointer;
      display: block;
      box-shadow: 2px 0px 8px rgba($color: #000000, $alpha: 0.2);
    }
    .use-info {
      margin-right: 20px;
      margin-top: 10px;
      color: #fff;
      text-align: right;
      .use-name {
        font-size: 24px;
        margin-bottom: 6px;
      }
    }
  }
}
</style>
