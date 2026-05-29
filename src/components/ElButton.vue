<template>
  <button class="el-button" :class="buttonClasses" :type="nativeType" :disabled="disabled" v-bind="attrs" @click="handleClick">
    <span class="el-button__content"><slot /></span>
  </button>
</template>

<script setup>
import { computed, useAttrs } from 'vue';

defineOptions({ inheritAttrs: false });

const props = defineProps({
  type: { type: String, default: 'default' },
  size: { type: String, default: '' },
  circle: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  nativeType: { type: String, default: 'button' },
});
const emit = defineEmits(['click']);
const attrs = useAttrs();
const buttonClasses = computed(() => [attrs.class, props.type !== 'default' ? 'el-button--' + props.type : '', props.size ? 'el-button--' + props.size : '', props.circle ? 'is-circle' : '', props.disabled ? 'is-disabled' : '']);
const handleClick = (event) => {
  if (props.disabled) {
    event.preventDefault();
    return;
  }
  emit('click', event);
};
</script>

<style scoped>
.el-button { --button-bg: rgba(255,255,255,.88); --button-border: rgba(90,140,189,.18); --button-color: var(--black-text-color,#181a2a); min-height: 32px; padding: 8px 18px; border-radius: 10px; border: 1px solid var(--button-border); background: var(--button-bg); color: var(--button-color); display: inline-flex; align-items: center; justify-content: center; gap: 6px; cursor: pointer; font: inherit; line-height: 1; transition: transform .2s ease, box-shadow .2s ease, background-color .2s ease; box-sizing: border-box; }
.el-button:hover { transform: translateY(-1px); box-shadow: 0 10px 20px rgba(15,23,42,.08); }
.el-button--primary { --button-bg: linear-gradient(135deg,var(--theme-btn-hover-color,#5a8cbd),#7da7d1); --button-border: transparent; --button-color: #fff; }
.el-button--info { --button-bg: rgba(144,147,153,.14); --button-border: rgba(144,147,153,.2); --button-color: #606266; }
.el-button--large { min-height: 40px; padding: 10px 20px; }
.is-circle { width: 40px; min-width: 40px; padding: 0; border-radius: 999px; }
.el-button__content { display: inline-flex; align-items: center; justify-content: center; gap: 6px; }
.is-disabled,.el-button:disabled { opacity: .65; cursor: not-allowed; transform: none; box-shadow: none; }
</style>
