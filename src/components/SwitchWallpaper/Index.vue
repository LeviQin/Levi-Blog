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
          <span>{{ appliedSummary }}</span>
        </div>
      </div>
    </template>

    <div class="fx-model-main">
      <!-- 实时预览面板 -->
      <div class="fx-preview-wrap">
        <canvas ref="previewCanvasRef" class="fx-preview-canvas"></canvas>
        <div class="fx-preview-overlay">
          <span class="fx-preview-chip">{{ currentEffectName }}</span>
          <span class="fx-preview-base">{{ currentScheme.name }}</span>
        </div>
        <div class="fx-preview-empty" v-if="fxConfig.type === 'none'">
          <i class="bi bi-stars"></i>
          <span>未启用特效</span>
        </div>
        <div class="fx-preview-stats" v-else>
          <span>密度 <b>{{ densityVal }}</b></span>
          <span>速度 <b>{{ speedVal }}</b></span>
          <span>强度 <b>{{ opacityVal }}</b></span>
          <span class="fx-preview-color" :style="{ color: fxConfig.color }">● {{ fxConfig.color }}</span>
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
              @keydown.space.prevent="setWallpaper(scheme)"
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
              :title="fx.description"
              role="radio"
              :aria-checked="fxConfig.type === fx.id"
              tabindex="0"
              @keydown.enter="selectEffect(fx.id)"
              @keydown.space.prevent="selectEffect(fx.id)"
            >
              <i :class="fx.icon"></i>
              <span>{{ fx.name }}</span>
              <small>{{ fx.description }}</small>
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
                    :class="{ active: fxConfig.color === c.value }"
                    :style="{ background: c.value }"
                    :title="c.name"
                    :aria-label="c.name"
                    @click="setColor(c.value)"
                    role="radio"
                    :aria-checked="fxConfig.color === c.value"
                    tabindex="0"
                    @keydown.enter="setColor(c.value)"
                    @keydown.space.prevent="setColor(c.value)"
                  ></span>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>

      <!-- 主题设置 -->
      <div class="fx-theme-row">
        <div class="fx-theme-info">
          <span class="fx-theme-label">自动跟随时间</span>
          <span class="fx-theme-desc">18:00 - 08:00 自动切换暗色，其余时间为亮色</span>
        </div>
        <el-switch
          :model-value="autoTheme"
          @change="handleAutoThemeChange"
          :active-value="true"
          :inactive-value="false"
          inline-prompt
          active-text="开"
          inactive-text="关"
        />
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
import { useTheme } from "@/hooks/useTheme";
import { getEffectRgb } from "@/utils/effectColor";

const mainStore = useMainStore();
const { autoTheme, setAutoTheme } = useTheme();

const handleAutoThemeChange = (val) => {
  setAutoTheme(val);
};

const wallpaperOptions = [
  { id: "cyber-cyan", name: "极客青", accent: "#22d3ee", css: "radial-gradient(circle at 22% 30%, rgba(34,211,238,0.10), transparent 46%), radial-gradient(circle at 78% 65%, rgba(34,211,238,0.06), transparent 42%), var(--background)" },
  { id: "deep-blue", name: "深空蓝", accent: "#3b82f6", css: "radial-gradient(circle at 20% 25%, rgba(59,130,246,0.12), transparent 45%), radial-gradient(circle at 80% 75%, rgba(30,64,175,0.08), transparent 42%), var(--background)" },
  { id: "graphite", name: "极简灰", accent: "#94a3b8", css: "radial-gradient(circle at 50% 40%, rgba(148,163,184,0.08), transparent 50%), var(--background)" },
  { id: "amber", name: "琥珀暖", accent: "#ff8b26", css: "radial-gradient(circle at 75% 30%, rgba(255,139,38,0.10), transparent 46%), var(--background)" },
  { id: "mint", name: "薄荷青", accent: "#22c55e", css: "radial-gradient(circle at 25% 70%, rgba(63,185,80,0.10), transparent 45%), radial-gradient(circle at 70% 20%, rgba(34,211,238,0.06), transparent 40%), var(--background)" },
  { id: "violet", name: "暮光紫", accent: "#a78bfa", css: "radial-gradient(circle at 18% 24%, rgba(167,139,250,0.15), transparent 44%), radial-gradient(circle at 82% 74%, rgba(124,58,237,0.14), transparent 44%), #17112a" },
  { id: "rose", name: "玫瑰粉", accent: "#fb7185", css: "radial-gradient(circle at 76% 28%, rgba(251,113,133,0.14), transparent 44%), radial-gradient(circle at 20% 76%, rgba(244,63,94,0.1), transparent 42%), #241119" },
  { id: "ocean", name: "海盐蓝", accent: "#38bdf8", css: "radial-gradient(circle at 50% 0%, rgba(56,189,248,0.16), transparent 48%), linear-gradient(160deg, #0d2533, #0c1724 70%)" },
  { id: "sunset", name: "落日橙", accent: "#f97316", css: "radial-gradient(circle at 78% 22%, rgba(249,115,22,0.16), transparent 44%), radial-gradient(circle at 20% 82%, rgba(234,179,8,0.1), transparent 42%), #26150f" },
  { id: "theme", name: "跟随主题", accent: "#e2e8f0", css: "var(--background)" },
];

const effectOptions = [
  { id: "none", name: "无", description: "保持纯净", icon: "bi bi-dash-lg" },
  { id: "matrix", name: "代码雨", description: "数字流光", icon: "bi bi-terminal" },
  { id: "particles", name: "粒子", description: "动态连线", icon: "bi bi-bezier2" },
  { id: "stars", name: "星空", description: "星点闪烁", icon: "bi bi-stars" },
  { id: "dust", name: "浮尘", description: "微光漂浮", icon: "bi bi-wind" },
  { id: "aurora", name: "极光", description: "柔和光带", icon: "bi bi-rainbow" },
  { id: "shooting-stars", name: "流星", description: "划过夜空", icon: "bi bi-moon-stars" },
];

const colorOptions = [
  { value: "#22d3ee", name: "极客青" },
  { value: "#38bdf8", name: "晴空蓝" },
  { value: "#60a5fa", name: "星云蓝" },
  { value: "#3fb950", name: "薄荷绿" },
  { value: "#34d399", name: "翡翠绿" },
  { value: "#a78bfa", name: "暮光紫" },
  { value: "#c084fc", name: "霓虹紫" },
  { value: "#f472b6", name: "樱花粉" },
  { value: "#f87171", name: "珊瑚红" },
  { value: "#fb923c", name: "落日橙" },
  { value: "#facc15", name: "琥珀黄" },
  { value: "#e2e8f0", name: "月光白" },
];
const EFFECT_NAMES = {
  none: "无特效",
  matrix: "代码雨",
  particles: "粒子连线",
  stars: "星空",
  dust: "浮尘",
  aurora: "极光",
  "shooting-stars": "流星",
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
  if (fxConfig.value.type === "none") return `${currentScheme.value.name} · 无特效`;
  return `${currentScheme.value.name} · ${currentEffectName.value}`;
});

// 色卡预览直接复用底色方案，选项与实际效果保持一致
const swatchStyle = (item) => {
  return { background: item.css };
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
  const rgb = getEffectRgb(cfg.color);
  const baseAlpha = cfg.opacity / 100;
  const density = cfg.density / 100;
  const speed = 0.4 + (cfg.speed / 100) * 1.2;
  const now = Date.now() / 1000;

  // 底色
  pCtx.clearRect(0, 0, pW, pH);
  pCtx.fillStyle = currentScheme.value.id === "theme" ? "#f6f8fa" : "#0d1117";
  pCtx.fillRect(0, 0, pW, pH);
  // 模拟光晕
  const glow = pCtx.createRadialGradient(pW * 0.3, pH * 0.3, 10, pW * 0.3, pH * 0.3, pW * 0.7);
  glow.addColorStop(0, `rgba(${rgb.r},${rgb.g},${rgb.b},${0.1 * baseAlpha + 0.04})`);
  glow.addColorStop(1, "rgba(0,0,0,0)");
  pCtx.fillStyle = glow;
  pCtx.fillRect(0, 0, pW, pH);

  if (cfg.type === "none") {
    pRaf = requestAnimationFrame(drawPreviewFrame);
    return;
  }

  const fontSize = 16;
  pCtx.font = `${fontSize}px ui-monospace, Menlo, monospace`;
  const spacing = Math.max(3, fontSize * (3.4 - density * 1.4));

  // 代码雨
  if (cfg.type === "matrix") {
    const matrixSpeed = 0.5 + (cfg.speed / 100) * 2;
    for (let x = 0; x < pW; x += spacing) {
      const y = ((now * 60 * matrixSpeed * (1 + (x % 7) / 7)) % (pH + 40)) - 20;
      const char = "ABCDEF0123456789<>/{}[]()*+-=$#&".charAt(Math.floor(Math.random() * 32));
      for (let tail = 0; tail < 4; tail++) {
        const tailAlpha = Math.max(0, baseAlpha * (0.9 - tail * 0.18));
        pCtx.fillStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},${Math.min(1, tailAlpha)})`;
        pCtx.fillText(char, x, y - tail * fontSize);
      }
    }
  }
  // 粒子连线
  else if (cfg.type === "particles") {
    const count = Math.floor(20 + density * 140);
    const linkDist = (150 + density * 180) * (pW / Math.max(window.innerWidth || pW, pW));
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
        if (dist < linkDist) {
          pCtx.strokeStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},${baseAlpha * 0.35 * (1 - dist / linkDist)})`;
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
    const count = Math.floor(58 + density * 122);
    const starDrift = now * 0.05 * speed;
    for (let i = 0; i < count; i++) {
      const x = ((Math.sin(i * 12.9898 + starDrift) * 43758.5453) % 1 + 1) % 1 * pW;
      const y = ((Math.sin(i * 78.233 + starDrift * 0.8) * 12543.987) % 1 + 1) % 1 * pH;
      const twinkle = 0.5 + 0.5 * Math.sin(now * 2 + i * 0.7);
      const size = i % 9 === 0 ? 2.2 + twinkle : 0.8 + twinkle * 0.55;
      const alpha = Math.min(1, baseAlpha * (0.52 + twinkle * 0.48));
      if (i % 9 === 0) {
        const halo = pCtx.createRadialGradient(x, y, 0, x, y, size * 5);
        halo.addColorStop(0, `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha * 0.4})`);
        halo.addColorStop(1, "rgba(0,0,0,0)");
        pCtx.fillStyle = halo;
        pCtx.fillRect(x - size * 5, y - size * 5, size * 10, size * 10);
      }
      pCtx.fillStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha})`;
      pCtx.beginPath();
      pCtx.arc(x, y, size, 0, Math.PI * 2);
      pCtx.fill();
    }
  }
  // 浮尘
  else if (cfg.type === "dust") {
    const count = Math.floor(20 + density * 100);
    for (let i = 0; i < count; i++) {
      const y = ((now * 40 * speed + i * 37) % (pH + 20)) - 10;
      const x = ((Math.sin(now * 0.5 + i * 1.3) + 1) / 2) * pW;
      pCtx.fillStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},${Math.min(1, baseAlpha * 0.6)})`;
      pCtx.beginPath();
      pCtx.arc(x, y, 1.2, 0, Math.PI * 2);
      pCtx.fill();
    }
  }
  // 极光
  else if (cfg.type === "aurora") {
    const bands = [
      [0.2, 0.28, 1],
      [0.58, 0.42, 0.76],
      [0.82, 0.24, 0.58],
    ];
    const bandCount = Math.max(1, Math.round(cfg.density / 35));
    const auroraDuration = Math.max(8, 28 - cfg.speed * 0.18);
    const auroraDensityAlpha = 0.55 + density * 0.45;
    bands.slice(0, bandCount).forEach(([x, y, alpha], index) => {
      const drift = Math.sin(now * (Math.PI * 2 / auroraDuration) + index) * pW * 0.08;
      const gradient = pCtx.createRadialGradient(pW * x + drift, pH * y, 4, pW * x + drift, pH * y, pW * 0.7);
      gradient.addColorStop(0, `rgba(${rgb.r},${rgb.g},${rgb.b},${baseAlpha * alpha * auroraDensityAlpha * 0.95})`);
      gradient.addColorStop(0.36, `rgba(${rgb.r},${rgb.g},${rgb.b},${baseAlpha * alpha * auroraDensityAlpha * 0.3})`);
      gradient.addColorStop(1, "rgba(0,0,0,0)");
      pCtx.fillStyle = gradient;
      pCtx.fillRect(0, 0, pW, pH);
    });
  }
  // 流星
  else if (cfg.type === "shooting-stars") {
    const count = Math.max(2, Math.round(2 + density * 4));
    const shootingSpeed = 0.7 + (cfg.speed / 100) * 1.4;
    for (let i = 0; i < count; i++) {
      const cycle = (now * shootingSpeed * 0.18 + i * 0.37) % 1;
      const fade = Math.sin(cycle * Math.PI);
      const x = (0.22 + i * 0.2 + cycle * 0.62) * pW;
      const y = (0.04 + i * 0.12 + cycle * 0.34) * pH;
      const tailX = x - pW * 0.18;
      const tailY = y + pH * 0.14;
      const gradient = pCtx.createLinearGradient(x, y, tailX, tailY);
      const headColor = document.documentElement.dataset.theme === "light" ? rgb : { r: 255, g: 255, b: 255 };
      gradient.addColorStop(0, `rgba(${headColor.r},${headColor.g},${headColor.b},${baseAlpha * fade})`);
      gradient.addColorStop(0.16, `rgba(${rgb.r},${rgb.g},${rgb.b},${baseAlpha * fade * 0.8})`);
      gradient.addColorStop(1, "rgba(0,0,0,0)");
      pCtx.lineWidth = 1.3;
      pCtx.strokeStyle = gradient;
      pCtx.beginPath();
      pCtx.moveTo(x, y);
      pCtx.lineTo(tailX, tailY);
      pCtx.stroke();
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
  padding-right: 42px;
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
  background: var(--accent-soft-bg);
  border: 1px solid color-mix(in srgb, var(--theme-btn-hover-color) 28%, transparent);
  white-space: nowrap;

  .fx-applied-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--theme-btn-hover-color);
    box-shadow: 0 0 8px color-mix(in srgb, var(--theme-btn-hover-color) 70%, transparent);
  }
}

.fx-model-main {
  padding: 22px 30px 28px;
}

:deep(.fx-dialog) {
  overflow: hidden;
  border: 1px solid color-mix(in srgb, var(--theme-btn-hover-color) 16%, var(--border-color));
  border-radius: 24px;
  background: var(--theme-color);
  box-shadow: 0 28px 80px rgba(15, 23, 42, 0.26), 0 0 0 1px rgba(255, 255, 255, 0.04) inset;
}

:deep(.fx-dialog .el-dialog__header) {
  margin: 0;
  padding: 25px 30px 18px;
  border-bottom: 1px solid color-mix(in srgb, var(--border-color) 84%, transparent);
  background: linear-gradient(180deg, var(--accent-soft-bg), transparent 90%);
}

:deep(.fx-dialog .el-dialog__body) {
  padding: 0 !important;
}

:deep(.fx-dialog .el-dialog__headerbtn) {
  top: 20px;
  right: 20px;
  background: var(--accent-soft-bg);
  color: var(--text-secondary);
  transition: color 0.2s ease, background-color 0.2s ease, transform 0.2s ease;
}

:deep(.fx-dialog .el-dialog__headerbtn:hover) {
  background: var(--accent-soft-bg-strong);
  color: var(--theme-btn-hover-color);
  transform: rotate(90deg);
}

:deep(.fx-dialog .el-dialog__headerbtn svg) {
  fill: currentColor;
}

/* 预览面板 */
.fx-preview-wrap {
  position: relative;
  height: 190px;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid color-mix(in srgb, var(--theme-btn-hover-color) 22%, var(--border-color));
  background: #0d1117;
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.12);
  margin-bottom: 24px;
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
  display: flex;
  align-items: center;
  gap: 8px;
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

.fx-preview-base {
  padding: 5px 10px;
  border-radius: 999px;
  color: rgba(230, 237, 243, 0.78);
  background: rgba(13, 17, 23, 0.42);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  font-size: 12px;
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

.fx-preview-stats {
  position: absolute;
  right: 14px;
  bottom: 12px;
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 6px 9px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 9px;
  color: rgba(230, 237, 243, 0.72);
  background: rgba(13, 17, 23, 0.58);
  backdrop-filter: blur(8px);
  font-size: 10px;
  line-height: 1;
  white-space: nowrap;

  span + span {
    padding-left: 7px;
    border-left: 1px solid rgba(255, 255, 255, 0.14);
  }

  b {
    color: #e6edf3;
    font-family: var(--mono-font-family);
    font-weight: 600;
  }

  .fx-preview-color {
    font-family: var(--mono-font-family);
  }
}

/* 双栏 */
.fx-body {
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 24px;
}

.fx-col {
  min-width: 0;
}

.fx-block-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 12px;

  &::before {
    content: "";
    width: 3px;
    height: 14px;
    border-radius: 999px;
    background: var(--theme-btn-hover-color);
    box-shadow: 0 0 10px color-mix(in srgb, var(--theme-btn-hover-color) 55%, transparent);
  }
}

/* 底色列表 */
.fx-color-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
}

.fx-scheme-item {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 7px;
  padding: 8px 10px;
  min-height: 64px;
  border-radius: 12px;
  border: 1px solid transparent;
  cursor: pointer;
  transition: background-color 0.18s ease, border-color 0.18s ease, transform 0.18s ease, box-shadow 0.18s ease;
  outline: none;

  &:hover {
    background: var(--accent-soft-bg);
    transform: translateY(-1px);
  }

  &:focus-visible {
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--theme-btn-hover-color) 28%, transparent);
  }

  &.active {
    background: var(--accent-soft-bg-strong);
    border-color: color-mix(in srgb, var(--theme-btn-hover-color) 42%, var(--border-color));
    box-shadow: 0 8px 18px color-mix(in srgb, var(--theme-btn-hover-color) 10%, transparent);
  }
}

.fx-swatch {
  width: 100%;
  height: 25px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  flex-shrink: 0;
}

.fx-scheme-name {
  font-size: 13px;
  color: var(--color);
  padding-right: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.fx-check {
  position: absolute;
  top: 8px;
  right: 8px;
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
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 8px;
  margin-bottom: 20px;
}

.fx-effect-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 82px;
  padding: 12px 6px;
  border-radius: 14px;
  border: 1px solid var(--border-color);
  cursor: pointer;
  transition: background-color 0.18s ease, border-color 0.18s ease, transform 0.18s ease, box-shadow 0.18s ease;
  background: var(--el-fill-color-lighter, rgba(127, 127, 127, 0.04));
  color: var(--color);
  font-size: 12px;
  outline: none;

  i {
    font-size: 20px;
    color: var(--text-secondary);
    transition: color 0.18s, transform 0.18s;
  }

  small {
    color: var(--text-secondary);
    font-size: 10px;
    line-height: 1.2;
    white-space: nowrap;
  }

  &:hover {
    border-color: color-mix(in srgb, var(--theme-btn-hover-color) 48%, var(--border-color));
    transform: translateY(-2px);
    box-shadow: 0 8px 18px color-mix(in srgb, var(--theme-btn-hover-color) 10%, transparent);

    i {
      color: var(--theme-btn-hover-color);
    }
  }

  &:focus-visible {
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--theme-btn-hover-color) 28%, transparent);
  }

  &.active {
    border-color: color-mix(in srgb, var(--theme-btn-hover-color) 64%, var(--border-color));
    background: var(--accent-soft-bg-strong);
    color: var(--theme-btn-hover-color);
    box-shadow: 0 10px 22px color-mix(in srgb, var(--theme-btn-hover-color) 12%, transparent);

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
  background: var(--el-fill-color-light, rgba(127, 127, 127, 0.05));
  border: 1px solid var(--border-color);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
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
  flex-wrap: wrap;
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
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--theme-btn-hover-color) 28%, transparent);
  }

  &.active {
    border-color: var(--accent-contrast, #0d1117);
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

/* 主题设置 */
.fx-theme-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 16px;
  border-radius: 14px;
  background: var(--el-fill-color-light, rgba(230, 237, 243, 0.03));
  border: 1px solid var(--border-color);
  margin-top: 24px;
  margin-bottom: 22px;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
}

.fx-theme-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.fx-theme-label {
  font-size: 14px;
  font-weight: 600;
  color: var(--color);
}

.fx-theme-desc {
  font-size: 12px;
  color: var(--text-secondary);
  line-height: 1.5;
}

/* 底部 */
.fx-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-top: 0;
  padding-top: 20px;
  border-top: 1px solid var(--border-color);
}

.fx-btn {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  min-height: 42px;
  padding: 10px 20px;
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
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--theme-btn-hover-color) 28%, transparent);
  }

  &.ghost {
    background: var(--theme-color);
    border-color: var(--border-color);
    color: var(--text-secondary);

    &:hover {
      color: var(--color);
      border-color: var(--theme-btn-hover-color);
      background: var(--accent-soft-bg);
      transform: translateY(-1px);
    }
  }

  &.primary {
    background: var(--theme-btn-hover-color);
    color: var(--accent-contrast, #0d1117);

    &:hover {
      opacity: 0.92;
      transform: translateY(-1px);
      box-shadow: 0 6px 20px rgba(34, 211, 238, 0.3);
    }

    &:active,
    &.is-pressed {
      transform: translateY(0);
      box-shadow: none;
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
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 8px;
  }

  .fx-scheme-item {
    flex: 1 1 calc(50% - 8px);
    max-width: none;
    min-height: 0;
    flex-direction: row;
    align-items: center;
  }

  .fx-effect-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .fx-preview-wrap {
    height: 150px;
  }

  .fx-model-main {
    padding: 18px 22px 24px;
  }

  :deep(.fx-dialog .el-dialog__header) {
    padding: 22px 22px 16px;
  }
}

@media (max-width: 480px) {
  .fx-model-main {
    padding: 16px 16px 20px;
  }

  :deep(.fx-dialog .el-dialog__header) {
    padding: 20px 16px 14px;
  }

  :deep(.fx-dialog .el-dialog__headerbtn) {
    top: 16px;
    right: 14px;
  }

  .fx-dialog-header {
    padding-right: 34px;
  }

  .fx-model-title {
    font-size: 18px;
  }

  .fx-model-subtitle {
    font-size: 12px;
  }

  .fx-effect-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .fx-applied-tag {
    display: none;
  }

  .fx-preview-stats {
    right: 10px;
    left: 10px;
    justify-content: center;
    gap: 5px;
    font-size: 9px;
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
