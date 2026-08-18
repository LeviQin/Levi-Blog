<template>
  <div>
    <sidebar-user v-slid-in></sidebar-user>
    <div
      v-slid-in
      class="sidebar-category"
      :class="{ 'sidin-start': true, 'sidin-end': isSidebarVisible }"
    >
      <div class="sidebar-category-title">
        <i class="bi bi-grid-3x3-gap-fill icon" aria-hidden="true"></i>
        <span>全部分类</span>
      </div>
      <div class="sidebar-category-content">
        <ul class="sidebar-category-ul" @click="selectCategory">
          <li
            class="sidebar-category-li"
            data-router="/"
            :class="{ 'active-category': route.path === '/' }"
          >
            <span><i class="bi bi-collection icon" aria-hidden="true"></i><span>综合文章</span></span>
            <i class="bi bi-chevron-right"></i>
          </li>
          <li
            class="sidebar-category-li"
            data-router="/category/daily"
            :class="{ 'active-category': route.path === '/category/daily' }"
          >
            <span><i class="bi bi-journal-text icon" aria-hidden="true"></i><span>日常随记</span></span>
            <i class="bi bi-chevron-right"></i>
          </li>
          <li
            class="sidebar-category-li"
            data-router="/category/technology"
            :class="{ 'active-category': route.path === '/category/technology' }"
          >
            <span><i class="bi bi-code-slash icon" aria-hidden="true"></i><span>开发心得</span></span>
            <i class="bi bi-chevron-right"></i>
          </li>
          <li
            class="sidebar-category-li"
            data-router="/category/cute-pet"
            :class="{ 'active-category': route.path === '/category/cute-pet' }"
          >
            <span><i class="bi bi-heart icon" aria-hidden="true"></i><span>萌宠日记</span></span>
            <i class="bi bi-chevron-right"></i>
          </li>
          <li
            class="sidebar-category-li"
            data-router="/category/notes"
            :class="{ 'active-category': route.path === '/category/notes' }"
          >
            <span><i class="bi bi-journal-bookmark icon" aria-hidden="true"></i><span>学习笔记</span></span>
            <i class="bi bi-chevron-right"></i>
          </li>
          <li
            class="sidebar-category-li"
            data-router="/category/landscape"
            :class="{ 'active-category': route.path === '/category/landscape' }"
          >
            <span><i class="bi bi-camera icon" aria-hidden="true"></i><span>光影故事</span></span>
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
        <i class="bi bi-tags-fill icon" aria-hidden="true"></i>
        <span>标签概览</span>
      </div>
      <div class="sidebar-tags-content">
        <div
          class="tags-item"
          v-for="item in tags"
          :key="item.id"
          :style="{ color: item.displayColor }"
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
import { vSlidIn } from "@/utils/vSlidIn.js";
import { useMainStore } from "@/stores/mainStore";
import { useTheme } from "@/hooks/useTheme";

const { theme } = useTheme();

// 按主题从固定调色板生成稳定、可读的标签颜色
const tagColor = (id, dark) => {
  const source = String(id);
  let hash = 0;
  for (let index = 0; index < source.length; index += 1) {
    hash = (hash * 31 + source.charCodeAt(index)) >>> 0;
  }
  const palette = dark
    ? ["#67e8f9", "#a5f3fc", "#93c5fd", "#c4b5fd", "#86efac"]
    : ["#0e7490", "#0369a1", "#4338ca", "#6d28d9", "#047857"];
  return palette[hash % palette.length];
};

const tags = computed(() => {
  return mainStore.tagMap
    .filter((item) => item.status === 1)
    .map((item) => {
      return {
        ...item,
        displayColor: tagColor(item.id, theme.value === "dark"),
      };
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
  border: 1px solid var(--border-color);
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
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.5em;
    height: 1.5em;
    margin-right: 10px;
  }
}

.sidebar-tags-title {
  margin-bottom: 10px;
  padding: 0 2px;

  .icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1.3em;
    height: 1.3em;
    margin-right: 8px;
  }
}

.sidebar-tags-content {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
  padding: 0;
}

.tags-item {
  position: relative;
  padding: 7px 8px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 500;
  color: var(--theme-btn-hover-color);
  line-height: 1;
  cursor: default;
  overflow: hidden;
  text-align: center;
  white-space: nowrap;
  text-overflow: ellipsis;
  box-shadow: inset 0 0 0 1px currentColor;
  transition: background-color var(--dur-fast) var(--ease-standard), box-shadow var(--dur-fast) var(--ease-standard);

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: currentColor;
    opacity: 0.08;
    transition: opacity 0.22s ease;
  }

  &:hover {
    box-shadow: inset 0 0 0 1px currentColor, 0 4px 10px rgba(34, 211, 238, 0.12);

    &::before {
      opacity: 0.12;
    }
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
    gap: 6px;
  }

  .tags-item {
    padding: 6px 7px;
    font-size: 11px;
  }
}

.sidebar-category-title .bi,
.sidebar-tags-title .bi {
  margin-right: 10px;
  font-size: 20px;
}

.sidebar-category-li {
  padding: 8px 10px;
  margin: 4px 0;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  justify-content: space-between;
  border-radius: 5px;
  font-size: 15px;

  span > .icon {
    margin-right: 10px;
    font-size: 15px;
  }

  &:hover {
    background: var(--accent-soft-bg);
    color: var(--link-text-color);
  }
}

.active-category {
  background: var(--accent-soft-bg);
  color: var(--link-text-color);
}

html[data-theme="dark"] .sidebar-category-li {
  &:hover,
  &.active-category {
    background: var(--accent-soft-bg);
    color: var(--link-text-color);
  }
}
</style>
