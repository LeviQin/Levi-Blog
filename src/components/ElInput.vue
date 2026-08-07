<template>
  <div
    v-if="isTextarea"
    class="el-textarea"
    :class="[attrs.class, disabled ? 'is-disabled' : '']"
    :style="attrs.style"
  >
    <textarea
      ref="textareaRef"
      class="el-textarea__inner"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      v-bind="inputAttrs"
      @input="handleInput"
      @change="handleChange"
    ></textarea>
  </div>
  <div v-else class="el-input" :class="rootClasses" :style="attrs.style">
    <div class="el-input__wrapper" :class="{ 'is-focus': focused }">
      <span v-if="slots.prefix || prefixIcon" class="el-input__prefix">
        <slot name="prefix">
          <component :is="prefixIcon" v-if="prefixIcon" class="el-input__icon" />
        </slot>
      </span>
      <input
        ref="inputRef"
        class="el-input__inner"
        :value="modelValue"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        v-bind="inputAttrs"
        @focus="focused = true"
        @blur="focused = false"
        @input="handleInput"
        @change="handleChange"
      />
      <span v-if="clearable && !disabled && modelValue" class="el-input__suffix">
        <button type="button" class="el-input__clear" @click="clearValue"></button>
      </span>
      <span v-else-if="slots.suffix" class="el-input__suffix">
        <slot name="suffix" />
      </span>
    </div>
    <div v-if="slots.append" class="el-input-group__append">
      <slot name="append" />
    </div>
  </div>
</template>

<script setup>
import { computed, nextTick, onMounted, ref, useAttrs, useSlots, watch } from 'vue';
defineOptions({ inheritAttrs: false });
const props = defineProps({ modelValue: { type: [String, Number], default: '' }, type: { type: String, default: 'text' }, placeholder: { type: String, default: '' }, size: { type: String, default: '' }, clearable: { type: Boolean, default: false }, disabled: { type: Boolean, default: false }, autosize: { type: [Boolean, Object], default: false }, prefixIcon: { type: [Object, Function], default: null } });
const emit = defineEmits(['update:modelValue', 'input', 'change']);
const attrs = useAttrs();
const slots = useSlots();
const inputRef = ref(null); const textareaRef = ref(null); const focused = ref(false);
const isTextarea = computed(() => props.type === 'textarea');
const inputAttrs = computed(() => { const { class: _class, style, ...rest } = attrs; return rest; });
const rootClasses = computed(() => [attrs.class, props.size ? 'el-input--' + props.size : '', props.disabled ? 'is-disabled' : '', slots.append ? 'el-input-group' : '']);
const emitValue = (value, eventName) => { emit('update:modelValue', value); emit(eventName, value); };
const handleInput = (event) => { emitValue(event.target.value, 'input'); resizeTextarea(); };
const handleChange = (event) => emitValue(event.target.value, 'change');
const clearValue = () => emitValue('', 'change');
const resizeTextarea = () => { if (!isTextarea.value || !textareaRef.value || !props.autosize) return; const el = textareaRef.value; el.style.height = 'auto'; const minRows = typeof props.autosize === 'object' ? props.autosize.minRows || 1 : 1; const maxRows = typeof props.autosize === 'object' ? props.autosize.maxRows || Infinity : Infinity; const lineHeight = 22; const minHeight = minRows * lineHeight + 18; const maxHeight = Number.isFinite(maxRows) ? maxRows * lineHeight + 18 : el.scrollHeight; el.style.height = Math.min(Math.max(el.scrollHeight, minHeight), maxHeight) + 'px'; };
watch(() => props.modelValue, () => nextTick(resizeTextarea));
onMounted(() => nextTick(resizeTextarea));
defineExpose({ focus: () => (isTextarea.value ? textareaRef.value?.focus() : inputRef.value?.focus()), blur: () => (isTextarea.value ? textareaRef.value?.blur() : inputRef.value?.blur()) });
</script>

<style scoped>
.el-input,.el-textarea { width: 100%; }
.el-input { display: inline-flex; align-items: stretch; }
.el-input__wrapper { width: 100%; min-height: 38px; display: inline-flex; align-items: center; gap: 8px; padding: 0 12px; border-radius: 10px; border: 1px solid var(--border-color); background: var(--theme-color); box-sizing: border-box; transition: border-color .2s ease, box-shadow .2s ease; }
.el-input__wrapper.is-focus { border-color: var(--theme-btn-hover-color,#22d3ee); box-shadow: 0 0 0 3px rgba(34,211,238,.14); }
.el-input--large .el-input__wrapper { min-height: 42px; }
.el-input__inner { flex: 1; min-width: 0; border: none; outline: none; background: transparent; color: var(--color); font: inherit; }
.el-input__inner::placeholder { color: var(--text-secondary); }
.el-input__prefix,.el-input__suffix,.el-input-group__append { display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; }
.el-input__clear { position: relative; width: 20px; height: 20px; border: none; border-radius: 999px; background: rgba(34,211,238,.12); color: var(--text-secondary); cursor: pointer; padding: 0; transition: background-color .2s ease, color .2s ease, transform .2s ease; }
.el-input__clear::before,
.el-input__clear::after { content: ""; position: absolute; left: 50%; top: 50%; width: 10px; height: 1.6px; border-radius: 999px; background: currentColor; transform-origin: center; }
.el-input__clear::before { transform: translate(-50%, -50%) rotate(45deg); }
.el-input__clear::after { transform: translate(-50%, -50%) rotate(-45deg); }
.el-input__clear:hover { background: rgba(34,211,238,.2); color: var(--theme-btn-hover-color,#22d3ee); transform: scale(1.05); }
.el-input-group__append { margin-left: 8px; }
.el-textarea__inner { width: 100%; min-height: 96px; border-radius: 12px; border: 1px solid var(--border-color); background: var(--theme-color); box-sizing: border-box; padding: 10px 12px; color: var(--color); font: inherit; resize: vertical; outline: none; }
.el-textarea__inner::placeholder { color: var(--text-secondary); }
.el-textarea__inner:focus { border-color: var(--theme-btn-hover-color,#22d3ee); box-shadow: 0 0 0 3px rgba(34,211,238,.14); }
.is-disabled { opacity: .75; }
</style>
