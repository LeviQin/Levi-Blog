<template>
  <div class="star-field">
    <canvas ref="canvasRef"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { useMainStore } from "@/stores/mainStore";
import { getEffectRgb } from "@/utils/effectColor";

// 星空粒子：大小分层、闪烁、微弱星云和缓慢漂移
const canvasRef = ref(null);
const mainStore = useMainStore();
let ctx = null;
let rafId = null;
let canvasWidth = 0;
let canvasHeight = 0;
let running = false;
let stars = [];

const rebuild = () => {
  const cfg = mainStore.fxConfig;
  const count = Math.floor(58 + (cfg.density / 100) * 122);
  stars = new Array(count).fill(0).map(() => ({
    x: Math.random() * canvasWidth,
    y: Math.random() * canvasHeight,
    size: Math.random() > 0.9 ? Math.random() * 1.8 + 1.4 : Math.random() * 1.15 + 0.45,
    baseOpacity: Math.random() * 0.4 + 0.55,
    twinkleSpeed: Math.random() * 0.7 + 0.35,
    phase: Math.random() * Math.PI * 2,
    vx: (Math.random() - 0.5) * 0.12,
    vy: (Math.random() - 0.5) * 0.12,
    isBright: Math.random() > 0.86,
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

  // 极淡的星云层，让星空不会只剩零散的点
  const nebulae = [
    [0.16, 0.28, 0.28],
    [0.74, 0.46, 0.22],
    [0.48, 0.86, 0.16],
  ];
  for (const [x, y, alpha] of nebulae) {
    const radius = Math.max(canvasWidth, canvasHeight) * 0.46;
    const nebula = ctx.createRadialGradient(canvasWidth * x, canvasHeight * y, 0, canvasWidth * x, canvasHeight * y, radius);
    nebula.addColorStop(0, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${baseAlpha * alpha})`);
    nebula.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = nebula;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  }

  for (const s of stars) {
    s.x += s.vx * speedFactor;
    s.y += s.vy * speedFactor;
    if (s.x < -5) s.x = canvasWidth + 5;
    if (s.x > canvasWidth + 5) s.x = -5;
    if (s.y < -5) s.y = canvasHeight + 5;
    if (s.y > canvasHeight + 5) s.y = -5;

    // 闪烁：每颗星速度不同，避免整片同步呼吸
    const twinkle = 0.5 + 0.5 * Math.sin(now * s.twinkleSpeed + s.phase);
    const alpha = baseAlpha * s.baseOpacity * (0.55 + twinkle * 0.45);

    if (s.isBright) {
      const halo = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.size * 7);
      halo.addColorStop(0, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${Math.min(0.35, alpha * 0.42)})`);
      halo.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = halo;
      ctx.fillRect(s.x - s.size * 7, s.y - s.size * 7, s.size * 14, s.size * 14);
    }

    ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${Math.min(1, alpha)})`;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
    ctx.fill();

    if (s.isBright && twinkle > 0.8) {
      ctx.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${Math.min(0.7, alpha)})`;
      ctx.lineWidth = 0.6;
      ctx.beginPath();
      ctx.moveTo(s.x - s.size * 3.2, s.y);
      ctx.lineTo(s.x + s.size * 3.2, s.y);
      ctx.moveTo(s.x, s.y - s.size * 3.2);
      ctx.lineTo(s.x, s.y + s.size * 3.2);
      ctx.stroke();
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
