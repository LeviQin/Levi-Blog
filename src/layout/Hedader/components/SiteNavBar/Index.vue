<template>
  <div class="nav-bar">
    <ul class="nav-ul" @click="toPage">
      <li class="nav-li active-li" data-router="/">首页</li>
      <el-dropdown @command="handleCommandToPage">
        <li class="nav-li">笔迹分类</li>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="daily"
              ><i class="bi bi-balloon-heart bi-dropdown-item"></i>日常</el-dropdown-item
            >
            <el-dropdown-item command="technology"
              ><i class="bi bi-code-slash bi-dropdown-item"></i>技术</el-dropdown-item
            >
            <el-dropdown-item command="cute-pet"
              ><i class="bi bi-twitter bi-dropdown-item"></i>萌宠</el-dropdown-item
            >
            <el-dropdown-item command="notes"
              ><i class="bi bi-brush bi-dropdown-item"></i>笔记</el-dropdown-item
            >
            <el-dropdown-item command="landscape"
              ><i class="bi bi-globe-americas bi-dropdown-item"></i>风景</el-dropdown-item
            >
            <el-dropdown-item command="figure"
              ><i class="bi bi-universal-access bi-dropdown-item"></i
              >人物</el-dropdown-item
            >
            <!-- <el-dropdown-item command="game"
              ><i class="bi bi-controller bi-dropdown-item"></i>游戏</el-dropdown-item
            > -->
            <!-- <el-dropdown-item command="embarrassing"
              ><i class="bi bi-emoji-dizzy bi-dropdown-item"></i>囧事</el-dropdown-item
            > -->
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <!-- <li class="nav-li" data-router="/nav">常用网站</li>
      <li class="nav-li" data-router="/material">前端资料</li> -->
      <el-dropdown @command="handleCommandToPage">
        <li class="nav-li">小工具</li>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="password">加密/解密</el-dropdown-item>
            <el-dropdown-item command="weather">天气查询</el-dropdown-item>
            <el-dropdown-item command="ip">IP地址查询</el-dropdown-item>
            <el-dropdown-item command="unit">单位换算</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <li class="nav-li" data-router="/links">友情链接</li>
      <li class="nav-li" data-router="/about">关于我</li>
    </ul>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

watch(
  () => route.path,
  () => {
    activeNav();
  }
);

onMounted(() => {
  activeNav();
});

const toPage = (e) => {
  const path = e.target.getAttribute("data-router");
  path && router.push(path);
};

const activeNav = () => {
  const lis = document.querySelectorAll(".nav-li");
  lis.forEach((ele) => {
    if (route.path === ele.getAttribute("data-router")) {
      ele.classList.add("active-li");
    } else {
      ele.classList.remove("active-li");
    }
  });
};

const handleCommandToPage = (val) => {
  router.push(`/${val}`);
};
</script>

<style lang="scss" scoped>
.nav-ul {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.nav-li {
  display: flex;
  align-items: center;
  height: var(--headerBarHeight);
  margin: 0 20px;
  color: var(--navBarTextColor);
  cursor: pointer;
  font-size: 16px;
  transition: all 0.5s;
  border-bottom: 2px solid transparent;
  &:hover {
    border-bottom: 2px solid var(--themeTextColor);
    transition: all 0.5s;
  }
}

.active-li {
  border-bottom: 2px solid var(--themeTextColor);
}

.bi {
  margin-right: 5px;
}

.bi-dropdown-item {
  margin-right: 10px;
}

@media (max-width: 860px) {
  .nav-ul {
    display: none;
  }
}
</style>
