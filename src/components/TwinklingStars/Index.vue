<template>
  <div class="stars-container">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const canvas = ref(null);
const ctx = ref(null);
const stars = ref([]);

const generateRandomStar = () => {
  const top = Math.random() * window.innerHeight;
  const left = Math.random() * window.innerWidth;
  const size = Math.random() * 2 + 1;
  const opacity = Math.random() * 0.5 + 0.5;
  return { top, left, size, opacity };
};

const initStars = (num) => {
  for (let i = 0; i < num; i++) {
    stars.value.push(generateRandomStar());
  }
};

const drawStars = () => {
  ctx.value.clearRect(0, 0, window.innerWidth, window.innerHeight);

  stars.value.forEach((star) => {
    // 控制透明度变化
    star.opacity -= 0.01;
    if (star.opacity <= 0) {
      star.opacity = 1;
      star.top = Math.random() * window.innerHeight;
      star.left = Math.random() * window.innerWidth;
    }

    ctx.value.beginPath();
    ctx.value.arc(star.left, star.top, star.size, 0, Math.PI * 2);
    ctx.value.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
    ctx.value.fill();
  });
};

onMounted(() => {
  canvas.value = document.querySelector("canvas");
  ctx.value = canvas.value.getContext("2d");

  // 设置 canvas 的宽度和高度为窗口的宽度和高度
  canvas.value.width = window.innerWidth;
  canvas.value.height = window.innerHeight;

  initStars(100);
  animateStars();
});

onBeforeUnmount(() => {
  stars.value = [];
});

const animateStars = () => {
  drawStars();
  requestAnimationFrame(animateStars);
};
</script>

<style scoped>
.stars-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

canvas {
  display: block;
}
</style>
