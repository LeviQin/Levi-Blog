<template>
  <div class="footer">
    <div class="footer-container">
      <div class="info-box">
        <div class="info-item">
          <span>{{ blogSettingMap.blog_record_name }}</span>
        </div>
        <div class="info-item">
          <a href="https://beian.miit.gov.cn" target="_blank">{{
            blogSettingMap.blog_record_number
          }}</a>
        </div>
      </div>
      <div class="support-box">
        <div class="support-item" v-for="badge in techBadges" :key="badge.label">
          <a
            :class="badge.class"
            target="_blank"
            :href="badge.href"
            style="margin-inline: 5px"
            :title="badge.title"
            rel="external nofollow noreferrer"
            ><img
              :src="badge.src"
              :alt="badge.label"
              loading="lazy"
          /></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useMainStore } from "@/stores/mainStore";

const mainStore = useMainStore();

const blogSettingMap = computed(() => {
  return mainStore.blogSettingMap;
});

// 技术栈徽章
const techBadges = [
  {
    label: "Vue.js",
    class: "vue-badge",
    href: "https://vuejs.org/",
    title: "前端框架 Vue3",
    src: "https://img.shields.io/badge/Vue.js-4FC08D?style=flat&logo=vuedotjs&logoColor=white&labelColor=%23343536",
  },
  {
    label: "Vite",
    class: "vite-badge",
    href: "https://vite.dev/",
    title: "构建工具 Vite",
    src: "https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white&labelColor=%23343536",
  },
  {
    label: "GitHub",
    class: "github-badge",
    href: "https://github.com/",
    title: "源码托管 GitHub",
    src: "https://img.shields.io/badge/Source-GitHub-d021d6?style=flat&logo=GitHub&labelColor=%23343536",
  },
];
</script>

<style lang="scss" scoped>
.footer {
  min-width: var(--min-width);
  display: flex;
  justify-content: center;
  background: var(--theme-color);
  border-top: 1px solid var(--border-color);
  backdrop-filter: blur(20px);
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.2);
  padding: 20px 0;
  margin-top: 30px;
}

.info-item a,
.info-item span {
  color: var(--color);
  font-size: 16px;
}

.info-box {
  text-align: center;
}

.info-item {
  padding: 8px 0;
}

.support-box {
  padding-top: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 4px;
}

.support-item {
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 860px) {
  .footer {
    margin-top: 20px;
  }

  .info-item a,
  .info-item span {
    color: var(--color);
    font-size: 14px;
  }

  .support-box {
    justify-content: center;
  }
}
</style>
