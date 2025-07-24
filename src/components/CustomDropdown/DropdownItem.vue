<template>
  <div class="dropdown-item" @click="handleClick">
    <slot></slot>
  </div>
</template>

<script setup>
const props = defineProps({
  command: {
    type: [String, Number, Object],
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["click"]);

const handleClick = () => {
  if (props.disabled) return;
  emit("click", props.command);
};
</script>

<style lang="scss" scoped>
.dropdown-item {
  display: flex;
  align-items: center;
  padding: 8px 16px;
  font-size: 14px;
  color: var(--dropdown-item-color, #606266);
  cursor: pointer;
  transition: all 0.3s;
  white-space: nowrap;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: var(--dropdown-item-hover-bg, rgba(245, 247, 250, 0.7));
    color: var(--theme-btn-hover-color);
  }

  &.disabled {
    color: #c0c4cc;
    cursor: not-allowed;

    &:hover {
      background-color: transparent;
      transform: none;
    }
  }

  svg.icon {
    margin-right: 5px;
    width: 1em;
    height: 1em;
  }
}
</style>
