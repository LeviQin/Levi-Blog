<template>
  <div class="dust-particles">
    <canvas ref="canvasRef"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { useMainStore } from "@/stores/mainStore";
import { getEffectRgb } from "@/utils/effectColor";

// 浮尘光点：细微光点上浮，最克制低调
const canvasRef = ref(null);
const mainStore = useMainStore();
let ctx = null;
let rafId = null;
let canvasWidth = 0;
let canvasHeight = 0;
let running = false;
let dust = [];

const rebuild = () => {
  const cfg = mainStore.fxConfig;
  const count = Math.floor(20 + (cfg.density / 100) * 100); // 20-120 个浮尘
  dust = new Array(count).fill(0).map(() => ({
    x: Math.random() * canvasWidth,
    y: Math.random() * canvasHeight,
    size: Math.random() * 1.5 + 0.5,
    opacity: Math.random() * 0.45 + 0.35,
    vy: -(Math.random() * 0.3 + 0.1), // 上浮
    drift: (Math.random() - 0.5) * 0.2,
    phase: Math.random() * Math.PI * 2,
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
  const rgb = getEffectRgb(cfg.color);
  const baseAlpha = cfg.opacity / 100;
  const speedFactor = 0.4 + (cfg.speed / 100) * 1.2;
  const now = Date.now() / 1000;

  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  for (const d of dust) {
    d.y += d.vy * speedFactor;
    d.x += d.drift * speedFactor + Math.sin(now + d.phase) * 0.08;
    if (d.y < -5) {
      d.y = canvasHeight + 5;
      d.x = Math.random() * canvasWidth;
    }
    if (d.x < -5) d.x = canvasWidth + 5;
    if (d.x > canvasWidth + 5) d.x = -5;

    const alpha = baseAlpha * d.opacity;
    ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${Math.min(1, alpha)})`;
    ctx.beginPath();
    ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2);
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
.dust-particles {
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
