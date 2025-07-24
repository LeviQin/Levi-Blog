<template>
  <div class="nav-bar">
    <ul class="nav-ul" @click="toPage">
      <li class="nav-li" data-router="/" :class="{ 'active-li': route.path === `/` }">
        首页
      </li>
      <custom-dropdown
        v-if="blogSettingMap.show_category_module"
        @select="handleCommandToPage"
        ref="categoryDropdown"
      >
        <template #trigger>
          <li class="nav-li">文章分类</li>
        </template>
        <template #menu>
          <dropdown-item @click="handleCommandToPage('category/daily')">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#levi-woderichang"></use>
            </svg>
            <span>日常随记</span>
          </dropdown-item>
          <dropdown-item @click="handleCommandToPage('category/technology')">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#levi-jishurenyuan"></use>
            </svg>
            <span>开发心得</span>
          </dropdown-item>
          <dropdown-item @click="handleCommandToPage('category/cute-pet')">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#levi-aichong03"></use>
            </svg>
            <span>萌宠日记</span>
          </dropdown-item>
          <dropdown-item @click="handleCommandToPage('category/notes')">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#levi-biji"></use>
            </svg>
            <span>学习笔记</span>
          </dropdown-item>
          <dropdown-item @click="handleCommandToPage('category/landscape')">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#levi-fengjing"></use>
            </svg>
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
          <li class="nav-li">小工具</li>
        </template>
        <template #menu>
          <dropdown-item @click="handleCommandToPage('encryption')">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#levi-jiami"></use>
            </svg>
            <span>加密/解密</span>
          </dropdown-item>
          <!-- 注释掉的菜单项
          <dropdown-item @click="handleCommandToPage('weather')">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#levi-tianqi"></use>
            </svg>
            <span>天气查询</span>
          </dropdown-item>
          <dropdown-item @click="handleCommandToPage('ip')">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#levi-IPdizhi"></use>
            </svg>
            <span>IP地址查询</span>
          </dropdown-item>
          -->
          <dropdown-item @click="handleCommandToPage('unit')">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#levi-danweihuansuanx"></use>
            </svg>
            <span>单位换算</span>
          </dropdown-item>
          <dropdown-item @click="handleCommandToPage('password')">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#levi-mima"></use>
            </svg>
            <span>密码生成器</span>
          </dropdown-item>
          <dropdown-item @click="handleCommandToPage('image-processing')">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#levi-tupianchuli"></use>
            </svg>
            <span>图片处理</span>
          </dropdown-item>
          <!-- 注释掉的菜单项
          <dropdown-item @click="handleCommandToPage('qr')">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#levi-erweimashengchenggongju"></use>
            </svg>
            <span>二维码生成</span>
          </dropdown-item>
          -->
        </template>
      </custom-dropdown>
      <li
        class="nav-li"
        data-router="/nav"
        :class="{ 'active-li': route.path === `/nav` }"
        v-if="blogSettingMap.show_sites_module"
      >
        常用网站
      </li>
      <li
        class="nav-li"
        data-router="/comments"
        :class="{ 'active-li': route.path === `/comments` }"
        v-if="blogSettingMap.show_guestbook_module"
      >
        留言板
      </li>
      <li
        class="nav-li"
        data-router="/friendlinks"
        :class="{ 'active-li': route.path === `/friendlinks` }"
        v-if="blogSettingMap.show_friend_link_module"
      >
        友情链接
      </li>
      <li
        class="nav-li"
        data-router="/about"
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
  color: var(--nav-bar-text-color);
  cursor: pointer;
  font-size: 16px;
  transition: all 0.5s;
  border-bottom: 2px solid transparent;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);

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
