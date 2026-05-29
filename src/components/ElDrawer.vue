<template>
  <Teleport to="body">
    <Transition name="el-drawer-fade">
      <div
        v-if="modelValue"
        class="el-drawer__overlay"
        :style="overlayStyle"
        @click.self="handleOverlayClose"
      >
        <div class="el-drawer" :class="directionClass" :style="drawerStyle">
          <div class="el-drawer__header">
            <slot name="header">
              <span class="el-drawer__title">{{ title }}</span>
            </slot>
            <button class="el-drawer__close-btn" type="button" @click="closeDrawer">
              ×
            </button>
          </div>
          <div class="el-drawer__body">
            <slot />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  direction: {
    type: String,
    default: "rtl",
  },
  size: {
    type: [String, Number],
    default: "30%",
  },
  zIndex: {
    type: Number,
    default: 2000,
  },
  closeOnClickModal: {
    type: Boolean,
    default: true,
  },
  appendToBody: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue", "close"]);

const overlayStyle = computed(() => {
  return {
    zIndex: props.zIndex,
  };
});

const drawerStyle = computed(() => {
  return {
    width: typeof props.size === "number" ? `${props.size}px` : props.size,
  };
});

const directionClass = computed(() => {
  return `is-${props.direction}`;
});

const closeDrawer = () => {
  emit("update:modelValue", false);
  emit("close");
};

const handleOverlayClose = () => {
  if (props.closeOnClickModal) {
    closeDrawer();
  }
};
</script>

<style scoped>
.el-drawer__overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.45);
  display: flex;
  overflow: hidden;
}

.el-drawer {
  position: relative;
  height: 100%;
  background: var(--theme-color, #fff);
  box-shadow: 0 24px 48px rgba(15, 23, 42, 0.18);
  overflow: auto;
  transition: transform 0.32s cubic-bezier(0.22, 1, 0.36, 1);
  will-change: transform;
}

.is-ltr {
  margin-right: auto;
}

.is-rtl {
  margin-left: auto;
}

.el-drawer__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 16px 18px;
}

.el-drawer__title {
  font-size: 18px;
  font-weight: 700;
  color: var(--black-text-color, #181a2a);
}

.el-drawer__close-btn {
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 999px;
  background: rgba(90, 140, 189, 0.08);
  cursor: pointer;
  font-size: 18px;
}

.el-drawer__body {
  padding: 0 16px 18px;
}

.el-drawer-fade-enter-active,
.el-drawer-fade-leave-active {
  transition: none;
}

.el-drawer-fade-enter-from .el-drawer.is-ltr,
.el-drawer-fade-leave-to .el-drawer.is-ltr {
  transform: translate3d(-100%, 0, 0);
}

.el-drawer-fade-enter-from .el-drawer.is-rtl,
.el-drawer-fade-leave-to .el-drawer.is-rtl {
  transform: translate3d(100%, 0, 0);
}

.el-drawer-fade-enter-from .el-drawer.is-ttb,
.el-drawer-fade-leave-to .el-drawer.is-ttb {
  transform: translate3d(0, -100%, 0);
}

.el-drawer-fade-enter-from .el-drawer.is-btt,
.el-drawer-fade-leave-to .el-drawer.is-btt {
  transform: translate3d(0, 100%, 0);
}

.el-drawer-fade-enter-to .el-drawer,
.el-drawer-fade-leave-from .el-drawer {
  transform: translate3d(0, 0, 0);
}
</style>
