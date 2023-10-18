<template>
  <div class="header">
    <div class="w">
      <div class="logCrad">
        <div class="logTitle" @click="router.push('/')">
          <span><i class="bi bi-code-slash"></i> JavaScript </span>
        </div>
        <div class="logText">
          <span>Levi Qin的博客</span>
        </div>
        <div class="nav-bar-box">
          <nav-bar></nav-bar>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import NavBar from "./components/NavBar/Index.vue";

const router = useRouter();
</script>

<style lang="scss" scoped>
.header {
  background-color: var(--themeColor);
  height: var(--hedaerBarHeight);
  min-width: var(--minWidth);
  border: 1px solid rgba(55, 99, 170, 0.1);
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 9;
}

.logCrad {
  height: var(--hedaerBarHeight);
  display: flex;
  align-items: center;

  span {
    color: var(--themeTextColor);
  }

  .logTitle {
    font-weight: bold;
    font-size: 25px;
    margin-right: 20px;
    min-width: var(--minWidth);
    cursor: pointer !important;
    text-align: center;
  }

  .logText {
    font-size: 16px;
  }
  .nav-bar-box {
    flex: 1;
  }
}
@media (max-width: 380px) {
  .logText {
    display: none;
  }
}
</style>
