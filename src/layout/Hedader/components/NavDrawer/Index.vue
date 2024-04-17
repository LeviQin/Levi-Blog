<template>
  <el-drawer
    v-model="drawer"
    direction="ltr"
    close-on-click-modal
    append-to-body
    size="300px"
    :z-index="10002"
    @close="close"
  >
    <div>
      <div class="nav-drawer-header">
        <sidebar-user></sidebar-user>
      </div>
      <div class="dividing-line">
        <i class="bi bi-rocket-takeoff-fill"></i>
      </div>
      <ul class="nav-drawer-ul" @click="toPage">
        <li class="nav-drawer-li" data-router="/">首页</li>
        <div class="collapse-card">
          <li class="nav-drawer-li" id="topic" @click="clickTopic">
            <span>笔迹分类</span><i class="bi bi-chevron-down bi-topic-icon"></i>
          </li>
          <transition name="bounce">
            <div
              class="nav-drawer-li-collapse"
              id="topicCollapse"
              v-show="showTopicCollapse"
            >
              <ul @click="toPage">
                <li data-router="/daily">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-woderichang"></use></svg
                  ><span>日常</span>
                </li>
                <li data-router="/technology">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-jishurenyuan"></use></svg
                  ><span>技术</span>
                </li>
                <li data-router="/cute-pet">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-aichong03"></use></svg
                  ><span>萌宠</span>
                </li>
                <li data-router="/notes">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-biji"></use></svg
                  ><span>笔记</span>
                </li>
                <li data-router="/landscape">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-fengjing"></use></svg
                  ><span>风景</span>
                </li>
                <li data-router="/figure">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-168-boy-2"></use></svg
                  ><span>人物</span>
                </li>
                <li data-router="/game">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-youxiji"></use></svg
                  ><span>游戏</span>
                </li>
                <!-- <li data-router="/embarrassing">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-meirijiongtu"></use></svg
                  ><span>囧事</span>
                </li> -->
              </ul>
            </div>
          </transition>
        </div>
        <li class="nav-drawer-li" data-router="/nav">常用网站</li>
        <!-- <li class="nav-drawer-li" data-router="/material">前端资料</li> -->
        <li class="nav-drawer-li" id="tools" @click="clickTools">
          <span>小工具</span><i class="bi bi-chevron-down bi-tools-icon"></i>
        </li>
        <transition name="bounce">
          <div
            class="nav-drawer-li-collapse"
            id="toolsCollapse"
            v-show="showToolsCollapse"
          >
            <ul @click="toPage">
              <li data-router="/encryption">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-jiamijiemi"></use></svg
                ><span>加密/解密</span>
              </li>
              <li data-router="/weather">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-tianqi"></use></svg
                ><span>天气查询</span>
              </li>
              <li data-router="/ip">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-IPdizhi"></use></svg
                ><span>IP地址查询</span>
              </li>
              <li data-router="/unit">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-danweihuansuanx"></use></svg
                ><span>单位换算</span>
              </li>
              <li data-router="/password">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-mima"></use></svg
                ><span>密码生成器</span>
              </li>
            </ul>
          </div>
        </transition>
        <li class="nav-drawer-li" data-router="/links">友情链接</li>
        <li class="nav-drawer-li" data-router="/about">关于我</li>
      </ul>
    </div>
  </el-drawer>
</template>

<script setup>
import { ref, defineExpose } from "vue";
import { useRouter } from "vue-router";
import SidebarUser from "@/components/SidebarUser/Index.vue";

const router = useRouter();

let drawer = ref(false);
let showTopicCollapse = ref(false);
let showToolsCollapse = ref(false);

const show = () => {
  drawer.value = true;
};

const close = () => {
  showTopicCollapse.value = false;
  showToolsCollapse.value = false;
  const biTopic = document.querySelector(".bi-topic-icon");
  const biTools = document.querySelector(".bi-tools-icon");
  biTopic.style.transform = `rotate(0deg)`;
  biTools.style.transform = `rotate(0deg)`;
};

const toPage = (e) => {
  const path = e.target.getAttribute("data-router");
  if (path) {
    router.push(path);
    drawer.value = false;
  }
};

const clickTopic = () => {
  const biTopic = document.querySelector(".bi-topic-icon");
  biTopic.style.transition = "0.3s linear";
  if (showTopicCollapse.value) {
    showTopicCollapse.value = false;
    biTopic.style.transform = `rotate(0deg)`;
  } else {
    showTopicCollapse.value = true;
    biTopic.style.transform = `rotate(180deg)`;
  }
  if (showToolsCollapse.value) showToolsCollapse.value = false;
};

const clickTools = () => {
  const biTools = document.querySelector(".bi-tools-icon");
  biTools.style.transition = "0.3s linear";
  if (showToolsCollapse.value) {
    showToolsCollapse.value = false;
    biTools.style.transform = `rotate(0deg)`;
  } else {
    showToolsCollapse.value = true;
    biTools.style.transform = `rotate(180deg)`;
  }
  if (showToolsCollapse.value) showTopicCollapse.value = false;
};

defineExpose({
  show,
});
</script>

<style lang="scss" scoped>
#topic,
#tools {
  display: flex;
  justify-content: space-between;
}

.nav-drawer-header-title {
  color: var(--themeColor);
  font-size: 18px;
  margin-bottom: 15px;
}

.nav-drawer-header-description {
  color: var(--themeColor);
  font-size: 16px;
}

.nav-drawer-ul {
  background: #fff;
  animation: headerTransform 1s forwards;
  padding: 20px 0 0 10px;
}

.collapse-card {
  position: relative;
  overflow: hidden;
}

.nav-drawer-li {
  padding: 0 20px;
  margin-bottom: 15px;
  cursor: pointer;
  font-size: 17px;
}

.nav-drawer-li-collapse {
  padding: 0 30px;
  margin-bottom: 15px;

  li {
    padding: 2px 0;
    font-size: 15px;
    cursor: pointer;

    .icon {
      margin-right: 10px;
      width: 1em;
      height: 1em;
    }
  }
}

@keyframes headerTransform {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}

.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}

@keyframes bounce-in {
  0% {
    transform: translateX(-200px);
  }

  100% {
    transform: translateX(0);
  }
}
</style>
