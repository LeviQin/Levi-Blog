<template>
  <div class="nav-bar">
    <ul class="nav-ul" @click="toPage">
      <li class="nav-li active-li" data-router="/">首页</li>
      <el-dropdown @command="handleCommandToPage">
        <li class="nav-li">笔迹分类</li>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="daily"
              ><svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-woderichang"></use></svg
              ><span>日常</span></el-dropdown-item
            >
            <el-dropdown-item command="technology"
              ><svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-jishurenyuan"></use></svg
              ><span>技术</span></el-dropdown-item
            >
            <el-dropdown-item command="cute-pet"
              ><svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-aichong03"></use></svg
              ><span>萌宠</span></el-dropdown-item
            >
            <el-dropdown-item command="notes"
              ><svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-biji"></use></svg
              ><span>笔记</span></el-dropdown-item
            >
            <el-dropdown-item command="landscape"
              ><svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-fengjing"></use></svg
              ><span>风景</span></el-dropdown-item
            >
            <el-dropdown-item command="figure"
              ><svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-168-boy-2"></use></svg
              ><span>人物</span></el-dropdown-item
            >
            <el-dropdown-item command="game"
              ><svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-youxiji"></use></svg
              ><span>游戏</span></el-dropdown-item
            >
            <!-- <el-dropdown-item command="embarrassing"
              ><svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-meirijiongtu"></use></svg
              ><span>囧事</span></el-dropdown-item
            > -->
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <li class="nav-li" data-router="/nav">常用网站</li>
      <!-- <li class="nav-li" data-router="/material">前端资料</li> -->
      <el-dropdown @command="handleCommandToPage">
        <li class="nav-li">小工具</li>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="encryption"
              ><svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-jiami"></use></svg
              ><span>加密/解密</span></el-dropdown-item
            >
            <el-dropdown-item command="weather"
              ><svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-tianqi"></use></svg
              ><span>天气查询</span></el-dropdown-item
            >
            <el-dropdown-item command="ip"
              ><svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-IPdizhi"></use></svg
              ><span>IP地址查询</span></el-dropdown-item
            >
            <el-dropdown-item command="unit"
              ><svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-danweihuansuanx"></use></svg
              ><span>单位换算</span></el-dropdown-item
            >
            <el-dropdown-item command="password"
              ><svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-mima"></use></svg
              ><span>密码生成器</span></el-dropdown-item
            >
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

svg.icon {
  margin-right: 5px;
  width: 1em;
  height: 1em;
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
