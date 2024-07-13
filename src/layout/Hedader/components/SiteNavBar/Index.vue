<template>
  <div class="nav-bar">
    <ul class="nav-ul" @click="toPage">
      <li class="nav-li active-li" data-router="/">首页</li>
      <el-dropdown @command="handleCommandToPage">
        <li class="nav-li">文章分类</li>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="category/daily"
              ><svg class="icon" aria-hidden="true">
                <use xlink:href="#levi-woderichang"></use></svg
              ><span>日常</span></el-dropdown-item
            >
            <el-dropdown-item command="category/technology"
              ><svg class="icon" aria-hidden="true">
                <use xlink:href="#levi-jishurenyuan"></use></svg
              ><span>开发</span></el-dropdown-item
            >
            <el-dropdown-item command="category/cute-pet"
              ><svg class="icon" aria-hidden="true">
                <use xlink:href="#levi-aichong03"></use></svg
              ><span>萌宠</span></el-dropdown-item
            >
            <el-dropdown-item command="category/notes"
              ><svg class="icon" aria-hidden="true">
                <use xlink:href="#levi-biji"></use></svg
              ><span>笔记</span></el-dropdown-item
            >
            <el-dropdown-item command="category/landscape"
              ><svg class="icon" aria-hidden="true">
                <use xlink:href="#levi-fengjing"></use></svg
              ><span>风景</span></el-dropdown-item
            >
            <el-dropdown-item command="category/figure"
              ><svg class="icon" aria-hidden="true">
                <use xlink:href="#levi-168-boy-2"></use></svg
              ><span>人物</span></el-dropdown-item
            >
            <el-dropdown-item command="category/games"
              ><svg class="icon" aria-hidden="true">
                <use xlink:href="#levi-youxiji"></use></svg
              ><span>游戏</span></el-dropdown-item
            >
            <!-- <el-dropdown-item command="category/embarrassing"
              ><svg class="icon" aria-hidden="true">
                <use xlink:href="#levi-meirijiongtu"></use></svg
              ><span>囧事</span></el-dropdown-item
            > -->
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <!-- <li class="nav-li" data-router="/material">前端资料</li> -->
      <el-dropdown @command="handleCommandToPage">
        <li class="nav-li">小工具</li>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="encryption"
              ><svg class="icon" aria-hidden="true">
                <use xlink:href="#levi-jiami"></use></svg
              ><span>加密/解密</span></el-dropdown-item
            >
            <!-- <el-dropdown-item command="weather"
              ><svg class="icon" aria-hidden="true">
                <use xlink:href="#levi-tianqi"></use></svg
              ><span>天气查询</span></el-dropdown-item
            >
            <el-dropdown-item command="ip"
              ><svg class="icon" aria-hidden="true">
                <use xlink:href="#levi-IPdizhi"></use></svg
              ><span>IP地址查询</span></el-dropdown-item
            > -->
            <el-dropdown-item command="unit"
              ><svg class="icon" aria-hidden="true">
                <use xlink:href="#levi-danweihuansuanx"></use></svg
              ><span>单位换算</span></el-dropdown-item
            >
            <el-dropdown-item command="password"
              ><svg class="icon" aria-hidden="true">
                <use xlink:href="#levi-mima"></use></svg
              ><span>密码生成器</span></el-dropdown-item
            >
            <el-dropdown-item command="image-processing"
              ><svg class="icon" aria-hidden="true">
                <use xlink:href="#levi-tupianchuli"></use></svg
              ><span>图片处理</span></el-dropdown-item
            >
            <!-- <el-dropdown-item command="qr"
              ><svg class="icon" aria-hidden="true">
                <use xlink:href="#levi-erweimashengchenggongju"></use></svg
              ><span>二维码生成</span></el-dropdown-item
            > -->
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <li class="nav-li" data-router="/nav">常用网站</li>
      <li class="nav-li" data-router="/comments">留言板</li>
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
  gap: 25px;
}

.nav-li {
  display: flex;
  align-items: center;
  height: var(--header-bar-height);
  color: var(---nav-bar-text-color);
  cursor: pointer;
  font-size: 16px;
  transition: all 0.5s;
  border-bottom: 2px solid transparent;

  &:hover {
    color: var(--theme-btn-hover-color);
  }
}

.active-li {
  color: var(--theme-btn-hover-color);
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
