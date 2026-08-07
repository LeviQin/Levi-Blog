<template>
  <div class="el-slider" :class="attrs.class" :style="attrs.style"><div class="el-slider__runway"><div class="el-slider__bar" :style="barStyle"></div><input class="el-slider__input" type="range" :min="min" :max="max" :step="step" :value="modelValue" @input="handleInput" @change="handleChange" /></div><div v-if="showInput" class="el-slider__input-number"><input type="number" :value="modelValue" :min="min" :max="max" :step="step" @input="handleInput" @change="handleChange" /></div></div>
</template>

<script setup>
import { computed, useAttrs } from 'vue';
const props = defineProps({ modelValue: { type: Number, default: 0 }, min: { type: Number, default: 0 }, max: { type: Number, default: 100 }, step: { type: Number, default: 1 }, showInput: { type: Boolean, default: false } });
const emit = defineEmits(['update:modelValue', 'input', 'change']);
const attrs = useAttrs();
const percentage = computed(() => ((Number(props.modelValue || 0) - props.min) / Math.max(props.max - props.min, 1)) * 100);
const barStyle = computed(() => ({ width: Math.min(Math.max(percentage.value, 0), 100) + '%' }));
const emitValue = (value, eventName) => { const next = Number(value); emit('update:modelValue', next); emit(eventName, next); };
const handleInput = (event) => emitValue(event.target.value, 'input');
const handleChange = (event) => emitValue(event.target.value, 'change');
</script>

<style scoped>
.el-slider { display: flex; align-items: center; gap: 14px; width: 100%; }
.el-slider__runway { position: relative; flex: 1; height: 6px; border-radius: 999px; background: rgba(34,211,238,.16); }
.el-slider__bar { position: absolute; left: 0; top: 0; bottom: 0; border-radius: inherit; background: var(--theme-btn-hover-color,#22d3ee); }
.el-slider__input { position: absolute; inset: -7px 0 -7px 0; width: 100%; opacity: 0; cursor: pointer; }
.el-slider__input-number input { width: 64px; min-height: 34px; border-radius: 10px; border: 1px solid var(--border-color); background: var(--theme-color); padding: 0 10px; box-sizing: border-box; color: var(--color); }
</style>
