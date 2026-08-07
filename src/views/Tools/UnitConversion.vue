<template>
  <div>
    <Head>
      <meta
        name="keywords"
        content="长度得换算，重量单位换算，单位换算工具，压力功率换算，面积体积单位换算，温度单位换算，时间单位换算"
      />
      <meta
        name="description"
        content="长度重量单位换算工具，支持长度、质量、面积、时间、温度、体积、数据、速度、压力、角度、功率、电量、电流、电压、频率、力、密度等多种单位的互相转换。"
      />
      <meta
        property="og:description"
        content="长度重量单位换算工具，支持长度、质量、面积、时间、温度、体积、数据、速度、压力、角度、功率、电量、电流、电压、频率、力、密度等多种单位的互相转换。"
      />
    </Head>
    <div class="unit-conversion w">
      <div class="unit-conversion-container" ref="unitConversionContainerRef">
        <!-- 头部 -->
        <header class="uc-header">
          <div class="uc-header-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--theme-btn-hover-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
          </div>
          <div class="uc-header-text">
            <h1>单位换算</h1>
            <p>支持 17 种单位类型的互相转换，输入即出结果</p>
          </div>
        </header>

        <div class="uc-layout">
          <!-- 主操作区 -->
          <main class="uc-main">
            <!-- 类型选择卡片 -->
            <div class="uc-type-grid">
              <button
                v-for="t in types"
                :key="t.value"
                class="uc-type-chip"
                :class="{ active: typeVal === t.value }"
                @click="selectType(t.value)"
              >
                {{ t.label }}
              </button>
            </div>

            <!-- 输入区 -->
            <section class="uc-section">
              <div class="uc-section-label">
                <span class="uc-dot"></span>
                <span>输入数据</span>
              </div>
              <div class="uc-input-row">
                <el-input-number
                  v-model="dataVal"
                  class="uc-number-input"
                  placeholder="输入数值"
                  size="large"
                  controls-position="right"
                  :min="0"
                  @input="changeData"
                />
                <el-select
                  v-model="dataUnit"
                  class="uc-unit-select"
                  placeholder="选择单位"
                  size="large"
                  filterable
                  @change="changeData"
                >
                  <el-option v-for="item in dataMap.dataUnits" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </div>
            </section>

            <!-- 交换 -->
            <div class="uc-exchange">
              <div class="uc-exchange-line"></div>
              <button class="uc-exchange-btn" type="button" @click="exchangeData" title="交换单位">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="7 16 12 21 17 16"/><polyline points="7 8 12 3 17 8"/></svg>
              </button>
              <div class="uc-exchange-line"></div>
            </div>

            <!-- 结果区 -->
            <section class="uc-section">
              <div class="uc-section-label">
                <span class="uc-dot"></span>
                <span>转换结果</span>
              </div>
              <div class="uc-input-row">
                <div class="uc-result-wrap">
                  <el-input v-model="resultVal" class="uc-result-input" size="large" readonly />
                  <button class="uc-copy-btn" :class="{ copied: copyDone }" type="button" @click="copyData" title="复制结果">
                    <svg v-if="!copyDone" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
                    <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    <span>{{ copyDone ? '已复制' : '复制' }}</span>
                  </button>
                </div>
                <el-select
                  v-model="resultUnit"
                  class="uc-unit-select"
                  placeholder="选择单位"
                  size="large"
                  filterable
                  @change="changeData"
                >
                  <el-option v-for="item in dataMap.resultUnits" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </div>
            </section>

            <!-- 操作按钮 -->
            <div class="uc-actions">
              <button class="uc-btn primary" type="button" @click="changeData">转换</button>
              <button class="uc-btn ghost" type="button" @click="clearData">清空</button>
            </div>
          </main>

          <!-- 信息面板 -->
          <aside class="uc-aside">
            <div class="uc-info-card">
              <div class="uc-info-head">
                <span class="uc-info-title">{{ typeVal }}单位</span>
                <span class="uc-info-count">{{ dataMap.dataUnits.length }}</span>
              </div>
              <div class="uc-unit-list">
                <div v-for="(item, index) in dataMap.dataUnits" :key="index" class="uc-unit-item">
                  <span class="uc-unit-name">{{ item.label }}</span>
                  <span class="uc-unit-value">{{ item.value }}</span>
                </div>
              </div>
            </div>

            <div class="uc-info-card">
              <div class="uc-info-head">
                <span class="uc-info-title">使用说明</span>
              </div>
              <div class="uc-steps">
                <div class="uc-step">
                  <span class="uc-step-num">1</span>
                  <span class="uc-step-text">选择单位类型</span>
                </div>
                <div class="uc-step">
                  <span class="uc-step-num">2</span>
                  <span class="uc-step-text">输入数值并选单位</span>
                </div>
                <div class="uc-step">
                  <span class="uc-step-num">3</span>
                  <span class="uc-step-text">选择目标单位</span>
                </div>
                <div class="uc-step">
                  <span class="uc-step-num">4</span>
                  <span class="uc-step-text">复制转换结果</span>
                </div>
              </div>
            </div>
          </aside>
        </div>

        <!-- 底部描述 -->
        <footer class="uc-footer">
          <p>单位换算工具，支持长度、容量、质量、面积、数据、时间、温度、速度、角度、功率、电量、电流、电压、频率、力、密度等多种单位的互相转换。所有计算均在浏览器本地完成。</p>
        </footer>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { convertUnits, unitInTtype } from "@/utils/unitsTools.js";
import { debounce } from "@/utils/utils.js";
import { Head } from "@vueuse/head";
import { ElNotification } from "@/utils/element.js";

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
const copyDone = ref(false);
let copyTimer = null;

const types = [
  { label: "长度", value: "长度" },
  { label: "质量", value: "质量" },
  { label: "面积", value: "面积" },
  { label: "时间", value: "时间" },
  { label: "温度", value: "温度" },
  { label: "体积", value: "体积" },
  { label: "数据", value: "数据" },
  { label: "速度", value: "速度" },
  { label: "压力", value: "压力" },
  { label: "角度", value: "角度" },
  { label: "功率", value: "功率" },
  { label: "电量", value: "电量" },
  { label: "电流", value: "电流" },
  { label: "力", value: "力" },
  { label: "电压", value: "电压" },
  { label: "密度", value: "密度" },
  { label: "频率", value: "频率" },
];

const selectType = (type) => {
  typeVal.value = type;
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
  const val = String(resultVal.value ?? "");
  if (val.trim() === "") {
    ElNotification({ title: "警告", message: "复制失败！无效的结果。", type: "warning", zIndex: 99999 });
    return;
  }
  navigator.clipboard.writeText(val).then(() => {
    copyDone.value = true;
    clearTimeout(copyTimer);
    copyTimer = setTimeout(() => { copyDone.value = false; }, 2000);
    ElNotification({ title: "成功", message: "结果已复制到剪切板。", type: "success", zIndex: 99999 });
  }).catch(() => {
    ElNotification({ title: "失败", message: "复制出错，请重试", type: "error", zIndex: 99999 });
  });
};

const clearData = () => {
  dataVal.value = 0;
  resultVal.value = 0;
};
</script>

<style lang="scss" scoped>
.unit-conversion {
  max-width: 1180px;
  margin: 0 auto;
}

.unit-conversion-container {
  padding: 24px 20px 32px;
}

/* ===== Header ===== */
.uc-header {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 24px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--border-color);
}

.uc-header-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  border-radius: 16px;
  background: var(--theme-color);
  border: 1px solid var(--border-color);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
}

.uc-header-text {
  h1 { font-size: 24px; font-weight: 700; margin: 0 0 4px; color: var(--color); letter-spacing: -0.02em; }
  p  { font-size: 14px; color: var(--text-secondary); margin: 0; }
}

/* ===== Layout ===== */
.uc-layout {
  display: flex;
  gap: 20px;
  align-items: flex-start;
}

.uc-main {
  flex: 1;
  min-width: 0;
  background: var(--theme-color);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
}

/* ===== Type chips ===== */
.uc-type-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--border-color);
}

.uc-type-chip {
  padding: 7px 16px;
  border-radius: 999px;
  border: 1px solid var(--border-color);
  background: transparent;
  color: var(--text-secondary);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all .2s;
  outline: none;

  &:hover {
    border-color: rgba(34, 211, 238, 0.4);
    color: var(--color);
  }

  &.active {
    background: rgba(34, 211, 238, 0.1);
    border-color: rgba(34, 211, 238, 0.35);
    color: var(--theme-btn-hover-color);
    font-weight: 600;
  }
}

/* ===== Sections ===== */
.uc-section {
  margin-bottom: 16px;
}

.uc-section-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 600;
  color: var(--color);
  margin-bottom: 10px;

  .uc-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--theme-btn-hover-color);
  }
}

.uc-input-row {
  display: flex;
  gap: 12px;
}

.uc-number-input {
  flex: 1;
}

.uc-unit-select {
  width: 40%;
}

/* ===== Exchange ===== */
.uc-exchange {
  display: flex;
  align-items: center;
  margin: 8px 0 16px;
}

.uc-exchange-line {
  flex: 1;
  height: 1px;
  background: var(--border-color);
}

.uc-exchange-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  margin: 0 12px;
  border-radius: 50%;
  border: 1px solid var(--border-color);
  background: var(--theme-color);
  color: var(--theme-btn-hover-color);
  cursor: pointer;
  transition: all .3s;
  outline: none;

  &:hover {
    transform: rotate(180deg);
    border-color: rgba(34, 211, 238, 0.4);
    background: rgba(34, 211, 238, 0.08);
  }
}

/* ===== Result ===== */
.uc-result-wrap {
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
}

.uc-result-input {
  flex: 1;
  :deep(.el-input__wrapper) {
    padding-right: 68px;
  }
}

.uc-copy-btn {
  position: absolute;
  right: 6px;
  top: 50%;
  transform: translateY(-50%);
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 5px 12px;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  background: var(--theme-color);
  color: var(--text-secondary);
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all .2s;
  outline: none;

  &:hover { border-color: var(--theme-btn-hover-color); color: var(--theme-btn-hover-color); background: rgba(34, 211, 238, 0.06); }
  &.copied { border-color: var(--theme-btn-hover-color); color: var(--theme-btn-hover-color); background: rgba(34, 211, 238, 0.1); }
}

/* ===== Actions ===== */
.uc-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 16px;
}

.uc-btn {
  padding: 10px 28px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all .2s;
  outline: none;

  &:active { transform: scale(0.96); }

  &.primary {
    background: var(--theme-btn-hover-color);
    color: #0d1117;
    border: none;
    &:hover { opacity: 0.9; transform: translateY(-1px); box-shadow: 0 6px 16px rgba(34, 211, 238, 0.25); }
  }

  &.ghost {
    background: transparent;
    color: var(--text-secondary);
    border: 1px solid var(--border-color);
    &:hover { background: rgba(127, 127, 127, 0.08); color: var(--color); }
  }
}

/* ===== Aside ===== */
.uc-aside {
  width: 280px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.uc-info-card {
  background: var(--theme-color);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 20px;
}

.uc-info-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--border-color);
}

.uc-info-title {
  font-size: 15px;
  font-weight: 700;
  color: var(--color);
}

.uc-info-count {
  font-size: 12px;
  font-weight: 600;
  font-family: var(--mono-font-family);
  color: var(--theme-btn-hover-color);
  background: rgba(34, 211, 238, 0.1);
  border-radius: 999px;
  padding: 2px 8px;
}

.uc-unit-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 6px;
  max-height: 220px;
  overflow-y: auto;
}

.uc-unit-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 7px 10px;
  border-radius: 10px;
  background: rgba(230, 237, 243, 0.03);
  border: 1px solid var(--border-color);
}

.uc-unit-name {
  font-size: 12px;
  font-weight: 600;
  color: var(--color);
}

.uc-unit-value {
  font-size: 11px;
  font-family: var(--mono-font-family);
  color: var(--text-secondary);
}

/* ===== Steps ===== */
.uc-steps {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.uc-step {
  display: flex;
  align-items: center;
  gap: 10px;
}

.uc-step-num {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: rgba(34, 211, 238, 0.12);
  color: var(--theme-btn-hover-color);
  font-family: var(--mono-font-family);
  font-size: 11px;
  font-weight: 700;
  flex-shrink: 0;
}

.uc-step-text {
  font-size: 13px;
  color: var(--text-secondary);
}

/* ===== Footer ===== */
.uc-footer {
  margin-top: 20px;
  padding: 16px 20px;
  background: var(--theme-color);
  border: 1px solid var(--border-color);
  border-radius: 16px;

  p {
    margin: 0;
    font-size: 13px;
    color: var(--text-secondary);
    line-height: 1.7;
  }
}

/* ===== Responsive ===== */
@media (max-width: 960px) {
  .uc-layout { flex-direction: column; }
  .uc-aside { width: 100%; flex-direction: row; gap: 12px; }
  .uc-info-card { flex: 1; }
  .uc-unit-list { grid-template-columns: repeat(3, 1fr); }
}

@media (max-width: 640px) {
  .unit-conversion-container { padding: 16px 12px 24px; }
  .uc-main { padding: 16px; }
  .uc-aside { flex-direction: column; }
  .uc-input-row { flex-direction: column; }
  .uc-unit-select { width: 100%; }
  .uc-actions { flex-direction: column; }
  .uc-btn { width: 100%; justify-content: center; }
}
</style>
