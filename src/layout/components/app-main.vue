<template>
  <el-main id="app-main" class="app-main" @scroll="handleScrollEvent">
    <router-view v-slot="{ Component }">
      <transition name="router-fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
    <ToTop v-show="appMainData.showUp" class="to-commont" @scroll-to="handleScrollTo" />
    <GoBack v-show="$route.name !== 'Index'" class="go-back to-commont" />
    <ToHome v-show="$route.name !== 'Index'" class="to-home to-commont" />
  </el-main>
</template>

<script lang="ts" setup>
import { reactive, onUnmounted } from 'vue';
import ToTop from '@/components/to-top.vue';
import ToHome from '@/components/to-home.vue';
import GoBack from '@/components/go-back.vue';

interface AppMainData {
  timer: NodeJS.Timer | null;
  scrollTop: number;
  scrollEle: null;
  showUp: boolean;
}
const appMainData: AppMainData = reactive({
  timer: null,
  scrollTop: 0,
  scrollEle: null,
  showUp: false
});
const handleAnimate = (ele: { scrollTop: number } | null, scroll = 0, step = 100) => {
  appMainData.timer = setInterval(() => {
    if (scroll < 10) clearInterval(Number(appMainData.timer));
    scroll -= step;
    if (ele?.scrollTop) ele.scrollTop = scroll > 10 ? scroll : 0;
  }, 20);
};
const handleScrollTo = () => {
  handleAnimate(appMainData.scrollEle, appMainData.scrollTop);
};
const handleScrollEvent = (event: { target: { scrollTop: number } | null }) => {
  if (event.target) {
    appMainData.scrollEle = event.target as unknown as null;
    appMainData.scrollTop = event.target.scrollTop;
    appMainData.showUp = event.target.scrollTop > 300;
  }
};
onUnmounted(() => {
  clearInterval(Number(appMainData.timer));
});
</script>

<style lang="scss" scoped>
.app-main {
  position: relative;
  padding: 0 20px 30px 20px;
  .to-commont {
    position: fixed;
    right: 25px;
    bottom: 130px;
  }
  .go-back {
    bottom: 90px;
  }
  .to-home {
    bottom: 50px;
  }
}

.router-fade-enter-active,
.router-fade-leave-active {
  transition: all 0.3s linear;
}
.router-fade-enter,
.router-fade-leave-to {
  opacity: 0;
}
</style>
