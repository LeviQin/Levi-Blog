<template>
  <div class="el-input-number" :class="attrs.class" :style="attrs.style">
    <button type="button" class="el-input-number__decrease" :disabled="disabled" @click="stepValue(-step)">-</button>
    <input ref="inputRef" class="el-input__inner" type="number" :value="modelValue" :min="min" :max="max" :step="step" :placeholder="placeholder" :disabled="disabled" v-bind="inputAttrs" @input="handleInput" @change="handleChange" />
    <button type="button" class="el-input-number__increase" :disabled="disabled" @click="stepValue(step)">+</button>
  </div>
</template>

<script setup>
import { computed, ref, useAttrs } from 'vue';
defineOptions({ inheritAttrs: false });
const props = defineProps({ modelValue: { type: [String, Number], default: 0 }, min: { type: Number, default: -Infinity }, max: { type: Number, default: Infinity }, step: { type: Number, default: 1 }, placeholder: { type: String, default: '' }, disabled: { type: Boolean, default: false } });
const emit = defineEmits(['update:modelValue', 'input', 'change']);
const attrs = useAttrs();
const inputRef = ref(null);
const inputAttrs = computed(() => { const { class: _class, style, ...rest } = attrs; return rest; });
const normalizeValue = (value) => { const numeric = Number(value); if (Number.isNaN(numeric)) return 0; return Math.min(Math.max(numeric, props.min), props.max); };
const emitValue = (value, eventName) => { const next = normalizeValue(value); emit('update:modelValue', next); emit(eventName, next); };
const handleInput = (event) => emitValue(event.target.value, 'input');
const handleChange = (event) => emitValue(event.target.value, 'change');
const stepValue = (delta) => emitValue(Number(props.modelValue || 0) + delta, 'change');
defineExpose({ focus: () => inputRef.value?.focus() });
</script>

<style scoped>
.el-input-number { display: inline-flex; align-items: stretch; width: 100%; border: 1px solid rgba(90,140,189,.18); border-radius: 10px; overflow: hidden; background: rgba(255,255,255,.92); }
.el-input-number input { flex: 1; min-width: 0; border: none; outline: none; padding: 0 12px; background: transparent; font: inherit; color: var(--black-text-color,#181a2a); }
.el-input-number button { width: 34px; border: none; background: rgba(90,140,189,.08); color: var(--black-text-color,#181a2a); cursor: pointer; }
.el-input-number button:disabled { opacity: .5; cursor: not-allowed; }
</style>
