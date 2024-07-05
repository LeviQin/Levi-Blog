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
  background: #eee url(../../assets/images/banner/fengjing10.webp);
  position: relative;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.info {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  text-align: left;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.2);
  padding: 40px;
  border-radius: 20px;
  text-shadow: 0 5px 15px rgb(0, 0, 0) !important;
}

.info::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  backdrop-filter: blur(15px);
  border-radius: 20px;
  z-index: -1;
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
  z-index: 1;
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
    width: 75%;
    padding: 20px;
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
