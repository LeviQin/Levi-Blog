<template>
  <Head>
    <meta
      name="keywords"
      content="长度得换算，重量单位换算，单位换算工具，压力功率换算，面积体积单位换算，温度单位换算，时间单位换算"
    />
    <meta
      name="description"
      content="长度重量单位换算工具，为跨境电商卖家提供在线单位转换器、非常用长度单位、重量转换换算、非常用重量单位等换算功能，可以帮助卖家快速准确地进行单位换算，方便处理跨境电商业务中的尺寸和重量问题。"
    />
    <meta
      property="og:description"
      content="长度重量单位换算工具，为跨境电商卖家提供在线单位转换器、非常用长度单位、重量转换换算、非常用重量单位等换算功能，可以帮助卖家快速准确地进行单位换算，方便处理跨境电商业务中的尺寸和重量问题。"
    />
  </Head>
  <div class="unit-conversion w theme-bg-color all-tool-container">
    <div class="unit-conversion-container" ref="unitConversionContainerRef">
      <!-- 标题区域 -->
      <div class="unit-conversion-header">
        <div class="unit-conversion-title">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#levi-danweihuansuanx"></use>
          </svg>
          <h1>单位换算</h1>
        </div>
        <p class="unit-conversion-subtitle">支持多种单位类型的快速精确换算</p>
      </div>

      <!-- 主要内容区域 -->
      <div class="conversion-card">
        <!-- 类型选择 -->
        <div class="select-type-box">
          <div class="select-type-label">
            <el-icon><Operation /></el-icon>
            <span>类型</span>
          </div>
          <el-select
            v-model="typeVal"
            class="type-select"
            placeholder="选择转换类型"
            size="large"
            @change="selectType"
            filterable
          >
            <el-option
              v-for="item in types"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>

        <!-- 转换区域 -->
        <div class="conversion-area">
          <!-- 输入数据区域 -->
          <div class="conversion-section">
            <div class="conversion-label">
              <el-icon><Edit /></el-icon>
              <span>输入数据</span>
            </div>
            <div class="conversion-inputs">
              <el-input-number
                v-model="dataVal"
                class="data-input"
                placeholder="输入数值"
                size="large"
                controls-position="right"
                :min="0"
                @input="changeData"
              >
              </el-input-number>
              <el-select
                v-model="dataUnit"
                class="unit-select"
                placeholder="选择单位"
                size="large"
                filterable
                @change="changeData"
              >
                <el-option
                  v-for="item in dataMap.dataUnits"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </div>

          <!-- 交换按钮 -->
          <div class="exchange-button-container">
            <el-button 
              class="exchange-button" 
              circle 
              @click="exchangeData"
              type="primary"
            >
              <el-icon><Sort /></el-icon>
            </el-button>
          </div>

          <!-- 结果区域 -->
          <div class="conversion-section">
            <div class="conversion-label">
              <el-icon><DataAnalysis /></el-icon>
              <span>转换结果</span>
            </div>
            <div class="conversion-inputs">
              <el-input
                v-model="resultVal"
                class="result-input"
                size="large"
                disabled
              >
              </el-input>
              <el-select
                v-model="resultUnit"
                class="unit-select"
                placeholder="选择单位"
                size="large"
                filterable
                @change="changeData"
              >
                <el-option
                  v-for="item in dataMap.resultUnits"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </div>
        </div>

        <!-- 操作按钮 -->
        <div class="action-buttons">
          <el-button type="success" @click="copyData" icon="DocumentCopy">复制结果</el-button>
          <el-button @click="clearData" icon="Delete">清空</el-button>
        </div>
      </div>

      <!-- 信息卡片 -->
      <div class="info-cards">
        <!-- 工具简介 -->
        <div class="info-card">
          <div class="info-card-header">
            <el-icon><InfoFilled /></el-icon>
            <h4>工具简介</h4>
          </div>
          <div class="info-card-content">
            <p>
              在线单位换算器，支持长度、质量、面积、体积、数据等多种单位的互相转换。
            </p>
          </div>
        </div>

        <!-- 使用说明 -->
        <div class="info-card">
          <div class="info-card-header">
            <el-icon><Guide /></el-icon>
            <h4>使用说明</h4>
          </div>
          <div class="info-card-content">
            <p>
              单位换算工具，支持长度、容量、质量、面积、数据、时间、温度、速度、角度、
              功率、电量、电流、电压、频率、力、密度等多种单位的互相转换。
            </p>
            <ul>
              <li>选择需要转换的单位类型</li>
              <li>输入待转换的数据和单位</li>
              <li>选择目标单位，查看转换结果</li>
              <li>可使用交换按钮快速切换输入和输出单位</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { convertUnits, unitInTtype } from "@/utils/unitsTools.js";
import { debounce } from "@/utils/utils.js";
import { Head } from "@vueuse/head";
import { ElNotification } from "element-plus";
import { Operation, Edit, DataAnalysis, Sort, InfoFilled, Guide, DocumentCopy, Delete } from "@element-plus/icons-vue";

onMounted(() => {
  selectType(typeVal.value);
});

const dataMap = reactive({
  dataUnits: [],
  resultUnits: [],
});

let typeVal = ref("长度");
let dataVal = ref(0);
let dataUnit = ref("");
let resultVal = ref(0);
let resultUnit = ref("");

const types = [
  {
    label: "长度",
    value: "长度",
  },
  {
    label: "质量",
    value: "质量",
  },
  {
    label: "面积",
    value: "面积",
  },
  {
    label: "时间",
    value: "时间",
  },
  {
    label: "温度",
    value: "温度",
  },
  {
    label: "体积",
    value: "体积",
  },
  {
    label: "数据",
    value: "数据",
  },
  {
    label: "速度",
    value: "速度",
  },
  {
    label: "压力",
    value: "压力",
  },
  {
    label: "角度",
    value: "角度",
  },
  {
    label: "功率",
    value: "功率",
  },
  {
    label: "电量",
    value: "电量",
  },
  {
    label: "电流",
    value: "电流",
  },
  {
    label: "力",
    value: "力",
  },
  {
    label: "电压",
    value: "电压",
  },
  {
    label: "密度",
    value: "密度",
  },
  {
    label: "频率",
    value: "频率",
  },
];

const selectType = (type) => {
  dataMap.dataUnits = unitInTtype(type);
  dataMap.resultUnits = unitInTtype(type);
  dataUnit.value = dataMap.dataUnits[0].value;
  resultUnit.value = dataMap.resultUnits[1].value;
  clearData();
};

const changeData = debounce(() => {
  resultVal.value = convertUnits(
    typeVal.value,
    dataUnit.value,
    resultUnit.value,
    dataVal.value
  );
}, 300);

const exchangeData = () => {
  [dataUnit.value, resultUnit.value] = [resultUnit.value, dataUnit.value];
  changeData();
};

const copyData = () => {
  if (!resultVal.value) {
    ElNotification({
      title: "警告",
      message: "复制失败！无效的结果。",
      type: "warning",
      zIndex: 99999,
    });
    return;
  }
  navigator.clipboard
    .writeText(resultVal.value)
    .then(() => {
      ElNotification({
        title: "成功",
        message: "结果已复制到剪切板。",
        type: "success",
        zIndex: 99999,
      });
    })
    .catch(() => {
      ElNotification({
        title: "失败",
        message: "复制出错，请重试",
        type: "error",
        zIndex: 99999,
      });
    });
};

const clearData = () => {
  dataVal.value = 0;
  resultVal.value = 0;
};
</script>

<style lang="scss" scoped>
.all-tool-container {
  border-radius: var(--theme-radius);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.unit-conversion-container {
  padding: 24px;
  max-width: 1000px;
  margin: 0 auto;
}

/* 标题区域样式 */
.unit-conversion-header {
  margin-bottom: 24px;
  text-align: center;
}

.unit-conversion-title {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
}

.unit-conversion-title .icon {
  width: 2em;
  height: 2em;
  margin-right: 12px;
  color: var(--el-color-primary);
}

.unit-conversion-title h1 {
  font-size: 28px;
  font-weight: 600;
  margin: 0;
}

.unit-conversion-subtitle {
  color: var(--el-text-color-secondary);
  font-size: 16px;
  margin: 0;
}

/* 转换卡片样式 */
.conversion-card {
  background-color: var(--el-bg-color);
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
  margin-bottom: 24px;
}

/* 类型选择样式 */
.select-type-box {
  margin-bottom: 24px;
  display: flex;
  align-items: center;
}

.select-type-label {
  display: flex;
  align-items: center;
  margin-right: 16px;
  font-weight: 500;
}

.select-type-label .el-icon {
  margin-right: 8px;
  color: var(--el-color-primary);
}

.type-select {
  width: 240px;
}

/* 转换区域样式 */
.conversion-area {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
}

.conversion-section {
  background-color: var(--el-fill-color-light);
  border-radius: 8px;
  padding: 16px;
}

.conversion-label {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  font-weight: 500;
}

.conversion-label .el-icon {
  margin-right: 8px;
  color: var(--el-color-primary);
}

.conversion-inputs {
  display: flex;
  gap: 16px;
}

.data-input, .result-input {
  flex: 1;
}

.unit-select {
  width: 180px;
}

/* 交换按钮样式 */
.exchange-button-container {
  display: flex;
  justify-content: center;
  margin: 8px 0;
}

.exchange-button {
  font-size: 20px;
  transition: transform 0.3s ease;
}

.exchange-button:hover {
  transform: rotate(180deg);
}

/* 操作按钮样式 */
.action-buttons {
  display: flex;
  justify-content: center;
  gap: 16px;
}

/* 信息卡片样式 */
.info-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.info-card {
  background-color: var(--el-bg-color);
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
}

.info-card-header {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  border-bottom: 1px solid var(--el-border-color-light);
  padding-bottom: 12px;
}

.info-card-header .el-icon {
  margin-right: 8px;
  color: var(--el-color-primary);
  font-size: 18px;
}

.info-card-header h4 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
}

.info-card-content {
  color: var(--el-text-color-regular);
  font-size: 14px;
  line-height: 1.6;
}

.info-card-content ul {
  padding-left: 20px;
  margin: 12px 0;
}

.info-card-content li {
  margin-bottom: 8px;
}

/* 响应式设计 */
@media (max-width: 860px) {
  .unit-conversion-container {
    padding: 16px;
  }
  
  .conversion-inputs {
    flex-direction: column;
  }
  
  .info-cards {
    grid-template-columns: 1fr;
  }
  
  .unit-select {
    width: 100%;
  }
  
  .action-buttons {
    flex-direction: column;
    gap: 12px;
  }
}
</style>
