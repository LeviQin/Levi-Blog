<template>
  <div class="nav-bar">
    <ul class="nav-ul" @click="toPage">
      <li class="nav-li active-li" data-name="/" data-router="/">首页</li>
      <el-dropdown @command="handleTopicCommand">
        <li class="nav-li" data-name="/topic">专题</li>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="daily">日常</el-dropdown-item>
            <el-dropdown-item command="technology">技术</el-dropdown-item>
            <el-dropdown-item command="cute-pet">萌宠</el-dropdown-item>
            <el-dropdown-item command="notes">笔记</el-dropdown-item>
            <el-dropdown-item command="landscape">风景</el-dropdown-item>
            <el-dropdown-item command="figure">人物</el-dropdown-item>
            <el-dropdown-item command="game">游戏</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <li class="nav-li" data-name="/nav" data-router="/nav">前端导航</li>
      <li class="nav-li" data-name="/material" data-router="/material">前端资料</li>
      <el-dropdown>
        <li class="nav-li" data-name="/tools">小工具</li>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>生活工具</el-dropdown-item>
            <el-dropdown-item>加密/解密</el-dropdown-item>
            <el-dropdown-item>JSON工具</el-dropdown-item>
            <el-dropdown-item>压缩/格式化</el-dropdown-item>
            <el-dropdown-item>文档</el-dropdown-item>
            <el-dropdown-item>前端工具</el-dropdown-item>
            <el-dropdown-item>转换</el-dropdown-item>
            <el-dropdown-item>单位换算</el-dropdown-item>
            <el-dropdown-item>二维码工具</el-dropdown-item>
            <el-dropdown-item>正则表达式</el-dropdown-item>
            <el-dropdown-item>站长工具</el-dropdown-item>
            <el-dropdown-item>其他</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <li class="nav-li" data-name="/about" data-router="/about">关于我</li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const toPage = (e) => {
  const name = e.target.getAttribute("data-name");
  const path = e.target.getAttribute("data-router");
  if (name && path) router.push(path);

  const lis = document.querySelectorAll(".nav-li");
  if (path) {
    lis.forEach((ele) => {
      if (name === ele.getAttribute("data-path")) {
        ele.classList.add("active-li");
      } else {
        ele.classList.remove("active-li");
      }
    });
  }
};

const handleTopicCommand = (val) => {
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
  height: var(--hedaerBarHeight);
  padding: 0 10px;
  color: var(--themeTextColor);
  cursor: pointer;
  font-size: 16px;
  transition: all 0.5s;

  &:hover {
    color: rgb(187, 214, 212);
    transition: all 0.5s;
  }
}

.active-li {
  color: rgb(187, 214, 212);
}

@media (max-width: 860px) {
  .nav-ul {
    display: none;
  }
}
</style>
