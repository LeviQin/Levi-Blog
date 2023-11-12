<template>
  <div class="layout">
    <div>
      <Hedader />
    </div>
    <div class="main">
      <router-view />
    </div>
    <div class="footer-card">
      <Footer />
    </div>
    <back-to-top></back-to-top>
    <div class="banner-bar"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import Hedader from "./Hedader/Index.vue";
import Footer from "./Footer/Index.vue";
import BackToTop from "../components/BackToTop/Index.vue";
import { useRoute } from "vue-router";

const route = useRoute();

onMounted(() => {
  window.addEventListener("scroll", scrollWidnow, true);
});

onUnmounted(() => {
  window.removeEventListener("scroll", scrollWidnow, true);
});

let isScrolling = ref(false);

const scrollWidnow = (e) => {
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
  background-image: url(../assets/images/banner/banner2.jpg);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  z-index: -1;
  transition: filter 2s ease, transform 2s ease;
}
</style>
