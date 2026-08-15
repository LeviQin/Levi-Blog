<template>
  <Head>
    <meta name="keywords" :content="dataMap.articleInfo.title" />
    <meta name="description" :content="dataMap.articleInfo.article_description" />
    <meta property="og:description" :content="dataMap.articleInfo.article_description" />
  </Head>

  <div class="topic-detail w">
    <div class="reading-progress-bar" :style="{ width: progressPercent + '%' }"></div>

    <top-banner :bannerConfig="bannerConfig"></top-banner>

    <article class="topic-detail-container page-container" ref="topicDetailRef" v-loading="loading" element-loading-background="rgba(122, 122, 122, 0)">
      <div class="topic-detail-content">
        <div class="article-cover" v-if="dataMap.articleInfo.image">
          <img :src="dataMap.articleInfo.image" :alt="dataMap.articleInfo.title" />
        </div>

        <div class="article-header-card">
          <div class="article-header-top">
            <span
              class="category-badge"
              :style="{ background: activeCategoryColorMap[dataMap.articleInfo.category]?.bg, color: activeCategoryColorMap[dataMap.articleInfo.category]?.color }"
            >
              <i :class="activeCategoryColorMap[dataMap.articleInfo.category]?.icon"></i>
              {{ categoryList[dataMap.articleInfo.category - 1] }}
            </span>
          </div>

          <h1 class="article-title">{{ dataMap.articleInfo.title }}</h1>

          <div class="article-meta">
            <span class="meta-item">
              <i class="bi bi-calendar3"></i>
              <span>{{ dataMap.articleInfo.published_at }}</span>
            </span>
            <span class="meta-divider"></span>
            <span class="meta-item">
              <i class="bi bi-arrow-repeat"></i>
              <span>{{ dataMap.articleInfo.updated_at }}</span>
            </span>
            <span class="meta-divider"></span>
            <span class="meta-item">
              <i class="bi bi-eye"></i>
              <span>{{ dataMap.articleInfo.view_count || 0 }} 阅读</span>
            </span>
            <span class="meta-divider"></span>
            <span class="meta-item">
              <i class="bi bi-clock"></i>
              <span>{{ readTime }}</span>
            </span>
          </div>
        </div>

        <div class="article-content-card">
          <markdown-renderer
            ref="markdownRendererRef"
            :markdownText="dataMap.articleInfo.content"
            @sendMdTitle="sendMdTitle"
          ></markdown-renderer>
        </div>

        <div class="article-footer">
          <div class="article-tags" v-if="dataMap.articleInfo.article_tags && dataMap.articleInfo.article_tags.length">
            <i class="bi bi-tags-fill"></i>
            <span
              class="tag-pill"
              v-for="item in dataMap.articleInfo.article_tags"
              :key="item"
            >{{ tagNameById[item] || '' }}</span>
          </div>

          <div class="article-actions">
            <div class="action-btn like-btn" :class="{ liked: hasLiked }" @click="clickLikes">
              <i class="bi" :class="hasLiked ? 'bi-heart-fill' : 'bi-heart'"></i>
              <span>{{ dataMap.articleInfo.likes || 0 }}</span>
              <span class="plus-one" :class="{ show: showPlusOne }">+1</span>
            </div>
          </div>
        </div>

        <!-- <CommentList :postId="route.params.id" @replyMessage="replyMessage" />
        <Comments :postId="route.params.id" :replyData="dataMap.replyData" /> -->
      </div>

      <div class="topic-detail-sidebar">
        <sidebar-user></sidebar-user>
        <div class="toc-card" v-if="dataMap.titles.length">
          <div class="toc-header">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#levi-a-shuqianshumulu"></use>
            </svg>
            <span>目录</span>
          </div>
          <el-divider />
          <div class="toc-content">
            <div
              class="toc-item"
              :class="{ active: activeAnchorIndex === index }"
              v-for="(anchor, index) in dataMap.titles"
              :key="index"
              :style="{
                paddingLeft: `${(anchor.level || 1) * 12}px`,
              }"
              @click="handleAnchorClick(anchor.text)"
            >
              <span class="toc-dot"></span>
              <span class="toc-text">{{ anchor.text }}</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, reactive, ref, watch, computed, nextTick } from "vue";
import { useRoute } from "vue-router";
import { articleDetail, ArticleLikes } from "@/api/articles.js";
import MarkdownRenderer from "@/components/MarkdownRenderer/Index.vue";
import SidebarUser from "@/components/SidebarUser/Index.vue";
import TopBanner from "@/components/TopBanner/Index.vue";
import { dateToString } from "@/utils/utils.js";
import { Head } from "@vueuse/head";
import { getStore, setStore } from "@/utils/storage.js";
import { categoryList, categoryColorMap, categoryColorMapDark } from "@/utils/categories.js";
import { useTheme } from "@/hooks/useTheme";
import Comments from "./components/Comments.vue";
import CommentList from "./components/CommentList.vue";
import { useMainStore } from "@/stores/mainStore";

const mainStore = useMainStore();

const { theme } = useTheme();
const activeCategoryColorMap = computed(() =>
  theme.value === "dark" ? categoryColorMapDark : categoryColorMap
);

const tagNameById = computed(() => {
  const map = {};
  mainStore.tagMap.forEach((item) => {
    map[item.id] = item.tag_name;
  });
  return map;
});

const route = useRoute();

watch(
  () => route.params.id,
  () => {
    if (route.params.id) {
      getArticleDetail();
    }
  }
);

onMounted(() => {
  getArticleDetail();
  window.addEventListener("scroll", handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});

const dataMap = reactive({
  articleInfo: {
    category: "",
    content: "",
    image: "",
    is_top: "",
    published_at: "",
    title: "",
    updated_at: "",
    view_count: 0,
    likes: 0,
    id: "",
    article_description: "",
  },
  titles: [],
  replyData: {},
});

const markdownRendererRef = ref(null);
const loading = ref(false);
const showPlusOne = ref(false);
const progressPercent = ref(0);
const activeAnchorIndex = ref(0);
const hasLiked = ref(false);

const bannerConfig = {
  height: "30vh",
  showArrow: false,
  title: "Levi",
  text: "莫道桑榆晚，为霞尚满天",
};

const readTime = computed(() => {
  const text = dataMap.articleInfo.content || "";
  const charCount = text.replace(/[\s\n\r]/g, "").length;
  const minutes = Math.max(1, Math.ceil(charCount / 400));
  return `${minutes} 分钟阅读`;
});

const sendMdTitle = (titles) => {
  if (JSON.stringify(dataMap.titles) !== JSON.stringify(titles)) {
    dataMap.titles = titles;
    nextTick(() => {
      updateActiveAnchor();
    });
  }
};

const handleAnchorClick = (title) => {
  markdownRendererRef.value.handleAnchorClick(title);
};

const handleScroll = () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  progressPercent.value = docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0;
  updateActiveAnchor();
};

const updateActiveAnchor = () => {
  if (!dataMap.titles.length) return;
  const headings = dataMap.titles
    .map((t) => document.getElementById(t.text))
    .filter(Boolean);

  if (!headings.length) return;

  let activeIdx = 0;
  for (let i = headings.length - 1; i >= 0; i--) {
    const rect = headings[i].getBoundingClientRect();
    if (rect.top <= 120) {
      activeIdx = i;
      break;
    }
  }
  activeAnchorIndex.value = activeIdx;
};

const clickLikes = () => {
  if (hasLiked.value) {
    ElNotification({
      title: "重复点赞通知",
      message: "你已经点过赞了哦~",
      type: "info",
      zIndex: 99999,
    });
    return;
  }
  hasLiked.value = true;
  dataMap.articleInfo.likes += 1;
  showPlusOne.value = true;
  setTimeout(() => {
    showPlusOne.value = false;
  }, 1000);
  requsetLikes();
};

const requsetLikes = async () => {
  try {
    const res = await ArticleLikes({ id: dataMap.articleInfo.id });
    const { code, message } = res.data;
    if (code == 200) {
      setStore(`LEVI_LIKES_${dataMap.articleInfo.id}`, "1");
    } else {
      hasLiked.value = false;
      dataMap.articleInfo.likes -= 1;
      console.log(message, "------------------------");
      ElNotification({
        title: "失败",
        message: "点赞出错啦，请稍后重试。",
        type: "error",
        zIndex: 99999,
      });
    }
  } catch (error) {
    hasLiked.value = false;
    dataMap.articleInfo.likes -= 1;
    console.log(error, "------------------------");
  }
};

const sendComment = () => {
  const el = document.getElementById("comments");
  if (el) {
    const topOffset = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: topOffset,
      behavior: "smooth",
    });
  }
};

const replyMessage = (message) => {
  dataMap.replyData = message;
  sendComment();
};

const getArticleDetail = async () => {
  try {
    loading.value = true;
    const res = await articleDetail(route.params.id);
    const { code, data, message } = res.data;
    if (code === 200) {
      dataMap.articleInfo = data.map((item) => {
        item.updated_at = dateToString(item.updated_at);
        item.published_at = dateToString(item.published_at);
        return item;
      })[0];
      document.title = `${dataMap.articleInfo.title} - Levi's space`;
      hasLiked.value = !!getStore(`LEVI_LIKES_${dataMap.articleInfo.id}`);
    } else {
      console.log(message, "------------------------");
    }
  } catch (error) {
    console.log(error, "------------------------");
  } finally {
    loading.value = false;
  }
};
</script>

<style lang="scss" scoped>
.reading-progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--theme-btn-hover-color), var(--btn-tag-bg-color));
  z-index: 9999;
  transition: width 0.15s linear;
  border-radius: 0 2px 2px 0;
}

.topic-detail-content {
  flex: 1;
  min-width: 0;
}

.article-cover {
  border-radius: var(--theme-radius) var(--theme-radius) 0 0;
  overflow: hidden;
  max-height: 420px;

  img {
    width: 100%;
    max-height: 420px;
    object-fit: cover;
    display: block;
  }
}

.article-header-card {
  background: var(--theme-color);
  padding: 36px 40px 28px;
  border-radius: var(--theme-radius);
  margin-bottom: 20px;

  .article-cover + & {
    border-radius: 0 0 var(--theme-radius) var(--theme-radius);
    padding-top: 32px;
  }
}

.article-header-top {
  margin-bottom: 16px;
}

.category-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 14px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
}

.article-title {
  font-size: 34px;
  font-weight: 700;
  line-height: 1.45;
  margin: 0 0 20px 0;
  color: var(--black-text-color);
  letter-spacing: 0.5px;
}

.article-meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 2px;
}

.meta-item {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 13px;
  color: #888;

  .bi {
    font-size: 13px;
  }
}

.meta-divider {
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: #d0d0d0;
  margin: 0 10px;
}

.article-content-card {
  background: var(--theme-color);
  border-radius: var(--theme-radius);
  padding: 32px 40px;
  min-height: 400px;
  margin-bottom: 20px;
}

.article-footer {
  background: var(--theme-color);
  border-radius: var(--theme-radius);
  padding: 24px 40px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.article-tags {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  width: 100%;
  justify-content: center;

  .bi {
    color: var(--btn-tag-bg-color);
    font-size: 16px;
  }
}

.tag-pill {
  display: inline-block;
  padding: 4px 14px;
  border-radius: 14px;
  font-size: 13px;
  color: var(--theme-btn-hover-color);
  background: rgba(34, 211, 238, 0.1);
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    background: rgba(34, 211, 238, 0.2);
  }
}

.article-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.action-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 28px;
  border-radius: 25px;
  font-size: 15px;
  cursor: pointer;
  user-select: none;
  transition: all var(--dur-normal) var(--ease-standard);
  background: rgba(34, 211, 238, 0.1);
  color: var(--btn-tag-bg-color);
  border: 1px solid transparent;

  .bi {
    font-size: 16px;
    transition: transform 0.3s;
  }

  &:hover {
    background: var(--btn-tag-bg-color);
    color: #fff;
    transform: translateY(-1px);
    box-shadow: 0 4px 15px rgba(34, 211, 238, 0.3);

    .bi {
      transform: scale(1.15);
    }
  }

  &.liked {
    background: #ff4757;
    color: #fff;
    border-color: #ff4757;

    &:hover {
      background: #ff6b81;
      box-shadow: 0 4px 15px rgba(255, 71, 87, 0.4);
    }
  }
}

.plus-one {
  position: absolute;
  top: -10px;
  right: -5px;
  font-size: 18px;
  font-weight: 700;
  color: #ff4757;
  opacity: 0;
  pointer-events: none;
  transform: translateY(0);

  &.show {
    animation: popUp 0.8s ease-out forwards;
  }
}

@keyframes popUp {
  0% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  50% {
    opacity: 1;
    transform: translateY(-20px) scale(1.3);
  }
  100% {
    opacity: 0;
    transform: translateY(-40px) scale(0.8);
  }
}

.topic-detail-sidebar {
  width: 260px;
  flex-shrink: 0;
  position: relative;
}

.toc-card {
  background: var(--theme-color);
  border-radius: var(--theme-radius);
  position: sticky;
  top: 90px;
  padding: 20px;
}

.toc-header {
  font-size: 17px;
  font-weight: 600;
  display: flex;
  align-items: center;

  .icon {
    width: 1.2em;
    height: 1.2em;
    margin-right: 10px;
  }
}

.toc-content {
  max-height: 380px;
  overflow-y: auto;
  margin: 0 -12px;
  padding-right: 16px;
}

.toc-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 7px 0;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.2s;
  position: relative;

  &:hover .toc-text {
    color: var(--theme-btn-hover-color);
  }

  &.active {
    .toc-dot {
      background: var(--theme-btn-hover-color);
      transform: scale(1.4);
    }
    .toc-text {
      color: var(--theme-btn-hover-color);
      font-weight: 500;
    }
  }
}

.toc-dot {
  flex-shrink: 0;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #ccc;
  transition: all 0.25s;
}

.toc-text {
  font-size: 13px;
  line-height: 1.5;
  color: var(--color);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: color 0.2s;
}

@media (max-width: 860px) {
  .reading-progress-bar {
    height: 2px;
  }

  .page-container {
    display: block;
  }

  .topic-detail-sidebar {
    display: none;
  }

  .article-header-card {
    padding: 24px 18px 20px;
    border-radius: 0;
  }

  .article-content-card {
    padding: 20px 16px;
    border-radius: 0;
  }

  .article-footer {
    padding: 20px 16px;
    border-radius: 0;
  }

  .article-title {
    font-size: 24px;
  }

  .article-cover {
    border-radius: 0;
  }

  .article-cover + .article-header-card {
    border-radius: 0;
  }
}
</style>
