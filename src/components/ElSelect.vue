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
.el-select__wrapper { width: 100%; min-height: 36px; padding: 0 34px 0 12px; border-radius: 10px; border: 1px solid var(--border-color); background: var(--theme-color); color: var(--color); font: inherit; outline: none; appearance: none; box-sizing: border-box; transition: border-color .2s ease, box-shadow .2s ease; }
.el-select__wrapper:focus { border-color: var(--theme-btn-hover-color,#22d3ee); box-shadow: 0 0 0 3px rgba(34,211,238,.14); }
.el-select__wrapper option { color: var(--color); background: var(--theme-color); }
.el-select__caret { position: absolute; right: 12px; top: 50%; transform: translateY(-50%); pointer-events: none; color: var(--text-secondary); }
.el-select--large .el-select__wrapper { min-height: 40px; }
.is-disabled .el-select__wrapper { cursor: not-allowed; opacity: .75; }
</style>
