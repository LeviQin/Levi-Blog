<template>
  <div
    class="el-carousel__item"
    :class="{
      'is-active': isActive,
      'is-vertical': isVertical,
      'is-horizontal': !isVertical,
    }"
    :style="itemStyle"
  >
    <slot />
  </div>
</template>

<script setup>
import {
  computed,
  getCurrentInstance,
  inject,
  onBeforeUnmount,
  onMounted,
} from "vue";

const props = defineProps({
  name: {
    type: [String, Number],
    default: "",
  },
});

const carouselContext = inject("elCarouselContext", null);
const instance = getCurrentInstance();
const itemId = instance?.uid ?? Math.random();
const itemName = computed(() => props.name || String(itemId));
const itemIndex = computed(() =>
  Math.max(
    0,
    carouselContext?.items?.findIndex((item) => item.id === itemId) ?? 0
  )
);
const isVertical = computed(
  () => carouselContext?.direction?.value === "vertical"
);

const isActive = computed(() => {
  return carouselContext?.activeItem.value === itemName.value;
});

const itemStyle = computed(() => {
  const activeIndex = carouselContext?.activeIndex?.value ?? 0;
  const offset = itemIndex.value - activeIndex;
  const translate = `${offset * 100}%`;

  return {
    transform: isVertical.value
      ? `translate3d(0, ${translate}, 0)`
      : `translate3d(${translate}, 0, 0)`,
    opacity: isActive.value ? 1 : 0.18,
    pointerEvents: isActive.value ? "auto" : "none",
    zIndex: isActive.value ? 2 : 1,
  };
});

onMounted(() => {
  carouselContext?.registerItem({
    id: itemId,
    name: itemName.value,
  });
});

onBeforeUnmount(() => {
  carouselContext?.unregisterItem(itemId);
});
</script>

<style scoped>
.el-carousel__item {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  transition: transform 0.72s cubic-bezier(0.22, 1, 0.36, 1),
    opacity 0.42s ease;
  will-change: transform, opacity;
}

.el-carousel__item.is-active {
  opacity: 1;
}
</style>
