<template>
  <div class="el-tabs" :class="tabsClasses">
    <div class="el-tabs__header">
      <div class="el-tabs__nav-wrap">
        <div class="el-tabs__nav">
          <button
            v-for="pane in panes"
            :key="pane.id"
            class="el-tabs__item"
            :class="{ 'is-active': pane.name === activeName }"
            type="button"
            @click="setActive(pane.name)"
          >
            {{ pane.label }}
          </button>
        </div>
      </div>
    </div>
    <div class="el-tabs__content">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { computed, provide, reactive, ref, watch } from "vue";

const props = defineProps({
  tabPosition: {
    type: String,
    default: "top",
  },
  type: {
    type: String,
    default: "",
  },
  modelValue: {
    type: [String, Number],
    default: "",
  },
});

const emit = defineEmits(["update:modelValue", "tab-click"]);

const panes = reactive([]);
const activeName = ref(props.modelValue || "");

const registerPane = (pane) => {
  if (!panes.find((item) => item.id === pane.id)) {
    panes.push(pane);
  }
  if (!activeName.value) {
    activeName.value = pane.name;
    if (!props.modelValue) {
      emit("update:modelValue", pane.name);
    }
  }
};

const unregisterPane = (id) => {
  const index = panes.findIndex((item) => item.id === id);
  if (index > -1) {
    panes.splice(index, 1);
  }
  if (!panes.find((item) => item.name === activeName.value) && panes[0]) {
    activeName.value = panes[0].name;
  }
};

const setActive = (name) => {
  if (name === activeName.value) {
    return;
  }
  activeName.value = name;
  emit("update:modelValue", name);
  emit("tab-click", name);
};

watch(
  () => props.modelValue,
  (value) => {
    if (value === "" || value === null || value === undefined) {
      if (!activeName.value && panes[0]) {
        activeName.value = panes[0].name;
      }
      return;
    }
    const matchedPane = panes.find(
      (item) => String(item.name) === String(value)
    );
    if (matchedPane) {
      activeName.value = matchedPane.name;
    }
  },
  { immediate: true }
);

provide("elTabsContext", {
  registerPane,
  unregisterPane,
  activeName,
});

const tabsClasses = computed(() => {
  return [
    props.type ? `el-tabs--${props.type}` : "",
    props.tabPosition ? `is-${props.tabPosition}` : "",
  ];
});
</script>

<style scoped>
.el-tabs {
  width: 100%;
}

.el-tabs__header {
  margin-bottom: 14px;
}

.el-tabs__nav {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.el-tabs__item {
  border: 1px solid rgba(90, 140, 189, 0.18);
  background: rgba(255, 255, 255, 0.9);
  color: var(--black-text-color, #181a2a);
  border-radius: 10px;
  padding: 10px 14px;
  cursor: pointer;
}

.el-tabs__item.is-active {
  background: var(--theme-btn-hover-color, #5a8cbd);
  color: #fff;
  border-color: transparent;
}

.el-tabs--border-card {
  padding: 14px;
  border-radius: 14px;
  background: var(--theme-color, #fff);
}
</style>
