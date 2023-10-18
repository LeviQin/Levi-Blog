<template>
  <div class="footer">
    <span>© levi | </span>
    <a href="https://beian.miit.gov.cn" target="_blank">粤ICP备2022120914号</a>
  </div>
</template>

<script setup>
import { ref } from "vue";
</script>

<style lang="scss" scoped>
.footer {
  min-width: var(--minWidth);
  margin: 15px 0;
  text-align: center;
}

a,
span {
  color: var(--filingColor);
  font-size: 14px;
}
</style>
