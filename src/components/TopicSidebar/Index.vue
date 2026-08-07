<template>
  <div>
    <sidebar-user v-slid-in></sidebar-user>
    <div
      v-slid-in
      class="sidebar-category"
      :class="{ 'sidin-start': true, 'sidin-end': isSidebarVisible }"
    >
      <div class="sidebar-category-title">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#levi-fenlei"></use>
        </svg>
        <span>全部分类</span>
      </div>
      <div class="sidebar-category-content">
        <ul class="sidebar-category-ul" @click="selectCategory">
          <li
            class="sidebar-category-li"
            data-router="/"
            :class="{ 'active-category': route.path === '/' }"
          >
            <span
              ><svg class="icon" aria-hidden="true">
                <use xlink:href="#levi-zonghelei"></use></svg
              ><span>综合文章</span></span
            >
            <i class="bi bi-chevron-right"></i>
          </li>
          <li
            class="sidebar-category-li"
            data-router="/category/daily"
            :class="{ 'active-category': route.path === '/category/daily' }"
          >
            <span
              ><svg class="icon" aria-hidden="true">
                <use xlink:href="#levi-woderichang"></use></svg
              ><span>日常随记</span></span
            >
            <i class="bi bi-chevron-right"></i>
          </li>
          <li
            class="sidebar-category-li"
            data-router="/category/technology"
            :class="{ 'active-category': route.path === '/category/technology' }"
          >
            <span
              ><svg class="icon" aria-hidden="true">
                <use xlink:href="#levi-jishurenyuan"></use></svg
              ><span>开发心得</span></span
            >
            <i class="bi bi-chevron-right"></i>
          </li>
          <li
            class="sidebar-category-li"
            data-router="/category/cute-pet"
            :class="{ 'active-category': route.path === '/category/cute-pet' }"
          >
            <span
              ><svg class="icon" aria-hidden="true">
                <use xlink:href="#levi-aichong03"></use></svg
              ><span>萌宠日记</span></span
            >
            <i class="bi bi-chevron-right"></i>
          </li>
          <li
            class="sidebar-category-li"
            data-router="/category/notes"
            :class="{ 'active-category': route.path === '/category/notes' }"
          >
            <span>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#levi-biji"></use></svg
              ><span>学习笔记</span></span
            >
            <i class="bi bi-chevron-right"></i>
          </li>
          <li
            class="sidebar-category-li"
            data-router="/category/landscape"
            :class="{ 'active-category': route.path === '/category/landscape' }"
          >
            <span>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#levi-fengjing"></use></svg
              ><span>光影故事</span></span
            >
            <i class="bi bi-chevron-right"></i>
          </li>
        </ul>
      </div>
    </div>
    <div
      v-slid-in
      class="sidebar-tags"
      :class="{ 'sidin-start': true, 'sidin-end': isSidebarVisible }"
    >
      <div class="sidebar-tags-title">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#levi-biaoqian_1"></use>
        </svg>
        <span>所有标签</span>
      </div>
      <div class="sidebar-tags-content">
        <div
          class="tags-item"
          v-for="item in tags"
          :key="item.id"
          :style="{ color: item.color }"
        >
          {{ item.tag_name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import SidebarUser from "../SidebarUser/Index.vue";
import { getRandomHexColor } from "@/utils/utils.js";
import { vSlidIn } from "@/utils/vSlidIn.js";
import { useMainStore } from "@/stores/mainStore";

const tags = computed(() => {
  return mainStore.tagMap
    .filter((item) => item.status === 1)
    .map((item) => {
      item.color = getRandomHexColor();
      return item;
    });
});

const mainStore = useMainStore();

const route = useRoute();
const router = useRouter();

onMounted(() => {
  isSidebarVisible.value = true;
});

const isSidebarVisible = ref(false);

const selectCategory = (e) => {
  const target = e.target.closest("li");
  if (target) {
    const path = target.getAttribute("data-router");
    if (path) {
      router.push(path);
    }
  }
};
</script>

<style lang="scss" scoped>
.sidebar-category,
.sidebar-tags {
  background: var(--theme-color);
  border-radius: var(--theme-radius);
  margin-bottom: 20px;
  padding: 20px;
}

.sidebar-tags {
  padding: 16px;
}

.sidebar-category-title,
.sidebar-tags-title {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  padding: 0 5px;
  .icon {
    width: 1.5em;
    height: 1.5em;
    margin-right: 10px;
  }
}

.sidebar-tags-title {
  margin-bottom: 10px;
  padding: 0 2px;

  .icon {
    width: 1.3em;
    height: 1.3em;
    margin-right: 8px;
  }
}

.sidebar-tags-content {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 6px;
  padding: 0;
}

.tags-item {
  position: relative;
  padding: 5px 6px;
  border-radius: 10px;
  font-size: 10px;
  font-weight: 500;
  line-height: 1;
  cursor: default;
  overflow: hidden;
  text-align: center;
  white-space: nowrap;
  text-overflow: ellipsis;
  box-shadow: inset 0 0 0 1px currentColor;
  transition: transform 0.22s ease, box-shadow 0.22s ease, color 0.22s ease;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: currentColor;
    opacity: 0.1;
    transition: opacity 0.22s ease;
  }

  &:hover {
    transform: translateY(-1px);
    box-shadow: inset 0 0 0 1px currentColor, 0 6px 14px rgba(0, 0, 0, 0.08);

    &::before {
      opacity: 0.14;
    }
  }
}

@media (max-width: 1200px) {
  .sidebar-tags-content {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 860px) {
  .sidebar-tags {
    padding: 14px;
  }

  .sidebar-tags-title {
    margin-bottom: 8px;
  }

  .sidebar-tags-content {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 5px;
  }

  .tags-item {
    padding: 5px 6px;
    font-size: 10px;
  }
}

.bi-hdd-stack,
.bi-tags-fill {
  margin-right: 10px;
  font-size: 24px;
}

.sidebar-category-li {
  padding: 5px 10px;
  margin: 5px 0;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  justify-content: space-between;
  border-radius: 5px;
  font-size: 15px;

  span > .icon {
    margin-right: 10px;
    width: 1.2em;
    height: 1.2em;
  }

  &:hover {
    transition: all 0.3s;
    background: #e9e6e69e;
    color: var(--link-text-color);
  }
}

.active-category {
  transition: all 0.3s;
  background: #e9e6e69e;
  color: var(--link-text-color);
}
</style>
