<template>
  <div class="el-divider" :class="'el-divider--' + direction"></div>
</template>

<script setup>
defineProps({ direction: { type: String, default: 'horizontal' } });
</script>

<style scoped>
.el-divider { width: 100%; height: 1px; background: rgba(34,211,238,.18); margin: 16px 0; }
.el-divider--vertical { width: 1px; height: auto; align-self: stretch; margin: 0 16px; }
</style>
