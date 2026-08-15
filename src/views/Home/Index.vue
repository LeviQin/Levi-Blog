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
        <template v-else>
          <div
            class="article-card"
            :class="{ 'has-image': item.image, 'is-pinned': item.is_top }"
            v-for="item in dataMap.data"
            :key="item.id"
            @click="toArticleDetail(item)"
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
                <span class="meta-item">
                  <i class="bi bi-calendar3"></i>
                  {{ item.published_at }}
                </span>
                <span class="meta-divider"></span>
                <span class="meta-item">
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
              <div class="card-tags" v-if="item.article_tags && item.article_tags.length">
                <span
                  class="tag-pill"
                  v-for="key in item.article_tags"
                  :key="key"
                >{{ tagNameById[key] || '' }}</span>
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
    page.value = pageStatus.page;
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
    const top = container.getBoundingClientRect().top + window.scrollY - 20;
    scrollAnimation(top, "top", 16);
  }
};

const getData = async () => {
  try {
    loading.value = true;
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
      console.log(message, "message--------------------");
    }
  } catch (error) {
    console.log(error, "error--------------------");
  } finally {
    loading.value = false;
  }
};
</script>

<style lang="scss" scoped>
.content {
  flex: 1;
  width: 100%;
}

.article-card {
  background: var(--theme-color);
  border-radius: var(--theme-radius);
  cursor: pointer;
  margin-bottom: 24px;
  position: relative;
  transition: all var(--dur-normal) var(--ease-standard);
  display: flex;
  overflow: hidden;
  border: 1px solid var(--border-color);
  border-left: 3px solid transparent;

  &:hover {
    box-shadow: var(--shadow-card-hover);
    border-color: var(--theme-btn-hover-color);
    border-left-color: var(--theme-btn-hover-color);
  }

  &.is-pinned {
    border-left-width: 5px;
    border-left-color: var(--theme-btn-hover-color);
  }

  &.has-image {
    .card-body {
      padding: 24px 28px;
    }
  }
}

.card-cover {
  flex-shrink: 0;
  width: 280px;
  min-height: 200px;
  overflow: hidden;

  img {
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
  padding: 24px 28px;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 14px;
}

.category-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 3px 12px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
  font-family: var(--mono-font-family);
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
  font-family: var(--mono-font-family);
  color: #0d1117;
  background: var(--theme-btn-hover-color);
  white-space: nowrap;

  .bi {
    font-size: 11px;
  }
}

.card-title {
  font-size: 20px;
  font-weight: 700;
  line-height: 1.4;
  margin: 0 0 12px 0;
  color: var(--black-text-color);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: color 0.25s;

  .article-card:hover & {
    color: var(--theme-btn-hover-color);
  }
}

.card-desc {
  font-size: 15px;
  line-height: 1.7;
  color: var(--text-secondary);
  margin: 0 0 16px 0;
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
  margin-bottom: 14px;
}

.meta-item {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 13px;
  font-family: var(--mono-font-family);
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
  margin: 0 10px;
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
  font-family: var(--mono-font-family);
  color: #0e7490;
  background: rgba(14, 116, 144, 0.1);
  transition: all 0.2s;
  white-space: nowrap;

  &:hover {
    background: rgba(14, 116, 144, 0.18);
  }
}

html[data-theme="dark"] .tag-pill {
  color: #67e8f9;
  background: rgba(34, 211, 238, 0.14);

  &:hover {
    background: rgba(34, 211, 238, 0.24);
  }
}

.pagination-box {
  display: flex;
  justify-content: center;
  margin-top: 10px;
  padding: 10px 0 30px;
}

@media (max-width: 860px) {
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
    max-height: 200px;
    min-height: auto;
  }

  .card-body {
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
</style>
