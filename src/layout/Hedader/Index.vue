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
        <site-nav-bar></site-nav-bar>
      </div>
      <div class="search-card">
        <i class="bi bi-search" @click="showSearchModel"></i>
      </div>
    </div>
    <!-- 移动端导航抽屉 -->
    <nav-drawer ref="navDrawerRef"></nav-drawer>

    <!-- 搜索弹窗 -->
    <search-model ref="searchModelRef"></search-model>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import SiteNavBar from "./components/SiteNavBar/Index.vue";
import SearchModel from "./components/SearchModel/Index.vue";
import NavDrawer from "./components/NavDrawer/Index.vue";

const router = useRouter();

onMounted(() => {
  window.addEventListener("scroll", scrollWidnow, true);
});

onUnmounted(() => {
  window.removeEventListener("scroll", scrollWidnow, true);
});

let navDrawerRef = ref(null);
let searchModelRef = ref(null);

const clickCollapse = () => {
  navDrawerRef.value.show();
};

const scrollWidnow = (e) => {
  const header = document.querySelector(".header");
  const top = e?.srcElement?.scrollingElement?.scrollTop; // 获取页面滚动高度
  header.style.transition = "0.5s linear";
  header.style.background = `linear-gradient(60deg,rgba(0,0,0, ${
    top / 200
  }) 0,rgba(0,0,0, ${top / 200}) 93%)`;
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
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 10000;
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
  font-size: 25px;
  cursor: pointer !important;
  margin-right: 20px;
  color: var(--navBarTextColor);
  font-weight: 500;
  transition: all 0.5s;
}

.search-card i {
  color: var(--navBarTextColor);
  cursor: pointer;
  font-size: 22px;
}

@media (max-width: 860px) {
  .header {
    height: var(--headerMobileBarHeight);
  }

  .nav-card {
    padding: 0 15px;
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
    margin-left: -30px;
  }
}

@media (max-width: 375px) {
  .log-text {
    display: none;
  }
}
</style>
