<template>
  <div class="container">
    <div class="info card">
      <div class="tools">
        <div class="circle">
          <span class="red box"></span>
        </div>
        <div class="circle">
          <span class="yellow box"></span>
        </div>
        <div class="circle">
          <span class="green box"></span>
        </div>
      </div>
      <div class="card-content">
        <h1 class="info-title">相关技能</h1>
        <div class="info-content">
          <p>熟练掌握HTML5、CSS3、ES6、JavaScript等Web开发技术</p>
          <p>熟练掌握Vue全家桶，能快速独立开发各种PC端和移动端项目</p>
          <p>熟悉前端性能优化，网页SEO优化，Git和SVN代码管理工具的基本使用</p>
          <p>熟悉Webpack,vite和Rollup的基本配置和使用</p>
          <p>曾独立完成JS IM SDK开发</p>
          <p>熟悉Node.js和小程序的开发</p>
          <p>有Flutter跨平台开发经验，独立开发过Fultter版IM聊天软件(可访)</p>
          <p>有丰富的WordPress二次开发经验和使用React开发WordPress插件的经验</p>
        </div>
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
  background: #eee url(../../assets/images/banner/dongmannv03.webp);
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
  box-sizing: border-box;
  font-family: cursive;
  font-size: 20px;
  border-radius: 10px;
  background: #000;
  line-height: 1.2rem;
  padding: 20px;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.2);
}

.tools {
  display: flex;
  align-items: center;
  padding: 9px;
}

.circle {
  padding: 0 4px;
}

.box {
  display: inline-block;
  align-items: center;
  width: 10px;
  height: 10px;
  padding: 1px;
  border-radius: 50%;
}

.red {
  background-color: #ff605c;
}

.yellow {
  background-color: #ffbd44;
}

.green {
  background-color: #00ca4e;
}

.card-content {
  color: #fff;
  padding: 0 20px;
}

.info-content p {
  margin: 0;
  padding-bottom: 1.2rem;
  color: #fff;
  line-height: 20px;
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
    width: 85%;
    padding: 10px;
  }
  .info-title {
    font-size: 1.3rem;
    padding-bottom: 0 !important;
  }

  .info-content {
    font-size: 13px;
  }

  .info-content p {
    text-indent: 0;
    padding-bottom: 0.8rem;
  }
}
</style>
