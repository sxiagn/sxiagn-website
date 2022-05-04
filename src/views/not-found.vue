<template>
  <div class="container">
    <div class="not-found">
      <div class="line"></div>
      <div class="not-fonud-desc">
        <div class="title">404</div>
        <div class="sorry">Sorry, you have met the space traffic accident</div>
        <div class="btn">
          <el-button type="primary" plain size="small" @click="router.push('/index')">返回首页</el-button>
          <el-button type="primary" plain size="small" @click="$router.back()">返回上一页</el-button>
        </div>
      </div>
      <div class="line"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<style lang="scss" scoped>
.container {
  padding-top: 30px;
  height: 100%;
  width: 100%;
  .not-found {
    background-color: #f1f1f1;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .line {
      margin: 0 20px;
      height: 24px;
      width: 200px;
      background-color: #ff5f5f;
    }
    .not-fonud-desc {
      text-align: center;
      .title {
        font-size: 100px;
        color: #409eff;
        font-weight: 600;
        text-shadow: 2px 2px 8px rgba($color: #000000, $alpha: 0.1);
      }
      .sorry {
        color: #333333;
        font-weight: 300;
        text-shadow: 2px 2px 8px rgba($color: #000000, $alpha: 0.1);
      }
      .btn {
        margin-top: 16px;
      }
    }
  }
}
</style>
