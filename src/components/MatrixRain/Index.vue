<template>
  <div class="matrix-rain">
    <canvas ref="canvasRef"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { useMainStore } from "@/stores/mainStore";
import { getEffectRgb } from "@/utils/effectColor";

// 克制低调的代码雨背景：canvas 保持透明(clearRect)，字符渐变拖尾，不遮挡底层光晕
const canvasRef = ref(null);
const mainStore = useMainStore();
let ctx = null;
let rafId = null;
let fontSize = 16;
let canvasWidth = 0;
let canvasHeight = 0;
let running = false;
let drops = [];
const CHARS = "0123456789ABCDEF<>/{}[]()*+-=#$&@:%.;!?~^_`|".split("");

// 颜色工具：hex -> rgba
const setupCanvas = () => {
  const canvas = canvasRef.value;
  if (!canvas) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvasWidth = window.innerWidth;
  canvasHeight = window.innerHeight;
  canvas.width = canvasWidth * dpr;
  canvas.height = canvasHeight * dpr;
  ctx = canvas.getContext("2d");
  ctx.scale(dpr, dpr);
  ctx.font = `${fontSize}px ui-monospace, Menlo, Consolas, monospace`;
  rebuildColumns();
};

const rebuildColumns = () => {
  const cfg = mainStore.fxConfig;
  // density: 0-100 -> 列间距因子，越大越密
  const spacing = 3.4 - (cfg.density / 100) * 1.4; // 3.4(稀) ~ 2.0(密)
  const colCount = Math.ceil(canvasWidth / (fontSize * spacing));
  drops = new Array(colCount).fill(0).map(() => ({
    cursor: Math.floor(Math.random() * CHARS.length),
    y: Math.floor(Math.random() * -60),
    speed: 0.5 + Math.random() * 0.9,
    len: Math.floor(6 + Math.random() * 14),
  }));
};

const draw = () => {
  if (!running) return;
  const cfg = mainStore.fxConfig;
  const rgb = getEffectRgb(cfg.color);
  // 透明度/强度映射到字符 alpha
  const baseAlpha = (cfg.opacity / 100) * 0.9;
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  const spacing = 3.4 - (cfg.density / 100) * 1.4;
  const speedFactor = 0.5 + (cfg.speed / 100) * 2;

  for (let i = 0; i < drops.length; i++) {
    const drop = drops[i];
    const x = i * fontSize * spacing;

    for (let k = 0; k < drop.len; k++) {
      const y = drop.y - k * fontSize;
      if (y < 0 || y > canvasHeight) continue;
      const char = CHARS[(drop.cursor - k + CHARS.length) % CHARS.length];
      if (k === 0) {
        ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${Math.min(1, baseAlpha * 1.2)})`;
      } else {
        const alpha = Math.max(0, baseAlpha * 0.6 - k * 0.045);
        ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
      }
      ctx.fillText(char, x, y);
    }

    drop.cursor = (drop.cursor + 1) % CHARS.length;
    drop.y += drop.speed * speedFactor;

    if (drop.y > canvasHeight + drop.len * fontSize && Math.random() > 0.975) {
      drop.y = Math.floor(Math.random() * -60);
      drop.speed = 0.5 + Math.random() * 0.9;
    }
  }

  rafId = requestAnimationFrame(draw);
};

const handleVisibility = () => {
  if (document.hidden) {
    running = false;
    if (rafId) cancelAnimationFrame(rafId);
    rafId = null;
  } else if (!running) {
    running = true;
    rafId = requestAnimationFrame(draw);
  }
};

const handleResize = () => {
  if (!canvasRef.value) return;
  setupCanvas();
};

// 配置变化：密度变化需重建列，其余直接生效
watch(
  () => mainStore.fxConfig,
  () => {
    rebuildColumns();
  },
  { deep: true }
);

onMounted(() => {
  setupCanvas();
  running = true;
  rafId = requestAnimationFrame(draw);
  document.addEventListener("visibilitychange", handleVisibility);
  window.addEventListener("resize", handleResize);
});

onBeforeUnmount(() => {
  running = false;
  if (rafId) cancelAnimationFrame(rafId);
  rafId = null;
  document.removeEventListener("visibilitychange", handleVisibility);
  window.removeEventListener("resize", handleResize);
});
</script>

<style scoped>
.matrix-rain {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1;
}

canvas {
  display: block;
}
</style>
