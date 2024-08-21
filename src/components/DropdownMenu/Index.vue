<template>
  <div class="dropdown" ref="dropdownRef">
    <slot></slot>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const props = defineProps({
  buttonText: {
    type: String,
    default: "Menu",
  },
  menuItems: {
    type: Array,
    default: () => [],
  },
});

const isOpen = ref(true);
const activeItem = ref(null);
const dropdownRef = ref(null);

function handleClickOutside(event) {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isOpen.value = false;
    activeItem.value = null;
  }
}

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style lang="scss" scoped>
.dropdown {
  position: absolute;
  top: 80%;
  left: 0;
  background-color: white;
  color: #000;
  border: 1px solid #ccc;
  z-index: 1;
  opacity: 0;
}
</style>
