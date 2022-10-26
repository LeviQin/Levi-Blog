<template>
  <router-view />
  <MoveSpecialEffect></MoveSpecialEffect>
</template>

<script setup>
import MoveSpecialEffect from "./components/MoveSpecialEffect/Index.vue";
</script>
<style lang="scss" scoped>
#app {
  position: relative;
}
</style>
