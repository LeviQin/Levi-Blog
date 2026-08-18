<template>
  <div class="particle-network">
    <canvas ref="canvasRef"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { useMainStore } from "@/stores/mainStore";
import { getEffectRgb } from "@/utils/effectColor";

// 粒子连线网络：粒子缓慢漂移，近距离互连成线，鼠标经过吸引
const canvasRef = ref(null);
const mainStore = useMainStore();
let ctx = null;
let rafId = null;
let canvasWidth = 0;
let canvasHeight = 0;
let running = false;
let particles = [];
let mouse = { x: -9999, y: -9999 };

const rebuild = () => {
  const cfg = mainStore.fxConfig;
  const count = Math.floor(20 + (cfg.density / 100) * 140); // 20-160 个粒子
  particles = new Array(count).fill(0).map(() => ({
    x: Math.random() * canvasWidth,
    y: Math.random() * canvasHeight,
    vx: (Math.random() - 0.5) * 0.6,
    vy: (Math.random() - 0.5) * 0.6,
    r: 1.2 + Math.random() * 1.6,
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
  const linkDist = 150 + (cfg.density / 100) * 180; // 密度越大连线距离越远

  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  // 移动粒子
  for (const p of particles) {
    p.x += p.vx * speedFactor;
    p.y += p.vy * speedFactor;
    if (p.x < 0) p.x = canvasWidth;
    if (p.x > canvasWidth) p.x = 0;
    if (p.y < 0) p.y = canvasHeight;
    if (p.y > canvasHeight) p.y = 0;
  }

  // 连线
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const a = particles[i];
      const b = particles[j];
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < linkDist) {
        const alpha = baseAlpha * (1 - dist / linkDist) * 0.6;
        ctx.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }
  }

  // 鼠标连线
  for (const p of particles) {
    const dx = p.x - mouse.x;
    const dy = p.y - mouse.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 160) {
      const alpha = baseAlpha * (1 - dist / 160) * 0.5;
      ctx.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(mouse.x, mouse.y);
      ctx.stroke();
    }
  }

  // 画粒子
  for (const p of particles) {
    ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${Math.min(1, baseAlpha * 1.3)})`;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
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

const handleMouseMove = (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
};

const handleMouseLeave = () => {
  mouse.x = -9999;
  mouse.y = -9999;
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
  window.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseleave", handleMouseLeave);
});

onBeforeUnmount(() => {
  running = false;
  if (rafId) cancelAnimationFrame(rafId);
  rafId = null;
  document.removeEventListener("visibilitychange", handleVisibility);
  window.removeEventListener("resize", handleResize);
  window.removeEventListener("mousemove", handleMouseMove);
  document.removeEventListener("mouseleave", handleMouseLeave);
});
</script>

<style scoped>
.particle-network {
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
