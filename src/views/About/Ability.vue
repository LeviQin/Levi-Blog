<template>
  <div class="container">
    <div class="info">
      <h1 class="info-title">相关技能</h1>
      <div class="info-content">
        <p>熟练掌握HTML5、CSS3、ES6、JavaScript等Web开发技术</p>
        <p>熟练掌握Vue全家桶，能快速独立开发各种PC端和移动端项目</p>
        <p>熟悉前端性能优化，网页SEO优化，Git和SVN代码管理工具的基本使用</p>
        <p>熟悉Webpack和Rollup的基本配置和使用</p>
        <p>曾独立完成JS SDK开发</p>
        <p>熟悉Node.js和小程序的开发</p>
        <p>有Flutter跨平台开发经验</p>
        <p>有WordPress的开发经验</p>
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
  background: #eee url(../../assets/images/banner/fengjing6.webp);
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

.info-title {
  font-size: 30px;
}

.info-content {
  font-size: 20px;
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
  z-index: 1;
  transform: scale(0.8);
  cursor: pointer;
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
    font-size: 14px;
  }
}
</style>
