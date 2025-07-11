<template>
  <div class="header">
    <div class="nav-card w" :style="{ height: navheight, transition: navTransition }">
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
  window.addEventListener("scroll", scrollWindow, true);
});

onUnmounted(() => {
  window.removeEventListener("scroll", scrollWindow, true);
});

const navDrawerRef = ref(null);
const searchModelRef = ref(null);
const navTransition = ref("");
const navheight = ref("");
const maxHeaderHeight = "80px";
const minHeaderHeight = "60px";
const scrollTimer = ref(null);

const clickCollapse = () => {
  navDrawerRef.value.show();
};

const scrollWindow = () => {
  if (scrollTimer.value) return;
  scrollTimer.value = setTimeout(() => {
    const top = document.documentElement.scrollTop;
    navTransition.value = "0.3s linear";
    navheight.value = top === 0 ? maxHeaderHeight : minHeaderHeight;
    const opacity = Math.min(top / 400, 1);
    document.documentElement.style.setProperty("--header-bar-color-opacity", opacity);
    scrollTimer.value = null;
  }, 50);
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
  background-color: rgba(var(--header-bar-bg-color), var(--header-bar-color-opacity));
  min-width: var(--min-width);
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 9998;
  transition: all 0.3s;
}

.nav-card {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .log-crad {
    display: flex;
    align-items: center;
    gap: 20px;

    span {
      color: var(--nav-text-color);
    }
  }
}

.log-text h1 {
  font-size: 25px;
  cursor: pointer !important;
  margin-right: 20px;
  color: var(--nav-bar-text-color);
  font-weight: 500;
  transition: all 0.5s;
}

.search-card i {
  color: var(--nav-bar-text-color);
  cursor: pointer;
  font-size: 22px;
}

@media (max-width: 860px) {
  .header {
    height: var(--header-mobile-bar-height);
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
      color: var(--nav-text-color);
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
