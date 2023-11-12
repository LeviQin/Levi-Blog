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
  color: var(--navTextColor);
  font-size: 17px;
}
.text-card {
  padding: 20px 0;
  width: 80%;
  text-align: center;
  border-radius: 15px;
  backdrop-filter: blur(20px);
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
  margin: 30px;
}
.text-item {
  padding: 8px 0;
}

@media (max-width: 860px) {
  .text-card {
    width: 100%;
    margin: 20px 0;
  }
}
</style>
