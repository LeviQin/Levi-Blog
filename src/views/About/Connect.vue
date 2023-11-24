<template>
  <div class="container">
    <div class="info">
      <h1 class="info-title">联系我</h1>
      <div class="info-content">
        <div class="info-content-item">
          <span>邮箱:</span>
          <a class="item-text" href="mailto: qinbiao_web@163.com">qinbiao_web@163.com</a>
        </div>
        <div class="info-content-item">
          <span>微信:</span>
          <span class="item-text">LeviQin</span>
        </div>
        <div class="info-content-item">
          <span>QQ:</span>
          <span class="item-text">1019613129</span>
        </div>
        <div class="info-content-item">
          <span>GitHub:</span>
          <a href="https://github.com/LeviQin" target="_blank" class="item-text"
            >LeviQin</a
          >
        </div>
      </div>
    </div>
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
  position: relative;
}

.info {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  text-align: left;
}

.info-content-item {
  margin-bottom: 12px;
}

.item-text {
  color: #fff;
  margin-left: 10px;
}

.info-title {
  font-size: 30px;
}

.info-content {
  font-size: 20px;
}

.button-arrow {
  display: block;
  width: 80px;
  height: 80px;
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
  background-position: -60px 0px;
  &:hover {
    transform: scale(1);
    transition: all 0.2s ease-in 0s;
  }
}

@media (max-width: 860px) {
  .info {
    width: 80%;
  }

  .info-title {
    font-size: 1.6rem;
    padding-bottom: 0 !important;
  }

  .info-content {
    font-size: 16px;
  }
}
</style>
