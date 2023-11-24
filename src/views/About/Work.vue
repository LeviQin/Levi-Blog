<template>
  <div class="container">
    <div class="info">
      <h1 class="info-title">我的作品</h1>
      <div class="info-content">
        <div class="info-item">
          <a href="https://open.lwim.cn/doc/" target="_blank">
            <img
              class="info-img"
              src="../../assets/images/about/im-sdk.webp"
              alt="IM SDK"
            />
            <div class="info-text">
              <span>IM SDK</span>
            </div>
          </a>
        </div>
        <div class="info-item">
          <a href="https://www.kefangapp.com/#/download" target="_blank">
            <img
              class="info-img"
              src="../../assets/images/about/kefang-flutter.webp"
              alt="可访APP Flutter版"
            />
            <div class="info-text">
              <div><span>可访APP Flutter版</span></div>
              <!-- <div class="m-hide-box">1</div> -->
            </div>
          </a>
        </div>
        <div class="info-item">
          <a href="https://web.kefangapp.com/" target="_blank">
            <img
              class="info-img"
              src="../../assets/images/about/kefang.webp"
              alt="可访Web版"
            />
            <div class="info-text">
              <span>可访Web版</span>
            </div>
          </a>
        </div>
        <div class="info-item">
          <a href="https://www.lwim.cn/" target="_blank">
            <img
              class="info-img"
              src="/src/assets/images/about/lingwuyun.webp"
              alt="领兀云官网"
            />
            <div class="info-text">
              <span>领兀云官网</span>
            </div>
          </a>
        </div>
        <div class="info-item">
          <a href="https://open.lwim.cn/" target="_blank">
            <img
              class="info-img"
              src="../../assets/images/about/kaifazhe.webp"
              alt="开发者平台"
            />
            <div class="info-text">
              <span>开发者平台</span>
            </div>
          </a>
        </div>
        <div class="info-item m-hide-box">
          <a href="https://www.aiwinn.com/" target="_blank">
            <img
              class="info-img"
              src="../../assets/images/about/aihuayigtong.webp"
              alt="爱华盈通官网"
            />
            <div class="info-text">
              <span>爱华盈通官网</span>
            </div>
          </a>
        </div>
      </div>
      <!-- <div class="button-card m-hide-box">
        <div class="button">查看更多</div>
      </div> -->
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
@media (any-hover: hover) {
  .info-item:hover {
    .info-text {
      top: 0;
    }

    .info-img {
      transform: scale(1.3);
    }
  }

  .button-arrow:hover {
    transform: scale(1);
    transition: all 0.2s ease-in 0s;
  }

  .button-card .button:hover {
    background: rgba(0, 0, 0, 0.849);
    transition: all 0.2s ease-in 0s;
  }
}

.container {
  height: 100%;
  background: var(--workColor);
  position: relative;
}

.info {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.info-title {
  color: #fff;
  font-size: 30px;
}

.info-content {
  width: 1000px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.info-item {
  width: 30%;
  height: 200px;
  overflow: hidden;
  position: relative;
  margin-bottom: 40px;
  border-radius: 10px;
}

.info-img {
  width: 100%;
  height: 100%;
  transition: all 0.4s ease-in;
}

.info-text {
  position: absolute;
  top: 160px;
  padding: 10px;
  left: 0;
  right: 0;
  height: 100%;
  color: #fff;
  background: rgba(0, 0, 0, 0.8);
  transition: all 0.3s ease-in;
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
}

.button-card {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -20px;

  .button {
    background: rgba(0, 0, 0, 0.652);
    padding: 7px 20px;
    color: #fff;
    cursor: pointer;
    border-radius: 7px;
    transition: all 0.2s ease-in 0s;
  }
}

@media (max-width: 860px) {
  .info {
    width: 100%;
  }

  .info-content {
    padding: 0.5rem 0 0 0 !important;
    width: 100% !important;
  }

  .info-title {
    font-size: 1.6rem;
    padding-bottom: 0 !important;
    margin-left: 20px;
  }

  .info-item {
    height: 3.5rem !important;
    width: 100% !important;
    margin-bottom: 1rem !important;
    padding: 0 1.5rem !important;
  }

  .info-item a {
    display: flex !important;
    height: 100%;
  }

  .m-hide-box {
    display: none !important;
  }

  .info-img {
    width: 4.5rem !important;
    display: block !important;
    border-radius: 5px 0 0 5px;
  }

  .info-text {
    position: static !important;
    flex: 1 !important;
    background: rgba(0, 0, 0, 0.8) !important;
    border-radius: 0 5px 5px 0;
    height: auto !important;
    display: flex;
    align-items: center;
  }
}
</style>
