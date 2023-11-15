<template>
  <div class="footer">
    <div class="info-box">
      <div class="info-item">
        <span>© 2023 levi 博客</span>
      </div>
      <div class="info-item">
        <a href="https://beian.miit.gov.cn" target="_blank">粤ICP备2022120914号</a>
      </div>
    </div>
    <div class="support-box"></div>
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
  font-size: 17px;
}
.info-box {
  text-align: center;
}
.info-item {
  padding: 8px 0;
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
}
</style>
