<template>
  <div class="article-skeleton">
    <div class="skeleton-card" v-for="n in 5" :key="n" v-slid-in>
      <div class="skeleton skeleton-cover"></div>
      <div class="skeleton-card-body">
        <div class="skeleton skeleton-badge"></div>
        <div class="skeleton skeleton-title"></div>
        <div class="skeleton skeleton-line"></div>
        <div class="skeleton skeleton-line skeleton-line-short"></div>
        <div class="skeleton skeleton-meta"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { vSlidIn } from "@/utils/vSlidIn.js";
</script>

<style scoped>
.skeleton {
  background-color: var(--skeleton-bg, var(--theme-color));
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
    var(--skeleton-highlight, rgba(255, 255, 255, 0.6)) 50%,
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

.skeleton-card {
  display: flex;
  min-height: 188px;
  margin-bottom: 20px;
  overflow: hidden;
  border: 1px solid var(--border-color);
  border-radius: var(--theme-radius);
  background: var(--theme-color);
}

.skeleton-cover {
  flex: 0 0 250px;
  min-height: 188px;
}

.skeleton-card-body {
  flex: 1;
  min-width: 0;
  padding: 22px 24px;
}

.skeleton-badge {
  width: 82px;
  height: 22px;
  border-radius: 999px;
}

.skeleton-title {
  width: 68%;
  height: 24px;
  margin-top: 14px;
}

.skeleton-line {
  width: 92%;
  height: 14px;
  margin-top: 14px;
}

.skeleton-line-short {
  width: 72%;
  margin-top: 8px;
}

.skeleton-meta {
  width: 42%;
  height: 12px;
  margin-top: 22px;
}

@media (max-width: 860px) {
  .skeleton-card {
    display: block;
    min-height: 0;
  }

  .skeleton-cover {
    width: 100%;
    min-height: 0;
    aspect-ratio: 16 / 8;
  }

  .skeleton-card-body {
    padding: 16px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .skeleton::after {
    animation: none;
  }
}
</style>
