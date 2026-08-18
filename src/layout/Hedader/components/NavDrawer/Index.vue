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
    <div class="nav-drawer-shell">
      <div class="nav-drawer-header">
        <sidebar-user></sidebar-user>
      </div>
      <div class="dividing-line">
        <i class="bi bi-rocket-takeoff-fill"></i>
      </div>
      <ul class="nav-drawer-ul" @click="toPage" @keydown.enter.prevent="toPage">
        <li class="nav-drawer-li" data-router="/" role="link" tabindex="0">
          <span>首页</span>
        </li>
        <div class="collapse-card" v-if="blogSettingMap.show_category_module">
          <li
            class="nav-drawer-li nav-drawer-li-toggle"
            id="topic"
            :class="{ 'is-expanded': showTopicCollapse }"
            @click="clickTopic"
            @keydown.enter.prevent="clickTopic"
            tabindex="0"
            role="button"
          >
            <span>文章分类</span>
            <i class="bi bi-chevron-down collapse-icon" :class="{ 'is-open': showTopicCollapse }"></i>
          </li>
          <Transition name="submenu-slide">
            <div
              v-if="showTopicCollapse"
              class="nav-drawer-li-collapse"
              id="topicCollapse"
            >
              <ul @click="toPage">
                <li data-router="/category/daily" role="link" tabindex="0">
                  <i class="bi bi-journal-text icon" aria-hidden="true"></i><span>日常随记</span>
                </li>
                <li data-router="/category/technology" role="link" tabindex="0">
                  <i class="bi bi-code-slash icon" aria-hidden="true"></i><span>开发心得</span>
                </li>
                <li data-router="/category/cute-pet" role="link" tabindex="0">
                  <i class="bi bi-heart icon" aria-hidden="true"></i><span>萌宠日记</span>
                </li>
                <li data-router="/category/notes" role="link" tabindex="0">
                  <i class="bi bi-journal-bookmark icon" aria-hidden="true"></i><span>学习笔记</span>
                </li>
                <li data-router="/category/landscape" role="link" tabindex="0">
                  <i class="bi bi-camera icon" aria-hidden="true"></i><span>光影故事</span>
                </li>
              </ul>
            </div>
          </Transition>
        </div>
        <!-- <li class="nav-drawer-li" data-router="/material">前端资料</li> -->
        <li
          class="nav-drawer-li nav-drawer-li-toggle"
          id="tools"
          :class="{ 'is-expanded': showToolsCollapse }"
          @click="clickTools"
          @keydown.enter.prevent="clickTools"
          tabindex="0"
          role="button"
          v-if="blogSettingMap.show_widget_module"
        >
          <span>小工具</span>
          <i class="bi bi-chevron-down collapse-icon" :class="{ 'is-open': showToolsCollapse }"></i>
        </li>
        <Transition name="submenu-slide">
          <div v-if="showToolsCollapse" class="nav-drawer-li-collapse" id="toolsCollapse">
            <ul @click="toPage">
              <li data-router="/encryption" role="link" tabindex="0">
                <i class="bi bi-shield-lock icon" aria-hidden="true"></i><span>加密/解密</span>
              </li>
              <!-- <li data-router="/weather">
                <i class="bi bi-cloud-sun icon" aria-hidden="true"></i><span>天气查询</span>
              </li>
              <li data-router="/ip">
                <i class="bi bi-geo-alt icon" aria-hidden="true"></i><span>IP地址查询</span>
              </li> -->
              <li data-router="/unit" role="link" tabindex="0">
                <i class="bi bi-rulers icon" aria-hidden="true"></i><span>单位换算</span>
              </li>
              <li data-router="/password" role="link" tabindex="0">
                <i class="bi bi-key icon" aria-hidden="true"></i><span>密码生成器</span>
              </li>
              <li data-router="/image-processing" role="link" tabindex="0">
                <i class="bi bi-image icon" aria-hidden="true"></i><span>图片处理</span>
              </li>
              <!-- <li data-router="/qr">
                <i class="bi bi-qr-code icon" aria-hidden="true"></i><span>二维码生成</span>
              </li> -->
            </ul>
          </div>
        </Transition>
        <li
          class="nav-drawer-li"
          data-router="/nav"
          role="link"
          tabindex="0"
          v-if="blogSettingMap.show_sites_module"
        >
          常用网站
        </li>
        <li
          class="nav-drawer-li"
          data-router="/comments"
          role="link"
          tabindex="0"
          v-if="blogSettingMap.show_guestbook_module"
        >
          留言板
        </li>
        <li
          class="nav-drawer-li"
          data-router="/friendlinks"
          role="link"
          tabindex="0"
          v-if="blogSettingMap.show_friend_link_module"
        >
          友情链接
        </li>
        <li
          class="nav-drawer-li"
          data-router="/about"
          role="link"
          tabindex="0"
          v-if="blogSettingMap.show_about_module"
        >
          关于我
        </li>
      </ul>
    </div>
  </el-drawer>
</template>

<script setup>
import { ref, defineExpose, computed } from "vue";
import { useRouter } from "vue-router";
import SidebarUser from "@/components/SidebarUser/Index.vue";
import { useMainStore } from "@/stores/mainStore";

const mainStore = useMainStore();

const blogSettingMap = computed(() => {
  return mainStore.blogSettingMap;
});

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
  showTopicCollapse.value = !showTopicCollapse.value;
  if (showTopicCollapse.value) {
    showToolsCollapse.value = false;
  }
};

const clickTools = () => {
  showToolsCollapse.value = !showToolsCollapse.value;
  if (showToolsCollapse.value) {
    showTopicCollapse.value = false;
  }
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

.collapse-icon {
  transition: transform 0.35s var(--ease-out-expo), color 0.25s ease;
}

.collapse-icon.is-open {
  transform: rotate(180deg);
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

.nav-drawer-shell {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
}

.nav-drawer-header {
  flex-shrink: 0;
}

.nav-drawer-header :deep(.sidebar-info) {
  margin-bottom: 0;
  border-radius: 18px;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.08);
}

.nav-drawer-header :deep(.sidebar-info-hero) {
  gap: 10px;
  padding: 12px;
}

.nav-drawer-header :deep(.avatar-button) {
  width: 58px;
  height: 58px;
}

.nav-drawer-header :deep(.avatar) {
  width: 58px;
  height: 58px;
}

.nav-drawer-header :deep(.avatar-ring) {
  inset: -3px;
}

.nav-drawer-header :deep(.sidebar-info-status) {
  margin-bottom: 4px;
  padding: 3px 8px;
  font-size: 10px;
}

.nav-drawer-header :deep(.sidebar-info-name) {
  margin: 0;
  font-size: 16px;
  line-height: 1.2;
}

.nav-drawer-header :deep(.sidebar-info-sign),
.nav-drawer-header :deep(.profile-entry),
.nav-drawer-header :deep(.sidebar-info-body) {
  display: none;
}

.dividing-line {
  flex-shrink: 0;
  margin: 8px 6px 4px;
}

.nav-drawer-ul {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 8px 6px 0;
}

.collapse-card {
  position: relative;
}

.nav-drawer-li {
  position: relative;
  padding: 0 16px;
  margin-bottom: 10px;
  cursor: pointer;
  font-size: 16px;
  min-height: 40px;
  display: flex;
  align-items: center;
  border-radius: 12px;
  transition: transform 0.22s ease, background-color 0.22s ease, color 0.22s ease,
    box-shadow 0.22s ease;

  &:hover {
    color: var(--theme-btn-hover-color);
    background: rgba(255, 255, 255, 0.07);
    box-shadow: inset 3px 0 0 var(--theme-btn-hover-color);
  }

  &:active {
    transform: scale(0.98);
  }

  a {
    color: inherit;
    width: 100%;
  }
}

.nav-drawer-li:focus-visible,
.nav-drawer-li-collapse li:focus-visible {
  outline: 3px solid rgba(34, 211, 238, 0.45);
  outline-offset: 2px;
}

.nav-drawer-li-toggle {
  user-select: none;
}

.nav-drawer-li-toggle.is-expanded {
  color: var(--theme-btn-hover-color);
  background: rgba(255, 255, 255, 0.08);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.06);
}

.nav-drawer-li-collapse {
  padding: 2px 12px 0 16px;
  margin: -4px 0 10px;
  color: inherit;
  transform-origin: top center;

  li {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 9px 12px;
    font-size: 14px;
    cursor: pointer;
    border-radius: 12px;
    color: inherit;
    transition: transform 0.22s ease, background-color 0.22s ease, color 0.22s ease;

    &:hover {
      color: var(--theme-btn-hover-color);
      background: rgba(255, 255, 255, 0.08);
    }

    .icon {
      width: 1em;
      height: 1em;
      flex-shrink: 0;
    }
  }
}

.submenu-slide-enter-active,
.submenu-slide-leave-active {
  overflow: hidden;
  transition: max-height 0.35s var(--ease-out-expo),
    opacity 0.25s ease, transform 0.35s var(--ease-out-expo),
    margin 0.35s var(--ease-out-expo);
}

.submenu-slide-enter-from,
.submenu-slide-leave-to {
  max-height: 0;
  opacity: 0;
  transform: translateY(-10px) scaleY(0.96);
  margin-top: -12px;
}

.submenu-slide-enter-to,
.submenu-slide-leave-from {
  max-height: 320px;
  opacity: 1;
  transform: translateY(0) scaleY(1);
}

@media (max-width: 480px) {
  .nav-drawer-header :deep(.sidebar-info-hero) {
    padding: 10px;
  }

  .nav-drawer-header :deep(.avatar-button),
  .nav-drawer-header :deep(.avatar) {
    width: 52px;
    height: 52px;
  }

  .nav-drawer-header :deep(.sidebar-info-name) {
    font-size: 15px;
  }

  .nav-drawer-ul {
    padding-top: 6px;
  }

  .nav-drawer-li {
    min-height: 38px;
    margin-bottom: 8px;
    font-size: 15px;
  }
}
</style>
