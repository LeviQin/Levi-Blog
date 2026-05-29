<template>
  <div class="el-select" :class="selectClasses" :style="attrs.style">
    <select class="el-select__wrapper" :value="modelValue" :disabled="disabled" v-bind="inputAttrs" @change="handleChange">
      <option v-if="placeholder && emptySelected" value="" disabled>{{ placeholder }}</option>
      <slot />
    </select>
    <span class="el-select__caret"></span>
  </div>
</template>

<script setup>
import { computed, useAttrs } from 'vue';
defineOptions({ inheritAttrs: false });
const props = defineProps({ modelValue: { type: [String, Number], default: '' }, placeholder: { type: String, default: '' }, size: { type: String, default: '' }, disabled: { type: Boolean, default: false }, filterable: { type: Boolean, default: false } });
const emit = defineEmits(['update:modelValue', 'change']);
const attrs = useAttrs();
const inputAttrs = computed(() => { const { class: _class, style, ...rest } = attrs; return rest; });
const selectClasses = computed(() => [attrs.class, props.size ? 'el-select--' + props.size : '', props.disabled ? 'is-disabled' : '']);
const emptySelected = computed(() => props.modelValue === '' || props.modelValue === null || props.modelValue === undefined);
const handleChange = (event) => { const value = event.target.value; emit('update:modelValue', value); emit('change', value); };
</script>

<style scoped>
.el-select { position: relative; display: inline-flex; width: 100%; }
.el-select__wrapper { width: 100%; min-height: 36px; padding: 0 34px 0 12px; border-radius: 10px; border: 1px solid rgba(90,140,189,.18); background: rgba(255,255,255,.92); color: var(--black-text-color,#181a2a); font: inherit; outline: none; appearance: none; box-sizing: border-box; }
.el-select__wrapper:focus { border-color: var(--theme-btn-hover-color,#5a8cbd); box-shadow: 0 0 0 3px rgba(90,140,189,.14); }
.el-select__caret { position: absolute; right: 12px; top: 50%; transform: translateY(-50%); pointer-events: none; color: #6b7280; }
.el-select--large .el-select__wrapper { min-height: 40px; }
.is-disabled .el-select__wrapper { cursor: not-allowed; opacity: .75; }
</style>
