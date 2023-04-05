<template>
  <div class="container">
    <div class="info">
      <h1>相关技能</h1>
      <div class="info-content">
        <p>熟练掌握Vue全家桶</p>
        <p>写过Js Sdk</p>
        <p>了解Node.js的基本使用</p>
        <p>有部分Flutter开发经验</p>
      </div>
    </div>
    <div class="button-arrow" @click="toNextPage"></div>
  </div>
</template>

<script setup>
import { ref } from "vue";

import { defineEmits } from "vue";

const toNextPage = () => {
  emit("toNextPage");
};

const emit = defineEmits(["toNextPage"]);
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  background: var(--abilityColor);
  position: relative;
}
.info {
  position: absolute;
  top: 30%;
  left: 30%;
  color: #fff;
  text-align: left;
  .info-content {
    font-size: 20px;
  }
}
.button-arrow {
  display: block;
  width: 60px;
  height: 60px;
  position: absolute;
  bottom: 20px;
  left: 50%;
  margin-left: -30px;
  opacity: 0.75;
  background: url(../../assets/images/arrow.png);
  transition: all 0.2s ease-in 0s;
  z-index: 9999;
  transform: scale(0.8);
  cursor: pointer;
  &:hover {
    transform: scale(1);
    transition: all 0.2s ease-in 0s;
  }
}
</style>
