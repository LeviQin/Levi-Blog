<template>
  <router-view />
  <move-special-effect></move-special-effect>
</template>

<script setup>
import MoveSpecialEffect from "./components/MoveSpecialEffect/Index.vue";
</script>
<style lang="scss" scoped>
#app {
  position: relative;
}
</style>
