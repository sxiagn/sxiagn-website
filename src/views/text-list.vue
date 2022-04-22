<template>
  <div class="container">
    <TextHeader :title="title" />
    <div class="text-list">
      <div v-for="(item, index) in textList" :key="index" class="text-item" @click="handleToDetails(item)">
        <span class="text-title"
          ><span>{{ index + 1 }}. </span>{{ item['title'] }}</span
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import TextHeader from '../components/text-header.vue';
import { getTextList } from '../api/index';

interface Props {
  title: string;
  textType: string;
}
const props = defineProps<Props>();
const router = useRouter();
const textList = ref([]);

const handleGetTextlist = async () => {
  const res = await getTextList({ textType: props.textType });
  textList.value = res.data || [];
};
onMounted(() => {
  handleGetTextlist();
});
const handleToDetails = (item: { id: any }) => {
  router.push({
    name: 'TextDetails',
    query: {
      id: item.id
    }
  });
};
</script>

<style lang="scss" scoped>
.container {
  .text-list {
    width: 100%;
    color: #333;
    font-size: 14px;
    .text-item {
      width: 100%;
      border-bottom: 1px solid #909399;
      padding: 10px 0;
      cursor: pointer;
      &:hover {
        text-decoration: underline;
        color: #409eff;
      }
    }
  }
}
</style>
