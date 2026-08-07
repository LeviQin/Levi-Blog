<template>
  <div
    class="float-tool-bar"
    :class="{ 'is-left': isLeft }"
    ref="toolBarRef"
  >
    <Transition name="tool-fade">
      <button
        v-if="showBackTop"
        class="tool-btn"
        title="回到顶部"
        @click="backToTop"
      >
        <i class="bi bi-rocket-fill"></i>
      </button>
    </Transition>

    <button
      class="tool-btn toggle-btn"
      :title="showToolBar ? '收起工具栏' : '展开工具栏'"
      @click="showToolBar = !showToolBar"
    >
      <i class="bi" :class="showToolBar ? 'bi-chevron-bar-contract' : 'bi-chevron-bar-expand'"></i>
    </button>

    <Transition name="tool-fade">
      <div v-if="showToolBar" class="tool-group">
        <button
          class="tool-btn"
          :title="isLeft ? '移至右侧' : '移至左侧'"
          @click="isLeft = !isLeft"
        >
          <i class="bi" :class="isLeft ? 'bi-chevron-right' : 'bi-chevron-left'"></i>
        </button>

        <button
          class="tool-btn"
          title="切换背景特效"
          @click="clickSwitchWallpaper"
        >
          <i class="bi bi-stars"></i>
        </button>

        <button
          class="tool-btn"
          :title="isDark ? '切换到亮色' : '切换到暗色'"
          @click="toggleTheme"
        >
          <i class="bi" :class="isDark ? 'bi-sun' : 'bi-moon-stars'"></i>
        </button>
      </div>
    </Transition>

    <switch-wallpaper ref="switchWallpaperRef"></switch-wallpaper>
    <set-model ref="setModelRef"></set-model>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { scrollAnimation } from "@/utils/scrollAnimation.js";
import SwitchWallpaper from "../SwitchWallpaper/Index.vue";
import SetModel from "../SetModel/Index.vue";
import { useTheme } from "@/hooks/useTheme";

const { theme, toggleTheme } = useTheme();
const isDark = computed(() => theme.value === "dark");

const switchWallpaperRef = ref(null);
const setModelRef = ref(null);
const toolBarRef = ref(null);
const showToolBar = ref(true);
const isLeft = ref(false);
const showBackTop = ref(false);

let scrollTimer = null;

const handleScroll = () => {
  if (scrollTimer) return;
  scrollTimer = requestAnimationFrame(() => {
    showBackTop.value = window.scrollY > 300;
    scrollTimer = null;
  });
};

const backToTop = () => {
  scrollAnimation(window.scrollY, "top");
};

const clickSwitchWallpaper = () => {
  switchWallpaperRef.value?.show();
};

onMounted(() => {
  handleScroll();
  window.addEventListener("scroll", handleScroll, { passive: true });
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
  if (scrollTimer) cancelAnimationFrame(scrollTimer);
});
</script>

<style lang="scss" scoped>
.float-tool-bar {
  position: fixed;
  right: 8px;
  bottom: 40px;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 10px 8px;
  border-radius: 32px;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  transition:
    right 0.35s cubic-bezier(0.25, 0.8, 0.25, 1.2),
    left 0.35s cubic-bezier(0.25, 0.8, 0.25, 1.2);

  &.is-left {
    right: auto;
    left: 8px;
  }
}

.tool-btn {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  border: none;
  background: var(--btn-tag-bg-color);
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.25s cubic-bezier(0.25, 0.8, 0.25, 1.2);
  outline: none;
  -webkit-tap-highlight-color: transparent;
  box-shadow: 0 2px 8px rgba(34, 211, 238, 0.25);

  .bi {
    font-size: 16px;
    transition: transform 0.25s;
    pointer-events: none;
  }

  &:hover {
    background: var(--theme-btn-hover-color);
    transform: translateY(-2px);
    box-shadow: 0 4px 14px rgba(34, 211, 238, 0.35);

    .bi {
      transform: scale(1.1);
    }
  }

  &:active {
    transform: scale(0.92);
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  }
}

.tool-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.tool-fade-enter-active {
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1.2);
}

.tool-fade-leave-active {
  transition: all 0.2s cubic-bezier(0.55, 0, 0.55, 0.2);
}

.tool-fade-enter-from {
  opacity: 0;
  transform: scale(0.7) translateY(6px);
}

.tool-fade-leave-to {
  opacity: 0;
  transform: scale(0.7) translateY(4px);
}

@media (max-width: 768px) {
  .float-tool-bar {
    right: 4px;
    bottom: 30px;
    gap: 8px;
    padding: 8px 6px;
    border-radius: 28px;
  }

  .tool-btn {
    width: 32px;
    height: 32px;
    border-radius: 8px;

    .bi {
      font-size: 14px;
    }
  }
}
</style>
