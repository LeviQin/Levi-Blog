<template>
  <div class="nav-bar">
    <ul>
      <li @click="toPage('/')">首页</li>
      <li @click="toPage('/nav')">前端导航</li>
      <li @click="toPage('/material')">前端资料</li>
      <li @click="toPage('/tools')">小工具</li>
      <li @click="toPage('/about')">关于我</li>
    </ul>
    <div class="menu-icon-card">
      <el-icon class="collapse-icon" @click="clickCollapse" :size="30" v-if="isCollapse"
        ><Expand
      /></el-icon>
      <el-icon class="collapse-icon" @click="clickCollapse" :size="30" v-else
        ><Fold
      /></el-icon>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Expand, Fold } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";

const router = useRouter();

let isCollapse = ref(false);

const clickCollapse = () => {
  isCollapse.value = !isCollapse.value;
};

const toPage = (path) => {
  router.push(path);
};
</script>

<style lang="scss" scoped>
@media (max-width: 800px) {
  .nav-bar ul {
    display: none !important;
  }
  .menu-icon-card {
    display: flex !important;
    align-items: center;
    justify-content: flex-end;
    padding-right: 15px;
    .collapse-icon {
      color: var(--themeTextColor);
    }
  }
}
.menu-icon-card {
  display: none;
}
ul {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  li {
    margin: 0 15px;
    color: var(--themeTextColor);
    cursor: pointer;
  }
}
</style>
