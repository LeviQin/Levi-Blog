<template>
  <el-dialog
    v-model="dialogVisible"
    class="search-model-dialog"
    title="Tips"
    :width="dialogWidth"
    :lock-scroll="false"
    :append-to-body="true"
    :z-index="10002"
    :before-close="close"
  >
    <template #header>
      <div class="search-model-header">
        <span class="search-model-title">全站文章查询</span>
        <span class="search-model-subtitle">搜索文章标题与内容摘要，快速抵达想看的内容</span>
      </div>
    </template>
    <div class="search-model-main">
      <div class="search-input-panel">
        <div class="search-panel-meta">
          <span class="search-panel-kicker">Search</span>
          <span class="search-panel-tip">输入关键词后自动匹配相关文章</span>
        </div>
        <el-input
          @input="changeSearch"
          @keydown.enter="submitSearch"
          v-model="keyword"
          placeholder="输入文章标题、关键词或描述"
          ref="searchInputRef"
          clearable
        >
          <template #prefix>
            <i class="bi bi-search search-prefix-icon"></i>
          </template>
        </el-input>
        <div class="search-helper-row">
          <span class="search-helper-text">支持模糊搜索，结果将实时更新</span>
          <span v-if="trimmedKeyword" class="search-keyword-chip">
            {{ trimmedKeyword }}
          </span>
        </div>
      </div>

      <div v-if="trimmedKeyword" class="search-result-panel" v-loading="loading">
        <div class="search-result-head">
          <div class="search-result-title-row">
            <span class="search-result-label">匹配结果</span>
            <strong class="search-result-count">{{ resultCount }}</strong>
          </div>
          <p class="search-result-summary">
            正在检索与
            <strong class="keyword-highlight">{{ trimmedKeyword }}</strong>
            相关的文章内容
          </p>
        </div>

        <div v-if="errorMessage" class="search-error-state">
          <div class="search-empty-icon">
            <i class="bi bi-cloud-slash"></i>
          </div>
          <h3>搜索失败</h3>
          <p>{{ errorMessage }}</p>
          <button type="button" class="search-retry-btn" @click="retrySearch">重试</button>
        </div>

        <div class="result-content" v-else-if="dataMap.articleData.length">
          <div
            class="result-content-item"
            v-for="item in dataMap.articleData"
            :key="item.id"
            @click="toArticleDetail(item)"
          >
            <div class="result-content-item-top">
              <div class="result-content-item-title">
                <span>{{ item.title }}</span>
              </div>
              <span class="result-content-item-action">查看</span>
            </div>
            <div class="result-content-item-description">
              <span>{{ item.article_description }}</span>
            </div>
          </div>
        </div>

        <div class="no-data-box" v-else>
          <div class="no-data-icon">
            <i class="bi bi-search-heart"></i>
          </div>
          <span class="no-data-title">没有找到匹配内容</span>
          <span class="no-data-text">
            未找到与关键词
            <strong class="keyword-highlight">{{ trimmedKeyword }}</strong>
            相关的内容，可以换个词试试
          </span>
        </div>
      </div>

      <div v-else class="search-empty-state">
        <div class="search-empty-icon">
          <i class="bi bi-stars"></i>
        </div>
        <h3>输入关键词开始探索</h3>
        <p>试试搜索文章标题、技术关键词、工具名称，快速定位站内内容。</p>
      </div>
    </div>
  </el-dialog>
</template>

<script setup>
import { ref, defineExpose, reactive, nextTick, onUnmounted, computed } from "vue";
import { getKeywordResult } from "@/api/articles.js";
import { debounce } from "@/utils/utils.js";
import { useRouter } from "vue-router";

const router = useRouter();

onUnmounted(() => {
  window.removeEventListener("resize", setDialogWidth, true);
});

const dataMap = reactive({
  articleData: [],
});

const dialogVisible = ref(false);
const loading = ref(false);
const errorMessage = ref("");
const dialogWidth = ref("500px");
const keyword = ref("");
const searchInputRef = ref(null);
const trimmedKeyword = computed(() => keyword.value.trim());
const resultCount = computed(() => dataMap.articleData.length);
let searchRequestId = 0;

const setDialogWidth = () => {
  if (window.innerWidth <= 480) {
    dialogWidth.value = "92%";
  } else {
    dialogWidth.value = "620px";
  }
};

const show = () => {
  dialogVisible.value = true;
  setDialogWidth();
  window.addEventListener("resize", setDialogWidth, true);
  nextTick(() => {
    requestAnimationFrame(() => {
      searchInputRef.value.focus();
    });
  });
};

const close = () => {
  searchRequestId += 1;
  dialogVisible.value = false;
  keyword.value = "";
  dataMap.articleData = [];
  errorMessage.value = "";
};

const toArticleDetail = (item) => {
  router.push({
    name: "Topic Detail",
    params: {
      id: item.id,
    },
  });
  close();
};

const changeSearch = debounce(() => {
  if (trimmedKeyword.value) {
    getData(trimmedKeyword.value);
  } else {
    searchRequestId += 1;
    dataMap.articleData = [];
    errorMessage.value = "";
  }
}, 500);

const submitSearch = () => {
  if (trimmedKeyword.value) {
    getData(trimmedKeyword.value);
  }
};

const retrySearch = () => {
  getData(trimmedKeyword.value);
};

const getData = async (searchKeyword = trimmedKeyword.value) => {
  const requestId = ++searchRequestId;
  errorMessage.value = "";
  try {
    loading.value = true;
    const res = await getKeywordResult({ keyword: searchKeyword });
    const { code, data, message } = res.data;
    if (requestId !== searchRequestId || searchKeyword !== trimmedKeyword.value) return;
    if (code === 200) {
      dataMap.articleData = data;
    } else {
      errorMessage.value = message || "暂时无法完成搜索";
    }
  } catch (error) {
    if (requestId === searchRequestId && searchKeyword === trimmedKeyword.value) {
      errorMessage.value = "网络开小差了，请稍后重试";
    }
  } finally {
    if (requestId === searchRequestId) {
      loading.value = false;
    }
  }
};

defineExpose({
  show,
});
</script>

<style lang="scss" scoped>
:deep(.search-model-dialog) {
  border-radius: 22px;
}

:deep(.search-model-dialog .el-dialog__header) {
  padding-bottom: 0;
}

:deep(.search-model-dialog .el-dialog__body) {
  padding-top: 6px;
}

.search-model-title {
  color: var(--black-text-color);
  font-size: 20px;
  font-weight: 700;
}

.search-model-header {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.search-model-subtitle {
  color: var(--color);
  font-size: 13px;
  opacity: 0.76;
}

.search-model-main {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 18px 20px 20px;
}

.search-input-panel {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  border-radius: 20px;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.92),
    rgba(245, 249, 252, 0.82)
  );
  box-shadow: inset 0 0 0 1px rgba(34, 211, 238, 0.1);
}

.search-panel-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}

.search-panel-kicker {
  display: inline-flex;
  align-items: center;
  min-height: 26px;
  padding: 0 10px;
  border-radius: 999px;
  background: rgba(34, 211, 238, 0.14);
  color: var(--btn-tag-bg-color);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.search-panel-tip,
.search-helper-text {
  color: var(--color);
  font-size: 12px;
  opacity: 0.72;
}

.search-helper-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}

.search-keyword-chip {
  display: inline-flex;
  align-items: center;
  min-height: 26px;
  padding: 0 10px;
  border-radius: 999px;
  background: rgba(34, 211, 238, 0.12);
  color: var(--theme-btn-hover-color);
  font-size: 12px;
  font-weight: 600;
}

.search-prefix-icon {
  color: var(--theme-btn-hover-color);
  font-size: 15px;
}

.search-result-panel,
.search-empty-state {
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.68);
  box-shadow: inset 0 0 0 1px rgba(34, 211, 238, 0.08);
}

.search-result-panel {
  padding: 16px;
}

.search-result-head {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 14px;
}

.search-result-title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.search-result-label {
  color: var(--black-text-color);
  font-size: 15px;
  font-weight: 600;
}

.search-result-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 34px;
  min-height: 34px;
  padding: 0 10px;
  border-radius: 999px;
  background: rgba(34, 211, 238, 0.14);
  color: var(--btn-tag-bg-color);
  font-size: 14px;
}

.search-result-summary {
  margin: 0;
  color: var(--color);
  font-size: 13px;
  line-height: 1.6;
  opacity: 0.8;
}

.result-content {
  max-height: 360px;
  overflow: auto;
  padding-right: 4px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.result-content-item {
  padding: 14px 16px;
  cursor: pointer;
  border-radius: 16px;
  border: 1px solid rgba(34, 211, 238, 0.12);
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.92),
    rgba(245, 249, 252, 0.82)
  );
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
}

.result-content-item-top {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: start;
  gap: 16px;
}

.result-content-item-action {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 30px;
  padding: 0 10px;
  border-radius: 999px;
  background: rgba(34, 211, 238, 0.12);
  color: var(--theme-btn-hover-color);
  font-size: 12px;
  font-weight: 600;
  align-self: start;
}

@media (hover: hover) {
  .result-content-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 14px 26px rgba(50, 72, 95, 0.1);
    border-color: rgba(34, 211, 238, 0.24);
  }

  .result-content-item:hover .result-content-item-title {
    transform: translateX(4px);
  }
}

.result-content-item-title {
  min-width: 0;
  display: block;
  font-size: 16px;
  font-weight: 600;
  color: var(--black-text-color);
  line-height: 1.55;
  word-break: break-word;
  overflow-wrap: anywhere;
  transition: transform 0.25s ease;
}

.result-content-item-description {
  display: block;
  font-size: 14px;
  padding-top: 10px;
  color: var(--color);
  opacity: 0.8;
  line-height: 1.7;
  word-break: break-word;
  overflow-wrap: anywhere;
}

.result-content-item-title span,
.result-content-item-description span {
  display: block;
  line-height: inherit;
}

.no-data-box,
.search-empty-state,
.search-error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.no-data-box {
  min-height: 220px;
  padding: 24px 18px;
}

.search-empty-state {
  min-height: 220px;
  padding: 28px 18px;
}

.search-error-state {
  min-height: 220px;
  padding: 28px 18px;
}

.no-data-icon,
.search-empty-icon {
  width: 54px;
  height: 54px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 18px;
  margin-bottom: 14px;
  font-size: 22px;
}

.no-data-icon {
  background: rgba(34, 211, 238, 0.12);
  color: var(--btn-tag-bg-color);
}

.search-empty-icon {
  background: rgba(34, 211, 238, 0.12);
  color: var(--theme-btn-hover-color);
}

.no-data-title,
.search-empty-state h3 {
  margin: 0;
  color: var(--black-text-color);
  font-size: 18px;
  font-weight: 600;
}

.no-data-text,
.search-empty-state p,
.search-error-state p {
  margin: 10px 0 0;
  color: var(--color);
  font-size: 13px;
  line-height: 1.7;
  opacity: 0.78;
}

.loading-box {
  width: 25px;
}

.search-retry-btn {
  margin-top: 16px;
  padding: 8px 16px;
  border: 0;
  border-radius: 9px;
  background: var(--theme-btn-hover-color);
  color: #0d1117;
  cursor: pointer;
}

.search-retry-btn:focus-visible {
  outline: 3px solid rgba(34, 211, 238, 0.45);
  outline-offset: 3px;
}

.keyword-highlight {
  color: var(--btn-tag-bg-color);
}

@media (max-width: 860px) {
  :deep(.search-model-dialog .el-dialog__header) {
    padding-bottom: 0;
  }

  .result-content {
    max-height: 280px;
  }

  .search-model-main {
    padding: 14px 14px 16px;
    gap: 14px;
  }

  .search-input-panel,
  .search-result-panel {
    padding: 14px;
    border-radius: 18px;
  }

  .result-content-item-title {
    font-size: 14px;
    line-height: 1.5;
  }

  .result-content-item-description {
    font-size: 12px;
    padding-top: 6px;
    line-height: 1.65;
  }

  .result-content-item {
    padding: 12px 14px;
  }

  .search-result-count {
    min-width: 30px;
    min-height: 30px;
    font-size: 12px;
  }

  .search-empty-state,
  .no-data-box,
  .search-error-state {
    min-height: 180px;
    padding: 20px 14px;
  }
}

html[data-theme="dark"] {
  .search-model-subtitle,
  .search-panel-tip,
  .search-helper-text,
  .search-result-summary,
  .result-content-item-description,
    .no-data-text,
    .search-empty-state p,
    .search-error-state p {
    opacity: 0.84;
  }

  .search-input-panel,
  .search-result-panel,
  .search-empty-state {
    background: rgba(24, 26, 42, 0.72);
    box-shadow: inset 0 0 0 1px rgba(122, 162, 204, 0.12);
  }

  .result-content-item {
    background: rgba(255, 255, 255, 0.04);
    border-color: rgba(122, 162, 204, 0.12);
  }
}
</style>
