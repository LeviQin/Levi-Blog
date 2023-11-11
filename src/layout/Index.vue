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

onMounted(() => {
  window.addEventListener("scroll", scrollBanner, true);
});

onUnmounted(() => {
  window.removeEventListener("scroll", scrollBanner, true);
});

const scrollBanner = (e) => {
  const top = e.srcElement.scrollingElement.scrollTop;
  console.log(top);
  const bannerBar = document.querySelector(".banner-bar");
  bannerBar.classList.toggle("container-blur");
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
}
</style>
