<template>
  <label class="el-checkbox" :class="checkboxClasses">
    <span class="el-checkbox__input" :class="{ 'is-checked': modelValue }">
      <span class="el-checkbox__inner"></span>
      <input class="el-checkbox__original" type="checkbox" :checked="modelValue" :disabled="disabled" @change="handleChange" />
    </span>
    <span v-if="label || $slots.default" class="el-checkbox__label"><slot>{{ label }}</slot></span>
  </label>
</template>

<script setup>
import { computed } from 'vue';
const props = defineProps({ modelValue: { type: Boolean, default: false }, label: { type: [String, Number], default: '' }, size: { type: String, default: '' }, disabled: { type: Boolean, default: false } });
const emit = defineEmits(['update:modelValue', 'change']);
const checkboxClasses = computed(() => [props.size ? 'el-checkbox--' + props.size : '', props.disabled ? 'is-disabled' : '']);
const handleChange = (event) => { const value = event.target.checked; emit('update:modelValue', value); emit('change', value); };
</script>

<style scoped>
.el-checkbox { display: inline-flex; align-items: center; gap: 8px; cursor: pointer; color: var(--black-text-color,#181a2a); }
.el-checkbox__input { position: relative; width: 16px; height: 16px; }
.el-checkbox__original { position: absolute; inset: 0; margin: 0; opacity: 0; cursor: pointer; }
.el-checkbox__inner { width: 16px; height: 16px; display: block; border-radius: 4px; border: 1px solid rgba(34,211,238,.34); background: rgba(255,255,255,.9); transition: all .2s ease; box-sizing: border-box; }
.el-checkbox__input.is-checked .el-checkbox__inner { background: var(--theme-btn-hover-color,#22d3ee); border-color: var(--theme-btn-hover-color,#22d3ee); }
.el-checkbox__input.is-checked .el-checkbox__inner::after { content: ''; position: absolute; left: 5px; top: 2px; width: 4px; height: 8px; border: solid #fff; border-width: 0 2px 2px 0; transform: rotate(45deg); }
.el-checkbox__label { font-size: 14px; line-height: 1.4; }
.el-checkbox--large .el-checkbox__label { font-size: 15px; }
.is-disabled { opacity: .6; cursor: not-allowed; }
</style>
