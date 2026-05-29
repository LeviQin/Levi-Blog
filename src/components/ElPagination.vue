<template>
  <div v-if="!hidden" class="el-pagination" :class="paginationClasses">
    <button
      class="page-btn page-btn-arrow btn-prev"
      :disabled="disabled || current <= 1"
      type="button"
      aria-label="上一页"
      title="上一页"
      @click="changePage(current - 1)"
    >
      <span class="page-btn-icon" aria-hidden="true">
        <svg viewBox="0 0 16 16" fill="none">
          <path
            d="M9.5 3.5L5 8l4.5 4.5"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
    </button>
    <button
      v-for="item in paginationItems"
      :key="item.key"
      class="page-btn number"
      :class="{
        'is-active': item.type === 'page' && item.value === current,
        'is-ellipsis': item.type === 'ellipsis',
      }"
      :disabled="disabled || item.type === 'ellipsis'"
      :aria-current="item.type === 'page' && item.value === current ? 'page' : undefined"
      type="button"
      @click="item.type === 'page' && changePage(item.value)"
    >
      {{ item.label }}
    </button>
    <button
      class="page-btn page-btn-arrow btn-next"
      :disabled="disabled || current >= totalPages"
      type="button"
      aria-label="下一页"
      title="下一页"
      @click="changePage(current + 1)"
    >
      <span class="page-btn-icon" aria-hidden="true">
        <svg viewBox="0 0 16 16" fill="none">
          <path
            d="M6.5 3.5L11 8l-4.5 4.5"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
    </button>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
const props = defineProps({
  currentPage: { type: Number, default: 1 },
  pageSizes: { type: Array, default: () => [10] },
  pageSize: { type: Number, default: 0 },
  defaultPageSize: { type: Number, default: 0 },
  disabled: { type: Boolean, default: false },
  small: { type: Boolean, default: false },
  background: { type: Boolean, default: false },
  total: { type: Number, default: 0 },
  pagerCount: { type: Number, default: 7 },
  layout: { type: String, default: "" },
  hideOnSinglePage: { type: Boolean, default: false },
});
const emit = defineEmits(["update:currentPage", "current-change"]);
const current = ref(props.currentPage || 1);
watch(
  () => props.currentPage,
  (value) => {
    current.value = value || 1;
  }
);
const pageSize = computed(
  () =>
    props.pageSize ||
    props.defaultPageSize ||
    props.pageSizes?.[0] ||
    10
);
const totalPages = computed(() =>
  Math.max(1, Math.ceil((props.total || 0) / pageSize.value))
);
const hidden = computed(() => props.hideOnSinglePage && totalPages.value <= 1);
const paginationClasses = computed(() => [
  props.small ? "is-small" : "",
  props.background ? "is-background" : "",
]);
const createPageItem = (page) => ({
  key: `page-${page}`,
  type: "page",
  value: page,
  label: page,
});
const createEllipsisItem = (key) => ({
  key,
  type: "ellipsis",
  value: null,
  label: "...",
});
const paginationItems = computed(() => {
  const total = totalPages.value;
  const count = Math.max(5, props.pagerCount || 7);
  if (total <= count) {
    return Array.from({ length: total }, (_, index) =>
      createPageItem(index + 1)
    );
  }

  const innerCount = Math.max(1, count - 2);
  const half = Math.floor(innerCount / 2);
  let start = Math.max(2, current.value - half);
  let end = Math.min(total - 1, start + innerCount - 1);

  if (end >= total - 1) {
    end = total - 1;
    start = Math.max(2, end - innerCount + 1);
  }

  const items = [createPageItem(1)];

  if (start > 2) {
    items.push(createEllipsisItem("ellipsis-left"));
  }

  for (let page = start; page <= end; page += 1) {
    items.push(createPageItem(page));
  }

  if (end < total - 1) {
    items.push(createEllipsisItem("ellipsis-right"));
  }

  items.push(createPageItem(total));
  return items;
});
const changePage = (page) => {
  if (props.disabled) return;
  const nextPage = Math.min(Math.max(page, 1), totalPages.value);
  if (nextPage === current.value) return;
  current.value = nextPage;
  emit("update:currentPage", nextPage);
  emit("current-change", nextPage);
};
</script>

<style scoped>
.el-pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  padding: 10px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.82),
    rgba(255, 255, 255, 0.62)
  );
  border: 1px solid rgba(90, 140, 189, 0.14);
  box-shadow: 0 14px 34px rgba(15, 23, 42, 0.06);
  backdrop-filter: blur(12px);
}
.page-btn {
  min-width: 38px;
  height: 38px;
  padding: 0 12px;
  border-radius: 12px;
  border: 1px solid rgba(90, 140, 189, 0.16);
  background: rgba(255, 255, 255, 0.92);
  color: var(--black-text-color, #181a2a);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
  box-shadow: 0 8px 18px rgba(15, 23, 42, 0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease,
    color 0.2s ease, border-color 0.2s ease;
}

.page-btn:hover:not(:disabled) {
  transform: translateY(-1px);
  border-color: rgba(90, 140, 189, 0.35);
  box-shadow: 0 12px 24px rgba(90, 140, 189, 0.16);
}

.page-btn:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px rgba(90, 140, 189, 0.18);
}

.page-btn.is-active {
  background: linear-gradient(
    135deg,
    var(--theme-btn-hover-color, #5a8cbd),
    #79a7d4
  );
  color: #fff;
  border-color: transparent;
  transform: translateY(-1px);
  box-shadow: 0 14px 28px rgba(90, 140, 189, 0.28);
}

.page-btn-arrow {
  padding: 0;
}

.page-btn-icon {
  width: 16px;
  height: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.page-btn-icon svg {
  width: 100%;
  height: 100%;
}

.page-btn.is-ellipsis {
  cursor: default;
  background: transparent;
  box-shadow: none;
  border-color: transparent;
  color: rgba(24, 26, 42, 0.48);
}

.page-btn:disabled {
  opacity: 0.45;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.is-small {
  gap: 8px;
  padding: 8px 12px;
}

.is-small .page-btn {
  min-width: 32px;
  height: 32px;
  font-size: 13px;
  border-radius: 8px;
}

.is-small .page-btn-icon {
  width: 14px;
  height: 14px;
}

.is-background {
  box-shadow: 0 18px 36px rgba(15, 23, 42, 0.08);
}

html[data-theme="dark"] .el-pagination {
  background: linear-gradient(
    135deg,
    rgba(23, 27, 38, 0.86),
    rgba(23, 27, 38, 0.72)
  );
  border-color: rgba(122, 162, 204, 0.18);
}

html[data-theme="dark"] .page-btn {
  background: rgba(255, 255, 255, 0.06);
  color: #f3f6fb;
  border-color: rgba(122, 162, 204, 0.18);
}

html[data-theme="dark"] .page-btn:hover:not(:disabled) {
  border-color: rgba(122, 162, 204, 0.38);
}

html[data-theme="dark"] .page-btn.is-ellipsis {
  color: rgba(243, 246, 251, 0.52);
}

.page-btn.is-ellipsis:disabled {
  opacity: 1;
}

@media (max-width: 640px) {
  .el-pagination {
    gap: 8px;
    padding: 8px 10px;
    border-radius: 18px;
  }

  .page-btn {
    min-width: 34px;
    height: 34px;
    padding: 0 10px;
    border-radius: 10px;
  }
}
</style>