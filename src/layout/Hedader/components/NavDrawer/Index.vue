<template>
  <el-drawer
    v-model="drawer"
    direction="ltr"
    close-on-click-modal
    append-to-body
    size="320px"
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
            <span>文章分类</span><i class="bi bi-chevron-down bi-topic-icon"></i>
          </li>
          <div
            class="nav-drawer-li-collapse"
            id="topicCollapse"
            v-show="showTopicCollapse"
          >
            <ul @click="toPage">
              <li data-router="/category/daily">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#levi-woderichang"></use></svg
                ><span>日常随记</span>
              </li>
              <li data-router="/category/technology">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#levi-jishurenyuan"></use></svg
                ><span>开发心得</span>
              </li>
              <li data-router="/category/cute-pet">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#levi-aichong03"></use></svg
                ><span>萌宠日记</span>
              </li>
              <li data-router="/category/notes">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#levi-biji"></use></svg
                ><span>学习笔记</span>
              </li>
              <li data-router="/category/landscape">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#levi-fengjing"></use></svg
                ><span>光影故事</span>
              </li>
            </ul>
          </div>
        </div>
        <!-- <li class="nav-drawer-li" data-router="/material">前端资料</li> -->
        <li class="nav-drawer-li" id="tools" @click="clickTools">
          <span>小工具</span><i class="bi bi-chevron-down bi-tools-icon"></i>
        </li>
        <div class="nav-drawer-li-collapse" id="toolsCollapse" v-show="showToolsCollapse">
          <ul @click="toPage">
            <li data-router="/encryption">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#levi-jiami"></use></svg
              ><span>加密/解密</span>
            </li>
            <!-- <li data-router="/weather">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#levi-tianqi"></use></svg
              ><span>天气查询</span>
            </li>
            <li data-router="/ip">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#levi-IPdizhi"></use></svg
              ><span>IP地址查询</span>
            </li> -->
            <li data-router="/unit">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#levi-danweihuansuanx"></use></svg
              ><span>单位换算</span>
            </li>
            <li data-router="/password">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#levi-mima"></use></svg
              ><span>密码生成器</span>
            </li>
            <li data-router="/image-processing">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#levi-tupianchuli"></use></svg
              ><span>图片处理</span>
            </li>
            <!-- <li data-router="/qr">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#levi-erweimashengchenggongju"></use></svg
              ><span>二维码生成</span>
            </li> -->
          </ul>
        </div>
        <li class="nav-drawer-li" data-router="/nav">常用网站</li>
        <li class="nav-drawer-li" data-router="/comments">留言板</li>
        <li class="nav-drawer-li" data-router="/friendlinks">友情链接</li>
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

const drawer = ref(false);
const showTopicCollapse = ref(false);
const showToolsCollapse = ref(false);

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
  const target = e.target.closest("li");
  if (target) {
    const path = target.getAttribute("data-router");
    if (path) {
      router.push(path);
      drawer.value = false;
    }
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
  color: var(--theme-color);
  font-size: 18px;
  margin-bottom: 15px;
}

.nav-drawer-header-description {
  color: var(--theme-color);
  font-size: 16px;
}

.nav-drawer-ul {
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
    padding: 5px 0;
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
</style>
