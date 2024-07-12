<template>
  <div class="container">
    <div class="info">
      <div class="info-content">
        <div class="info-item">
          <div class="left-icon">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#levi-web"></use>
            </svg>
          </div>
          <div class="right-content">
            <span class="bio-text">我是一名Web前端开发</span>
          </div>
        </div>
        <div class="info-item">
          <div class="left-icon">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#levi-diqiuyi"></use>
            </svg>
          </div>
          <div class="right-content">
            <span class="bio-text">目前就职于深圳市笨鸟软件有限公司</span>
          </div>
        </div>
        <div class="info-item">
          <div class="left-icon">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#levi-gongzuojingyan"></use>
            </svg>
          </div>
          <div class="right-content">
            <span class="bio-text"
              >有丰富的前端开发经验，
              熟练掌握HTML5、CSS3、ES6、JavaScript等Web开发技术</span
            >
          </div>
        </div>
        <div class="info-item">
          <div class="left-icon">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#levi-kaifa"></use>
            </svg>
          </div>
          <div class="right-content">
            <span class="bio-text"
              >擅长使用Vue2、Vue3全家桶，并有Flutter跨平台开发经验，
              熟悉小程序和Node.js</span
            >
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
.container {
  height: 100%;
  background: #eee url(../../assets/images/banner/fengjing2.jpg);
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
  color: #000;
  text-align: left;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.2);
  padding: 40px;
  border-radius: 20px;
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

.info-title {
  font-size: 30px;
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
  display: flex;
  align-items: center;
}

.icon {
  width: 3.5em;
  height: 4.5em;
  margin-right: 15px;
  opacity: 0;
  animation: bioIconIn 0.3s ease-out 0.7s 1 forwards;
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
}

@media (max-width: 860px) {
  .info {
    width: 80% !important;
    padding: 10px;
  }

  .info-content {
    padding: 0 !important;
    width: 100%;
  }

  .left-icon {
    width: 4rem !important;
    height: 4rem !important;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .icon {
    height: 3.5em;
  }

  .right-content {
    flex: 1;
    display: flex;
    align-items: center;
    text-align: left;
  }

  .bio-text {
    margin-left: 0 !important;
    animation: none !important;
    opacity: 1 !important;
    font-size: 1rem !important;
  }
}
</style>
