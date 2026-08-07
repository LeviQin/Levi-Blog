<template>
  <div class="star-field">
    <canvas ref="canvasRef"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { useMainStore } from "@/stores/mainStore";

// 星空粒子：星星闪烁 + 缓慢漂移，克制低调
const canvasRef = ref(null);
const mainStore = useMainStore();
let ctx = null;
let rafId = null;
let canvasWidth = 0;
let canvasHeight = 0;
let running = false;
let stars = [];

const hexToRgb = (hex) => {
  const h = hex.replace("#", "");
  return {
    r: parseInt(h.substring(0, 2), 16),
    g: parseInt(h.substring(2, 4), 16),
    b: parseInt(h.substring(4, 6), 16),
  };
};

const rebuild = () => {
  const cfg = mainStore.fxConfig;
  const count = Math.floor((cfg.density / 100) * 120); // 0-120 颗星
  stars = new Array(count).fill(0).map(() => ({
    x: Math.random() * canvasWidth,
    y: Math.random() * canvasHeight,
    size: Math.random() * 1.8 + 0.4,
    baseOpacity: Math.random() * 0.5 + 0.3,
    twinkleSpeed: Math.random() * 0.03 + 0.008,
    phase: Math.random() * Math.PI * 2,
    vx: (Math.random() - 0.5) * 0.2,
    vy: (Math.random() - 0.5) * 0.2,
  }));
};

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
  rebuild();
};

const draw = () => {
  if (!running) return;
  const cfg = mainStore.fxConfig;
  const rgb = hexToRgb(cfg.color);
  const baseAlpha = cfg.opacity / 100;
  const speedFactor = 0.4 + (cfg.speed / 100) * 1.2;
  const now = Date.now() / 1000;

  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  for (const s of stars) {
    s.x += s.vx * speedFactor;
    s.y += s.vy * speedFactor;
    if (s.x < -5) s.x = canvasWidth + 5;
    if (s.x > canvasWidth + 5) s.x = -5;
    if (s.y < -5) s.y = canvasHeight + 5;
    if (s.y > canvasHeight + 5) s.y = -5;

    // 闪烁：sin 波驱动
    const twinkle = 0.5 + 0.5 * Math.sin(now * s.twinkleSpeed * 100 + s.phase);
    const alpha = baseAlpha * s.baseOpacity * (0.4 + twinkle * 0.6);

    ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${Math.min(1, alpha)})`;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
    ctx.fill();
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

watch(
  () => mainStore.fxConfig,
  () => {
    rebuild();
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
.star-field {
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
