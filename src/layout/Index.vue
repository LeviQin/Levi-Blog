<template>
  <div class="layout">
    <div>
      <Hedader />
    </div>
    <div class="mian">
      <router-view />
    </div>
    <div class="footer-card">
      <Footer />
    </div>
    <BackToTop></BackToTop>
    <div class="banner-bar"></div>
  </div>
</template>

<script setup>
import Hedader from "./Hedader/Index.vue";
import Footer from "./Footer/Index.vue";
import BackToTop from "../components/BackToTop/Index.vue";
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  flex-direction: column;
  height: 100%;
  .mian {
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
  background-image: url(../assets/images/banner/banner1.jpeg);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  z-index: -1;
}
</style>
