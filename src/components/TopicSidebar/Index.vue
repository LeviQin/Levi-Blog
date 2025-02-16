<template>
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
        <li :class="`sidebar-category-li`" data-router="/">
          <span
            ><svg class="icon" aria-hidden="true">
              <use xlink:href="#levi-zonghelei"></use></svg
            ><span>综合文章</span></span
          >
          <i class="bi bi-chevron-right"></i>
        </li>
        <li class="sidebar-category-li" data-router="/category/daily">
          <span
            ><svg class="icon" aria-hidden="true">
              <use xlink:href="#levi-woderichang"></use></svg
            ><span>日常随记</span></span
          >
          <i class="bi bi-chevron-right"></i>
        </li>
        <li class="sidebar-category-li" data-router="/category/technology">
          <span
            ><svg class="icon" aria-hidden="true">
              <use xlink:href="#levi-jishurenyuan"></use></svg
            ><span>开发心得</span></span
          >
          <i class="bi bi-chevron-right"></i>
        </li>
        <li class="sidebar-category-li" data-router="/category/cute-pet">
          <span
            ><svg class="icon" aria-hidden="true">
              <use xlink:href="#levi-aichong03"></use></svg
            ><span>萌宠日记</span></span
          >
          <i class="bi bi-chevron-right"></i>
        </li>
        <li class="sidebar-category-li" data-router="/category/notes">
          <span>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#levi-biji"></use></svg
            ><span>学习笔记</span></span
          >
          <i class="bi bi-chevron-right"></i>
        </li>
        <li class="sidebar-category-li" data-router="/category/landscape">
          <span>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#levi-fengjing"></use></svg
            ><span>自然风光</span></span
          >
          <i class="bi bi-chevron-right"></i>
        </li>
        <li class="sidebar-category-li" data-router="/category/figure">
          <span>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#levi-168-boy-2"></use></svg
            ><span>人物故事</span></span
          >
          <i class="bi bi-chevron-right"></i>
        </li>
        <li class="sidebar-category-li" data-router="/category/games">
          <span>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#levi-youxiji"></use></svg
            ><span>游戏时光</span></span
          >
          <i class="bi bi-chevron-right"></i>
        </li>
        <!-- <li class="sidebar-category-li" data-router="/category/embarrassing">
          <span><svg class="icon" aria-hidden="true">
                    <use xlink:href="#levi-meirijiongtu"></use></svg
                  ><span>趣事囧闻</span></span>
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
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#levi-biaoqian_1"></use>
      </svg>
      <span>所有标签</span>
    </div>
    <div class="sidebar-tags-content">
      <div class="tags-item" v-for="item in tags" :style="`color: ${item.color}`">
        {{ item.tag_name }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import SidebarUser from "../SidebarUser/Index.vue";
import { getRandomHexColor } from "@/utils/utils.js";
import { vSlidIn } from "@/utils/vSlidIn.js";
import { useMainStore } from "@/stores/mainStore";

const tags = computed(() => {
  return mainStore.tagMap.map((item) => {
    item.color = getRandomHexColor();
    return item;
  });
});

const mainStore = useMainStore();

const route = useRoute();
const router = useRouter();

watch(
  () => route.path,
  () => {
    activeCategory();
  }
);

onMounted(() => {
  activeCategory();
  isSidebarVisible.value = true;
});

const isSidebarVisible = ref(false);

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
  background: var(--theme-color);
  border-radius: var(--theme-radius);
  margin-bottom: 20px;
  padding: 20px;
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

.sidebar-tags-content {
  display: flex;
  flex-wrap: wrap;
}

.tags-item {
  padding: 2px 3px;
  background-color: transparent;
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
