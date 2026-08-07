<template>
  <div
    class="container"
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
            <span class="bio-text">9年前端开发经验，具备复杂业务落地能力。</span>
          </div>
        </div>
        <!-- <div class="info-item">
          <div class="left-icon">
            <svg class="icon diqiuyi" aria-hidden="true">
              <use xlink:href="#levi-diqiuyi"></use>
            </svg>
          </div>
          <div class="right-content">
            <span class="bio-text">目前就职于深圳市笨鸟软件有限公司</span>
          </div>
        </div> -->
        <div class="info-item">
          <div class="left-icon">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#levi-gongzuojingyan"></use>
            </svg>
          </div>
          <div class="right-content">
            <span class="bio-text"
              >主导 AI 创作平台、IM SDK 及复杂后台系统的前端架构与技术选型，覆盖跨端开发、权限体系与插件化架构，持续优化系统可维护性与开发效率。</span
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
              >以 Vue3 / Nuxt4 / TypeScript 为核心栈，兼有 React、Node.js、uni-app、Flutter 全栈与跨端能力。</span
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
  background:
    radial-gradient(circle at 20% 25%, rgba(34, 211, 238, 0.06), transparent 45%),
    radial-gradient(circle at 80% 75%, rgba(34, 211, 238, 0.04), transparent 42%);
  background-size: 100% 100%;
  position: relative;
  background-repeat: no-repeat;
  background-position: center;
}

.info {
  position: absolute;
  top: 50%;
  left: 50%;
  box-sizing: border-box;
  font-size: 20px;
  border-radius: 16px;
  padding: 30px;
  background: var(--theme-color);
  border: 1px solid var(--border-color);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
  transform: translate(-50%, -50%);
  transition: transform 0.3s ease, border-color 0.3s ease;
  position: relative;
  overflow: hidden;
  width: 800px;
  max-width: 90vw;
}

.card:hover {
  transform: translate(-50%, -50%) scale(1.01);
  border-color: rgba(34, 211, 238, 0.4);
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.35);
}

.banner {
  position: absolute;
  top: 3px;
  right: -95px;
  background: var(--theme-btn-hover-color);
  color: #0d1117;
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
  color: var(--color);
  text-transform: uppercase;
  margin-bottom: 10px;
  display: block;
  border-bottom: 2px solid var(--theme-btn-hover-color);
  width: 50%;
  font-family: var(--mono-font-family);
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
  color: var(--color);
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
