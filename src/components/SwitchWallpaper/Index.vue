<template>
  <el-dialog
    v-model="dialogVisible"
    :width="modelWidth"
    :lock-scroll="false"
    :append-to-body="true"
    :z-index="10002"
    class="fx-dialog"
  >
    <template #header>
      <div class="fx-dialog-header">
        <div>
          <div class="fx-model-title">背景特效设置</div>
          <p class="fx-model-subtitle">选择底色与叠加特效，调整密度、速度、透明度与颜色。</p>
        </div>
      </div>
    </template>
    <div class="fx-model-main">
      <!-- 底色选择 -->
      <div class="fx-section">
        <div class="fx-section-title">底色</div>
        <div class="fx-color-row">
          <div
            v-for="scheme in wallpaperOptions"
            :key="scheme.id"
            class="fx-scheme-chip"
            :class="{ active: currentScheme.id === scheme.id }"
            @click="setWallpaper(scheme)"
          >
            <span class="fx-swatch" :style="swatchStyle(scheme)"></span>
            <span class="fx-scheme-name">{{ scheme.name }}</span>
          </div>
        </div>
      </div>

      <!-- 特效选择 -->
      <div class="fx-section">
        <div class="fx-section-title">背景特效</div>
        <div class="fx-effect-grid">
          <div
            v-for="fx in effectOptions"
            :key="fx.id"
            class="fx-effect-card"
            :class="{ active: fxConfig.type === fx.id }"
            @click="selectEffect(fx.id)"
          >
            <i :class="fx.icon"></i>
            <span>{{ fx.name }}</span>
          </div>
        </div>
      </div>

      <!-- 配置项 -->
      <div class="fx-section" v-if="fxConfig.type !== 'none'">
        <div class="fx-slider-row">
          <span class="fx-slider-label">密度</span>
          <el-slider v-model="fxConfig.density" :min="5" :max="100" size="small" />
          <span class="fx-slider-val">{{ fxConfig.density }}</span>
        </div>
        <div class="fx-slider-row">
          <span class="fx-slider-label">速度</span>
          <el-slider v-model="fxConfig.speed" :min="5" :max="100" size="small" />
          <span class="fx-slider-val">{{ fxConfig.speed }}</span>
        </div>
        <div class="fx-slider-row">
          <span class="fx-slider-label">透明度</span>
          <el-slider v-model="fxConfig.opacity" :min="5" :max="100" size="small" />
          <span class="fx-slider-val">{{ fxConfig.opacity }}</span>
        </div>
        <div class="fx-color-picker-row">
          <span class="fx-slider-label">颜色</span>
          <div class="fx-color-options">
            <span
              v-for="c in colorOptions"
              :key="c"
              class="fx-color-dot"
              :class="{ active: fxConfig.color === c }"
              :style="{ background: c }"
              @click="fxConfig.color = c"
            ></span>
          </div>
        </div>
      </div>

      <div class="fx-actions">
        <button class="fx-btn primary" type="button" @click="resetDefault">恢复默认</button>
        <button class="fx-btn" type="button" @click="dialogVisible = false">完成</button>
      </div>
    </div>
  </el-dialog>
</template>

<script setup>
import { ref, defineExpose, onMounted, onUnmounted, computed, watch } from "vue";
import { useMainStore } from "@/stores/mainStore";

const mainStore = useMainStore();

// 底色方案（与之前一致）
const wallpaperOptions = [
  {
    id: "cyber-cyan",
    name: "极客青",
    css: "radial-gradient(circle at 22% 30%, rgba(34,211,238,0.10), transparent 46%), radial-gradient(circle at 78% 65%, rgba(34,211,238,0.06), transparent 42%), #0d1117",
  },
  {
    id: "deep-blue",
    name: "深空蓝",
    css: "radial-gradient(circle at 20% 25%, rgba(59,130,246,0.10), transparent 45%), radial-gradient(circle at 80% 75%, rgba(30,64,175,0.06), transparent 42%), #0d1117",
  },
  {
    id: "graphite",
    name: "极简灰",
    css: "radial-gradient(circle at 50% 40%, rgba(148,163,184,0.06), transparent 50%), #161b22",
  },
  {
    id: "amber",
    name: "琥珀暖",
    css: "radial-gradient(circle at 75% 30%, rgba(255,139,38,0.08), transparent 46%), #0d1117",
  },
  {
    id: "mint",
    name: "薄荷青",
    css: "radial-gradient(circle at 25% 70%, rgba(63,185,80,0.08), transparent 45%), radial-gradient(circle at 70% 20%, rgba(34,211,238,0.05), transparent 40%), #0d1117",
  },
  {
    id: "theme",
    name: "跟随主题",
    css: "",
  },
];

// 特效选项
const effectOptions = [
  { id: "none", name: "无特效", icon: "bi bi-square" },
  { id: "matrix", name: "代码雨", icon: "bi bi-terminal" },
  { id: "particles", name: "粒子连线", icon: "bi bi-circle-half" },
  { id: "stars", name: "星空", icon: "bi bi-stars" },
  { id: "dust", name: "浮尘", icon: "bi bi-arrow-up-circle" },
];

// 5 档预设色
const colorOptions = ["#22d3ee", "#3fb950", "#60a5fa", "#a78bfa", "#f87171"];

const defaultScheme = computed(() => wallpaperOptions[0]);

const currentCss = computed(() => mainStore.backgroundImage || "");
const currentScheme = computed(() => {
  return wallpaperOptions.find((s) => s.css === currentCss.value) || defaultScheme.value;
});

// 本地编辑副本，改动实时写回 store
const fxConfig = computed({
  get: () => mainStore.fxConfig,
  set: () => {},
});

const swatchStyle = (item) => {
  if (!item.css) {
    return { background: "linear-gradient(135deg, #0d1117 0%, #161b22 100%)" };
  }
  return { background: item.css };
};

const selectEffect = (id) => {
  mainStore.setFxConfig({ type: id });
};

const setWallpaper = (scheme) => {
  mainStore.setBackgroundImage(scheme.css);
};

const resetDefault = () => {
  mainStore.setBackgroundImage(defaultScheme.value.css);
  mainStore.setFxConfig({
    type: "matrix",
    density: 50,
    speed: 50,
    opacity: 40,
    color: "#22d3ee",
  });
};

onMounted(() => {
  setModelWidth();
  window.addEventListener("resize", setModelWidth, true);
});

onUnmounted(() => {
  window.removeEventListener("resize", setModelWidth, true);
});

const dialogVisible = ref(false);
const modelWidth = ref("720px");

const show = () => {
  dialogVisible.value = true;
};

const setModelWidth = () => {
  if (window.innerWidth <= 640) {
    modelWidth.value = "96%";
  } else if (window.innerWidth <= 900) {
    modelWidth.value = "88%";
  } else {
    modelWidth.value = "720px";
  }
};

defineExpose({
  show,
});
</script>

<style lang="scss" scoped>
.fx-dialog-header {
  padding-right: 24px;
}

.fx-model-title {
  color: var(--btn-tag-bg-color);
  font-size: 20px;
  line-height: 1.2;
}

.fx-model-subtitle {
  margin: 6px 0 0;
  color: var(--color);
  opacity: 0.72;
  font-size: 13px;
  line-height: 1.6;
}

.fx-model-main {
  padding: 4px 8px 20px;
}

.fx-section {
  margin-bottom: 22px;
}

.fx-section-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--color);
  opacity: 0.85;
  margin-bottom: 12px;
}

/* 底色横排色卡 */
.fx-color-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.fx-scheme-chip {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 7px 12px 7px 7px;
  border-radius: 12px;
  border: 1px solid rgba(127, 127, 127, 0.22);
  cursor: pointer;
  transition: all 0.2s;
  background: rgba(127, 127, 127, 0.05);

  &:hover {
    border-color: rgba(34, 211, 238, 0.5);
  }

  &.active {
    border-color: rgba(34, 211, 238, 0.8);
    box-shadow: 0 0 0 2px rgba(34, 211, 238, 0.15);
  }
}

.fx-swatch {
  width: 28px;
  height: 20px;
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  flex-shrink: 0;
}

.fx-scheme-name {
  font-size: 13px;
  color: var(--color);
}

/* 特效卡片 */
.fx-effect-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 10px;
}

.fx-effect-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px 8px;
  border-radius: 14px;
  border: 1px solid rgba(127, 127, 127, 0.22);
  cursor: pointer;
  transition: all 0.2s;
  background: rgba(127, 127, 127, 0.05);
  color: var(--color);
  font-size: 13px;

  i {
    font-size: 20px;
  }

  &:hover {
    border-color: rgba(34, 211, 238, 0.5);
    transform: translateY(-2px);
  }

  &.active {
    border-color: rgba(34, 211, 238, 0.8);
    color: var(--theme-btn-hover-color);
    box-shadow: 0 0 0 2px rgba(34, 211, 238, 0.15);
    background: rgba(34, 211, 238, 0.08);
  }
}

/* 滑块 */
.fx-slider-row {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 12px;
}

.fx-slider-label {
  width: 56px;
  font-size: 13px;
  color: var(--color);
  opacity: 0.8;
  flex-shrink: 0;
}

.fx-slider-row :deep(.el-slider) {
  flex: 1;
}

.fx-slider-val {
  width: 32px;
  text-align: right;
  font-family: var(--mono-font-family);
  font-size: 13px;
  color: var(--color);
  opacity: 0.7;
  flex-shrink: 0;
}

/* 颜色 */
.fx-color-picker-row {
  display: flex;
  align-items: center;
  gap: 14px;
}

.fx-color-options {
  display: flex;
  gap: 12px;
  align-items: center;
}

.fx-color-dot {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s;
  border: 2px solid transparent;

  &:hover {
    transform: scale(1.15);
  }

  &.active {
    border-color: var(--color);
    box-shadow: 0 0 0 3px rgba(34, 211, 238, 0.2);
    transform: scale(1.1);
  }
}

/* 操作按钮 */
.fx-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 8px;
  padding-top: 16px;
  border-top: 1px solid rgba(127, 127, 127, 0.15);
}

.fx-btn {
  padding: 10px 22px;
  border-radius: 10px;
  font-size: 14px;
  cursor: pointer;
  border: 1px solid rgba(127, 127, 127, 0.25);
  background: rgba(127, 127, 127, 0.08);
  color: var(--color);
  transition: all 0.2s;

  &:hover {
    border-color: rgba(34, 211, 238, 0.5);
  }

  &.primary {
    background: var(--btn-tag-bg-color);
    border-color: transparent;
    color: #0d1117;

    &:hover {
      opacity: 0.9;
    }
  }
}

@media (max-width: 860px) {
  .fx-effect-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 420px) {
  .fx-effect-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
