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
            <span>专题</span><i class="bi bi-chevron-down bi-topic-icon"></i>
          </li>
          <transition name="bounce">
            <div
              class="nav-drawer-li-collapse"
              id="topicCollapse"
              v-show="showTopicCollapse"
            >
              <ul @click="toPage">
                <li data-router="/daily">
                  <i class="bi bi-balloon-heart bi-dropdown-item"></i>日常
                </li>
                <li data-router="/technology">
                  <i class="bi bi-code-slash bi-dropdown-item"></i>技术
                </li>
                <li data-router="/cute-pet">
                  <i class="bi bi-twitter bi-dropdown-item"></i>萌宠
                </li>
                <li data-router="/notes">
                  <i class="bi bi-brush bi-dropdown-item"></i>笔记
                </li>
                <li data-router="/landscape">
                  <i class="bi bi-globe-americas bi-dropdown-item"></i>风景
                </li>
                <li data-router="/figure">
                  <i class="bi bi-universal-access bi-dropdown-item"></i>人物
                </li>
                <li data-router="/game">
                  <i class="bi bi-controller bi-dropdown-item"></i>游戏
                </li>
                <li data-router="/embarrassing">
                  <i class="bi bi-emoji-dizzy bi-dropdown-item"></i>囧事
                </li>
              </ul>
            </div>
          </transition>
        </div>
        <li class="nav-drawer-li" data-router="/nav">常用网站</li>
        <li class="nav-drawer-li" data-router="/material">前端资料</li>
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
              <!-- <li>生活工具</li> -->
              <li data-router="/password">加密/解密</li>
              <!-- <li>JSON工具</li>
              <li>压缩/格式化</li>
              <li>文档</li>
              <li>前端工具</li>
              <li>转换</li>
              <li>单位换算</li>
              <li>二维码工具</li>
              <li>正则表达式</li>
              <li>站长工具</li>
              <li>其他</li> -->
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
}

.nav-drawer-li-collapse {
  padding: 0 30px;
  margin-bottom: 15px;
  li {
    padding: 2px 0;
    font-size: 13px;
    cursor: pointer;
    .bi {
      margin-right: 10px;
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
