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
              <div class="info-item-title"><span>IM SDK</span></div>
              <div class="info-item-desc m-hide-box"></div>
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
              <div class="info-item-title"><span>可访APP Flutter版</span></div>
              <div class="info-item-desc m-hide-box"></div>
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
              <div class="info-item-title"><span>可访Web版</span></div>
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
              <div class="info-item-title"><span>领兀云官网</span></div>
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
              <div class="info-item-title"><span>开发者平台</span></div>
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
              <div class="info-item-title"><span>爱华盈通官网</span></div>
            </div>
          </a>
        </div>
      </div>
      <!-- <div class="button-card">
        <div class="button" @click="toPage">查看更多</div>
      </div> -->
    </div>
    <div class="button-arrow" @click="toNextPage"></div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { defineEmits } from "vue";

const router = useRouter();

const toNextPage = () => {
  emit("toNextPage");
};

const toPage = () => {
  router.push("/portfolio");
};

const emit = defineEmits(["toNextPage"]);
</script>

<style lang="scss" scoped>
@media (any-hover: hover) {
  .info-item:hover {
    transform: rotate(-5deg) scale(1.1);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }

  .info-item:hover {
    .info-text {
      transform: translate(-50%, -50%) rotate(0deg);
      opacity: 0.9;
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
  background: #eee url(../../assets/images/banner/dongmannv02.webp);
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
}

.info-title {
  color: #fff;
  font-size: 30px;
}

.info-content {
  width: 1000px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 50px;
}

.info-item {
  width: 100%;
  height: 200px;
  overflow: hidden;
  position: relative;
  border-radius: 10px;
  transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
}

.info-img {
  width: 100%;
  height: 100%;
  transition: all 0.4s ease-in;
}

.info-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-45deg);
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  background-color: #fff;
  opacity: 0;
  transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
  color: var(--color);
}

.info-item-title {
  font-size: 18px;
  font-weight: 600;
}

.info-item-desc {
  margin: 10px 0;
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
  margin-top: 35px;

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
    width: 85%;
    top: 43%;
  }

  .info-content {
    grid-template-columns: repeat(1, 1fr);
    padding: 0.5rem 0 0 0 !important;
    width: 100% !important;
    gap: 10px;
  }

  .info-title {
    font-size: 1.6rem;
    padding-bottom: 0 !important;
    text-shadow: 0 5px 15px rgb(0, 0, 0) !important;
  }

  .info-item {
    height: 3.5rem !important;
    width: 100% !important;
    backdrop-filter: blur(15px);
    text-shadow: 0 5px 15px rgb(0, 0, 0) !important;
  }

  .info-item a {
    display: flex !important;
    height: 100%;
  }

  .info-img {
    width: 4.5rem !important;
    display: block !important;
    border-radius: 5px 0 0 5px;
  }

  .info-text {
    position: static !important;
    flex: 1 !important;
    background: transparent;
    border-radius: 0 5px 5px 0;
    height: auto !important;
    display: flex;
    align-items: center;
    opacity: 1;
    transform: none;
    color: var(--white-color);
  }

  .button-card {
    margin-top: 10px;
  }
}
</style>
