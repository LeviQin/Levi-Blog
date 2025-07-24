<template>
  <div class="custom-dropdown" ref="dropdownRef">
    <div class="dropdown-trigger" @click="toggleDropdown">
      <slot name="trigger"></slot>
    </div>
    <transition name="dropdown-fade">
      <div class="dropdown-menu" v-show="isOpen" @click="handleMenuClick">
        <slot name="menu"></slot>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const props = defineProps({
  closeOnClickOutside: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["select"]);

const isOpen = ref(false);
const dropdownRef = ref(null);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const handleSelect = (value) => {
  emit("select", value);
  isOpen.value = false;
};

const handleMenuClick = (event) => {
  // 检查点击的是否是dropdown-item元素或其子元素
  if (event.target.closest(".dropdown-item")) {
    isOpen.value = false;
  }
};

function handleClickOutside(event) {
  if (
    props.closeOnClickOutside &&
    dropdownRef.value &&
    !dropdownRef.value.contains(event.target)
  ) {
    isOpen.value = false;
  }
}

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});

// 暴露方法和属性给父组件
defineExpose({
  isOpen,
  toggleDropdown,
  handleSelect,
});
</script>

<style lang="scss" scoped>
.custom-dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-trigger {
  cursor: pointer;
}

.dropdown-menu {
  position: absolute;
  top: 80%;
  left: 0;
  min-width: 160px;
  background-color: var(--dropdown-bg-color, rgba(255, 255, 255, 0.9));
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
  z-index: 10;
  margin-top: 5px;
  padding: 5px 0;
  backdrop-filter: blur(5px);
  transition: all 0.3s;
}

// 下拉菜单的过渡动画
.dropdown-fade-enter-active,
.dropdown-fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.dropdown-fade-enter-from,
.dropdown-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
