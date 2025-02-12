<template>
  <div class="article-skeleton">
    <div class="skeleton skeleton-paragraph" v-for="n in 10" :key="n" v-slid-in></div>
  </div>
</template>

<script setup>
import { vSlidIn } from "@/utils/vSlidIn.js";
</script>

<style scoped>
.skeleton {
  background-color: var(--theme-color);
  border-radius: 8px;
  position: relative;
  overflow: hidden;
  backface-visibility: hidden;
}

.skeleton::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent 10%,
    rgba(255, 255, 255, 0.6) 50%,
    transparent 90%
  );
  transform: translateX(-100%);
  animation: shimmer 1.5s ease-in-out infinite;
  will-change: transform;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%) skewX(-15deg);
  }
  60% {
    transform: translateX(100%) skewX(-15deg);
  }
  100% {
    transform: translateX(100%) skewX(-15deg);
  }
}

.skeleton-paragraph {
  width: 100%;
  height: 100px;
  margin-bottom: 20px;
}
</style>
