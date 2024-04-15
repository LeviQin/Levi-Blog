<template>
  <sidebar-user v-slid-in></sidebar-user>
  <div
    v-slid-in
    class="sidebar-category"
    :class="{ 'sidin-start': true, 'sidin-end': isSidebarVisible }"
  >
    <div class="sidebar-category-title">
      <i class="bi bi-hdd-stack"></i>
      <span>分类</span>
    </div>
    <div class="sidebar-category-content">
      <ul class="sidebar-category-ul" @click="selectCategory">
        <li :class="`sidebar-category-li`" data-router="/">
          <span><i class="bi bi-browser-safari"></i>综合</span>
          <i class="bi bi-chevron-right"></i>
        </li>
        <li class="sidebar-category-li" data-router="/daily">
          <span><i class="bi bi-balloon-heart bi-dropdown-item"></i>日常</span>
          <i class="bi bi-chevron-right"></i>
        </li>
        <li class="sidebar-category-li" data-router="/technology">
          <span><i class="bi bi-code-slash bi-dropdown-item"></i>技术</span>
          <i class="bi bi-chevron-right"></i>
        </li>
        <li class="sidebar-category-li" data-router="/cute-pet">
          <span><i class="bi bi-twitter bi-dropdown-item"></i>萌宠</span>
          <i class="bi bi-chevron-right"></i>
        </li>
        <li class="sidebar-category-li" data-router="/notes">
          <span><i class="bi bi-brush bi-dropdown-item"></i>笔记</span>
          <i class="bi bi-chevron-right"></i>
        </li>
        <li class="sidebar-category-li" data-router="/landscape">
          <span><i class="bi bi-globe-americas bi-dropdown-item"></i>风景</span>
          <i class="bi bi-chevron-right"></i>
        </li>
        <li class="sidebar-category-li" data-router="/figure">
          <span><i class="bi bi-universal-access bi-dropdown-item"></i>人物</span>
          <i class="bi bi-chevron-right"></i>
        </li>
        <!-- <li class="sidebar-category-li" data-router="/game">
          <span><i class="bi bi-controller bi-dropdown-item"></i>游戏</span>
          <i class="bi bi-chevron-right"></i>
        </li>
        <li class="sidebar-category-li" data-router="/embarrassing">
          <span><i class="bi bi-emoji-dizzy bi-dropdown-item"></i>囧事</span>
          <i class="bi bi-chevron-right"></i>
        </li> -->
      </ul>
    </div>
  </div>
  <div
    v-slid-in
    class="sidebar-tags"
    :class="{ 'sidin-start': true, 'sidin-end': isSidebarVisible }"
  >
    <div class="sidebar-tags-title">
      <i class="bi bi-tags-fill"></i>
      <span>标签</span>
    </div>
    <div class="sidebar-tags-content">
      <div class="tags-item" v-for="item in dataMap.tags" :style="`color: ${item.color}`">
        {{ item.label }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import SidebarUser from "../SidebarUser/Index.vue";
import { tagMap } from "@/utils/tagMap.js";
import { getRandomHexColor } from "@/utils/utils.js";
import { vSlidIn } from "@/utils/vSlidIn.js";

const route = useRoute();
const router = useRouter();

watch(
  () => route.path,
  () => {
    activeCategory();
  }
);

onMounted(() => {
  dataMap.tags = tagMap.map((item) => {
    item.color = getRandomHexColor();
    return item;
  });
  activeCategory();
  isSidebarVisible.value = true;
});

const dataMap = reactive({
  tags: [],
});

let isSidebarVisible = ref(false);

const activeCategory = () => {
  const lis = document.querySelectorAll(".sidebar-category-li");
  lis.forEach((ele) => {
    if (route.path === ele.getAttribute("data-router")) {
      ele.classList.add("active-category");
    } else {
      ele.classList.remove("active-category");
    }
  });
};

const selectCategory = (e) => {
  const path = e.target.getAttribute("data-router");
  router.push(path);
};
</script>

<style lang="scss" scoped>
.sidebar-category,
.sidebar-tags {
  background: var(--themeColor);
  border-radius: var(--themeRadius);
  margin-bottom: 20px;
  padding: 20px;
}

.sidebar-category-title,
.sidebar-tags-title {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  padding: 0 10px;
}

.sidebar-tags-content {
  display: flex;
  flex-wrap: wrap;
}

.tags-item {
  margin: 2px 5px;
  font-size: 13px;
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

  span > .bi {
    margin-right: 10px;
  }

  &:hover {
    transition: all 0.3s;
    background: #e9e6e69e;
    color: var(--linkTextColor);
  }
}

.active-category {
  transition: all 0.3s;
  background: #e9e6e69e;
  color: var(--linkTextColor);
}
</style>
