<template>
  <div class="box" />
</template>
<script lang="ts" setup></script>
<style lang="scss" scoped>
.box {
  height: 100px;
  width: 100px;
  border: 15px solid skyblue;
  animation: changebox 5s linear infinite;
  border-radius: 10px;
  margin: 100px auto;
}

@keyframes changebox {
  25% {
    width: 150px;
  }

  50% {
    width: 200px;
  }

  75% {
    width: 150px;
  }

  100% {
    width: 100px;
  }
}
</style>
