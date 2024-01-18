<template>
  <div class="topic-detail w">
    <top-banner :bannerConfig="bannerConfig"></top-banner>
    <article class="topic-detail-container page-container" ref="topicDetailRef">
      <div class="topic-detail-sidebar">
        <sidebar-user></sidebar-user>
        <ul class="sidebar-ul nav" v-if="dataMap.titles.length">
          <div class="sidebar-name">
            <span>文章目录</span>
          </div>
          <el-divider />
          <div class="sidebar-content">
            <li
              class="sidebar-li nav-item"
              v-for="anchor in dataMap.titles"
              :style="{
                padding: `10px 0 10px ${anchor.indent ? anchor.indent * 40 : 20}px`,
                fontSize: `${15 - anchor.indent}px`,
              }"
              @click="handleAnchorClick(anchor)"
            >
              <a class="sidebar-a nav-title">{{ anchor.title }}</a>
            </li>
          </div>
        </ul>
      </div>
      <div class="topic-detail-content">
        <div class="topic-detail-md">
          <div class="page-title">
            <h1>{{ dataMap.articleInfo.title }}</h1>
          </div>
          <div class="page-info">
            <div class="page-info-category page-info-item">
              <i class="bi bi-bookmark-dash"></i>
              <span>{{ categoryList[dataMap.articleInfo.category - 1] }}</span>
            </div>
            <div class="page-info-date page-info-item">
              <i class="bi bi-calendar3"></i>
              <span>{{ dataMap.articleInfo.published_at }}</span>
            </div>
            <div class="page-info-update page-info-item">
              <i class="bi bi-arrow-clockwise"></i>
              <span>{{ dataMap.articleInfo.updated_at }}</span>
            </div>
            <div class="page-info-view page-info-item">
              <i class="bi bi-eye"
                ><span class="num-text">{{ dataMap.articleInfo.view_count }}</span></i
              >
            </div>
          </div>
          <div>
            <markdown-renderer
              ref="markdownRendererRef"
              :markdownText="dataMap.articleInfo.content"
              @sendMdTitle="sendMdTitle"
            ></markdown-renderer>
          </div>
          <!-- <div class="topic-detail-tool">
            <div class="tool-likes-btn tool-itme" @click="clickLikes">
              <i class="bi bi-hand-thumbs-up"></i>
              <span>赞赏</span>
            </div>
            <div class="tool-message-btn tool-itme">
              <i class="bi bi-chat"></i>
              <span>评论</span>
            </div>
          </div> -->
          <div class="topic-detail-tags">
            <i class="bi bi-tags-fill"></i>
            <span class="tags-item" v-for="item in dataMap.articleInfo.article_tags">{{
              tagsList[item - 1]
            }}</span>
          </div>
        </div>
        <!-- <div id="qrcode"></div> -->
        <!-- <div class="message-container">1</div> -->
      </div>
    </article>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref, watch, createApp } from "vue";
import { useRoute } from "vue-router";
import { articleDetail } from "@/api/articles.js";
import MarkdownRenderer from "@/components/MarkdownRenderer/Index.vue";
import SidebarUser from "@/components/SidebarUser/Index.vue";
import { tagMap } from "@/utils/tagMap.js";
import TopBanner from "@/components/TopBanner/Index.vue";
import { dateToString } from "@/utils/utils.js";

const route = useRoute();

watch(
  () => route.params.id,
  () => {
    if (route.params.id) {
      tagsList.value = tagMap.map((item) => item.label);
      getArticleDetail();
    }
  }
);

onMounted(() => {
  tagsList.value = tagMap.map((item) => item.label);
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
  },
  titles: [],
});

const markdownRendererRef = ref(null);
let tagsList = ref([]);

const bannerConfig = {
  height: "30vh",
  showArrow: false,
  title: "Levi",
  text: "莫道桑榆晚，为霞尚满天",
};

const categoryList = ["日常", "技术", "萌宠", "笔记", "风景", "人物", "游戏", "囧事"];

const sendMdTitle = (titles) => {
  dataMap.titles = titles;
};

const handleAnchorClick = (anchor) => {
  markdownRendererRef.value.handleAnchorClick(anchor);
};

const getArticleDetail = async () => {
  try {
    const res = await articleDetail(route.params.id);
    const { code, data, message } = res.data;
    if (code === 200) {
      dataMap.articleInfo = data.map((item) => {
        item.updated_at = dateToString(item.updated_at);
        item.published_at = dateToString(item.published_at);
        return item;
      })[0];
      document.title = `${dataMap.articleInfo.title} - Levi 笔迹分享`;
    } else {
      console.log(message, "------------------------");
    }
  } catch (error) {
    console.log(error, "------------------------");
  }
};
</script>

<style lang="scss" scoped>
.page-title,
.page-info {
  padding-left: 15px;
}

.page-title h1 {
  font-size: 40px;
  margin-bottom: 10px;
}

.page-info {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.page-info-item {
  margin: 5px;
  font-size: 15px;
  color: #3c3b3b;
}

.bi {
  margin-right: 10px;
  font-style: normal;
  font-size: 15px;
}

.num-text {
  margin: 5px;
}

.topic-detail-sidebar {
  width: 22%;
  position: relative;
  margin-right: 20px;
}

.sidebar-ul {
  background: var(--themeColor);
  border-radius: var(--themeRadius);
  position: sticky;
  left: 0;
  top: 80px;
  padding: 20px;
}

.sidebar-li {
  white-space: nowrap;
  /* 不换行 */
  overflow: hidden;
  /* 隐藏溢出部分 */
  text-overflow: ellipsis;

  /* 显示省略号 */
  &:hover .nav-title {
    color: var(--themeTextColor);
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
}

.nav-title {
  color: #000;
}

.topic-detail-content {
  flex: 1;
}

.topic-detail-md {
  background: var(--themeColor);
  padding: 20px;
  border-radius: var(--themeRadius);
  min-height: 400px;
  max-width: 890px;
}

.topic-detail-tool {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 40px 0 10px 0;

  .tool-itme {
    cursor: pointer;
    background: var(--btnTagBgColor);
    margin: 0 10px;
    border-radius: 5px;
    padding: 5px 10px;
    transition: all 0.5s;
    text-shadow: 0 5px 15px rgba(0, 0, 0, 1) !important;
    font-size: 14px;

    &:hover {
      will-change: transform;
      transition: all 0.5s;
      transform: scale(1.05) translateZ(0);
      transform-origin: top;
      box-shadow: 0 8px 20px rgba(10, 5, 61, 0.2);
    }

    .bi {
      margin-right: 10px;
    }

    i,
    span {
      font-size: 1em;
      /* 保持字体大小不变 */
      color: #fff;
    }
  }
}

.topic-detail-tags {
  padding: 20px;

  .bi {
    margin-right: 5px;
  }
}

.message-container {
  background: var(--themeColor);
  border-radius: var(--themeRadius);
  margin: 20px 0;
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
}
</style>
