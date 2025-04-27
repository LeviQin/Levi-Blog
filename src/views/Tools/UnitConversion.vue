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
      <div class="unit-conversion-title">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#levi-danweihuansuanx"></use>
        </svg>
        <h1>单位换算</h1>
      </div>
      <div class="select-type-box">
        <div class="select-type-label">
          <span>类型</span>
        </div>
        <el-select
          v-model="typeVal"
          class="m-2"
          placeholder="转换的类型"
          size="large"
          style="width: 240px"
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
      <div class="data-box">
        <div class="data-input-box">
          <div class="data-input-label">
            <span>数据</span>
          </div>
          <el-input-number
            v-model="dataVal"
            class="m-2"
            placeholder="转换的数据"
            size="large"
            style="width: 240px"
            controls-position="right"
            :min="0"
            @input="changeData"
          >
          </el-input-number>
        </div>
        <el-select
          v-model="dataUnit"
          class="m-2"
          placeholder="数据单位"
          style="width: 296px"
          size="large"
          filterable
          @change="changeData"
        >
          <el-option
            v-for="item in dataMap.dataUnits"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            style="width: 240px"
          />
        </el-select>
      </div>
      <div class="result-box">
        <div class="result-input-box">
          <div class="result-input-label">
            <span>结果</span>
          </div>
          <el-input
            v-model="resultVal"
            class="m-2"
            size="large"
            style="width: 240px"
            disabled
          >
          </el-input>
        </div>
        <el-select
          v-model="resultUnit"
          class="m-2"
          placeholder="结果单位"
          style="width: 296px"
          size="large"
          filterable
          @change="changeData"
        >
          <el-option
            v-for="item in dataMap.resultUnits"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            style="width: 240px"
          />
        </el-select>
      </div>
      <div class="btn-box">
        <el-button type="primary" @click="exchangeData">交换</el-button>
        <el-button type="success" @click="copyData">复制</el-button>
        <el-button plain @click="clearData">清空</el-button>
      </div>
      <div class="introduction-box">
        <div class="introduction-title">
          <h4>工具简介</h4>
        </div>
        <div class="introduction-content">
          <p>
            在线单位单位换算器，支持长度，质量，面积，体积，数据等多种单位的互相转换。
          </p>
        </div>
      </div>
      <div class="illustrate-box">
        <div class="illustrate-title">
          <h4>使用说明</h4>
        </div>
        <div class="illustrate-content">
          <p>
            单位换算工具，支持长度、容量、质量、面积、数据、时间、温度、速度、角度、
            功率、电量、电流、电压、频率、力、密度等多种单位的互相转换。
          </p>
          <p>1.数据：输入待转换的数据。</p>
          <p>2.结果：转换到目标单位以后的结果。</p>
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
      close();
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
.tools-container {
  max-width: 670px;
  border-radius: var(--theme-radius);
}

.unit-conversion-container {
  padding: 20px;
}

.unit-conversion-title {
  display: flex;
  align-items: center;
}

.unit-conversion-title .icon {
  width: 1.8em;
  height: 1.8em;
  margin-right: 10px;
}

.unit-conversion-title h1 {
  font-size: 24px;
}

.data-box,
.result-box,
.btn-box {
  margin: 20px 0;
  display: flex;
  align-items: center;
}

.select-type-box,
.data-input-box,
.result-input-box {
  display: flex;
  align-items: center;
}

.data-input-box,
.result-input-box {
  margin-right: 20px;
}

.select-type-label,
.data-input-label,
.result-input-label {
  height: 40px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  background-color: #fbfbfb;
  font-size: 14px;
  min-width: 80px;
  border-right: 1px solid #cccc;
}

.introduction-box,
.illustrate-box {
  padding: 5px 0;
}

.introduction-title h4,
.illustrate-title h4 {
  margin: 10px 0;
}

.introduction-content,
.illustrate-content {
  font-size: 14px;
}

:deep(.el-input__wrapper) {
  border-radius: 0;
  box-shadow: none;
}

:deep(.el-input-number .el-input__inner) {
  text-align: left;
}

:deep(.el-input.is-disabled .el-input__inner) {
  color: var(--color);
  -webkit-text-fill-color: var(--color);
}

@media (max-width: 860px) {
  .unit-conversion-title {
    padding-bottom: 15px;
  }

  .select-type-label,
  .data-input-label,
  .result-input-label {
    padding: 0 10px;
    min-width: 60px;
  }

  .data-box,
  .result-box {
    display: block;
  }

  .data-input-box,
  .result-input-box {
    margin-bottom: 10px;
    margin-right: 0;
  }

  .el-input-number {
    width: 240px !important;
  }
}
</style>
