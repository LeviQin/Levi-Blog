<template>
  <div class="layout">
    <header>
      <Hedader />
    </header>
    <main class="main">
      <router-view />
      <TwinklingStars />
    </main>
    <footer class="footer-card">
      <Footer />
    </footer>

    <div class="banner-bar"></div>

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
import TwinklingStars from "../components/TwinklingStars/Index.vue";

const route = useRoute();

onMounted(() => {
  window.addEventListener("keydown", keydownEvent);
  window.addEventListener("scroll", scrollWidnow, true);
});

onUnmounted(() => {
  window.removeEventListener("keydown", keydownEvent);
  window.removeEventListener("scroll", scrollWidnow, true);
});

let isScrolling = ref(false);
let isF12 = ref(false);

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
        "%c" + "⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿",
        "font-family: monospace;"
      );
      console.log(
        "%c嘿嘿, 欢迎查看我的网站，开发者朋友！🕵️",
        "font-size: 20px; color: #3498db; text-shadow: 1px 1px 2px #555;"
      );
      console.log(
        "%c欢迎互相探讨学习哦~",
        "font-size: 20px; color: #3498db; text-shadow: 1px 1px 2px #555;"
      );
      console.log(
        "%c" + "⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿",
        "font-family: monospace;"
      );
      isF12.value = true;
    }
  }
};

const scrollWidnow = () => {
  if (!isScrolling.value) {
    requestAnimationFrame(() => {
      const top = window.scrollY;
      const bannerBar = document.querySelector(".banner-bar");
      const threshold = route.path === "/home" ? 500 : 100;
      if (top > threshold) {
        bannerBar.classList.add("container-blur");
      } else {
        bannerBar.classList.remove("container-blur");
      }

      isScrolling.value = false;
    });

    isScrolling.value = true;
  }
};
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  flex-direction: column;
  height: 100%;

  .main {
    flex: 1;
    margin-top: 80px;
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
  background-image: url(../assets/images/banner/mingren.jpeg);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  z-index: -1;
  transition: filter 2s ease, transform 2s ease;
}
</style>
