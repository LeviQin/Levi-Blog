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
    <div class="home-container page-container" ref="homeContainerRef">
      <div class="topic-sidebar">
        <topic-sidebar></topic-sidebar>
      </div>
      <article class="content">
        <div
          class="article-item"
          v-for="item in dataMap.data"
          @click="toArticleDetail(item)"
          v-slid-in
        >
          <div class="is-top-box" v-if="item.is_top">
            <i class="bi bi-pin-angle-fill"></i>
          </div>
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
        <div class="pagination-box">
          <el-pagination
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

const router = useRouter();
const route = useRoute();

onMounted(async () => {
  scrollWidnow();
  window.addEventListener("scroll", scrollWidnow, true);
  tagsList.value = tagMap.map((item) => item.label);
  getData();
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

let homeContainerRef = ref(null);
let tagsList = ref([]);
let isScrolling = ref(false);
let page = ref(1);
let pageSize = ref(10);

const bannerConfig = {
  height: "100vh",
  showArrow: true,
  title: "Levi",
  text: "浮世景色百千年依旧，人之在世却如白露与泡影",
};

const categoryList = ["日常", "开发", "萌宠", "笔记", "风景", "人物", "游戏", "囧事"];

const scrollWidnow = () => {
  if (!isScrolling.value) {
    requestAnimationFrame(() => {
      const top = window.scrollY;
      const bannerBar = document.querySelector(".banner-bar");
      const threshold = route.path === "/" ? 500 : 100;
      if (top > threshold) {
        bannerBar.classList.add("container-blur");
      } else {
        bannerBar.classList.remove("container-blur");
      }

      isScrolling.value = false;
    });

    isScrolling.value = true;
  }
};

const nextPosition = () => {
  const banner = document.querySelector(".banner-bar");
  scrollAnimation(banner.scrollHeight, "bottom");
};

const toArticleDetail = (item) => {
  router.push({
    name: "Topic Detail",
    params: {
      id: item.id,
    },
  });
};

const getTableData = () => {
  dataMap.paginationDatas.total = dataMap.tableData.length;
  let firstIndex = pageSize.value * page.value - pageSize.value; // 开始查找的数据下标
  dataMap.data = dataMap.tableData.slice(firstIndex, pageSize.value + firstIndex); // 截取分页数据
};

const handleCurrentChange = (val) => {
  page.value = val;
  getTableData();
  homeContainerRef.value.scrollIntoView({ behavior: "smooth" });
};

const getData = async () => {
  try {
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
  }
};
</script>

<style lang="scss" scoped>
.content {
  flex: 1;
}

.article-item {
  background: var(--theme-color);
  border-radius: var(--theme-radius);
  padding: 10px 20px;
  cursor: pointer;
  margin-bottom: 20px;
  position: relative;
  transition: all 0.2s;
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
  color: var(--balck-text-color);
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
}
</style>
