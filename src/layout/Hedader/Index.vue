<template>
  <div class="header">
    <div class="nav-card w">
      <div class="menu-icon-card">
        <i class="bi bi-text-right collapse-icon" @click="clickCollapse"></i>
      </div>
      <div class="log-crad">
        <div class="log-text" @click="router.push('/')">
          <h1><i class="bi bi-stars"></i>Levi</h1>
        </div>
        <nav-bar></nav-bar>
      </div>
      <div class="search-card">
        <i class="bi bi-search" @click="showSearchModel"></i>
      </div>
    </div>
    <el-drawer
      v-model="drawer"
      direction="ltr"
      close-on-click-modal
      append-to-body
      size="80%"
    >
      <ul class="m-nav-ul" @click="toMPage">
        <li data-path="/">首页</li>
        <li data-path="/nav">前端导航</li>
        <li data-path="/material">前端资料</li>
        <li data-path="/tools">小工具</li>
        <li data-path="/about">关于我</li>
      </ul>
    </el-drawer>

    <!-- search model -->
    <search-model ref="searchModelRef"></search-model>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import NavBar from "./components/NavBar/Index.vue";
import SearchModel from "./components/SearchModel/Index.vue";

const router = useRouter();

onMounted(() => {
  window.addEventListener("scroll", scrollHeaderBar, true);
});

onUnmounted(() => {
  window.removeEventListener("scroll", scrollHeaderBar, true);
});

let drawer = ref(false);
let searchModelRef = ref(null);

const clickCollapse = () => {
  drawer.value = true;
};
const toMPage = (e) => {
  const path = e.target.getAttribute("data-path");
  if (path) {
    router.push(path);
    drawer.value = false;
  }
};
const scrollHeaderBar = (e) => {
  const header = document.querySelector(".header");
  const top = e.srcElement.scrollingElement.scrollTop; // 获取页面滚动高度
  header.style.transition = "0.5s linear";
  header.style.background = `rgba(0, 0, 0, ${top / 200})`;
};
const showSearchModel = () => {
  searchModelRef.value.show();
};
</script>

<style lang="scss" scoped>
.menu-icon-card {
  display: none;
}

.header {
  background-color: rgba(0, 0, 0, 0);
  height: var(--headerBarHeight);
  min-width: var(--minWidth);
  // border: 1px solid rgba(55, 99, 170, 0.1);
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 99999;
}

.nav-card {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .log-crad {
    height: var(--headerBarHeight);
    display: flex;
    align-items: center;

    span {
      color: var(--navTextColor);
    }
  }
}

.log-text h1 {
  font-size: 24px;
  cursor: pointer !important;
  margin-right: 20px;
  color: var(--navTextColor);
  font-weight: 500;
}

.search-card i {
  color: #fff;
  cursor: pointer;
}

@media (max-width: 860px) {
  .header {
    height: var(--headerMobileBarHeight);
  }

  .menu-icon-card {
    display: flex !important;
    align-items: center;
    justify-content: flex-end;
    padding-right: 0.7rem;
    cursor: pointer;

    .collapse-icon {
      color: var(--navTextColor);
      font-size: 1.8rem;
    }
  }

  .log-text h1 {
    font-size: 20px;
    cursor: pointer !important;
    margin-right: 20px;
    color: var(--navTextColor);
    font-weight: 500;
  }
}

@media (max-width: 375px) {
  .log-text {
    display: none;
  }
}
</style>
