<template>
  <div v-show="isActive" class="el-tab-pane">
    <slot />
  </div>
</template>

<script setup>
import { computed, getCurrentInstance, inject, onBeforeUnmount, onMounted } from "vue";

const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  name: {
    type: [String, Number],
    default: "",
  },
});

const tabsContext = inject("elTabsContext", null);
const instance = getCurrentInstance();
const paneId = instance?.uid ?? Math.random();
const paneName = computed(() => props.name || String(paneId));

const isActive = computed(() => {
  return tabsContext?.activeName.value === paneName.value;
});

onMounted(() => {
  tabsContext?.registerPane({
    id: paneId,
    name: paneName.value,
    label: props.label,
  });
});

onBeforeUnmount(() => {
  tabsContext?.unregisterPane(paneId);
});
</script>

<style scoped>
.el-tab-pane {
  width: 100%;
}
</style>
