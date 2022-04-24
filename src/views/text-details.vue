<template>
  <div class="container">
    <TextHeader :title="textDetailData.title" />
    <div v-highlight class="text-content">
      <div class="v-html" v-html="textDetailData.contentDesc" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive } from 'vue';
import { getTextDetails } from '../api/index';
import TextHeader from '../components/text-header.vue';

const textDetailData = reactive({
  title: '',
  contentDesc: '',
  createTime: ''
});
interface Props {
  id: string;
}
const props = defineProps<Props>();

const handleGetTextDetails = async () => {
  const { data: res } = await getTextDetails({ id: props.id });
  if (res.length) return;
  textDetailData.title = res.title;
  textDetailData.contentDesc = res.contentDesc;
  textDetailData.createTime = res.createTime;
};
onMounted(() => {
  handleGetTextDetails();
});
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  .text-content {
    width: 100%;
    padding: 0 2px;
  }
}
>>> .v-html {
  font-size: 12px;
  margin: 20px;
  p {
    font-size: 12px;
    padding-bottom: 6px;
  }
  img {
    width: 100%;
  }
}
</style>
