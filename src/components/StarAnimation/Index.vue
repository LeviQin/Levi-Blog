<template>
  <div class="stars-container">
    <div
      v-for="star in stars"
      class="star"
      :style="{ top: star.top + 'px', left: star.left + 'px' }"
    ></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const stars = ref([]);

// 生成星星
const generateRandomStar = () => {
  const top = Math.random() * window.innerHeight;
  const left = Math.random() * window.innerWidth;
  return { top, left };
};

// 初始化页面加载时的星星
const initStars = () => {
  for (let i = 0; i < 50; i++) {
    stars.value.push(generateRandomStar());
  }
};

onMounted(() => {
  initStars();
});
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

.star {
  position: absolute;
  width: 2px;
  height: 2px;
  background-color: #fff;
  border-radius: 50%;
  animation: twinkle 1s infinite;
}

@keyframes twinkle {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}
</style>
