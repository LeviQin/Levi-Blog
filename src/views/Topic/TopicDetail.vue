<template>
  <Head>
    <meta name="keywords" :content="dataMap.articleInfo.title" />
    <meta name="description" :content="dataMap.articleInfo.article_description" />
    <meta property="og:description" :content="dataMap.articleInfo.article_description" />
  </Head>

  <div class="topic-detail w">
    <top-banner :bannerConfig="bannerConfig"></top-banner>
    <article class="topic-detail-container page-container" ref="topicDetailRef">
      <div class="topic-detail-sidebar">
        <sidebar-user></sidebar-user>
        <ul class="sidebar-ul nav" v-if="dataMap.titles.length">
          <div class="sidebar-name">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#levi-a-shuqianshumulu"></use>
            </svg>
            <span>目录</span>
          </div>
          <el-divider />
          <div class="sidebar-content">
            <li
              class="sidebar-li nav-item"
              v-for="(anchor, index) in dataMap.titles"
              :key="index"
              :style="{
                padding: `8px 0 8px ${anchor.level ? anchor.level * 8 : 10}px`,
                fontSize: `${18 - anchor.level}px`,
              }"
              @click="handleAnchorClick(anchor.text)"
            >
              <a class="sidebar-a nav-title">{{ anchor.text }}</a>
            </li>
          </div>
        </ul>
      </div>
      <div
        class="topic-detail-content"
        v-loading="loading"
        element-loading-background="rgba(122, 122, 122, 0)"
      >
        <div class="topic-detail-md">
          <div class="page-title">
            <h1>{{ dataMap.articleInfo.title }}</h1>
          </div>
          <div class="page-info">
            <div class="page-info-category page-info-item">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#levi-fenlei"></use>
              </svg>
              <span>{{ categoryList[dataMap.articleInfo.category - 1] }}</span>
            </div>
            <div class="page-info-date page-info-item">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#levi-riqi"></use>
              </svg>
              <span>{{ dataMap.articleInfo.published_at }}</span>
            </div>
            <div class="page-info-update page-info-item">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#levi-gengxinmulu"></use>
              </svg>
              <span>{{ dataMap.articleInfo.updated_at }}</span>
            </div>
            <div class="page-info-view page-info-item">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#levi-wode_zuijinliulan"></use></svg
              ><span class="num-text">{{ dataMap.articleInfo.view_count }}</span>
            </div>
            <div class="page-info-likes page-info-item">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#levi-yidianzan"></use></svg
              ><span class="num-text">{{ dataMap.articleInfo.likes }}</span>
            </div>
          </div>
          <div class="markdown-renderer-card">
            <markdown-renderer
              ref="markdownRendererRef"
              :markdownText="dataMap.articleInfo.content"
              @sendMdTitle="sendMdTitle"
            ></markdown-renderer>
          </div>
          <div class="topic-detail-tool">
            <div class="tool-likes-btn tool-itme" @click="clickLikes">
              <i class="bi bi-hand-thumbs-up"></i>
              <span>点赞</span>
              <span class="like-num" v-if="dataMap.articleInfo.likes > 0">{{
                dataMap.articleInfo.likes
              }}</span>
              <span class="plus-one" :class="{ show: showPlusOne }"
                ><i class="bi bi-suit-heart-fill"></i
              ></span>
            </div>
            <!-- <div class="tool-message-btn tool-itme">
              <i class="bi bi-chat"></i>
              <span>评论</span>
            </div> -->
          </div>
          <div class="topic-detail-tags">
            <i class="bi bi-tags-fill"></i>
            <span class="tags-item" v-for="item in dataMap.articleInfo.article_tags" :key="item">{{
              tagsList[item - 1]
            }}</span>
          </div>
        </div>
        <!-- <div id="qrcode"></div> -->
        <!-- <Comments /> -->
      </div>
    </article>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref, watch, computed } from "vue";
import { useRoute } from "vue-router";
import { articleDetail, ArticleLikes } from "@/api/articles.js";
import MarkdownRenderer from "@/components/MarkdownRenderer/Index.vue";
import SidebarUser from "@/components/SidebarUser/Index.vue";
import TopBanner from "@/components/TopBanner/Index.vue";
import { dateToString } from "@/utils/utils.js";
import { Head } from "@vueuse/head";
import { getStore, setStore } from "@/utils/storage.js";
import Comments from "./components/Comments.vue";
import { useMainStore } from "@/stores/mainStore";

const tagsList = computed(() => {
  return mainStore.tagMap.map((item) => item.tag_name);
});

const mainStore = useMainStore();

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
  // var qrcode = new QRCode(document.getElementById("qrcode"), {
  //   text: "https://leviqin.top", // 替换成你的网站链接
  //   width: 128,
  //   height: 128,
  // });
  // console.log(qrcode, 11111111);
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
    view_count: "",
    likes: 0,
    id: "",
  },
  titles: [],
});

const markdownRendererRef = ref(null);
const loading = ref(false);
const showPlusOne = ref(false);

const bannerConfig = {
  height: "30vh",
  showArrow: false,
  title: "Levi",
  text: "莫道桑榆晚，为霞尚满天",
};

const categoryList = [
  "日常随记",
  "开发心得",
  "萌宠日记",
  "学习笔记",
  "自然风光",
  "人物故事",
  "游戏时光",
  "趣事囧闻",
];

const sendMdTitle = (titles) => {
  if (JSON.stringify(dataMap.titles) !== JSON.stringify(titles)) {
    dataMap.titles = titles;
  }
};

const handleAnchorClick = (title) => {
  markdownRendererRef.value.handleAnchorClick(title);
};

const clickLikes = () => {
  const isLike = getStore(`LEVI_LIKES_${dataMap.articleInfo.id}`);
  if (isLike) {
    ElNotification({
      title: "重复点赞通知",
      message: "你已经点过赞了哦~",
      type: "info",
      zIndex: 99999,
    });
    return;
  }
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
    dataMap.articleInfo.likes -= 1;
    console.log(error, "------------------------");
  }
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
      document.title = `${dataMap.articleInfo.title} - Levi 博客分享`;
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
.page-title,
.page-info {
  padding: 0 15px;
}

.page-title h1 {
  font-size: 36px;
  margin: 20px 0;
}

.page-info {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.page-info-item {
  margin: 5px;
  font-size: 15px;
  color: var(--color);
  display: flex;
  align-items: center;

  .icon {
    width: 1.2em;
    height: 1.2em;
    margin-right: 5px;
  }
}

.topic-detail-sidebar {
  width: 20%;
  position: relative;
}

.sidebar-ul {
  background: var(--theme-color);
  border-radius: var(--theme-radius);
  position: sticky;
  left: 0;
  top: 80px;
  padding: 20px;
}

.sidebar-li {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  &:hover .nav-title {
    color: var(--theme-btn-hover-color);
  }
}

.sidebar-content {
  max-height: 300px;
  overflow: auto;
  margin: 0 -18px 0 -12px;
  padding-right: 20px;
}

.sidebar-name {
  font-size: 20px;
  display: flex;
  align-items: center;

  .icon {
    width: 1.2em;
    height: 1.2em;
    margin-right: 10px;
  }
}

.nav-title {
  color: var(--color);
}

.topic-detail-content {
  flex: 1;
}

.topic-detail-md {
  background: var(--theme-color);
  padding: 20px;
  border-radius: var(--theme-radius);
  min-height: 400px;
  max-width: 1000px;
}

.markdown-renderer-card {
  min-height: 300px;
}

.topic-detail-tool {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 40px 0 10px 0;
  gap: 25px;

  .tool-itme {
    cursor: pointer;
    background: var(--btn-tag-bg-color);
    border-radius: 5px;
    padding: 6px 15px;
    transition: all 0.5s;
    text-shadow: 0 5px 15px rgba(0, 0, 0, 1) !important;
    font-size: 16px;
    user-select: none;
    &:hover {
      will-change: transform;
      transition: all 0.5s;
      transform: scale(1.01) translateZ(0);
      transform-origin: top;
      box-shadow: 0 8px 20px rgba(10, 5, 61, 0.2);
    }

    .bi {
      margin-right: 10px;
    }

    i,
    span {
      font-size: 1em;
      color: #fff;
    }
  }
}

.like-num {
  margin-left: 8px;
}

.topic-detail-tags {
  padding: 20px;

  .bi {
    margin-right: 5px;
  }
}

.tool-likes-btn {
  position: relative;
  display: inline-block;
  font-family: "Arial", sans-serif;
}

.plus-one {
  position: absolute;
  top: 0;
  left: 50%;
  font-size: 24px;
  font-weight: bold;
  opacity: 0;
  transition: opacity 0.6s ease;
  padding: 10px 15px;
  border-radius: 50%;
  transform: scale(0) translate(-50%, -50%);
  transform-origin: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.plus-one i {
  color: red !important;
}

.plus-one.show {
  opacity: 1;
  animation: fireworks 1s forwards;
}

@keyframes fireworks {
  0% {
    transform: scale(0) translate(-50%, -50%);
    opacity: 1;
  }
  50% {
    transform: scale(1.3) translate(-50%, -30px);
    opacity: 1;
  }
  100% {
    transform: scale(2.3) translate(-50%, -80px);
    opacity: 0;
  }
}

@media (max-width: 860px) {
  .page-container {
    display: block;
  }

  .topic-detail-sidebar {
    display: none;
  }

  .topic-detail-md {
    padding: 20px 0;
  }

  .page-title h1 {
    font-size: 30px;
  }

  .topic-detail-tool {
    margin-top: 20px;
  }
}
</style>
