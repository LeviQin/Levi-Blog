<template>
  <form class="el-form" :class="formClasses" @submit.prevent><slot /></form>
</template>

<script setup>
import { computed, provide } from 'vue';
const props = defineProps({ labelPosition: { type: String, default: 'right' }, labelWidth: { type: [String, Number], default: '' } });
const formClasses = computed(() => ['el-form--label-' + props.labelPosition]);
provide('elFormContext', props);
</script>

<style scoped>
.el-form { display: flex; flex-direction: column; }
</style>
