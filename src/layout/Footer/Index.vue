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
    label: "Sass",
    class: "sass-badge",
    href: "https://sass-lang.com/",
    title: "样式预处理器 Sass",
    src: "https://img.shields.io/badge/Sass-CC6699?style=flat&logo=sass&logoColor=white&labelColor=%23343536",
  },
  {
    label: "Pinia",
    class: "pinia-badge",
    href: "https://pinia.vuejs.org/",
    title: "状态管理 Pinia",
    src: "https://img.shields.io/badge/Pinia-FFD859?style=flat&logo=vue.js&logoColor=white&labelColor=%23343536",
  },
  {
    label: "Node.js",
    class: "node-badge",
    href: "https://nodejs.org/",
    title: "后端 Node.js",
    src: "https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white&labelColor=%23343536",
  },
  {
    label: "Koa",
    class: "koa-badge",
    href: "https://koajs.com/",
    title: "后端框架 Koa",
    src: "https://img.shields.io/badge/Koa-33333D?style=flat&logo=node.js&logoColor=white&labelColor=%23343536",
  },
  {
    label: "MySQL",
    class: "mysql-badge",
    href: "https://www.mysql.com/",
    title: "数据库 MySQL",
    src: "https://img.shields.io/badge/MySQL-4479A1?style=flat&logo=mysql&logoColor=white&labelColor=%23343536",
  },
  {
    label: "Socket.IO",
    class: "socketio-badge",
    href: "https://socket.io/",
    title: "实时通信 Socket.IO",
    src: "https://img.shields.io/badge/Socket.IO-010101?style=flat&logo=socketdotio&logoColor=white&labelColor=%23343536",
  },
  {
    label: "Nginx",
    class: "nginx-badge",
    href: "https://nginx.org/",
    title: "Nginx 部署",
    src: "https://img.shields.io/badge/Nginx-009639?style=flat&logo=nginx&logoColor=white&labelColor=%23343536",
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
