<template>
  <VueCountTo
    :start-val="props.startVal"
    :end-val="props.endVal"
    :duration="props.duration"
    :autoplay="props.autoplay"
  />
</template>

<script lang="ts" setup>
import { CountTo as VueCountTo } from 'vue3-count-to';

interface Props {
  startVal?: number;
  endVal?: number;
  duration?: number;
  autoplay?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  startVal: 0,
  endVal: 0,
  duration: 1000,
  autoplay: true
});
</script>

<style lang="scss" scoped></style>
