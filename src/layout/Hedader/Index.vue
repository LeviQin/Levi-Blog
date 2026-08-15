<template>
  <div class="header" :class="{ 'is-scrolled': isScrolled, 'is-entrance': showEntrance }">
    <div class="nav-card w" :style="{ height: navheight }">
      <div class="menu-icon-card">
        <i class="bi bi-text-right collapse-icon" @click="clickCollapse"></i>
      </div>
      <div class="log-crad">
        <div class="log-text" @click="router.push('/')">
          <span class="logo-dot"></span>
          <h1>Levi space</h1>
        </div>
        <site-nav-bar></site-nav-bar>
      </div>
      <div class="search-card">
        <i class="bi bi-search" @click="showSearchModel"></i>
      </div>
    </div>
    <nav-drawer ref="navDrawerRef"></nav-drawer>
    <search-model ref="searchModelRef"></search-model>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useRouter } from "vue-router";
import SiteNavBar from "./components/SiteNavBar/Index.vue";
import SearchModel from "./components/SearchModel/Index.vue";
import NavDrawer from "./components/NavDrawer/Index.vue";
import { useMainStore } from "@/stores/mainStore";

const mainStore = useMainStore();

const blogSettingMap = computed(() => {
  return mainStore.blogSettingMap;
});

const router = useRouter();

const navDrawerRef = ref(null);
const searchModelRef = ref(null);
const isScrolled = ref(false);
const showEntrance = ref(false);
const navheight = ref("");
const maxHeaderHeight = "80px";
const minHeaderHeight = "60px";
let rafId = null;

onMounted(() => {
  window.addEventListener("scroll", scrollWindow, { passive: true });
  requestAnimationFrame(() => {
    showEntrance.value = true;
  });
  scrollWindow();
});

onUnmounted(() => {
  window.removeEventListener("scroll", scrollWindow);
  if (rafId) cancelAnimationFrame(rafId);
});

const clickCollapse = () => {
  navDrawerRef.value.show();
};

const scrollWindow = () => {
  if (rafId) return;
  rafId = requestAnimationFrame(() => {
    const top = document.documentElement.scrollTop;
    const isTop = top === 0;
    navheight.value = isTop ? maxHeaderHeight : minHeaderHeight;
    isScrolled.value = !isTop;
    const opacity = Math.min(top / 400, 0.92);
    document.documentElement.style.setProperty("--header-bar-color-opacity", opacity);
    // 暗色主题滚动到顶部时导航文字用白色，适配暗色 Hero
    const isDark = document.documentElement.dataset.theme === "dark";
    if (isTop && isDark) {
      document.documentElement.style.setProperty("--nav-bar-text-color", "#ffffff");
      document.documentElement.style.setProperty("--nav-text-color", "#ffffff");
    } else {
      document.documentElement.style.removeProperty("--nav-bar-text-color");
      document.documentElement.style.removeProperty("--nav-text-color");
    }
    rafId = null;
  });
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
  backdrop-filter: blur(14px) saturate(1.2);
  -webkit-backdrop-filter: blur(14px) saturate(1.2);
  min-width: var(--min-width);
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 9998;
  transform: translateY(-100%);
  opacity: 0;
  transition: transform var(--dur-slow) var(--ease-out-expo), opacity 0.4s ease;

  &.is-entrance {
    transform: translateY(0);
    opacity: 1;
  }

  &.is-scrolled {
    box-shadow: 0 1px 12px rgba(0, 0, 0, 0.4);
  }
}

.nav-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: height 0.4s var(--ease-standard);

  .log-crad {
    display: flex;
    align-items: center;
    align-self: stretch;
    gap: 20px;

    span {
      color: var(--nav-text-color);
    }
  }
}

.log-text {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer !important;
  position: relative;

  .logo-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: var(--theme-btn-hover-color);
    box-shadow: 0 0 8px rgba(34, 211, 238, 0.6);
    transition: all 0.4s ease;
    flex-shrink: 0;
  }

  &:hover .logo-dot {
    transform: scale(1.5);
    box-shadow: 0 0 16px rgba(34, 211, 238, 0.8), 0 0 32px rgba(34, 211, 238, 0.3);
  }

  h1 {
    font-family: var(--mono-font-family);
    font-size: 20px;
    margin: 0;
    margin-right: 20px;
    color: var(--nav-bar-text-color);
    font-weight: 600;
    background: none;
    -webkit-background-clip: initial;
    -webkit-text-fill-color: var(--nav-bar-text-color);
    background-clip: initial;
    transition: transform 0.4s var(--ease-standard);
  }

  &:hover h1 {
    transform: translateX(3px);
  }
}

.search-card {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: var(--theme-radius);
  transition: all 0.3s ease;

  i {
    color: var(--nav-bar-text-color);
    cursor: pointer;
    font-size: 20px;
    transition: color 0.35s var(--ease-standard), transform 0.35s var(--ease-standard);
    display: inline-block;
  }

  &:hover {
    background: rgba(34, 211, 238, 0.12);

    i {
      color: var(--btn-tag-bg-color);
      transform: scale(1.15) rotate(15deg);
    }
  }
}

@media (max-width: 860px) {
  .header {
    height: var(--header-mobile-bar-height);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
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
      font-size: 1.6rem;
      transition: color 0.3s ease;

      &:hover {
        color: var(--btn-tag-bg-color);
      }
    }
  }

  .log-text {
    .logo-dot {
      width: 8px;
      height: 8px;
    }

    h1 {
      font-size: 16px;
      margin-right: 10px;
    }
  }

  .search-card {
    width: 36px;
    height: 36px;

    i {
      font-size: 18px;
    }
  }
}

@media (max-width: 375px) {
  .log-text {
    display: none;
  }
}
</style>
