<template>
  <div class="float-tool-bar">
    <div
      v-if="showToolBar"
      class="close-btn btn-item"
      title="收起工具栏"
      @click="awayToolbar"
    >
      <i class="bi bi-arrow-right-circle"></i>
    </div>
    <div v-else class="open-btn btn-item" title="打开工具栏" @click="awayToolbar">
      <i class="bi bi-arrow-left-circle"></i>
    </div>
    <div
      class="switch-wallpaper-btn btn-item"
      title="切换壁纸"
      @click="clickSwitchWallpaper"
      v-if="showToolBar"
    >
      <i class="bi bi-ubuntu"></i>
    </div>
    <!-- <template v-if="showToolBar">
      <div
        class="light-btn btn-item"
        title="白天模式"
        @click="modelSwitch"
        v-if="theme === `light`"
      >
        <i class="bi bi-brightness-high-fill"></i>
      </div>
      <div class="dark-btn btn-item" title="黑暗模式" @click="modelSwitch" v-else>
        <i class="bi bi-moon-stars"></i>
      </div>
    </template> -->
    <!-- <div
      class="gear-btn btn-item"
      title="基础设置"
      @click="showSetModel"
      v-if="showToolBar"
    >
      <i class="bi bi-gear"></i>
    </div> -->
    <div class="back-top-btn btn-item" title="回到顶部" @click="backToTop">
      <i class="bi bi-rocket-fill"></i>
    </div>

    <switch-wallpaper ref="switchWallpaperRef"></switch-wallpaper>

    <set-model ref="setModelRef"></set-model>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { scrollAnimation } from "@/utils/scrollAnimation.js";
import SwitchWallpaper from "../SwitchWallpaper/Index.vue";
import SetModel from "../SetModel/Index.vue";

onMounted(() => {
  handleScroll();
  window.addEventListener("scroll", handleScroll);
});

let scrollTop = ref(0);
let switchWallpaperRef = ref(null);
let showToolBar = ref(true);
let theme = ref("light");
let setModelRef = ref(null);

const handleScroll = () => {
  const backTopBtn = document.querySelector(".back-top-btn");
  scrollTop.value = document.documentElement.scrollTop || document.body.scrollTop;
  if (scrollTop.value > 400) {
    backTopBtn.style.transform = `translateX(0)`;
  } else {
    backTopBtn.style.transform = `translateX(200px)`;
  }
};

const awayToolbar = () => {
  showToolBar.value = !showToolBar.value;
};

const clickSwitchWallpaper = () => {
  switchWallpaperRef.value.show();
};

const modelSwitch = () => {
  if (theme.value === `light`) {
    theme.value = `dart`;
  } else {
    theme.value = `light`;
  }
  document.documentElement.setAttribute("data-theme", theme.value);
};

const showSetModel = () => {
  setModelRef.value.show();
};

const backToTop = () => {
  scrollAnimation(scrollTop.value, "top");
};
</script>

<style lang="scss" scoped>
.float-tool-bar {
  position: fixed;
  bottom: 50px;
  right: 0;
  padding: 10px;
  border-radius: 5px;
  z-index: 1000;
  transition: all 0.5s;

  .btn-item {
    background: var(--btnTagBgColor);
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 3px;
    cursor: pointer;
    margin-bottom: 10px;
    transition: all 0.2s;

    &:hover {
      transition: all 0.2s;
      background: var(--themeTextColor);
    }

    .bi {
      color: #fff;
    }
  }
}
</style>
