<template>
  <div class="el-progress" :class="['el-progress--line', status ? 'is-' + status : '', indeterminate ? 'is-indeterminate' : '', striped ? 'is-striped' : '']"><div class="el-progress-bar"><div class="el-progress-bar__outer" :style="outerStyle"><div class="el-progress-bar__inner" :style="innerStyle"></div></div></div><div class="el-progress__text">{{ percentage }}%</div></div>
</template>

<script setup>
import { computed } from 'vue';
const props = defineProps({ percentage: { type: Number, default: 0 }, strokeWidth: { type: Number, default: 6 }, status: { type: String, default: '' }, striped: { type: Boolean, default: false }, stripedFlow: { type: Boolean, default: false }, duration: { type: Number, default: 3 }, indeterminate: { type: Boolean, default: false } });
const outerStyle = computed(() => ({ height: props.strokeWidth + 'px' }));
const innerStyle = computed(() => ({ width: Math.min(Math.max(props.percentage, 0), 100) + '%', animationDuration: props.duration + 's' }));
</script>

<style scoped>
.el-progress { display: flex; align-items: center; gap: 12px; width: 100%; }
.el-progress-bar { flex: 1; }
.el-progress-bar__outer { overflow: hidden; border-radius: 999px; background: rgba(90,140,189,.14); }
.el-progress-bar__inner { height: 100%; border-radius: inherit; background: linear-gradient(135deg, var(--theme-btn-hover-color,#5a8cbd), #7da7d1); transition: width .3s ease; }
.is-success .el-progress-bar__inner { background: linear-gradient(135deg,#67c23a,#8ed15e); }
.is-striped .el-progress-bar__inner { background-image: linear-gradient(135deg, rgba(255,255,255,.18) 25%, transparent 25%, transparent 50%, rgba(255,255,255,.18) 50%, rgba(255,255,255,.18) 75%, transparent 75%, transparent), linear-gradient(135deg, var(--theme-btn-hover-color,#5a8cbd), #7da7d1); background-size: 28px 28px, auto; }
.is-indeterminate .el-progress-bar__inner { animation: indeterminate 1.2s linear infinite; }
.el-progress__text { min-width: 42px; text-align: right; font-size: 13px; color: var(--black-text-color,#181a2a); }
@keyframes indeterminate { from { background-position: 0 0, 0 0; } to { background-position: 28px 0, 0 0; } }
</style>
