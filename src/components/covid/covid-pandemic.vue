<template>
  <div class="container-covid">
    <el-row :gutter="20" class="covid-box">
      <el-col :span="12" :sm="24" :xs="24" :md="12" class="covid-list">
        <div class="covid-item">
          <el-tabs v-model="activeName" class="demo-tabs" stretch>
            <el-tab-pane label="全国疫情数据(含港澳台)" name="first">
              <el-row :gutter="20">
                <CovidItem
                  v-for="(value, key) in totalData"
                  :key="key"
                  :span="value.span"
                  :title="value.title"
                  :amount="value.amount"
                  :add-amount="value.addAmount"
                  :is-border="value.isBorder"
                  :color="value.color"
                />
              </el-row>
            </el-tab-pane>
            <el-tab-pane :label="`${labelText}疫情数据`" name="second">
              <el-row :gutter="20">
                <CovidItem
                  v-for="(value, key) in provinceTotalData"
                  :key="key"
                  :span="value.span"
                  :title="value.title"
                  :amount="value.amount"
                  :add-amount="value.addAmount"
                  :is-border="value.isBorder"
                  :color="value.color"
                />
              </el-row>
              <el-select v-model="provinceId" placeholder="请选择省份" class="city-list" filterable>
                <el-option v-for="item in provinceList" :key="item.id" :label="item.label" :value="item.value" />
              </el-select>
            </el-tab-pane>
          </el-tabs>
          <div class="footer">
            <div class="left">截至{{ lastTime }}</div>
            <div class="right">
              <el-icon :size="14" class="icon" @click="handleShowRource"><QuestionFilled /></el-icon>
              <span class="info">数据说明</span>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="12" :sm="24" :xs="24" :md="12" class="covid-list">
        <div class="covid-item">
          <div class="provinces-top">
            <el-table :data="tableData" stripe :header-cell-style="headerCellStyle" :cell-style="cellStyle">
              <el-table-column prop="name" label="地区" align="center" />
              <el-table-column prop="nowConfirm" label="现有确诊" align="center" class-name="covid-now-confirm" />
              <el-table-column prop="confirm" label="确诊" align="center" />
              <el-table-column prop="dead" label="死亡" align="center" />
              <el-table-column prop="heal" label="治愈" align="center" class-name="covid-heal" />
            </el-table>
          </div>
          <div class="provinces-bottom">
            <div class="img-box" @click="handleToThirdPage('1')">
              <img src="../../assets/img/toolbox_isolate.png" />
              <div class="img-text">隔离政策</div>
            </div>
            <div class="img-box" @click="handleToThirdPage('2')">
              <img src="../../assets/img/toolbox_input.png" />
              <div class="img-text">出行政策</div>
            </div>
            <div class="img-box" @click="handleToThirdPage('3')">
              <img src="../../assets/img/toolbox_truth.png" />
              <div class="img-text">核酸检测</div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <CovidRource v-model="showRource" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, reactive, watch } from 'vue';
import { covidPandemicApi } from '../../api/index';
import CovidItem from './covid-item.vue';
import CovidRource from './covid-rource.vue';
import { handleToThirdPage } from './third-page';

const showRource = ref(false);
const handleShowRource = () => {
  showRource.value = true;
};

const headerCellStyle = {
  background: '#f1f1f1',
  'font-weight': 500,
  color: '#303133'
};
const cellStyle = {
  'font-size': '12px'
};
const tableData: any = reactive([]);
const activeName = ref('first');
// 省份疫情数据
const provinceTotalData = reactive({
  totalDiagnose: {
    span: 8,
    title: '累计确诊',
    amount: 0,
    addAmount: 0,
    isBorder: true,
    color: '#a31d13'
  },
  totalDead: {
    span: 8,
    title: '累计死亡',
    amount: 0,
    addAmount: 0,
    isBorder: true,
    color: '#333333'
  },
  recover: {
    span: 8,
    title: '累计治愈',
    amount: 0,
    addAmount: 0,
    isBorder: false,
    color: '#34aa70'
  }
});
// 全国疫情数据
const totalData = reactive({
  outsite: {
    span: 8,
    title: '境外输入',
    amount: 0,
    addAmount: 0,
    isBorder: true,
    color: '#ffa352'
  },
  noCase: {
    span: 8,
    title: '无症状感染者',
    amount: 0,
    addAmount: 0,
    isBorder: true,
    color: '#791618'
  },
  nowDiagnose: {
    span: 8,
    title: '现有确诊',
    amount: 0,
    addAmount: 0,
    isBorder: false,
    color: '#e44a3d'
  },
  totalDiagnose: {
    span: 8,
    title: '累计确诊',
    amount: 0,
    addAmount: 0,
    isBorder: true,
    color: '#a31d13'
  },
  totalDead: {
    span: 8,
    title: '累计死亡',
    amount: 0,
    addAmount: 0,
    isBorder: true,
    color: '#333333'
  },
  recover: {
    span: 8,
    title: '累计治愈',
    amount: 0,
    addAmount: 0,
    isBorder: false,
    color: '#34aa70'
  }
});
const lastTime = ref('');
const provinceList: any = reactive([]);
const handleProvince = item => {
  Object.assign(provinceTotalData.totalDiagnose, {
    amount: item.total.confirm,
    addAmount: item.today.confirm
  });
  Object.assign(provinceTotalData.totalDead, {
    amount: item.total.dead,
    addAmount: item.today.dead
  });
  Object.assign(provinceTotalData.recover, {
    amount: item.total.heal,
    addAmount: item.today.heal
  });
  tableData.splice(0, 1, {
    name: item.name || item.label,
    confirm: item.total.confirm,
    dead: item.total.dead,
    heal: item.total.heal,
    nowConfirm: item.total.confirm - item.total.dead - item.total.heal
  });
};
const handleGetCovidData = async () => {
  const {
    data: { chinaTotal, chinaDayList, areaTree, lastUpdateTime }
  } = await covidPandemicApi();
  lastTime.value = lastUpdateTime;
  Object.assign(totalData.outsite, {
    amount: chinaTotal.total.input,
    addAmount: chinaTotal.today.input
  });
  Object.assign(totalData.noCase, {
    amount: chinaTotal.extData.noSymptom,
    addAmount: chinaTotal.extData.incrNoSymptom
  });

  Object.assign(totalData.nowDiagnose, {
    amount: chinaDayList[chinaDayList.length - 1].total.storeConfirm,
    addAmount: chinaTotal.today.storeConfirm
  });
  Object.assign(totalData.totalDiagnose, {
    amount: chinaTotal.total.confirm,
    addAmount: chinaTotal.today.confirm
  });
  Object.assign(totalData.totalDead, {
    amount: chinaTotal.total.dead,
    addAmount: chinaTotal.today.dead
  });
  Object.assign(totalData.recover, {
    amount: chinaTotal.total.heal,
    addAmount: chinaTotal.today.heal
  });
  const chinaData = areaTree.filter(item => item.name === '中国')[0] || [];

  // 广东：440000
  chinaData.children.forEach(item => {
    if (item.id === '440000') {
      handleProvince(item);
    }
    provinceList.push({
      value: item.id,
      label: item.name,
      today: item.today,
      total: item.total
    });
  });
};
// 默认为广东
const labelText = ref('广东');
const provinceId = ref('440000');
watch(provinceId, n => {
  if (n) {
    const checkProvince = provinceList.find(item => item.value === n);
    handleProvince(checkProvince);
    labelText.value = checkProvince.label;
  }
});
onMounted(async () => {
  handleGetCovidData();
});
</script>

<style lang="scss">
.covid-now-confirm {
  color: #e44a3d !important;
}
.covid-heal {
  color: #34aa70 !important;
}
</style>
<style lang="scss" scoped>
.container-covid {
  width: 100%;
  .covid-box {
    .covid-list {
      padding-bottom: 40px;
      .covid-item {
        padding: 10px;
        border-radius: 10px;
        background-color: #fff;
        height: 280px;
        border: 1px solid #409eff;
        position: relative;
        .footer {
          width: 100%;
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          color: #333333;
          position: absolute;
          left: 0;
          bottom: 18px;
          padding: 0 20px;
          .right {
            .icon {
              display: inline-block;
              top: 3px;
              margin-right: 4px;
              cursor: pointer;
            }
          }
        }
        .city-list {
          width: 100%;
          margin-bottom: 20px;
        }
        .provinces-top {
          margin-bottom: 50px;
        }
        .provinces-bottom {
          display: flex;
          justify-content: space-around;
          .img-box {
            width: 30%;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
            cursor: pointer;
            &:hover {
              color: #409eff;
            }
            img {
              height: 60px;
              display: block;
              margin-bottom: 10px;
            }
            .img-text {
              flex: 100%;
              text-align: center;
              font-size: 12px;
            }
          }
        }
      }
    }
  }
}
</style>
