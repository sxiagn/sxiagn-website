<template>
  <el-aside class="app-aside hide-aside" :style="{ width: appAsideData.asideWidth }">
    <div v-show="appAsideData.isClose" class="user-info">
      <img src="../../assets/img/user-head.png" alt="头像" @click="$router.push({ name: 'Index' })" />
      <p class="user-name">年年有余</p>
      <p class="user-aphorism">人生的好多疲惫，是自己追着自己跑了太久，我们改变不了生活，但可以擦亮心情</p>
    </div>
    <el-calendar v-show="appAsideData.isClose" />
    <div class="close" :class="appAsideData.isClose ? 'text-right' : 'text-center'">
      <el-icon size="20" class="close-icon" @click="handleClose"><expand /></el-icon>
    </div>
  </el-aside>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';

interface AppAsideData {
  timer: NodeJS.Timer | null;
  asideWidth: string;
  textAlign: string;
  isClose: boolean;
}
const appAsideData: AppAsideData = reactive({
  timer: null,
  asideWidth: '280px',
  textAlign: 'right',
  isClose: true
});
const handleClose = () => {
  appAsideData.isClose = !appAsideData.isClose;
  const step = 10;
  appAsideData.timer = setInterval(() => {
    if (appAsideData.isClose) {
      if (280 - parseInt(appAsideData.asideWidth, 10) < step) {
        appAsideData.asideWidth = '280px';
        clearInterval(Number(appAsideData.timer));
        return;
      }
      appAsideData.asideWidth = `${parseInt(appAsideData.asideWidth, 10) + step}px`;
    } else {
      if (parseInt(appAsideData.asideWidth, 10) - 50 < step) {
        appAsideData.asideWidth = '50px';
        clearInterval(Number(appAsideData.timer));
        return;
      }
      appAsideData.asideWidth = `${parseInt(appAsideData.asideWidth, 10) - step}px`;
    }
  }, 15);
  appAsideData.textAlign = appAsideData.isClose ? 'right' : 'center';
};
</script>

<style lang="scss" scoped>
.app-aside {
  overflow: hidden;
  background-color: #f1f1f1;
  height: 100%;
  padding: 30px 20px 20px;
  box-shadow: 2px 0px 8px rgba($color: #000000, $alpha: 0.2);
  position: relative;
  .user-info {
    text-align: center;
    padding-bottom: 15px;
    img {
      width: 125px;
      border: 2px solid #ffff;
      border-radius: 5px;
      cursor: pointer;
    }
    .user-name {
      line-height: 35px;
    }
    .user-aphorism {
      line-height: 24px;
      font-size: 12px;
      color: #333333;
    }
  }
}
:deep(.el-calendar) {
  font-size: 12px;
  .el-calendar__body {
    padding: 0 10px 10px;
  }
  .el-calendar__header {
    padding: 10px;
  }
  .el-calendar-table thead th {
    padding: 10px;
  }
  .el-button-group {
    button {
      padding: 5px;
    }
  }
  .el-calendar-table__row {
    height: 28px;
    td {
      height: 100%;
      .el-calendar-day {
        height: 100%;
      }
    }
  }
}
.close {
  width: 100%;
  height: 30px;
  padding: 3px;
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: #f1f1f1;
  line-height: 30px;
  .close-icon {
    cursor: pointer;
  }
}
.text-right {
  text-align: right;
}
.text-center {
  text-align: center;
}
</style>
