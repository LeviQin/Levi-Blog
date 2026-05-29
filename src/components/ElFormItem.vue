<template>
  <div class="el-form-item" :class="'el-form-item--label-' + finalLabelPosition">
    <label v-if="label" class="el-form-item__label" :style="labelStyle">{{ label }}</label>
    <div class="el-form-item__content"><slot /></div>
  </div>
</template>

<script setup>
import { computed, inject } from 'vue';
const formContext = inject('elFormContext', null);
const props = defineProps({ label: { type: String, default: '' }, labelPosition: { type: String, default: '' }, labelWidth: { type: [String, Number], default: '' } });
const finalLabelPosition = computed(() => props.labelPosition || formContext?.labelPosition || 'right');
const finalLabelWidth = computed(() => props.labelWidth || formContext?.labelWidth || '');
const labelStyle = computed(() => { if (!finalLabelWidth.value || finalLabelWidth.value === 'auto') return {}; return { width: typeof finalLabelWidth.value === 'number' ? finalLabelWidth.value + 'px' : finalLabelWidth.value }; });
</script>

<style scoped>
.el-form-item { display: flex; gap: 12px; margin-bottom: 18px; }
.el-form-item--label-top { flex-direction: column; gap: 8px; }
.el-form-item__label { flex-shrink: 0; min-width: 80px; color: var(--black-text-color,#181a2a); font-weight: 600; }
.el-form-item__content { flex: 1; min-width: 0; }
</style>
