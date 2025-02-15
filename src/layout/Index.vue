<template>
  <div class="layout">
    <header class="lv-header">
      <Hedader />
    </header>
    <main class="lv-main">
      <router-view :key="route.path" />
    </main>
    <footer class="footer-card">
      <Footer />
    </footer>

    <div class="banner-bar" :class="{ 'container-blur': mainStore.shouldBlur }"></div>

    <float-tool-bar></float-tool-bar>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import Hedader from "./Hedader/Index.vue";
import Footer from "./Footer/Index.vue";
import { useRoute } from "vue-router";
import { ElNotification } from "element-plus";
import FloatToolBar from "../components/FloatToolBar/Index.vue";
import { getStore } from "@/utils/storage.js";
import { useMainStore } from "@/stores/mainStore";

const mainStore = useMainStore();

const route = useRoute();

onMounted(() => {
  window.addEventListener("keydown", keydownEvent);
  window.addEventListener("scroll", scrollWindow, { passive: true });
  const image = getStore("WALLPAPER_URL");
  if (image) {
    const bannerBar = document.querySelector(".layout .banner-bar");
    bannerBar.style.backgroundImage = `url(${image})`;
  }
});

onUnmounted(() => {
  window.removeEventListener("keydown", keydownEvent);
  window.removeEventListener("scroll", scrollWindow);
});

const isF12 = ref(false);
const debounceTime = 100;
let lastCall = 0;

const keydownEvent = (event) => {
  // 检测是否按下了 F12 键
  if (event.keyCode === 123) {
    if (!isF12.value) {
      ElNotification({
        title: "发现你啦🎉",
        message: "欢迎查看我的网站，开发者朋友！🕵️",
        type: "warning",
        zIndex: 99999,
      });
      console.log(
        "%c" + "🎉 欢迎来到 Levi-Blog! 🚀",
        "font-size: 20px; color: #ff6347; text-shadow: 1px 1px 2px #555;"
      );
      console.log(
        "%c" + "🔍 按下 F12 键，你发现了隐藏的世界！",
        "font-size: 20px; color: #3498db; text-shadow: 1px 1px 2px #555;"
      );
      console.log(
        "%c" + "💬 欢迎在 GitHub 上与我交流！🔗 https://github.com/LeviQin",
        "font-size: 20px; color: #2ecc71; text-shadow: 1px 1px 2px #555;"
      );
      console.log(
        "%c" + "🌟 如果你喜欢这个项目，请给我一个 star！⭐",
        "font-size: 20px; color: #f1c40f; text-shadow: 1px 1px 2px #555;"
      );
      isF12.value = true;
    }
  }
};

const scrollWindow = () => {
  const now = Date.now();
  if (now - lastCall < debounceTime) return;
  lastCall = now;
  requestAnimationFrame(() => {
    const top = window.scrollY || document.documentElement.scrollTop;
    const threshold = route.path === "/" ? 500 : 100;
    const shouldBlur = top > threshold;
    mainStore.setBlur(shouldBlur);
  });
};
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  flex-direction: column;
  height: 100%;
  .lv-header {
    height: var(--header-bar-height);
    min-height: var(--header-bar-height);
    display: block;
  }
  .lv-main {
    flex: 1;
    padding: 0 20px;
  }
}

.banner-bar {
  height: 100vh;
  width: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-image: url(../assets/images/banner/gufengnv.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  z-index: -1;
  transition: filter 2s ease, transform 2s ease;
}
</style>
