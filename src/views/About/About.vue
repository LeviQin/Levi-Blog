<template>
  <div
    class="container"
    :style="{ backgroundImage: `url(${props.blogSettingMap.blog_about_bg_img})` }"
  >
    <div class="info card">
      <div class="banner">
        <span class="banner-text">{{ props.blogSettingMap.blog_about_job }}</span>
      </div>
      <div class="info-title">{{ props.blogSettingMap.blog_about_title }}</div>
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
            <svg class="icon diqiuyi" aria-hidden="true">
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
              >擅长使用Vue全家桶，并有Flutter跨平台开发经验和Wordpress开发经验，
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
import { defineEmits, defineProps } from "vue";

const props = defineProps({
  blogSettingMap: {
    type: Object,
    default: () => {},
  },
});

const toNextPage = () => {
  emit("toNextPage");
};

const emit = defineEmits(["toNextPage"]);
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  background: linear-gradient(-60deg, #95a5a6, #7f8c8d, #bdc3c7, #95a5a6);
  background-size: 400% 400%;
  position: relative;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.info {
  position: absolute;
  top: 50%;
  left: 50%;
  box-sizing: border-box;
  font-family: cursive;
  font-size: 20px;
  border-radius: 10px;
  padding: 30px;
  background: #edc;
  border: 8px solid #000;
  box-shadow: 15px 15px 0 #000;
  transform: translate(-50%, -50%) rotate(-2deg);
  transition: transform 0.3s ease;
  position: relative;
  overflow: hidden;
  width: 800px;
}

.card:hover {
  transform: translate(-50%, -50%) rotate(0deg) scale(1.02);
  box-shadow: 20px 20px 0 #000;
}

.banner {
  position: absolute;
  top: 3px;
  right: -95px;
  background: #000;
  color: #fff;
  padding: 15px;
  width: 350px;
  text-align: center;
  transform: rotate(45deg);
  font-weight: bold;
  font-size: 18px;
  letter-spacing: 2px;
  overflow: hidden;
  transition: background 0.5s ease;
}

.banner-text {
  display: inline-block;
  transition: opacity 0.5s ease, transform 0.5s ease;
  width: 100%;
  position: absolute;
  left: 15%;
  top: 0;
}

.info-title {
  font-size: 30px;
  font-weight: 700;
  color: #000;
  text-transform: uppercase;
  margin-bottom: 10px;
  display: block;
  border-bottom: 2px solid #000;
  width: 50%;
}

.sign-up {
  border: 4px solid #000;
  background: #000;
  color: #fff;
  padding: 12px;
  font-size: 18px;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
}

.sign-up:hover {
  background: #fff;
  color: #000;
  transform: translateY(-5px);
  box-shadow: 0 5px 0 #000;
}

.info-item {
  display: flex;
  gap: 20px;
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
  width: 3.2em;
  height: 4.2em;
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
  font-size: 20px;
  line-height: 30px;
}

@keyframes bioTextIn {
  0% {
    transform: translateX(500px);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes bioIconIn {
  0% {
    transform: translateX(0) rotate(-90deg);
    opacity: 0;
  }
  100% {
    transform: translateX(10px) rotate(0deg);
    opacity: 1;
  }
}

@media (max-width: 860px) {
  .banner-text {
    font-size: 15px;
    top: 3px;
  }

  .info {
    width: 80% !important;
    padding: 10px;
    top: 45%;
  }

  .info-title {
    font-size: 20px;
  }

  .info-content {
    padding: 0 !important;
    width: 100%;
  }

  .banner {
    top: -5px;
    right: -110px;
  }

  .left-icon {
    width: 2rem !important;
    height: 2rem !important;
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
    font-size: 0.7rem !important;
  }
}
</style>
