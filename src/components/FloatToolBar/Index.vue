<template>
  <div class="float-tool-bar">
    <div class="back-top-btn btn-item" title="回到顶部" @click="backToTop">
      <i class="bi bi-rocket-fill"></i>
      <span class="btn-ripple"></span>
    </div>
    <div
      v-if="showToolBar"
      class="close-btn btn-item"
      title="收起工具栏"
      @click="awayToolbar"
    >
      <i class="bi bi-arrow-right-circle"></i>
      <span class="btn-ripple"></span>
    </div>
    <div v-else class="open-btn btn-item" title="打开工具栏" @click="awayToolbar">
      <i class="bi bi-arrow-left-circle"></i>
      <span class="btn-ripple"></span>
    </div>
    <template v-if="showToolBar">
      <div
        class="move-right-btn btn-item"
        title="移至右侧"
        @click="clickMoveBtn"
        v-if="isLeft"
      >
        <i class="bi bi-chevron-right"></i>
        <span class="btn-ripple"></span>
      </div>
      <div class="move-left-btn btn-item" title="移至左侧" @click="clickMoveBtn" v-else>
        <i class="bi bi-chevron-left"></i>
        <span class="btn-ripple"></span>
      </div>
    </template>
    <div
      class="switch-wallpaper-btn btn-item"
      title="切换壁纸"
      @click="clickSwitchWallpaper"
      v-if="showToolBar"
    >
      <i class="bi bi-ubuntu"></i>
      <span class="btn-ripple"></span>
    </div>
    <!-- <template v-if="showToolBar">
      <div
        class="light-btn btn-item"
        title="白天模式"
        @click="toggleTheme"
        v-if="theme === `dark`"
      >
        <i class="bi bi-brightness-high-fill"></i>
        <span class="btn-ripple"></span>
      </div>
      <div class="dark-btn btn-item" title="黑暗模式" @click="toggleTheme" v-else>
        <i class="bi bi-moon-stars"></i>
        <span class="btn-ripple"></span>
      </div>
    </template> -->
    <!-- <div
      class="gear-btn btn-item"
      title="基础设置"
      @click="showSetModel"
      v-if="showToolBar"
    >
      <i class="bi bi-gear"></i>
      <span class="btn-ripple"></span>
    </div> -->

    <switch-wallpaper ref="switchWallpaperRef"></switch-wallpaper>

    <set-model ref="setModelRef"></set-model>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { scrollAnimation } from "@/utils/scrollAnimation.js";
import SwitchWallpaper from "../SwitchWallpaper/Index.vue";
import SetModel from "../SetModel/Index.vue";
import { useTheme } from "@/hooks/useTheme.js";

const { theme, toggleTheme } = useTheme();

// 响应式状态
const scrollTop = ref(0);
const switchWallpaperRef = ref(null);
const showToolBar = ref(true);
const setModelRef = ref(null);
const isLeft = ref(false);
const isAnimating = ref(false);

// 节流函数，优化滚动性能
const throttle = (fn, delay) => {
  let timer = null;
  return function() {
    if (timer) return;
    timer = setTimeout(() => {
      fn.apply(this, arguments);
      timer = null;
    }, delay);
  };
};

// 处理滚动事件，控制回到顶部按钮的显示/隐藏
const handleScroll = throttle(() => {
  scrollTop.value = document.documentElement.scrollTop || document.body.scrollTop;
  const backTopBtn = document.querySelector(".back-top-btn");
  
  if (backTopBtn) {
    if (scrollTop.value > 300) {
      backTopBtn.style.transform = `translateY(0)`;
      backTopBtn.style.opacity = 1;
    } else {
      backTopBtn.style.transform = `translateY(40px)`;
      backTopBtn.style.opacity = 0;
    }
  }
}, 100);

// 切换工具栏显示/隐藏状态
const awayToolbar = () => {
  if (isAnimating.value) return;
  isAnimating.value = true;
  
  const toolBar = document.querySelector(".float-tool-bar");
  
  if (showToolBar.value) {
    // 收起工具栏时添加过渡动画
    const items = toolBar.querySelectorAll(".btn-item:not(.open-btn):not(.close-btn)");
    
    // 逐个隐藏按钮
    items.forEach((item, index) => {
      setTimeout(() => {
        item.style.opacity = "0";
        item.style.transform = "scale(0.8) translateX(20px)";
      }, index * 50);
    });
    
    // 完成动画后更新状态
    setTimeout(() => {
      showToolBar.value = false;
      isAnimating.value = false;
    }, items.length * 50 + 100);
  } else {
    // 立即更新状态
    showToolBar.value = true;
    
    // 在下一帧添加动画
    setTimeout(() => {
      const items = toolBar.querySelectorAll(".btn-item:not(.open-btn):not(.close-btn)");
      
      // 重置样式
      items.forEach(item => {
        item.style.opacity = "0";
        item.style.transform = "scale(0.8) translateX(20px)";
      });
      
      // 逐个显示按钮
      items.forEach((item, index) => {
        setTimeout(() => {
          item.style.opacity = "1";
          item.style.transform = "scale(1) translateX(0)";
        }, index * 50 + 50);
      });
      
      // 完成动画
      setTimeout(() => {
        isAnimating.value = false;
      }, items.length * 50 + 150);
    }, 0);
  }
};

// 显示壁纸切换组件
const clickSwitchWallpaper = () => {
  switchWallpaperRef.value.show();
};

// 切换工具栏位置（左侧/右侧）
const clickMoveBtn = () => {
  if (isAnimating.value) return;
  isAnimating.value = true;
  
  const toolBar = document.querySelector(".float-tool-bar");
  
  // 添加过渡动画
  if (isLeft.value) {
    // 从左到右
    toolBar.style.transform = "translateX(100%)";
    toolBar.style.opacity = "0";
    
    setTimeout(() => {
      toolBar.style.left = "auto";
      toolBar.style.right = "0";
      toolBar.style.borderRadius = "10px 0 0 10px";
      
      // 重置动画
      setTimeout(() => {
        toolBar.style.transform = "translateX(0)";
        toolBar.style.opacity = "1";
      }, 50);
    }, 300);
  } else {
    // 从右到左
    toolBar.style.transform = "translateX(-100%)";
    toolBar.style.opacity = "0";
    
    setTimeout(() => {
      toolBar.style.right = "auto";
      toolBar.style.left = "0";
      toolBar.style.borderRadius = "0 10px 10px 0";
      
      // 重置动画
      setTimeout(() => {
        toolBar.style.transform = "translateX(0)";
        toolBar.style.opacity = "1";
      }, 50);
    }, 300);
  }
  
  // 更新状态
  setTimeout(() => {
    isLeft.value = !isLeft.value;
    isAnimating.value = false;
  }, 600);
};

// 显示设置模型
const showSetModel = () => {
  setModelRef.value.show();
};

// 回到顶部，添加点击反馈
const backToTop = () => {
  const backTopBtn = document.querySelector(".back-top-btn");
  
  // 添加点击动画
  if (backTopBtn) {
    backTopBtn.classList.add("clicked");
    setTimeout(() => {
      backTopBtn.classList.remove("clicked");
    }, 300);
  }
  
  // 执行滚动动画
  scrollAnimation(scrollTop.value, "top");
};

// 生命周期钩子
onMounted(() => {
  handleScroll();
  window.addEventListener("scroll", handleScroll);
  
  // 初始化按钮样式
  const toolBar = document.querySelector(".float-tool-bar");
  if (toolBar) {
    if (isLeft.value) {
      toolBar.style.left = "0";
      toolBar.style.right = "auto";
      toolBar.style.borderRadius = "0 10px 10px 0";
    } else {
      toolBar.style.right = "0";
      toolBar.style.left = "auto";
      toolBar.style.borderRadius = "10px 0 0 10px";
    }
  }
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style lang="scss" scoped>
.float-tool-bar {
  position: fixed;
  bottom: 30px;
  padding: 12px;
  right: 0;
  border-radius: 10px 0 0 10px;
  z-index: 1000;
  transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.btn-item {
  background: var(--btn-tag-bg-color);
  width: 36px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 70%);
    opacity: 0;
    transition: opacity 0.4s ease;
  }
  
  .bi {
    transition: all 0.3s;
    color: #fff;
    font-size: 1.1rem;
  }
  
  &:active {
    transform: scale(0.92);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    
    &::before {
      opacity: 1;
    }
  }
}

.back-top-btn {
  transform: translateY(40px);
  opacity: 0;
  transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.5s, background-color 0.3s;
  
  &.clicked {
    animation: rocket-shake 0.5s ease;
  }
}

@keyframes rocket-shake {
  0% { transform: translateY(0) rotate(0); }
  10% { transform: translateY(-2px) rotate(-5deg); }
  20% { transform: translateY(-4px) rotate(5deg); }
  30% { transform: translateY(-6px) rotate(-5deg); }
  40% { transform: translateY(-8px) rotate(5deg); }
  50% { transform: translateY(-10px) rotate(0); }
  60% { transform: translateY(-8px) rotate(3deg); }
  70% { transform: translateY(-6px) rotate(-3deg); }
  80% { transform: translateY(-4px) rotate(3deg); }
  90% { transform: translateY(-2px) rotate(-3deg); }
  100% { transform: translateY(0) rotate(0); }
}

.btn-ripple {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0);
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.4);
  border-radius: inherit;
  opacity: 0;
  pointer-events: none;
}

.btn-item:active .btn-ripple {
  animation: ripple 0.5s ease-out;
}

@keyframes ripple {
  0% {
    transform: translate(-50%, -50%) scale(0);
    opacity: 0.5;
  }
  100% {
    transform: translate(-50%, -50%) scale(2);
    opacity: 0;
  }
}

.btn-item::after {
  display: none;
  position: absolute;
  left: -85px;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  width: auto;
  font-size: 12px;
  padding: 6px 12px;
  border-radius: 6px;
  opacity: 0;
  white-space: nowrap;
  pointer-events: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  transition: opacity 0.3s, transform 0.3s;
}

.close-btn::after,
.open-btn::after {
  left: -95px;
}

.switch-wallpaper-btn::after {
  content: "壁纸切换";
}

.back-top-btn::after {
  content: "回到顶部";
}

.open-btn::after {
  content: "打开工具栏";
}

.close-btn::after {
  content: "收起工具栏";
}

.move-right-btn::after {
  content: "移至右侧";
}

.move-left-btn::after {
  content: "移至左侧";
}

@media (hover: hover) {
  .btn-item:hover::after {
    display: block !important;
    opacity: 1;
    transform: translateY(-50%) translateX(-5px);
  }

  .btn-item:hover {
    background: var(--theme-btn-hover-color);
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    
    .bi {
      transform: scale(1.1);
    }
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .float-tool-bar {
    bottom: 20px;
    padding: 10px;
    gap: 10px;
  }
  
  .btn-item {
    width: 32px;
    height: 32px;
    border-radius: 6px;
    
    .bi {
      font-size: 1rem;
    }
  }
  
  .btn-item::after {
    display: none !important;
  }
}
</style>
