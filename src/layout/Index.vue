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

    <div class="banner-bar" :style="bannerBarStyle"></div>
    <component :is="effectComponent" v-if="effectComponent"></component>

    <float-tool-bar></float-tool-bar>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, markRaw } from "vue";
import Hedader from "./Hedader/Index.vue";
import Footer from "./Footer/Index.vue";
import { useRoute } from "vue-router";
import { ElNotification } from "@/utils/element.js";
import FloatToolBar from "../components/FloatToolBar/Index.vue";
import MatrixRain from "../components/MatrixRain/Index.vue";
import ParticleNetwork from "../components/ParticleNetwork/Index.vue";
import StarField from "../components/StarField/Index.vue";
import DustParticles from "../components/DustParticles/Index.vue";
import { useMainStore } from "@/stores/mainStore";

const mainStore = useMainStore();

// 特效类型 -> 组件映射（markRaw 避免组件被响应式代理影响性能）
const effectMap = {
  matrix: markRaw(MatrixRain),
  particles: markRaw(ParticleNetwork),
  stars: markRaw(StarField),
  dust: markRaw(DustParticles),
};

const effectComponent = computed(() => {
  return effectMap[mainStore.fxConfig.type] || null;
});

const DEFAULT_BG = "radial-gradient(circle at 22% 30%, rgba(34,211,238,0.10), transparent 46%), radial-gradient(circle at 78% 65%, rgba(34,211,238,0.06), transparent 42%), #0d1117";

// 背景支持完整 CSS background 值（渐变/纯色），空值或旧图片 url 格式则回退默认
const bannerBarStyle = computed(() => {
  const bg = mainStore.backgroundImage;
  if (bg && !/^url\(/.test(bg)) {
    return { background: bg };
  }
  return { background: DEFAULT_BG };
});

const route = useRoute();

onMounted(() => {
  window.addEventListener("keydown", keydownEvent);
});

onUnmounted(() => {
  window.removeEventListener("keydown", keydownEvent);
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
        "%c" + "🎉 欢迎来到 Levi's space! 🚀",
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
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  .lv-header {
    height: var(--header-bar-height);
    min-height: var(--header-bar-height);
    display: block;
  }
  .lv-main {
    padding: 0 20px;
  }
}

.footer-card {
  margin-top: auto;
}

.banner-bar {
  height: 100vh;
  width: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  z-index: -1;
  transition: filter 2s ease, transform 2s ease;
}
</style>
