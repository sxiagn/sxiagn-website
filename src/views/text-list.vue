<template>
  <div class="container">
    <TextHeader :title="title" />
    <div class="text-list">
      <div v-for="(item, index) in textList" :key="index" class="text-item" @click="handleToDetails(item)">
        <div class="text-title">{{ item['title'] }}</div>
        <div class="create-time">{{ item['createTime'] }}</div>
      </div>
    </div>
    <div v-if="!textList.length" class="no-data">暂无数据</div>
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
    padding: 0 2px;
    .text-item {
      width: 100%;
      border-bottom: 1px solid #dedede;
      padding: 10px 0;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      .text-title {
        flex: 1;
        padding: 0 2px;
        white-space: nowrap; //不换行
        overflow: hidden; //超出隐藏
        text-overflow: ellipsis; //变成...
        &:hover {
          text-decoration: underline;
          color: #409eff;
        }
      }
      .create-time {
        color: #409eff;
        font-size: 12px;
        width: 106px;
      }
    }
  }
  .no-data {
    padding: 30px 0;
    background-color: #ebebeb;
    text-align: center;
    font-size: 12px;
  }
}
</style>
