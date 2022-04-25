<template>
  <div class="right-button to-top" @click="handleScrollTo">UP</div>
</template>

<script lang="ts" setup>
const emits = defineEmits(['scroll-to']);
const handleScrollTo = () => {
  emits('scroll-to');
};
</script>

<style lang="scss" scoped>
.to-top {
  bottom: 130px;
}
</style>
