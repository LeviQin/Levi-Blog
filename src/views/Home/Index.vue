<template>
<div>
    <Head>
    <meta
      name="keywords"
      content="前端，CSS，javascript，Vue，node，小工具，萌宠，风景，工作心得，Levi博客"
    />
    <meta
      name="description"
      :content="`${blogSettingMap.blog_name} - ${blogSettingMap.blog_description}`"
    />
  </Head>
  <div class="home w">
    <top-banner @nextPosition="nextPosition" :bannerConfig="bannerConfig"></top-banner>
    <div class="home-container page-container">
      <article class="content">
        <ArticleSkeleton v-if="loading" />
        <div v-else-if="fetchError" class="home-state home-error-state">
          <div class="home-state-icon"><i class="bi bi-wifi-off"></i></div>
          <h2>文章加载失败</h2>
          <p>{{ fetchError }}</p>
          <button type="button" class="home-state-action" @click="getData">重新加载</button>
        </div>
        <div v-else-if="!dataMap.data.length" class="home-state">
          <div class="home-state-icon"><i class="bi bi-journal-richtext"></i></div>
          <h2>暂时还没有文章</h2>
          <p>内容正在整理中，稍后再来看看吧。</p>
        </div>
        <template v-else>
          <div class="article-list-head">
            <div>
              <p class="article-list-kicker">ARTICLE ARCHIVE</p>
              <h1>最新文章</h1>
              <p class="article-list-subtitle">记录开发、生活与一些正在发生的事</p>
            </div>
            <span class="article-count">共 {{ dataMap.paginationDatas.total }} 篇</span>
          </div>
          <div
            class="article-card"
            :class="{ 'has-image': item.image, 'is-pinned': item.is_top }"
            v-for="item in dataMap.data"
            :key="item.id"
            @click="toArticleDetail(item)"
            @keydown.enter="toArticleDetail(item)"
            @keydown.space.prevent="toArticleDetail(item)"
            role="link"
            tabindex="0"
            :aria-label="`阅读文章：${item.title}`"
            v-slid-in
          >
            <div class="card-cover" v-if="item.image">
              <img v-lazy="item.image" :alt="item.title" />
            </div>
            <div class="card-body">
              <div class="card-header">
                <span
                  class="category-badge"
                  :style="{ background: activeCategoryColorMap[item.category]?.bg, color: activeCategoryColorMap[item.category]?.color }"
                >
                  <i :class="activeCategoryColorMap[item.category]?.icon"></i>
                  {{ categoryList[item.category - 1] }}
                </span>
                <span class="pinned-tag" v-if="item.is_top">
                  <i class="bi bi-pin-angle-fill"></i>置顶
                </span>
              </div>
              <h2 class="card-title">{{ item.title }}</h2>
              <p class="card-desc">{{ item.article_description }}</p>
              <div class="card-meta">
                <span class="meta-item meta-optional">
                  <i class="bi bi-calendar3"></i>
                  {{ item.published_at }}
                </span>
                <span class="meta-divider"></span>
                <span class="meta-item meta-optional">
                  <i class="bi bi-eye"></i>
                  {{ item.view_count || 0 }} 阅读
                </span>
                <span class="meta-divider"></span>
                <span class="meta-item">
                  <i class="bi bi-heart"></i>
                  {{ item.likes || 0 }} 喜欢
                </span>
                <span class="meta-divider"></span>
                <span class="meta-item">
                  <i class="bi bi-clock"></i>
                  {{ getReadTime(item) }}
                </span>
              </div>
              <div class="card-tags" v-if="getVisibleTags(item).length">
                <span
                  class="tag-pill"
                  v-for="tag in getVisibleTags(item)"
                  :key="tag.key"
                >{{ tag.name }}</span>
                <span class="tag-pill tag-more" v-if="getExtraTagCount(item)">
                  +{{ getExtraTagCount(item) }}
                </span>
              </div>
            </div>
          </div>
          <div class="pagination-box">
            <el-pagination
              :pager-count="5"
              :current-page="page"
              :page-sizes="dataMap.paginationDatas.pageSizes"
              :small="dataMap.paginationDatas.small"
              :disabled="dataMap.paginationDatas.disabled"
              :background="dataMap.paginationDatas.background"
              :layout="dataMap.paginationDatas.layout"
              :total="dataMap.paginationDatas.total"
              @current-change="handleCurrentChange"
              :hide-on-single-page="true"
            />
          </div>
        </template>
      </article>
      <div class="topic-sidebar">
        <topic-sidebar></topic-sidebar>
      </div>
    </div>
  </div>
</div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import TopicSidebar from "@/components/TopicSidebar/Index.vue";
import { getArticleList } from "@/api/articles.js";
import { dateToString } from "@/utils/utils.js";
import { useRouter } from "vue-router";
import TopBanner from "@/components/TopBanner/Index.vue";
import { scrollAnimation } from "@/utils/scrollAnimation.js";
import { vSlidIn } from "@/utils/vSlidIn.js";
import { categoryList, categoryColorMap, categoryColorMapDark } from "@/utils/categories.js";
import { useTheme } from "@/hooks/useTheme";
import { Head } from "@vueuse/head";
import { getStore, setStore } from "@/utils/storage.js";
import ArticleSkeleton from "@/components/ArticleSkeleton/Index.vue";
import { useMainStore } from "@/stores/mainStore";

const mainStore = useMainStore();

const tagNameById = computed(() => {
  const map = {};
  mainStore.tagMap.forEach((item) => {
    map[item.id] = item.tag_name;
  });
  return map;
});

const blogSettingMap = computed(() => {
  return mainStore.blogSettingMap;
});

const { theme } = useTheme();
const activeCategoryColorMap = computed(() =>
  theme.value === "dark" ? categoryColorMapDark : categoryColorMap
);

const router = useRouter();

onMounted(async () => {
  getData();
  const previousRouteName = getStore("LEVI_PREVIONS_ROUTE_NAME");
  const pageStatus = getStore("LEVI_HOME_PAGE_STATUS");
  if (previousRouteName === `Topic Detail`) {
    page.value = pageStatus?.page || 1;
  }
});

const dataMap = reactive({
  tableData: [],
  data: [],
  paginationDatas: {
    pageSizes: [10, 20, 40, 60, 100, 200, 500],
    small: false,
    disabled: false,
    total: 0,
    layout: "prev, pager, next",
    background: true,
  },
});

const page = ref(1);
const pageSize = ref(10);
const loading = ref(false);
const fetchError = ref("");

const bannerConfig = computed(() => ({
  height: "min-height: 88vh",
  showArrow: false,
  title: "Levi",
  text: "浮世景色百千年依旧，人之在世却如白露与泡影",
  terminalLines: [
    { cmd: "npm create blog@latest", output: "√ 欢迎使用 Levi-Blog" },
    { cmd: "git commit -m \"feat: BUG修复\"", output: "[main 3087c9e1] 改造完成" },
    { cmd: "npm run dev", output: "VITE ready in 320ms" },
  ],
}));

const getReadTime = (item) => {
  const text = item.content || item.article_description || "";
  const charCount = text.replace(/[\s\n\r]/g, "").length;
  const minutes = Math.max(1, Math.ceil(charCount / 400));
  return `${minutes} 分钟阅读`;
};

const getVisibleTags = (item) => {
  const tags = Array.isArray(item.article_tags) ? item.article_tags : [];
  return tags
    .map((key) => ({ key, name: tagNameById.value[key] }))
    .filter((tag) => tag.name)
    .slice(0, 3);
};

const getExtraTagCount = (item) => {
  const tags = Array.isArray(item.article_tags) ? item.article_tags : [];
  const knownTagCount = tags.filter((key) => tagNameById.value[key]).length;
  return Math.max(0, knownTagCount - getVisibleTags(item).length);
};

const nextPosition = () => {
  scrollToArticleList();
};

const toArticleDetail = (item) => {
  router.push({
    name: "Topic Detail",
    params: {
      id: item.id,
    },
  });
  setStore("LEVI_HOME_PAGE_STATUS", { page: page.value, scrollY: window.scrollY });
};

const getTableData = () => {
  dataMap.paginationDatas.total = dataMap.tableData.length;
  let firstIndex = pageSize.value * page.value - pageSize.value;
  dataMap.data = dataMap.tableData.slice(firstIndex, pageSize.value + firstIndex);
};

const handleCurrentChange = (val) => {
  page.value = val;
  getTableData();
  scrollToArticleList();
};

// 滚动到文章列表区顶部(第一个文章位置)
const scrollToArticleList = () => {
  const container = document.querySelector(".home-container");
  if (container) {
    const header = document.querySelector(".header");
    const headerHeight = header?.getBoundingClientRect().height || 0;
    const top = Math.max(
      0,
      container.getBoundingClientRect().top + window.scrollY - headerHeight - 16
    );
    scrollAnimation(top, "bottom", 260);
  }
};

const getData = async () => {
  try {
    loading.value = true;
    fetchError.value = "";
    const res = await getArticleList();
    const { code, data, message } = res.data;
    if (code === 200) {
      dataMap.tableData = data.map((item) => {
        item.updated_at = dateToString(item.updated_at);
        item.published_at = dateToString(item.published_at);
        return item;
      });
      getTableData();
    } else {
      fetchError.value = message || "暂时无法获取文章列表";
    }
  } catch (error) {
    fetchError.value = "网络开小差了，请稍后重试";
  } finally {
    loading.value = false;
  }
};
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  max-width: 1240px;
  box-sizing: border-box;
  padding: 0 30px;
}

.home-container {
  align-items: flex-start;
  gap: 24px;
  margin-top: 48px;
}

.home-container > .topic-sidebar {
  width: 280px;
  flex: 0 0 280px;
  position: sticky;
  top: 96px;
}

.content {
  flex: 1;
  width: 100%;
}

.article-list-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 20px;
}

.article-list-kicker {
  margin: 0 0 6px;
  color: var(--theme-btn-hover-color);
  font-family: var(--mono-font-family);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.14em;
}

.article-list-head h1 {
  margin: 0;
  color: var(--black-text-color);
  font-size: 26px;
  line-height: 1.25;
}

.article-list-subtitle {
  margin: 6px 0 0;
  color: var(--text-secondary);
  font-size: 13px;
}

.article-count {
  flex-shrink: 0;
  padding: 6px 10px;
  border: 1px solid var(--border-color);
  border-radius: 999px;
  color: var(--text-secondary);
  font-size: 12px;
}

.article-card {
  background: var(--theme-color);
  border-radius: var(--theme-radius);
  cursor: pointer;
  min-height: 188px;
  margin-bottom: 20px;
  position: relative;
  transition: transform var(--dur-normal) var(--ease-standard), box-shadow var(--dur-normal) var(--ease-standard), border-color var(--dur-normal) var(--ease-standard);
  display: flex;
  overflow: hidden;
  border: 1px solid var(--border-color);

  &::before {
    content: "";
    position: absolute;
    inset: 0 auto 0 0;
    width: 4px;
    background: var(--theme-btn-hover-color);
    opacity: 0;
    transition: opacity var(--dur-normal) var(--ease-standard);
    z-index: 2;
  }

  &:hover {
    box-shadow: var(--shadow-card-hover);
    border-color: color-mix(in srgb, var(--theme-btn-hover-color) 38%, var(--border-color));
    transform: translateY(-2px);
  }

  &.is-pinned {
    &::before {
      opacity: 1;
    }
  }

  &.has-image {
    .card-body {
      padding: 22px 24px;
    }
  }
}

.card-cover {
  flex-shrink: 0;
  width: 250px;
  min-height: 188px;
  aspect-ratio: 5 / 3;
  overflow: hidden;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform var(--dur-slow) var(--ease-standard);
  }

  .article-card:hover & img {
    transform: scale(1.05);
  }
}

.card-body {
  flex: 1;
  min-height: 188px;
  box-sizing: border-box;
  padding: 22px 24px;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.category-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 3px 12px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
}

.pinned-tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  color: var(--accent-contrast);
  background: var(--theme-btn-hover-color);
  white-space: nowrap;

  .bi {
    font-size: 11px;
  }
}

.card-title {
  font-size: 20px;
  font-weight: 700;
  line-height: 1.45;
  margin: 0 0 10px;
  color: var(--black-text-color);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: color var(--dur-normal) var(--ease-standard);

  .article-card:hover & {
    color: var(--theme-btn-hover-color);
  }
}

.card-desc {
  font-size: 14px;
  line-height: 1.65;
  color: var(--text-secondary);
  margin: 0 0 14px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
}

.card-meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 2px;
  margin-bottom: 12px;
}

.meta-item {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  color: var(--text-secondary);

  .bi {
    font-size: 13px;
  }
}

.meta-divider {
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: var(--border-color);
  margin: 0 8px;
}

.card-tags {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}

.tag-pill {
  display: inline-block;
  padding: 3px 12px;
  border-radius: 12px;
  font-size: 12px;
  color: var(--link-text-color);
  background: var(--accent-soft-bg);
  transition: background-color var(--dur-fast) var(--ease-standard);
  white-space: nowrap;

  &:hover {
    background: var(--accent-soft-bg-strong);
  }
}

html[data-theme="dark"] .tag-pill {
  color: var(--link-text-color);
}

.tag-more {
  color: var(--text-secondary);
  background: transparent;
  border: 1px dashed var(--border-color);
}

.pagination-box {
  display: flex;
  justify-content: center;
  margin-top: 10px;
  padding: 10px 0 30px;
}

.home-state {
  min-height: 300px;
  padding: 40px 24px;
  border: 1px solid var(--border-color);
  border-radius: var(--theme-radius);
  background: var(--theme-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.home-state-icon {
  width: 56px;
  height: 56px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 18px;
  background: var(--accent-soft-bg);
  color: var(--theme-btn-hover-color);
  font-size: 24px;
}

.home-state h2 {
  margin: 16px 0 0;
  color: var(--black-text-color);
  font-size: 22px;
}

.home-state p {
  max-width: 420px;
  margin: 10px 0 0;
  color: var(--text-secondary);
  line-height: 1.7;
}

.home-state-action {
  margin-top: 20px;
  padding: 9px 18px;
  border: 0;
  border-radius: 9px;
  background: var(--theme-btn-hover-color);
  color: var(--accent-contrast);
  cursor: pointer;
}

.home-state-action:focus-visible,
.article-card:focus-visible {
  outline: 3px solid rgba(34, 211, 238, 0.45);
  outline-offset: 3px;
}

@media (max-width: 860px) {
  .home {
    padding: 0 16px;
  }

  .home-container {
    margin-top: 32px;
  }

  .article-list-head {
    align-items: flex-start;
    margin-bottom: 16px;
  }

  .article-list-head h1 {
    font-size: 22px;
  }

  .article-list-subtitle {
    font-size: 12px;
  }

  .article-card {
    flex-direction: column;

    &.has-image {
      .card-body {
        padding: 16px;
      }
    }
  }

  .card-cover {
    width: 100%;
    min-height: 0;
    aspect-ratio: 16 / 8;
  }

  .card-body {
    min-height: 0;
    padding: 16px;
  }

  .card-title {
    font-size: 17px;
    -webkit-line-clamp: 2;
  }

  .card-desc {
    font-size: 13px;
    -webkit-line-clamp: 2;
  }

  .card-meta {
    gap: 0;
    margin-bottom: 10px;
  }

  .meta-item {
    font-size: 11px;
    gap: 3px;

    .bi {
      font-size: 11px;
    }
  }

  .meta-optional,
  .meta-optional + .meta-divider {
    display: none;
  }

  .meta-divider {
    margin: 0 6px;
  }

  .category-badge {
    font-size: 11px;
    padding: 2px 10px;
  }

  .pinned-tag {
    font-size: 10px;
    padding: 2px 10px;
  }

  .tag-pill {
    font-size: 10px;
    padding: 2px 10px;
  }
}

@media (min-width: 861px) and (max-width: 1100px) {
  .home {
    padding: 0 24px;
  }

  .home-container > .topic-sidebar {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .article-card:hover {
    transform: none;
  }
}
</style>
