<template>
  <div class="dashboard w">
    <div class="nav">1</div>
    <div class="content">2</div>
    <div class="menu">3</div>
  </div>
</template>

<script setup>
import { ref } from "vue";
</script>

<style lang="scss" scoped>
.dashboard {
  display: flex;

  .nav {
    width: 20%;
    // background: forestgreen;
  }
  .content {
    flex: 1;
    // background: saddlebrown;
  }
  .menu {
    width: 30%;
    // background: goldenrod;
  }
}
</style>
