<template>
  <div class="el-carousel" :class="carouselClasses">
    <div class="el-carousel__container">
      <slot />
    </div>
  </div>
</template>

<script setup>
import {
  computed,
  defineExpose,
  onBeforeUnmount,
  provide,
  reactive,
  ref,
  watch,
} from "vue";

const props = defineProps({
  direction: {
    type: String,
    default: "horizontal",
  },
  autoplay: {
    type: Boolean,
    default: true,
  },
  trigger: {
    type: String,
    default: "hover",
  },
  loop: {
    type: Boolean,
    default: true,
  },
  interval: {
    type: Number,
    default: 3000,
  },
});

const emit = defineEmits(["change"]);

const items = reactive([]);
const activeItem = ref("");
let autoplayTimer = null;
const activeIndex = computed(() =>
  Math.max(
    0,
    items.findIndex((item) => String(item.name) === String(activeItem.value))
  )
);

const registerItem = (item) => {
  if (!items.find((current) => current.id === item.id)) {
    items.push(item);
  }
  if (!activeItem.value) {
    activeItem.value = item.name;
    emit("change", items.findIndex((current) => current.name === item.name));
  }
};

const unregisterItem = (id) => {
  const index = items.findIndex((item) => item.id === id);
  if (index > -1) {
    items.splice(index, 1);
  }
  if (!items.find((item) => item.name === activeItem.value) && items[0]) {
    activeItem.value = items[0].name;
  }
};

const setActiveItem = (nameOrIndex) => {
  const target =
    typeof nameOrIndex === "number"
      ? items[nameOrIndex]
      : items.find((item) => String(item.name) === String(nameOrIndex));
  if (!target || target.name === activeItem.value) {
    return;
  }
  const nextIndex = items.findIndex((item) => item.name === target.name);
  activeItem.value = target.name;
  emit("change", nextIndex);
  restartAutoplay();
};

const step = (delta) => {
  if (!items.length) return;
  const currentIndex = Math.max(
    0,
    items.findIndex((item) => item.name === activeItem.value)
  );
  let nextIndex = currentIndex + delta;
  if (props.loop) {
    nextIndex = (nextIndex + items.length) % items.length;
  } else {
    nextIndex = Math.min(Math.max(nextIndex, 0), items.length - 1);
  }
  setActiveItem(nextIndex);
};

provide("elCarouselContext", {
  registerItem,
  unregisterItem,
  items,
  activeItem,
  activeIndex,
  direction: computed(() => props.direction),
});

const clearAutoplay = () => {
  if (autoplayTimer) {
    window.clearInterval(autoplayTimer);
    autoplayTimer = null;
  }
};

const restartAutoplay = () => {
  clearAutoplay();
  if (!props.autoplay || items.length <= 1) {
    return;
  }
  autoplayTimer = window.setInterval(() => {
    step(1);
  }, Math.max(props.interval, 1000));
};

watch(
  () => [props.autoplay, props.interval, items.length],
  () => {
    restartAutoplay();
  },
  { immediate: true }
);

onBeforeUnmount(() => {
  clearAutoplay();
});

defineExpose({
  prev: () => step(-1),
  next: () => step(1),
  setActiveItem,
});

const carouselClasses = computed(() => {
  return [props.direction === "vertical" ? "is-vertical" : ""];
});
</script>

<style scoped>
.el-carousel {
  width: 100%;
  height: 100%;
}

.el-carousel__container {
  position: relative;
  width: 100%;
  height: 100%;
}

.is-vertical .el-carousel__container {
  overflow: hidden;
}
</style>
