<template>
  <div class="top-banner" :style="`height: ${props.bannerConfig.height}`">
    <div class="banner-text-box">
      <h2><i class="bi bi-stars"></i>{{ props.bannerConfig.title }}</h2>
      <p>{{ props.bannerConfig.text }}</p>
    </div>
    <i
      class="bi bi-chevron-double-down button-arrow"
      @click="toNextPage"
      v-if="props.bannerConfig.showArrow"
    ></i>
  </div>
</template>

<script setup>
import { defineEmits, defineProps } from "vue";

const props = defineProps({
  bannerConfig: {
    type: Object,
    default: function () {
      return {
        height: "100vh",
        showArrow: false,
        title: "Levi",
        text: "莫道桑榆晚，为霞尚满天",
      };
    },
  },
});

const toNextPage = () => {
  emit("nextPosition");
};

const emit = defineEmits(["nextPosition"]);
</script>

<style lang="scss" scoped>
.top-banner {
  display: flex;
  justify-content: center;
  position: relative;
}

.banner-text-box {
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, 0);
}

.top-banner h2,
.top-banner i {
  text-shadow: 0 5px 15px rgba(0, 0, 0, 1) !important;
  color: #fff;
  text-align: center;
  font-size: 35px;
  margin-left: -18px;
}

.top-banner p {
  width: 265px;
  line-height: 40px;
  animation: textAnimation 10s infinite;
  overflow: hidden;
  white-space: nowrap;
  text-shadow: 0 5px 15px rgba(0, 0, 0, 1) !important;
  color: #fff;
  font-size: 24px;
}

.button-arrow {
  display: block;
  position: absolute;
  bottom: 100px;
  left: 50%;
  margin-left: -20px;
  opacity: 0.75;
  z-index: 9999;
  cursor: pointer;
  animation: arrowMove 1s linear infinite;
}

@media (max-width: 860px) {
  .banner-text-box {
    top: 25%;
  }

  .top-banner h2,
  .top-banner i {
    font-size: 30px;
  }

  .top-banner p {
    font-size: 16px;
  }

  .button-arrow {
    bottom: 120px;
  }
}

@keyframes arrowMove {
  0% {
    transform: translateY(-10px);
  }

  100% {
    transform: translateY(-10px);
  }

  50% {
    transform: translateY(-20px);
  }
}

@keyframes textAnimation {
  0% {
    width: 0;
  }

  25% {
    width: 100%;
  }

  50% {
    width: 100%;
  }

  75% {
    width: 0;
  }

  100% {
    width: 0;
  }
}
</style>
