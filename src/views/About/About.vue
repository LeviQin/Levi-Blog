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
            <span class="bio-text">目前就职于深圳市笨鸟软件有限公司</span>
          </div>
        </div>
        <div class="info-item">
          <div class="left-icon">
            <img class="bio-icon" src="../../assets/images/message.svg" alt="" />
          </div>
          <div class="right-content">
            <span class="bio-text">有丰富的前端开发经验，熟练掌握HTML5、CSS3、ES6、JavaScript等Web开发技术</span>
          </div>
        </div>
        <div class="info-item">
          <div class="left-icon">
            <img class="bio-icon" src="../../assets/images/html5.svg" alt="" />
          </div>
          <div class="right-content">
            <span class="bio-text">擅长使用Vue2、Vue3全家桶,并有Flutter跨平台开发经验,熟悉小程序和Node.js</span>
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
    padding: 0 !important;
    width: 100%;
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
    width: 2rem !important;
    height: 2rem !important;
    animation: none !important;
    opacity: 1 !important;
  }

  .bio-text {
    margin-left: 0 !important;
    animation: none !important;
    opacity: 1 !important;
    font-size: 1rem !important;
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
  overflow: hidden;
}

.info-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.info-item {
  display: flex;
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
  display: flex;
  align-items: center;
}

.bio-icon {
  width: 60px;
  height: 60px;
  animation: bioIconIn 0.3s ease-out 0.7s 1 forwards;
  opacity: 0;
}

.right-content {
  flex: 1;
  display: flex;
  align-items: center;
  text-align: left;
}

.bio-text {
  animation: bioTextIn 0.3s ease-out 0.7s 1 forwards;
  opacity: 0;
  font-size: 22px;
  line-height: 30px;
}

@keyframes bioTextIn {
  0% {
    margin-left: 500px;
    opacity: 0;
  }

  100% {
    margin-left: 0;
    opacity: 1;
  }
}

@keyframes bioIconIn {
  0% {
    margin-left: 0;
    opacity: 0;
    transform: rotate(-90deg);
  }

  100% {
    margin-left: 10px;
    opacity: 1;
    transform: rotate(0deg);
  }
}

@keyframes hoverBioIcon {
  0% {
    transform: rotate(-90deg);
  }

  100% {
    transform: rotate(0deg);
  }
}</style>
