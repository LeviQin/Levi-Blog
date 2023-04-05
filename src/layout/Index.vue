<template>
  <div class="layout">
    <div>
      <Hedader />
    </div>
    <div class="mian">
      <router-view />
    </div>
    <div>
      <Footer />
    </div>
    <BackToTop></BackToTop>
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
</style>
