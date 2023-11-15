<template>
  <div class="float-tool-bar">
    <div class="close-btn btn-item" title="收起工具栏" @click="awayToolbar">
      <i class="bi bi-arrow-right-circle"></i>
    </div>
    <div class="back-top-btn btn-item" title="回到顶部" @click="backToTop">
      <i class="bi bi-rocket-fill"></i>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { scrollAnimation } from "@/utils/scrollAnimation.js";

onMounted(() => {
  handleScroll();
  window.addEventListener("scroll", handleScroll);
});

let scrollTop = ref(0);

const handleScroll = () => {
  const floatToolBar = document.querySelector(".float-tool-bar");
  scrollTop.value = document.documentElement.scrollTop || document.body.scrollTop;
  if (scrollTop.value > 400) {
    floatToolBar.style.transform = `translateX(0)`;
  } else {
    floatToolBar.style.transform = `translateX(200px)`;
  }
};

const awayToolbar = () => {};

const backToTop = () => {
  scrollAnimation(scrollTop.value, "top");
};
</script>

<style lang="scss" scoped>
.float-tool-bar {
  position: fixed;
  bottom: 50px;
  right: 0;
  padding: 10px;
  border-radius: 5px;
  z-index: 1000;
  transition: all 0.5s;

  .btn-item {
    background: var(--btnTagBgColor);
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 3px;
    cursor: pointer;
    margin-bottom: 10px;
    transition: all 0.2s;
    &:hover {
      transition: all 0.2s;
      background: var(--themeTextColor);
    }

    .bi {
      color: #fff;
    }
  }
}
</style>
