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
        <div class="support-item">
          <a
            class="vue-badge"
            target="_blank"
            href="https://vuejs.org/"
            style="margin-inline: 5px"
            title="本站前端界面由Vue3构建"
            rel="external nofollow noreferrer"
            ><img
              src="https://img.shields.io/badge/Vue.js-4FC08D?style=flat&logo=vuedotjs&logoColor=white&labelColor=%23343536"
              data-lazy-src="https://img.shields.io/badge/Vue.js-4FC08D?style=flat&logo=vuedotjs&logoColor=white&labelColor=%23343536"
              alt="Vue.js Badge"
              data-ll-status="loaded"
              class="entered loaded"
          /></a>
        </div>
        <div class="support-item">
          <a
            class="node-badge"
            target="_blank"
            href="https://nodejs.org/"
            style="margin-inline: 5px"
            title="本站后端由Node.js构建"
            rel="external nofollow noreferrer"
            ><img
              src="https://img.shields.io/badge/-Node.js-%23579050?style=flat&logo=nodedotjs&logoColor=ffffff"
              data-lazy-src="https://img.shields.io/badge/-Node.js-%23579050?style=flat&logo=nodedotjs&logoColor=ffffff"
              alt="Node.js Badge"
              data-ll-status="loaded"
              class="entered loaded"
          /></a>
        </div>
        <div class="support-item">
          <a
            class="51la-badge"
            target="_blank"
            href="https://user.51.la/"
            style="margin-inline: 5px"
            title="本站数据分析得益于51la技术支持"
            rel="external nofollow noreferrer"
            ><img
              src="https://sourcebucket.s3.bitiful.net/badge/Analytics-51la-3db1eb.svg"
              data-lazy-src="https://sourcebucket.s3.bitiful.net/badge/Analytics-51la-3db1eb.svg"
              alt="51la Badge"
              data-ll-status="loaded"
              class="entered loaded"
          /></a>
        </div>
        <div class="support-item">
          <a
            class="github-badge"
            target="_blank"
            href="https://github.com/"
            style="margin-inline: 5px"
            title="本网站源码由Github提供存储仓库托管"
            rel="external nofollow noreferrer"
            ><img
              class="no-lazyload entered loading"
              src="https://img.shields.io/badge/Source-Github-d021d6?style=flat&amp;logo=GitHub"
              alt="本网站源码由Github提供存储仓库托管"
              data-ll-status="loading"
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
</script>

<style lang="scss" scoped>
.footer {
  min-width: var(--min-width);
  display: flex;
  justify-content: center;
  backdrop-filter: blur(20px);
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.2);
  padding: 20px 0;
  margin-top: 30px;
}

.info-item a,
.info-item span {
  color: var(--nav-text-color);
  font-size: 16px;
  text-shadow: 0 5px 15px rgba(0, 0, 0, 1) !important;
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
    color: var(--nav-text-color);
    font-size: 14px;
  }

  .support-box {
    justify-content: space-around;
  }
}
</style>
