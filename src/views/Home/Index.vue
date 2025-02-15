<template>
  <Head>
    <meta
      name="keywords"
      content="前端，CSS，javascript，Vue，node，小工具，萌宠，风景，游戏，工作心得，Levi博客"
    />
    <meta
      name="description"
      content="Levi的博客是我的前端开发之旅的见证，这里不仅仅是一个开发技术分享的平台，更是我记录前端知识、工作中遇到的问题与解决方案，以及心得体会的地方。除此之外，我还分享着日常生活中的美好风景和那些让人心生温暖的萌宠瞬间。欢迎你一同探索这个关于技术、经验、生活点滴的小天地。在这里，我希望能够激发灵感、解决疑难，共同成长，共享美好。"
    />
  </Head>
  <div class="home w">
    <top-banner @nextPosition="nextPosition" :bannerConfig="bannerConfig"></top-banner>
    <div class="home-container page-container">
      <div class="topic-sidebar">
        <topic-sidebar></topic-sidebar>
      </div>
      <article class="content">
        <ArticleSkeleton v-if="loading" />
        <template v-else>
          <div
            class="article-item"
            v-for="item in dataMap.data"
            @click="toArticleDetail(item)"
            v-slid-in
          >
            <div class="is-top-box" v-if="item.is_top">
              <i class="bi bi-pin-angle-fill"></i>
            </div>
            <div class="article-item-info">
              <div class="article-item-title">
                <h2>{{ item.title }}</h2>
              </div>
              <div class="article-item-description">
                <p>
                  {{ item.article_description }}
                </p>
              </div>
              <div class="article-item-footer">
                <div class="footer-info">
                  <div class="footer-category">
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#levi-fenlei"></use>
                    </svg>
                    <span>{{ categoryList[item.category - 1] }}</span>
                  </div>
                  <div class="footer-date">
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#levi-riqi"></use>
                    </svg>
                    <span>{{ item.published_at }}</span>
                  </div>
                  <div class="footer-update">
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#levi-gengxinmulu"></use>
                    </svg>
                    <span>{{ item.updated_at }}</span>
                  </div>
                  <div class="footer-view">
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#levi-wode_zuijinliulan"></use></svg
                    ><span class="num-text">{{ item.view_count }}</span>
                  </div>
                  <div class="footer-likes">
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#levi-yidianzan"></use></svg
                    ><span class="num-text">{{ item.likes }}</span>
                  </div>
                </div>
                <div class="footer-tags">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#levi-biaoqian_1"></use>
                  </svg>
                  <span class="tags-item" v-for="key in item.article_tags">{{
                    tagsList[key - 1]
                  }}</span>
                </div>
              </div>
            </div>
            <div v-if="item.image" class="article-item-img">
              <img :src="item.image" alt="" />
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
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import TopicSidebar from "@/components/TopicSidebar/Index.vue";
import { getArticleList } from "@/api/articles.js";
import { dateToString } from "@/utils/utils.js";
import { useRouter, useRoute } from "vue-router";
import { tagMap } from "@/utils/tagMap.js";
import TopBanner from "@/components/TopBanner/Index.vue";
import { scrollAnimation } from "@/utils/scrollAnimation.js";
import { vSlidIn } from "@/utils/vSlidIn.js";
import { Head } from "@vueuse/head";
import { getStore, setStore } from "@/utils/storage.js";
import ArticleSkeleton from "@/components/ArticleSkeleton/Index.vue";
import { useMainStore } from "@/stores/mainStore";

const mainStore = useMainStore();

const router = useRouter();
const route = useRoute();

onMounted(async () => {
  banner.value = document.querySelector(".banner-bar");
  scrollWindow();
  tagsList.value = tagMap.map((item) => item.label);
  getData();
  window.addEventListener("scroll", scrollWindow, { passive: true });
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

const banner = ref(null);
const tagsList = ref([]);
const page = ref(1);
const pageSize = ref(10);
const loading = ref(false);
const debounceTime = 100;
let lastCall = 0;

const bannerConfig = {
  height: "100vh",
  showArrow: true,
  title: "Levi",
  text: "浮世景色百千年依旧，人之在世却如白露与泡影",
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

const scrollWindow = () => {
  const now = Date.now();
  if (now - lastCall < debounceTime) return;
  lastCall = now;
  requestAnimationFrame(() => {
    const top = window.scrollY || document.documentElement.scrollTop;
    const threshold = route.path === "/" ? 500 : 100;
    const shouldBlur = top > threshold;
    mainStore.setBlur(shouldBlur);
  });
};

const nextPosition = () => {
  scrollAnimation(banner.value.scrollHeight, "bottom");
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
  scrollAnimation(banner.value.scrollHeight, "bottom", 16);
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

.article-item {
  background: var(--theme-color);
  border-radius: var(--theme-radius);
  padding: 10px 20px;
  cursor: pointer;
  margin-bottom: 20px;
  position: relative;
  transition: all 0.2s;
  display: flex;
  gap: 30px;
}

.article-item-info {
  flex: 1;
}

.article-item-img {
  width: 200px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: end;
  overflow: hidden;
  img {
    width: 200px;
    height: 200px;
    object-fit: cover;
    border-radius: 50%;
  }
}

.is-top-box {
  position: absolute;
  top: -13px;
  left: -13px;
  background: rgb(255, 139, 38);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  padding: 10px;

  .bi {
    font-size: 26px !important;
    color: #fff;
    margin-right: 0;
  }
}

.bi {
  margin-right: 10px;
  font-style: normal;
  font-size: 15px;
}

.num-text {
  font-size: 14px;
}

.footer-info {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 10px;
  color: #3c3b3b;
}

.footer-date {
  font-size: 14px;
  margin-right: 20px;
  position: relative;
  display: flex;
  align-items: center;

  .icon {
    width: 1.2em;
    height: 1.2em;
    margin-right: 8px;
  }

  &::before {
    content: "";
    width: 1px;
    height: 15px;
    position: absolute;
    top: 50%;
    right: -8px;
    transform: translateY(-50%);
    background-color: rgba(156, 156, 156, 0.816);
  }
}

.footer-update {
  font-size: 14px;
  margin-right: 20px;
  position: relative;
  display: flex;
  align-items: center;

  .icon {
    width: 1.2em;
    height: 1.2em;
    margin-right: 8px;
  }

  &::before {
    content: "";
    width: 1px;
    height: 15px;
    position: absolute;
    top: 50%;
    right: -8px;
    transform: translateY(-50%);
    background-color: rgba(156, 156, 156, 0.816);
  }
}

.footer-category {
  font-size: 14px;
  margin-right: 20px;
  position: relative;
  color: var(--black-text-color);
  display: flex;
  align-items: center;

  .icon {
    width: 1.2em;
    height: 1.2em;
    margin-right: 8px;
  }

  &::before {
    content: "";
    width: 1px;
    height: 15px;
    position: absolute;
    top: 50%;
    right: -8px;
    transform: translateY(-50%);
    background-color: rgba(156, 156, 156, 0.816);
  }
}

.footer-view {
  font-size: 14px;
  margin-right: 20px;
  position: relative;
  color: var(--black-text-color);
  display: flex;
  align-items: center;

  .icon {
    width: 1.2em;
    height: 1.2em;
    margin-right: 8px;
  }

  &::before {
    content: "";
    width: 1px;
    height: 15px;
    position: absolute;
    top: 50%;
    right: -8px;
    transform: translateY(-50%);
    background-color: rgba(156, 156, 156, 0.816);
  }
}

.footer-likes {
  display: flex;
  align-items: center;

  .icon {
    width: 1.2em;
    height: 1.2em;
    margin-right: 8px;
  }
}

.footer-tags {
  margin-bottom: 10px;
  display: flex;
  align-items: center;

  .icon {
    width: 1.2em;
    height: 1.2em;
  }
}

.article-item-title h2 {
  transition: all 0.4s;

  &:hover {
    transition: all 0.4s;
    transform: translateX(15px);
  }
}

.article-item-description {
  line-height: 28px;
}

@media (max-width: 860px) {
  .article-item {
    padding: 5px 15px;
    margin-bottom: 15px;
  }

  .is-top-box {
    top: -10px;
    left: -10px;
    width: 20px;
    height: 20px;
    padding: 8px;

    .bi {
      font-size: 22px !important;
    }
  }

  .article-item-title h2 {
    font-size: 20px;
  }

  .article-item-description {
    font-size: 14px;
  }

  .footer-date,
  .footer-category,
  .footer-update,
  .footer-view .num-text {
    font-size: 12px;
  }

  .footer-tags,
  .footer-info {
    margin-bottom: 10px;
  }

  .bi {
    margin-right: 5px;
    font-style: normal;
    font-size: 12px;
  }

  .num-tex {
    font-size: 12px;
  }

  .article-item-img {
    display: none;
  }
}
</style>
