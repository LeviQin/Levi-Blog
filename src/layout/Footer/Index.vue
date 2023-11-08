<template>
  <div class="footer w">
    <div class="text-card">
      <div class="text-item">
        <span>© 2023 levi 博客</span>
      </div>
      <div class="text-item">
        <a href="https://beian.miit.gov.cn" target="_blank">粤ICP备2022120914号</a>
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
  justify-content: flex-end;
}

a,
span {
  color: var(--themeTextColor);
  font-size: 17px;
}
.text-card {
  padding: 20px 0;
  width: 80%;
  text-align: center;
  border-radius: 15px;
  background: var(--themeColor);
  margin: 30px 0;
}
.text-item {
  padding: 8px 0;
}

@media (max-width: 860px) {
  .text-card {
    width: 100%;
  }
}
</style>
