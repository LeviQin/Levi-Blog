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
  <div class="unit-conversion theme-bg-color all-tool-container w">
    <div class="unit-conversion-container" ref="unitConversionContainerRef">
      <div class="unit-conversion-header">
        <div class="unit-conversion-title">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#levi-danweihuansuanx"></use>
          </svg>
          <h1>单位换算</h1>
        </div>
      </div>
      <div class="main-content">
        <div class="conversion-panel">
          <div class="select-type-box">
            <div class="select-type-label">
              <el-icon><Operation /></el-icon>
              <span>选择类型</span>
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
          <div class="exchange-button-container">
            <div class="exchange-line"></div>
            <el-button
              class="exchange-button"
              circle
              @click="exchangeData"
              type="primary"
            >
              <el-icon><Sort /></el-icon>
            </el-button>
            <div class="exchange-line"></div>
          </div>
          <div class="conversion-section">
            <div class="conversion-label">
              <el-icon><DataAnalysis /></el-icon>
              <span>转换结果</span>
            </div>
            <div class="conversion-inputs">
              <el-input v-model="resultVal" class="result-input" size="large" disabled>
                <template #append>
                  <el-button @click="copyData">
                    <el-icon><DocumentCopy /></el-icon>
                  </el-button>
                </template>
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
          <div class="action-buttons">
            <el-button type="primary" @click="changeData">转换</el-button>
            <el-button @click="clearData">清空</el-button>
          </div>
        </div>
        <div class="info-panel">
          <div class="unit-type-info">
            <div class="info-header">
              <el-icon><InfoFilled /></el-icon>
              <h4>{{ typeVal }}单位</h4>
            </div>
            <div class="unit-list">
              <div
                v-for="(item, index) in dataMap.dataUnits"
                :key="index"
                class="unit-item"
              >
                <span class="unit-name">{{ item.label }}</span>
                <span class="unit-value">{{ item.value }}</span>
              </div>
            </div>
          </div>
          <div class="usage-guide">
            <div class="info-header">
              <el-icon><Guide /></el-icon>
              <h4>使用说明</h4>
            </div>
            <div class="guide-steps">
              <div class="step">
                <div class="step-number">1</div>
                <div class="step-text">选择需要转换的单位类型</div>
              </div>
              <div class="step">
                <div class="step-number">2</div>
                <div class="step-text">输入待转换的数据和单位</div>
              </div>
              <div class="step">
                <div class="step-number">3</div>
                <div class="step-text">选择目标单位，查看转换结果</div>
              </div>
              <div class="step">
                <div class="step-number">4</div>
                <div class="step-text">点击复制按钮可复制结果</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="tool-description">
        <p>
          单位换算工具，支持长度、容量、质量、面积、数据、时间、温度、速度、角度、
          功率、电量、电流、电压、频率、力、密度等多种单位的互相转换。
        </p>
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
import {
  Operation,
  Edit,
  DataAnalysis,
  Sort,
  InfoFilled,
  Guide,
  DocumentCopy,
} from "@element-plus/icons-vue";

onMounted(() => {
  selectType(typeVal.value);
});

const dataMap = reactive({
  dataUnits: [],
  resultUnits: [],
});

const typeVal = ref("长度");
const dataVal = ref(0);
const dataUnit = ref("");
const resultVal = ref(0);
const resultUnit = ref("");

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
  padding: 0;
}

.unit-conversion-container {
  padding: 16px;
  max-width: 100%;
  margin: 0 auto;
}

.unit-conversion-header {
  margin-bottom: 16px;
  padding-bottom: 12px;
}

.unit-conversion-title {
  display: flex;
  align-items: center;
}

.unit-conversion-title .icon {
  width: 1.8em;
  height: 1.8em;
  margin-right: 10px;
  color: var(--el-color-primary);
}

.unit-conversion-title h1 {
  font-size: 22px;
  font-weight: 600;
  margin: 0;
}

.main-content {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
}

.conversion-panel {
  flex: 1;
  background-color: var(--el-bg-color);
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
}

.select-type-box {
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.select-type-label {
  display: flex;
  align-items: center;
  margin-right: 12px;
  font-weight: 500;
}

.select-type-label .el-icon {
  margin-right: 6px;
  color: var(--el-color-primary);
}

.type-select {
  width: 100%;
}

.conversion-section {
  background-color: var(--el-fill-color-light);
  border-radius: 6px;
  padding: 12px;
  margin-bottom: 16px;
}

.conversion-label {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  font-weight: 500;
}

.conversion-label .el-icon {
  margin-right: 6px;
  color: var(--el-color-primary);
}

.conversion-inputs {
  display: flex;
  gap: 12px;
}

.data-input,
.result-input {
  flex: 1;
}

.unit-select {
  width: 40%;
}

.exchange-button-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 12px 0;
  .el-icon {
    color: #fff !important;
  }
}

.exchange-line {
  height: 1px;
  background-color: var(--el-border-color);
  flex: 1;
}

.exchange-button {
  margin: 0 12px;
  font-size: 16px;
  transition: transform 0.3s ease;
}

.exchange-button:hover {
  transform: rotate(180deg);
}

/* 操作按钮样式 */
.action-buttons {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 16px;
}

/* 右侧信息面板 */
.info-panel {
  width: 280px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.unit-type-info,
.usage-guide {
  background-color: var(--el-bg-color);
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
}

.info-header {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  border-bottom: 1px solid var(--el-border-color-light);
  padding-bottom: 8px;
}

.info-header .el-icon {
  margin-right: 6px;
  color: var(--el-color-primary);
  font-size: 16px;
}

.info-header h4 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
}

/* 单位列表 */
.unit-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  max-height: 200px;
  overflow-y: auto;
}

.unit-item {
  display: flex;
  justify-content: space-between;
  padding: 4px 8px;
  border-radius: 4px;
  background-color: var(--el-fill-color-lighter);
  font-size: 12px;
}

.unit-name {
  color: var(--el-text-color-primary);
}

.unit-value {
  color: var(--el-text-color-secondary);
}

/* 使用步骤 */
.guide-steps {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.step {
  display: flex;
  align-items: center;
  gap: 10px;
}

.step-number {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: var(--el-color-primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
}

.step-text {
  font-size: 14px;
  color: var(--el-text-color-regular);
}

/* 底部描述 */
.tool-description {
  margin-top: 16px;
  padding: 12px;
  background-color: var(--el-bg-color);
  border-radius: 8px;
  font-size: 14px;
  color: var(--el-text-color-secondary);
  line-height: 1.5;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
}

/* 响应式设计 */
@media (max-width: 960px) {
  .main-content {
    flex-direction: column;
  }

  .info-panel {
    width: 100%;
  }

  .unit-list {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 640px) {
  .conversion-inputs {
    flex-direction: column;
  }

  .unit-select {
    width: 100%;
  }

  .unit-list {
    grid-template-columns: repeat(2, 1fr);
  }

  .action-buttons {
    flex-direction: column;
  }

  .action-buttons .el-button {
    width: 100%;
  }
}
</style>
