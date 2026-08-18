<template>
  <Teleport to="body">
    <Transition name="el-fade-in">
      <div
        v-if="modelValue"
        class="el-overlay"
        :style="overlayStyle"
        @click.self="onRequestClose"
      >
        <div
          class="el-dialog"
          :class="attrs.class"
          :style="dialogStyle"
          v-bind="dialogAttrs"
        >
          <div class="el-dialog__header">
            <slot name="header">
              <span class="el-dialog__title">{{ title }}</span>
            </slot>
            <button
              class="el-dialog__headerbtn"
              type="button"
              aria-label="close"
              @click="onRequestClose"
            >
              <svg
                t="1780055555763"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="4842"
                width="32"
                height="32"
              >
                <path
                  d="M557.504 501.328l323.52-321.84c15.296-15.2 15.36-39.872 0.16-55.168a38.944 38.944 0 0 0-55.2-0.16L502.4 446.032 181.6 124.272a39.04 39.04 0 0 0-55.248 55.136L447.04 501.088 123.696 822.736a38.976 38.976 0 0 0-0.144 55.184 38.944 38.944 0 0 0 55.184 0.16l323.44-321.728 323.696 324.688a38.944 38.944 0 0 0 55.184 0.08 39.008 39.008 0 0 0 0.08-55.2L557.504 501.344z"
                  fill="#000000"
                  p-id="4843"
                ></path>
              </svg>
            </button>
          </div>
          <div class="el-dialog__body">
            <slot />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { computed, onBeforeUnmount, useAttrs, watch } from "vue";

defineOptions({
  inheritAttrs: false,
});

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "",
  },
  width: {
    type: [String, Number],
    default: "50%",
  },
  lockScroll: {
    type: Boolean,
    default: true,
  },
  appendToBody: {
    type: Boolean,
    default: false,
  },
  zIndex: {
    type: Number,
    default: 2000,
  },
  beforeClose: {
    type: Function,
    default: null,
  },
});

const emit = defineEmits(["update:modelValue", "close"]);
const attrs = useAttrs();

const dialogAttrs = computed(() => {
  const { class: _class, style: _style, ...rest } = attrs;
  return rest;
});

const dialogStyle = computed(() => {
  return {
    width: typeof props.width === "number" ? `${props.width}px` : props.width,
    ...(attrs.style || {}),
  };
});

const overlayStyle = computed(() => {
  return {
    zIndex: props.zIndex,
  };
});

const toggleScroll = (visible) => {
  if (!props.lockScroll) return;
  document.body.style.overflow = visible ? "hidden" : "";
};

watch(
  () => props.modelValue,
  (visible) => {
    toggleScroll(visible);
  },
  { immediate: true }
);

onBeforeUnmount(() => {
  toggleScroll(false);
});

const closeDialog = () => {
  emit("update:modelValue", false);
  emit("close");
};

const onRequestClose = () => {
  if (props.beforeClose) {
    props.beforeClose(closeDialog);
    return;
  }
  closeDialog();
};
</script>

<style lang="scss" scoped>
.el-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(15, 23, 42, 0.56);
  backdrop-filter: blur(10px) saturate(1.08);
  -webkit-backdrop-filter: blur(10px) saturate(1.08);
  padding: 20px;
  box-sizing: border-box;
}

html:not([data-theme="dark"]) .el-overlay {
  background: rgba(15, 23, 42, 0.34);
}

.el-dialog {
  position: relative;
  width: min(100%, 640px);
  max-height: calc(100vh - 40px);
  overflow: auto;
  border-radius: 20px;
  background: var(--theme-color, #fff);
  box-shadow: 0 24px 48px rgba(15, 23, 42, 0.22);
}

.el-dialog__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 20px 24px 10px;
}

.el-dialog__title {
  font-size: 20px;
  font-weight: 700;
  color: var(--black-text-color, #181a2a);
}

.el-dialog__headerbtn {
  position: absolute;
  top: 18px;
  right: 18px;
  width: 32px;
  min-width: 32px;
  max-width: 32px;
  height: 32px;
  min-height: 32px;
  max-height: 32px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 50%;
  background: rgba(34, 211, 238, 0.08);
  cursor: pointer;
  line-height: 1;
  box-sizing: border-box;
  flex-shrink: 0;
  appearance: none;
  -webkit-appearance: none;
  overflow: hidden;
  svg {
    width: 14px;
    height: 14px;
    fill: var(--black-text-color, #181a2a);
  }
}

.el-dialog__body {
  padding: 8px 24px 24px;
}

.el-fade-in-enter-active,
.el-fade-in-leave-active {
  transition: opacity 0.2s ease;
}

.el-fade-in-enter-from,
.el-fade-in-leave-to {
  opacity: 0;
}
</style>
