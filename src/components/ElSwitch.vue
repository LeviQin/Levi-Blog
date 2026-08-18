<template>
  <label class="el-switch" :class="{ 'is-disabled': disabled, 'is-checked': isChecked }">
    <input
      class="el-switch__input"
      type="checkbox"
      :checked="isChecked"
      :disabled="disabled"
      role="switch"
      :aria-checked="isChecked"
      @change="handleChange"
    />
    <span class="el-switch__core">
      <span v-if="inlinePrompt" class="el-switch__text">
        {{ isChecked ? activeText : inactiveText }}
      </span>
      <span class="el-switch__thumb"></span>
    </span>
  </label>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  modelValue: { type: [Boolean, String, Number], default: false },
  activeValue: { type: [Boolean, String, Number], default: true },
  inactiveValue: { type: [Boolean, String, Number], default: false },
  activeText: { type: String, default: "" },
  inactiveText: { type: String, default: "" },
  inlinePrompt: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
});

const emit = defineEmits(["update:modelValue", "change"]);

const isChecked = computed(() => props.modelValue === props.activeValue);

const handleChange = (event) => {
  const value = event.target.checked ? props.activeValue : props.inactiveValue;
  emit("update:modelValue", value);
  emit("change", value);
};
</script>

<style scoped>
.el-switch {
  display: inline-flex;
  align-items: center;
  position: relative;
  cursor: pointer;
}

.el-switch__input {
  position: absolute;
  inset: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  margin: 0;
  opacity: 0;
  cursor: pointer;
}

.el-switch__core {
  position: relative;
  display: inline-flex;
  align-items: center;
  width: 42px;
  height: 22px;
  padding: 2px;
  border-radius: 999px;
  background: var(--border-color);
  transition: background-color 0.2s ease, box-shadow 0.2s ease;
  box-sizing: border-box;
}

.el-switch__thumb {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 1px 4px rgba(15, 23, 42, 0.24);
  transform: translateX(0);
  transition: transform 0.2s ease;
}

.el-switch__text {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 6px;
  color: #fff;
  font-size: 9px;
  line-height: 1;
  pointer-events: none;
}

.el-switch.is-checked .el-switch__core {
  background: var(--theme-btn-hover-color, #22d3ee);
}

.el-switch.is-checked .el-switch__thumb {
  transform: translateX(20px);
}

.el-switch:focus-within .el-switch__core {
  outline: 3px solid rgba(34, 211, 238, 0.35);
  outline-offset: 2px;
}

.el-switch.is-disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.el-switch.is-disabled .el-switch__input {
  cursor: not-allowed;
}
</style>
