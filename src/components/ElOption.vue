<template>
  <option class="el-option" :value="value" :disabled="disabled">{{ label ?? value }}</option>
</template>

<script setup>
defineProps({ label: { type: [String, Number], default: '' }, value: { type: [String, Number], default: '' }, disabled: { type: Boolean, default: false } });
</script>
