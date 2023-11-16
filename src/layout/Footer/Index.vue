<template>
  <div class="footer">
    <div class="footer-container">
      <div class="info-box">
        <div class="info-item">
          <span>© 2023 By Levi</span>
        </div>
        <div class="info-item">
          <a href="https://beian.miit.gov.cn" target="_blank">粤ICP备2022120914号</a>
        </div>
      </div>
      <div class="support-box">
        <div class="support-item">
          <a
            class="github-badge"
            target="_blank"
            href="https://user.51.la/"
            style="margin-inline: 5px"
            title="本站数据分析得益于51la技术支持"
            ><img
              src="https://sourcebucket.s3.bitiful.net/badge/Analytics-51la-3db1eb.svg"
              data-lazy-src="https://sourcebucket.s3.bitiful.net/badge/Analytics-51la-3db1eb.svg"
              alt=""
              data-ll-status="loaded"
              class="entered loaded"
          /></a>
        </div>
        <div class="support-item">
          <a
            class="github-badge"
            target="_blank"
            href="https://github.com/"
            rel="external nofollow noreferrer"
            style="margin-inline: 5px"
            title="本网站源码由Github提供存储仓库托管"
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
import { ref } from "vue";
</script>

<style lang="scss" scoped>
.footer {
  min-width: var(--minWidth);
  display: flex;
  justify-content: center;
  backdrop-filter: blur(20px);
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.2);
  padding: 20px 0;
  margin-top: 30px;
}

.info-item a,
.info-item span {
  color: var(--navTextColor);
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
    color: var(--navTextColor);
    font-size: 14px;
  }

  .support-box {
    justify-content: space-around;
  }
}
</style>
