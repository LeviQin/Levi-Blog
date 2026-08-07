<template>
  <el-dialog
    v-model="dialogVisible"
    :width="modelWidth"
    :lock-scroll="false"
    :append-to-body="true"
    :z-index="10002"
    class="fx-dialog"
    :show-close="true"
    :before-close="handleClose"
    destroy-on-close
  >
    <template #header>
      <div class="fx-dialog-header">
        <div class="fx-title-group">
          <div class="fx-model-title">背景特效</div>
          <p class="fx-model-subtitle">选择底色与叠加特效，实时预览</p>
        </div>
        <div class="fx-applied-tag">
          <span class="fx-applied-dot"></span>
          {{ appliedSummary }}
        </div>
      </div>
    </template>

    <div class="fx-model-main">
      <!-- 实时预览面板 -->
      <div class="fx-preview-wrap">
        <canvas ref="previewCanvasRef" class="fx-preview-canvas"></canvas>
        <div class="fx-preview-overlay">
          <span class="fx-preview-chip">{{ currentEffectName }}</span>
        </div>
        <div class="fx-preview-empty" v-if="fxConfig.type === 'none'">
          <i class="bi bi-stars"></i>
          <span>未启用特效</span>
        </div>
      </div>

      <!-- 双栏内容 -->
      <div class="fx-body">
        <!-- 左栏：底色 -->
        <div class="fx-col fx-col-left">
          <div class="fx-block-title">底色</div>
          <div class="fx-color-list">
            <div
              v-for="scheme in wallpaperOptions"
              :key="scheme.id"
              class="fx-scheme-item"
              :class="{ active: currentScheme.id === scheme.id }"
              @click="setWallpaper(scheme)"
              role="radio"
              :aria-checked="currentScheme.id === scheme.id"
              tabindex="0"
              @keydown.enter="setWallpaper(scheme)"
            >
              <span class="fx-swatch" :style="swatchStyle(scheme)"></span>
              <span class="fx-scheme-name">{{ scheme.name }}</span>
              <span class="fx-check" v-if="currentScheme.id === scheme.id">
                <i class="bi bi-check-lg"></i>
              </span>
            </div>
          </div>
        </div>

        <!-- 右栏：特效 + 参数 -->
        <div class="fx-col fx-col-right">
          <div class="fx-block-title">特效</div>
          <div class="fx-effect-grid">
            <div
              v-for="fx in effectOptions"
              :key="fx.id"
              class="fx-effect-card"
              :class="{ active: fxConfig.type === fx.id }"
              @click="selectEffect(fx.id)"
              role="radio"
              :aria-checked="fxConfig.type === fx.id"
              tabindex="0"
              @keydown.enter="selectEffect(fx.id)"
            >
              <i :class="fx.icon"></i>
              <span>{{ fx.name }}</span>
            </div>
          </div>

          <!-- 参数区 -->
          <transition name="fx-fade">
            <div class="fx-params" v-if="fxConfig.type !== 'none'" key="params">
              <div class="fx-slider-row">
                <span class="fx-slider-label">密度</span>
                <div class="fx-slider-body">
                  <el-slider v-model="densityVal" :min="5" :max="100" size="small" />
                </div>
                <span class="fx-slider-val">{{ densityVal }}</span>
              </div>
              <div class="fx-slider-row">
                <span class="fx-slider-label">速度</span>
                <div class="fx-slider-body">
                  <el-slider v-model="speedVal" :min="5" :max="100" size="small" />
                </div>
                <span class="fx-slider-val">{{ speedVal }}</span>
              </div>
              <div class="fx-slider-row">
                <span class="fx-slider-label">强度</span>
                <div class="fx-slider-body">
                  <el-slider v-model="opacityVal" :min="5" :max="100" size="small" />
                </div>
                <span class="fx-slider-val">{{ opacityVal }}</span>
              </div>
              <div class="fx-color-row">
                <span class="fx-slider-label">颜色</span>
                <div class="fx-color-options">
                  <span
                    v-for="c in colorOptions"
                    :key="c"
                    class="fx-color-dot"
                    :class="{ active: fxConfig.color === c }"
                    :style="{ background: c }"
                    @click="setColor(c)"
                    role="radio"
                    :aria-checked="fxConfig.color === c"
                    tabindex="0"
                    @keydown.enter="setColor(c)"
                  ></span>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>

      <!-- 底部操作 -->
      <div class="fx-footer">
        <button class="fx-btn ghost" type="button" @click="resetDefault">
          <i class="bi bi-arrow-counterclockwise"></i>
          恢复默认
        </button>
        <button class="fx-btn primary" type="button" @click="handleClose">
          完成
        </button>
      </div>
    </div>
  </el-dialog>
</template>

<script setup>
import { ref, defineExpose, onMounted, onUnmounted, computed, nextTick } from "vue";
import { useMainStore } from "@/stores/mainStore";

const mainStore = useMainStore();

const wallpaperOptions = [
  { id: "cyber-cyan", name: "极客青", accent: "#22d3ee", css: "radial-gradient(circle at 22% 30%, rgba(34,211,238,0.10), transparent 46%), radial-gradient(circle at 78% 65%, rgba(34,211,238,0.06), transparent 42%), #0d1117" },
  { id: "deep-blue", name: "深空蓝", accent: "#3b82f6", css: "radial-gradient(circle at 20% 25%, rgba(59,130,246,0.10), transparent 45%), radial-gradient(circle at 80% 75%, rgba(30,64,175,0.06), transparent 42%), #0d1117" },
  { id: "graphite", name: "极简灰", accent: "#94a3b8", css: "radial-gradient(circle at 50% 40%, rgba(148,163,184,0.06), transparent 50%), #161b22" },
  { id: "amber", name: "琥珀暖", accent: "#ff8b26", css: "radial-gradient(circle at 75% 30%, rgba(255,139,38,0.08), transparent 46%), #0d1117" },
  { id: "mint", name: "薄荷青", accent: "#22c55e", css: "radial-gradient(circle at 25% 70%, rgba(63,185,80,0.08), transparent 45%), radial-gradient(circle at 70% 20%, rgba(34,211,238,0.05), transparent 40%), #0d1117" },
  { id: "theme", name: "跟随主题", accent: "", css: "" },
];

const effectOptions = [
  { id: "none", name: "无", icon: "bi bi-dash-lg" },
  { id: "matrix", name: "代码雨", icon: "bi bi-terminal" },
  { id: "particles", name: "粒子", icon: "bi bi-bezier2" },
  { id: "stars", name: "星空", icon: "bi bi-stars" },
  { id: "dust", name: "浮尘", icon: "bi bi-wind" },
];

const colorOptions = ["#22d3ee", "#3fb950", "#60a5fa", "#a78bfa", "#f87171"];
const EFFECT_NAMES = {
  none: "无特效",
  matrix: "代码雨",
  particles: "粒子连线",
  stars: "星空",
  dust: "浮尘",
};

const defaultScheme = computed(() => wallpaperOptions[0]);
const currentCss = computed(() => mainStore.backgroundImage || "");
const currentScheme = computed(() => wallpaperOptions.find((s) => s.css === currentCss.value) || defaultScheme.value);

// 滑块本地值，写入 store
const densityVal = computed({
  get: () => mainStore.fxConfig.density,
  set: (v) => mainStore.setFxConfig({ density: v }),
});
const speedVal = computed({
  get: () => mainStore.fxConfig.speed,
  set: (v) => mainStore.setFxConfig({ speed: v }),
});
const opacityVal = computed({
  get: () => mainStore.fxConfig.opacity,
  set: (v) => mainStore.setFxConfig({ opacity: v }),
});
const fxConfig = computed(() => mainStore.fxConfig);

const currentEffectName = computed(() => EFFECT_NAMES[fxConfig.value.type] || "无特效");
const appliedSummary = computed(() => {
  if (fxConfig.value.type === "none") return "无特效";
  return `${currentEffectName.value} · ${fxConfig.value.color}`;
});

// 色卡预览：用增强版光晕让颜色在小色块上清晰可见
const swatchStyle = (item) => {
  if (!item.accent) {
    return { background: "linear-gradient(135deg, #0d1117 0%, #161b22 100%)" };
  }
  return {
    background: `radial-gradient(circle at 30% 35%, ${item.accent}55, transparent 55%), radial-gradient(circle at 75% 70%, ${item.accent}33, transparent 60%), #0d1117`,
  };
};

const selectEffect = (id) => mainStore.setFxConfig({ type: id });
const setWallpaper = (scheme) => mainStore.setBackgroundImage(scheme.css);
const setColor = (c) => mainStore.setFxConfig({ color: c });

const resetDefault = () => {
  mainStore.setBackgroundImage(defaultScheme.value.css);
  mainStore.setFxConfig({ type: "matrix", density: 50, speed: 50, opacity: 40, color: "#22d3ee" });
};

/* ===== 实时预览渲染 ===== */
const previewCanvasRef = ref(null);
let pCtx = null;
let pRaf = null;
let pRunning = false;
let pW = 0;
let pH = 0;

const hexToRgb = (hex) => {
  const h = hex.replace("#", "");
  return {
    r: parseInt(h.substring(0, 2), 16),
    g: parseInt(h.substring(2, 4), 16),
    b: parseInt(h.substring(4, 6), 16),
  };
};

const setupPreview = () => {
  const canvas = previewCanvasRef.value;
  if (!canvas) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const rect = canvas.getBoundingClientRect();
  pW = rect.width || 320;
  pH = rect.height || 180;
  canvas.width = pW * dpr;
  canvas.height = pH * dpr;
  pCtx = canvas.getContext("2d");
  pCtx.scale(dpr, dpr);
};

// 按特效类型绘制一帧
const drawPreviewFrame = () => {
  if (!pCtx || pRunning === false) return;
  const cfg = fxConfig.value;
  const rgb = hexToRgb(cfg.color);
  const baseAlpha = cfg.opacity / 100;
  const density = cfg.density / 100;
  const speed = 0.4 + (cfg.speed / 100) * 1.2;
  const now = Date.now() / 1000;

  // 底色
  pCtx.clearRect(0, 0, pW, pH);
  const baseCss = currentScheme.value.css || "radial-gradient(circle at 22% 30%, rgba(34,211,238,0.10), transparent 46%), #0d1117";
  pCtx.fillStyle = "#0d1117";
  pCtx.fillRect(0, 0, pW, pH);
  // 模拟光晕
  const glow = pCtx.createRadialGradient(pW * 0.3, pH * 0.3, 10, pW * 0.3, pH * 0.3, pW * 0.7);
  glow.addColorStop(0, `rgba(${rgb.r},${rgb.g},${rgb.b},${0.1 * baseAlpha + 0.04})`);
  glow.addColorStop(1, "rgba(0,0,0,0)");
  pCtx.fillStyle = glow;
  pCtx.fillRect(0, 0, pW, pH);

  if (cfg.type === "none") return;

  pCtx.font = `${Math.floor(pH / 16)}px ui-monospace, Menlo, monospace`;
  const spacing = Math.max(3, Math.floor(pW / (16 * (3.4 - density * 1.4))));

  // 代码雨
  if (cfg.type === "matrix") {
    for (let x = 0; x < pW; x += spacing) {
      const y = ((now * 60 * speed * (1 + (x % 7) / 7)) % (pH + 40)) - 20;
      const char = "ABCDEF0123456789<>/{}[]()*+-=$#&".charAt(Math.floor(Math.random() * 32));
      pCtx.fillStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},${Math.min(1, baseAlpha * 0.9)})`;
      pCtx.fillText(char, x, y);
    }
  }
  // 粒子连线
  else if (cfg.type === "particles") {
    const count = Math.floor(14 * density) + 4;
    for (let i = 0; i < count; i++) {
      const a = {
        x: ((Math.sin(now * speed * 0.3 + i * 1.7) + 1) / 2) * pW,
        y: ((Math.cos(now * speed * 0.25 + i * 2.3) + 1) / 2) * pH,
      };
      for (let j = i + 1; j < count; j++) {
        const b = {
          x: ((Math.sin(now * speed * 0.3 + j * 1.7) + 1) / 2) * pW,
          y: ((Math.cos(now * speed * 0.25 + j * 2.3) + 1) / 2) * pH,
        };
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < pW * 0.3) {
          pCtx.strokeStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},${baseAlpha * 0.35 * (1 - dist / (pW * 0.3))})`;
          pCtx.lineWidth = 0.6;
          pCtx.beginPath();
          pCtx.moveTo(a.x, a.y);
          pCtx.lineTo(b.x, b.y);
          pCtx.stroke();
        }
      }
      pCtx.fillStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},${Math.min(1, baseAlpha * 1.1)})`;
      pCtx.beginPath();
      pCtx.arc(a.x, a.y, 2, 0, Math.PI * 2);
      pCtx.fill();
    }
  }
  // 星空
  else if (cfg.type === "stars") {
    const count = Math.floor(30 * density) + 6;
    for (let i = 0; i < count; i++) {
      const x = ((Math.sin(i * 12.9898 + now * 0.05) * 43758.5453) % 1 + 1) % 1 * pW;
      const y = ((Math.sin(i * 78.233 + now * 0.04) * 12543.987) % 1 + 1) % 1 * pH;
      const twinkle = 0.5 + 0.5 * Math.sin(now * 2 + i * 0.7);
      pCtx.fillStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},${Math.min(1, baseAlpha * (0.3 + twinkle * 0.5))})`;
      pCtx.beginPath();
      pCtx.arc(x, y, 1 + twinkle * 0.8, 0, Math.PI * 2);
      pCtx.fill();
    }
  }
  // 浮尘
  else if (cfg.type === "dust") {
    const count = Math.floor(20 * density) + 4;
    for (let i = 0; i < count; i++) {
      const y = ((now * 40 * speed + i * 37) % (pH + 20)) - 10;
      const x = ((Math.sin(now * 0.5 + i * 1.3) + 1) / 2) * pW;
      pCtx.fillStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},${Math.min(1, baseAlpha * 0.6)})`;
      pCtx.beginPath();
      pCtx.arc(x, y, 1.2, 0, Math.PI * 2);
      pCtx.fill();
    }
  }

  pRaf = requestAnimationFrame(drawPreviewFrame);
};

const startPreview = () => {
  if (pRunning) return;
  pRunning = true;
  pRaf = requestAnimationFrame(drawPreviewFrame);
};

const stopPreview = () => {
  pRunning = false;
  if (pRaf) cancelAnimationFrame(pRaf);
  pRaf = null;
};

// 配置/底色变化时预览自动继续（RAF 循环实时读取 store，无需重启）

const dialogVisible = ref(false);
const modelWidth = ref("860px");

const show = () => {
  dialogVisible.value = true;
  // 等待 dialog 内容挂载后再初始化预览 canvas
  nextTick(() => {
    requestAnimationFrame(() => {
      setupPreview();
      startPreview();
    });
  });
};

const handleClose = (done) => {
  dialogVisible.value = false;
  stopPreview();
  if (typeof done === "function") done();
};

const setModelWidth = () => {
  if (window.innerWidth <= 640) {
    modelWidth.value = "96%";
  } else if (window.innerWidth <= 1000) {
    modelWidth.value = "92%";
  } else {
    modelWidth.value = "860px";
  }
};

onMounted(() => {
  setModelWidth();
  window.addEventListener("resize", setModelWidth, true);
});

onUnmounted(() => {
  stopPreview();
  window.removeEventListener("resize", setModelWidth, true);
});

defineExpose({
  show,
});
</script>

<style lang="scss" scoped>
.fx-dialog-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding-right: 24px;
}

.fx-title-group {
  min-width: 0;
}

.fx-model-title {
  color: var(--color);
  font-size: 20px;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: 0.2px;
}

.fx-model-subtitle {
  margin: 5px 0 0;
  color: var(--text-secondary);
  font-size: 13px;
  line-height: 1.5;
}

.fx-applied-tag {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 7px 14px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 500;
  color: var(--theme-btn-hover-color);
  background: rgba(34, 211, 238, 0.1);
  border: 1px solid rgba(34, 211, 238, 0.22);
  white-space: nowrap;

  .fx-applied-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--theme-btn-hover-color);
    box-shadow: 0 0 8px rgba(34, 211, 238, 0.7);
  }
}

.fx-model-main {
  padding: 0 4px 4px;
}

/* 预览面板 */
.fx-preview-wrap {
  position: relative;
  height: 190px;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid var(--border-color);
  background: #0d1117;
  margin-bottom: 18px;
}

.fx-preview-canvas {
  width: 100%;
  height: 100%;
  display: block;
}

.fx-preview-overlay {
  position: absolute;
  top: 14px;
  left: 14px;
}

.fx-preview-chip {
  padding: 5px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 500;
  color: #e6edf3;
  background: rgba(13, 17, 23, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.14);
  backdrop-filter: blur(8px);
  font-family: var(--mono-font-family);
}

.fx-preview-empty {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: rgba(230, 237, 243, 0.4);
  font-size: 13px;

  i {
    font-size: 28px;
  }
}

/* 双栏 */
.fx-body {
  display: grid;
  grid-template-columns: 190px 1fr;
  gap: 24px;
}

.fx-col {
  min-width: 0;
}

.fx-block-title {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 12px;
}

/* 底色列表 */
.fx-color-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.fx-scheme-item {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  border-radius: 12px;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.18s;
  outline: none;

  &:hover {
    background: rgba(34, 211, 238, 0.06);
  }

  &:focus-visible {
    box-shadow: 0 0 0 2px rgba(34, 211, 238, 0.5);
  }

  &.active {
    background: rgba(34, 211, 238, 0.1);
    border-color: rgba(34, 211, 238, 0.35);
  }
}

.fx-swatch {
  width: 34px;
  height: 24px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  flex-shrink: 0;
}

.fx-scheme-name {
  font-size: 13px;
  color: var(--color);
  flex: 1;
}

.fx-check {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--theme-btn-hover-color);
  color: #0d1117;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
}

/* 特效网格 */
.fx-effect-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 8px;
  margin-bottom: 20px;
}

.fx-effect-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px 6px;
  border-radius: 14px;
  border: 1px solid var(--border-color);
  cursor: pointer;
  transition: all 0.18s;
  background: rgba(127, 127, 127, 0.04);
  color: var(--color);
  font-size: 12px;
  outline: none;

  i {
    font-size: 20px;
    color: var(--text-secondary);
    transition: color 0.18s, transform 0.18s;
  }

  &:hover {
    border-color: rgba(34, 211, 238, 0.4);
    transform: translateY(-2px);

    i {
      color: var(--theme-btn-hover-color);
    }
  }

  &:focus-visible {
    box-shadow: 0 0 0 2px rgba(34, 211, 238, 0.5);
  }

  &.active {
    border-color: rgba(34, 211, 238, 0.55);
    background: rgba(34, 211, 238, 0.09);
    color: var(--theme-btn-hover-color);

    i {
      color: var(--theme-btn-hover-color);
      transform: scale(1.08);
    }
  }
}

/* 参数 */
.fx-fade-enter-active,
.fx-fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fx-fade-enter-from,
.fx-fade-leave-to {
  opacity: 0;
  transform: translateY(6px);
}

.fx-params {
  padding: 16px;
  border-radius: 14px;
  background: rgba(127, 127, 127, 0.05);
  border: 1px solid var(--border-color);
}

.fx-slider-row,
.fx-color-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 14px;

  &:last-child {
    margin-bottom: 0;
  }
}

.fx-slider-label {
  width: 40px;
  font-size: 13px;
  color: var(--color);
  opacity: 0.75;
  flex-shrink: 0;
}

.fx-slider-body {
  flex: 1;
  min-width: 0;
}

.fx-slider-val {
  width: 30px;
  text-align: right;
  font-family: var(--mono-font-family);
  font-size: 13px;
  color: var(--text-secondary);
  flex-shrink: 0;
}

.fx-color-options {
  display: flex;
  gap: 10px;
  align-items: center;
  flex: 1;
}

.fx-color-dot {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.18s;
  border: 2px solid transparent;
  outline: none;
  position: relative;

  &:hover {
    transform: scale(1.12);
  }

  &:focus-visible {
    box-shadow: 0 0 0 2px rgba(34, 211, 238, 0.5);
  }

  &.active {
    border-color: #0d1117;
    box-shadow: 0 0 0 2px var(--color);
    transform: scale(1.05);

    &::after {
      content: "";
      position: absolute;
      inset: 7px;
      border-radius: 50%;
      background: #0d1117;
      opacity: 0.55;
    }
  }
}

/* 底部 */
.fx-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid var(--border-color);
}

.fx-btn {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 10px 22px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  border: 1px solid transparent;
  transition: all 0.2s;
  outline: none;

  i {
    font-size: 15px;
  }

  &:focus-visible {
    box-shadow: 0 0 0 2px rgba(34, 211, 238, 0.5);
  }

  &.ghost {
    background: transparent;
    border-color: var(--border-color);
    color: var(--text-secondary);

    &:hover {
      color: var(--color);
      border-color: var(--text-secondary);
    }
  }

  &.primary {
    background: var(--theme-btn-hover-color);
    color: #0d1117;

    &:hover {
      opacity: 0.92;
      transform: translateY(-1px);
      box-shadow: 0 6px 20px rgba(34, 211, 238, 0.3);
    }
  }
}

/* 响应式 */
@media (max-width: 860px) {
  .fx-body {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .fx-color-list {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 8px;
  }

  .fx-scheme-item {
    flex: 1 1 calc(50% - 8px);
    max-width: none;
  }

  .fx-effect-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .fx-preview-wrap {
    height: 150px;
  }
}

@media (max-width: 480px) {
  .fx-effect-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .fx-applied-tag {
    display: none;
  }

  .fx-footer {
    flex-direction: column-reverse;
    align-items: stretch;

    .fx-btn {
      justify-content: center;
    }
  }
}
</style>
