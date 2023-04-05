<template>
  <div class="container">
    <div class="info">
      <div class="info-content">
        <div class="info-item">
          <div class="left-icon">
            <img class="bio-icon" src="../../assets/images/web2.svg" alt="" />
          </div>
          <div class="right-content">
            <span class="bio-text">我是一名Web前端开发</span>
          </div>
        </div>
        <div class="info-item">
          <div class="left-icon">
            <img class="bio-icon" src="../../assets/images/location.svg" alt="" />
          </div>
          <div class="right-content">
            <span class="bio-text">目前在深圳就职于笨鸟软件</span>
          </div>
        </div>
        <div class="info-item">
          <div class="left-icon">
            <img class="bio-icon" src="../../assets/images/message.svg" alt="" />
          </div>
          <div class="right-content">
            <span class="bio-text">有丰富的前端开发经验，有丰富的前端开发经验</span>
          </div>
        </div>
      </div>
    </div>
    <div class="button-arrow" @click="toNextPage"></div>
  </div>
</template>

<script setup>
import { defineEmits } from "vue";

const toNextPage = () => {
  emit("toNextPage");
};

const emit = defineEmits(["toNextPage"]);
</script>

<style lang="scss" scoped>
@media (max-width: 768px) {
  .info {
    width: 100% !important;
  }
  .info-content {
    padding: 7rem 2rem !important;
  }
  .left-icon {
    width: 5rem !important;
    height: 5rem !important;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .right-content {
    flex: 1;
    display: flex;
    align-items: center;
    text-align: left;
  }
  .bio-icon {
    width: 3rem !important;
    height: 3rem !important;
    animation: none !important;
  }
  .bio-text {
    margin-left: 0 !important;
    animation: none !important;
  }
}
.container {
  height: 100%;
  background: #eee url(../../assets/images/bg-tile.png) 0 0;
  position: relative;
}
.info {
  width: 960px;
  margin: 0 auto;
}
.info-content {
  padding-top: 400px;
}
.info-item {
  display: flex;
}
.button-arrow {
  display: block;
  width: 60px;
  height: 60px;
  position: absolute;
  bottom: 40px;
  left: 50%;
  margin-left: -30px;
  opacity: 0.75;
  background: url(../../assets/images/arrow.png);
  transition: all 0.2s ease-in 0s;
  z-index: 9999;
  transform: scale(0.8);
  background-position: 0 -60px;
  cursor: pointer;
  &:hover {
    transform: scale(1);
    transition: all 0.2s ease-in 0s;
  }
}
.left-icon {
  width: 100px;
  height: 100px;
}
.bio-icon {
  width: 60px;
  height: 60px;
  animation: bioIconIn 0.6s ease-out 0.7s 1 forwards;
}
.bio-text {
  margin-left: -210px;
  animation: bioTextIn 0.6s ease-out 0.7s 1 forwards;
}
@keyframes bioTextIn {
  0% {
    transform: translate(649px, 0);
    opacity: 0;
  }

  100% {
    transform: translate(0, 0);
    opacity: 1;
  }
}
@keyframes bioIconIn {
  0% {
    margin-left: -300px;
    opacity: 0;
    transform: rotate(-60deg);
  }
  100% {
    margin-left: -269px;
    opacity: 1;
    transform: rotate(0deg);
  }
}
</style>
