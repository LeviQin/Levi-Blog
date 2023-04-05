<template>
  <div class="container">
    <div class="info"></div>
    <div class="button-arrow" @click="toOnePage"></div>
  </div>
</template>

<script setup>
import { ref } from "vue";

import { defineEmits } from "vue";

const toOnePage = () => {
  emit("toOnePage");
};

const emit = defineEmits(["toOnePage"]);
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  background: var(--connectColor);
}
.button-arrow {
  display: block;
  width: 80px;
  height: 80px;
  position: absolute;
  bottom: 40px;
  left: 50%;
  margin-left: -30px;
  opacity: 0.75;
  background: url(../../assets/images/arrow.png);
  transition: all 0.2s ease-in 0s;
  z-index: 9999;
  transform: scale(0.8);
  cursor: pointer;
  background-position: -60px 0px;
  &:hover {
    transform: scale(1);
    transition: all 0.2s ease-in 0s;
  }
}
</style>
