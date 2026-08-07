<template>
  <div class="matrix-rain">
    <canvas ref="canvasRef"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

// 克制低调的代码雨背景：canvas 保持透明(clearRect)，青色字符渐变拖尾，不遮挡底层光晕
const canvasRef = ref(null);
let ctx = null;
let rafId = null;
let fontSize = 16;
let canvasWidth = 0;
let canvasHeight = 0;
let running = false;
// 每列一个下落对象：{ cursor: 字符游标, y: 当前头部y, speed: 下落速度, len: 拖尾长度 }
let drops = [];
const CHARS = "0123456789ABCDEF<>/{}[]()*+-=#$&@:%.;!?~^_`|".split("");

const setupCanvas = () => {
  const canvas = canvasRef.value;
  if (!canvas) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2); // 限制最高 2x，控制高 DPI 开销
  canvasWidth = window.innerWidth;
  canvasHeight = window.innerHeight;
  canvas.width = canvasWidth * dpr;
  canvas.height = canvasHeight * dpr;
  ctx = canvas.getContext("2d");
  ctx.scale(dpr, dpr);
  ctx.font = `${fontSize}px ui-monospace, Menlo, Consolas, monospace`;

  const colCount = Math.ceil(canvasWidth / (fontSize * 2.2));
  drops = new Array(colCount).fill(0).map(() => ({
    cursor: Math.floor(Math.random() * CHARS.length),
    y: Math.floor(Math.random() * -40), // 从顶部上方随机起点，错开节奏
    speed: 0.5 + Math.random() * 0.9,
    len: Math.floor(8 + Math.random() * 14),
  }));
};

const draw = () => {
  if (!running) return;
  // 每帧清空，保持 canvas 透明，光晕背景始终可见
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  for (let i = 0; i < drops.length; i++) {
    const drop = drops[i];
    const x = i * fontSize * 2.2;

    // 从头部往回画拖尾：稳定字符流，头部最亮，尾部渐隐
    for (let k = 0; k < drop.len; k++) {
      const y = drop.y - k * fontSize;
      if (y < 0 || y > canvasHeight) continue;
      const char = CHARS[(drop.cursor - k + CHARS.length) % CHARS.length];
      if (k === 0) {
        ctx.fillStyle = "rgba(125, 233, 245, 0.9)";
      } else {
        const alpha = Math.max(0, 0.55 - k * 0.045);
        ctx.fillStyle = `rgba(34, 211, 238, ${alpha})`;
      }
      ctx.fillText(char, x, y);
    }

    drop.cursor = (drop.cursor + 1) % CHARS.length;
    drop.y += drop.speed;

    // 触底后延迟随机重置，形成不均匀节奏
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
