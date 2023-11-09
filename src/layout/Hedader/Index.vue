<template>
  <div class="header">
    <div class="nav-card w">
      <div class="menu-icon-card">
        <i class="bi bi-text-right collapse-icon" @click="clickCollapse"></i>
      </div>
      <div class="log-crad">
        <div class="log-text" @click="router.push('/')">
          <h1>Levi 的博客</h1>
        </div>
        <nav-bar></nav-bar>
      </div>
      <div class="search-card">
        <el-input v-model="input3" placeholder="搜索啥呢？">
          <template #prefix>
            <i class="bi bi-search"></i>
          </template>
        </el-input>
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
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import NavBar from "./components/NavBar/Index.vue";

const router = useRouter();

let input3 = ref("");
let drawer = ref(false);

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
</script>

<style lang="scss" scoped>
.menu-icon-card {
  display: none;
}
.header {
  background-color: var(--themeColor);
  height: var(--hedaerBarHeight);
  min-width: var(--minWidth);
  border: 1px solid rgba(55, 99, 170, 0.1);
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 90;
}

.nav-card {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .log-crad {
    height: var(--hedaerBarHeight);
    display: flex;
    align-items: center;

    span {
      color: var(--themeTextColor);
    }

    .log-text h1 {
      font-size: 24px;
      cursor: pointer !important;
      margin-right: 20px;
      color: var(--themeTextColor);
      font-weight: 500;
    }
  }
}

@media (max-width: 860px) {
  .menu-icon-card {
    display: flex !important;
    align-items: center;
    justify-content: flex-end;
    padding-right: 0.7rem;
    cursor: pointer;

    .collapse-icon {
      color: var(--themeTextColor);
      font-size: 1.8rem;
    }
  }
}
@media (max-width: 480px) {
  .log-text {
    display: none;
  }
}
</style>
