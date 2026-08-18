<template>
  <div class="shooting-stars" aria-hidden="true">
    <canvas ref="canvasRef"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { useMainStore } from "@/stores/mainStore";
import { getEffectRgb } from "@/utils/effectColor";

// 流星：随机出生点、速度、角度和拖尾，避免固定 CSS 线段带来的机械感
const canvasRef = ref(null);
const mainStore = useMainStore();
let ctx = null;
let rafId = null;
let lastTime = 0;
let canvasWidth = 0;
let canvasHeight = 0;
let running = false;
let meteors = [];

const random = (min, max) => min + Math.random() * (max - min);

const resetMeteor = (meteor, initial = false) => {
  const angle = random(Math.PI * 0.18, Math.PI * 0.29);
  const speed = random(0.42, 0.9);
  const startsFromRight = Math.random() > 0.48;

  meteor.x = startsFromRight ? canvasWidth * random(0.86, 1.14) : canvasWidth * random(0.02, 1.08);
  meteor.y = startsFromRight ? canvasHeight * random(0.03, 0.62) : canvasHeight * random(-0.08, 0.08);
  meteor.vx = -Math.cos(angle) * speed;
  meteor.vy = Math.sin(angle) * speed;
  meteor.length = random(90, 180);
  meteor.size = random(0.8, 1.7);
  meteor.life = random(650, 1250);
  meteor.age = initial ? -random(0, 4200) : -random(700, 4200);
};

const rebuild = () => {
  const count = Math.max(2, Math.round(2 + (mainStore.fxConfig.density / 100) * 4));
  meteors = new Array(count).fill(null).map(() => ({}));
  meteors.forEach((meteor) => resetMeteor(meteor, true));
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

const drawMeteor = (meteor, rgb, alpha) => {
  const progress = meteor.age / meteor.life;
  const fadeIn = Math.min(1, meteor.age / 140);
  const fadeOut = Math.min(1, (1 - progress) / 0.28);
  const fade = Math.max(0, Math.min(fadeIn, fadeOut)) * alpha;
  const tailX = meteor.x - meteor.vx * meteor.length;
  const tailY = meteor.y - meteor.vy * meteor.length;
  const headRgb = document.documentElement.dataset.theme === "light" ? rgb : { r: 255, g: 255, b: 255 };

  ctx.save();
  ctx.globalCompositeOperation = "lighter";

  const trail = ctx.createLinearGradient(meteor.x, meteor.y, tailX, tailY);
  trail.addColorStop(0, `rgba(255, 255, 255, ${Math.min(1, fade * 1.1)})`);
  trail.addColorStop(0.12, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${fade * 0.92})`);
  trail.addColorStop(0.5, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${fade * 0.32})`);
  trail.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.strokeStyle = trail;
  ctx.lineWidth = meteor.size * 1.45;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(meteor.x, meteor.y);
  ctx.lineTo(tailX, tailY);
  ctx.stroke();

  const head = ctx.createRadialGradient(meteor.x, meteor.y, 0, meteor.x, meteor.y, meteor.size * 9);
  head.addColorStop(0, `rgba(${headRgb.r}, ${headRgb.g}, ${headRgb.b}, ${Math.min(1, fade)})`);
  head.addColorStop(0.18, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${fade * 0.9})`);
  head.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = head;
  ctx.fillRect(meteor.x - meteor.size * 9, meteor.y - meteor.size * 9, meteor.size * 18, meteor.size * 18);

  ctx.restore();
};

const draw = (time) => {
  if (!running || !ctx) return;
  const delta = Math.min(40, lastTime ? time - lastTime : 16);
  lastTime = time;
  const cfg = mainStore.fxConfig;
  const rgb = getEffectRgb(cfg.color);
  const alpha = cfg.opacity / 100;
  const speedFactor = 0.7 + (cfg.speed / 100) * 1.4;

  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  for (const meteor of meteors) {
    meteor.age += delta * speedFactor;
    if (meteor.age >= 0 && meteor.age < meteor.life) {
      meteor.x += meteor.vx * delta * speedFactor;
      meteor.y += meteor.vy * delta * speedFactor;
      drawMeteor(meteor, rgb, alpha);
    } else if (meteor.age >= meteor.life) {
      resetMeteor(meteor);
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
    lastTime = 0;
    rafId = requestAnimationFrame(draw);
  }
};

const handleResize = () => setupCanvas();

watch(
  () => mainStore.fxConfig,
  () => rebuild(),
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
.shooting-stars {
  position: fixed;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: -1;
}

canvas {
  display: block;
}
</style>
