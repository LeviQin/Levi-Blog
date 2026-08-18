<template>
  <div class="nav-bar">
    <ul class="nav-ul" @click="toPage" @keydown.enter.prevent="toPage">
      <li class="nav-li" data-router="/" role="link" tabindex="0" :class="{ 'active-li': route.path === `/` }">
        首页
      </li>
      <custom-dropdown
        v-if="blogSettingMap.show_category_module"
        @select="handleCommandToPage"
        ref="categoryDropdown"
      >
        <template #trigger>
          <li class="nav-li" aria-haspopup="menu" :class="{ 'active-li': route.path.startsWith('/category/') }">文章分类</li>
        </template>
        <template #menu>
          <dropdown-item @click="handleCommandToPage('category/daily')">
            <i class="bi bi-journal-text icon" aria-hidden="true"></i>
            <span>日常随记</span>
          </dropdown-item>
          <dropdown-item @click="handleCommandToPage('category/technology')">
            <i class="bi bi-code-slash icon" aria-hidden="true"></i>
            <span>开发心得</span>
          </dropdown-item>
          <dropdown-item @click="handleCommandToPage('category/cute-pet')">
            <i class="bi bi-heart icon" aria-hidden="true"></i>
            <span>萌宠日记</span>
          </dropdown-item>
          <dropdown-item @click="handleCommandToPage('category/notes')">
            <i class="bi bi-journal-bookmark icon" aria-hidden="true"></i>
            <span>学习笔记</span>
          </dropdown-item>
          <dropdown-item @click="handleCommandToPage('category/landscape')">
            <i class="bi bi-camera icon" aria-hidden="true"></i>
            <span>光影故事</span>
          </dropdown-item>
        </template>
      </custom-dropdown>
      <!-- <li class="nav-li" data-router="/material">前端资料</li> -->
      <custom-dropdown
        v-if="blogSettingMap.show_widget_module"
        @select="handleCommandToPage"
        ref="widgetDropdown"
      >
        <template #trigger>
          <li class="nav-li" aria-haspopup="menu" :class="{ 'active-li': route.path.startsWith('/encryption') || route.path.startsWith('/unit') || route.path.startsWith('/password') || route.path.startsWith('/image-processing') }">小工具</li>
        </template>
        <template #menu>
          <dropdown-item @click="handleCommandToPage('encryption')">
            <i class="bi bi-shield-lock icon" aria-hidden="true"></i>
            <span>加密/解密</span>
          </dropdown-item>
          <!-- 注释掉的菜单项
          <dropdown-item @click="handleCommandToPage('weather')">
            <i class="bi bi-cloud-sun icon" aria-hidden="true"></i>
            <span>天气查询</span>
          </dropdown-item>
          <dropdown-item @click="handleCommandToPage('ip')">
            <i class="bi bi-geo-alt icon" aria-hidden="true"></i>
            <span>IP地址查询</span>
          </dropdown-item>
          -->
          <dropdown-item @click="handleCommandToPage('unit')">
            <i class="bi bi-rulers icon" aria-hidden="true"></i>
            <span>单位换算</span>
          </dropdown-item>
          <dropdown-item @click="handleCommandToPage('password')">
            <i class="bi bi-key icon" aria-hidden="true"></i>
            <span>密码生成器</span>
          </dropdown-item>
          <dropdown-item @click="handleCommandToPage('image-processing')">
            <i class="bi bi-image icon" aria-hidden="true"></i>
            <span>图片处理</span>
          </dropdown-item>
          <!-- 注释掉的菜单项
          <dropdown-item @click="handleCommandToPage('qr')">
            <i class="bi bi-qr-code icon" aria-hidden="true"></i>
            <span>二维码生成</span>
          </dropdown-item>
          -->
        </template>
      </custom-dropdown>
      <li
        class="nav-li"
        data-router="/nav"
        role="link"
        tabindex="0"
        :class="{ 'active-li': route.path === `/nav` }"
        v-if="blogSettingMap.show_sites_module"
      >
        常用网站
      </li>
      <li
        class="nav-li"
        data-router="/comments"
        role="link"
        tabindex="0"
        :class="{ 'active-li': route.path === `/comments` }"
        v-if="blogSettingMap.show_guestbook_module"
      >
        留言板
      </li>
      <li
        class="nav-li"
        data-router="/friendlinks"
        role="link"
        tabindex="0"
        :class="{ 'active-li': route.path === `/friendlinks` }"
        v-if="blogSettingMap.show_friend_link_module"
      >
        友情链接
      </li>
      <li
        class="nav-li"
        data-router="/about"
        role="link"
        tabindex="0"
        :class="{ 'active-li': route.path === `/about` }"
        v-if="blogSettingMap.show_about_module"
      >
        关于我
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useMainStore } from "@/stores/mainStore";
import CustomDropdown from "@/components/CustomDropdown/Index.vue";
import DropdownItem from "@/components/CustomDropdown/DropdownItem.vue";

const mainStore = useMainStore();

const blogSettingMap = computed(() => {
  return mainStore.blogSettingMap;
});

const router = useRouter();
const route = useRoute();

const categoryDropdown = ref(null);
const widgetDropdown = ref(null);

const toPage = (e) => {
  const path = e.target.getAttribute("data-router");
  path && router.push(path);
};

const handleCommandToPage = (val) => {
  router.push(`/${val}`);
};
</script>

<style lang="scss" scoped>
.nav-bar {
  height: 100%;
  display: flex;
  align-items: center;
}

.nav-ul {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
  gap: 25px;
}

.nav-li {
  display: flex;
  align-items: center;
  height: 100%;
  color: var(--nav-bar-text-color);
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.5s;
  border-bottom: 2px solid transparent;
}

.nav-li:focus-visible,
:deep(.dropdown-trigger:focus-visible) {
  outline: 3px solid rgba(34, 211, 238, 0.45);
  outline-offset: 4px;
  border-radius: 4px;
}

.active-li {
  color: var(--btn-tag-bg-color);
}

.icon {
  margin-right: 5px;
  font-size: 1em;
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
