<template>
  <div class="nav-bar">
    <ul class="nav-ul" @click="toPage">
      <li data-path="/">首页</li>
      <li data-path="/nav">前端导航</li>
      <li data-path="/material">前端资料</li>
      <li data-path="/tools">小工具</li>
      <li data-path="/about">关于我</li>
    </ul>
    <ul class="m-nav-ul" @click="toMPage">
      <li data-path="/">首页</li>
      <li data-path="/nav">前端导航</li>
      <li data-path="/material">前端资料</li>
      <li data-path="/tools">小工具</li>
      <li data-path="/about">关于我</li>
    </ul>
    <div class="menu-icon-card">
      <i class="bi bi-x collapse-icon" v-if="isCollapse" @click="clickCollapse"></i>
      <i class="bi bi-text-right collapse-icon" v-else @click="clickCollapse"></i>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

let isCollapse = ref(false);

const clickCollapse = () => {
  isCollapse.value = !isCollapse.value;
  nextTick(() => {
    const navEl = document.querySelector(".m-nav-ul");
    navEl.style.height = isCollapse.value ? `100%` : 0;
    navEl.style.transition = isCollapse.value ? `height 700ms` : `height 300ms`;
  });
};

const toPage = (e) => {
  const path = e.target.getAttribute("data-path");
  path && router.push(path);
};
const toMPage = (e) => {
  const path = e.target.getAttribute("data-path");
  if (path) {
    router.push(path);
    clickCollapse();
  }
};
</script>

<style lang="scss" scoped>
.menu-icon-card {
  display: none;
}

.nav-ul {
  display: flex;
  justify-content: flex-end;
  align-items: center;

  li {
    display: flex;
    align-items: center;
    height: var(--hedaerBarHeight);
    margin: 0 5px;
    padding: 0 10px;
    color: var(--themeTextColor);
    cursor: pointer;
  }
}

.m-nav-ul {
  height: 0;
  position: fixed;
  top: var(--hedaerBarHeight);
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  overflow-y: auto;

  li {
    margin: 0 20px;
    padding: 10px 0;
    color: #000;
    cursor: pointer;
    border-bottom: 1px solid rgba(60, 60, 60, 0.12);
  }

  li:first-child {
    margin-top: 20px;
  }
}

@media (max-width: 800px) {
  .nav-ul {
    display: none;
  }

  .menu-icon-card {
    display: flex !important;
    align-items: center;
    justify-content: flex-end;
    padding-right: 0.7rem;

    .collapse-icon {
      color: var(--themeTextColor);
      font-size: 1.8rem;
    }
  }

  .m-nav-ul {
    top: 4.45rem;

    li {
      margin: 0 1.25rem;
      padding: 10px 0;
      color: #000;
      cursor: pointer;
      border-bottom: 1px solid rgba(60, 60, 60, 0.12);
    }

    li:first-child {
      margin-top: 1.25rem;
    }
  }
}
</style>
