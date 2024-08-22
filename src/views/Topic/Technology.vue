<template>
  <Head>
    <meta
      name="keywords"
      content="技术，程序员，前端开发，Vue，Node.js，小程序，代码分享"
    />
    <meta
      name="description"
      content="分享前端开发、Vue、Node.js 等技术相关内容，提供代码开发技术分享和前端技术探讨。"
    />
    <meta
      property="og:description"
      content="分享前端开发、Vue、Node.js 等技术相关内容，提供代码开发技术分享和前端技术探讨。"
    />
  </Head>

  <div class="technology w">
    <top-banner :bannerConfig="bannerConfig"></top-banner>
    <div class="technology-container page-container" ref="technologyRef">
      <div class="topic-sidebar">
        <topic-sidebar></topic-sidebar>
      </div>
      <article class="technology-content">
        <div
          class="article-item"
          v-for="item in dataMap.data"
          @click="toArticleDetail(item)"
          v-slid-in
          :class="{ 'sidin-start': true, 'sidin-end': isSidebarVisible }"
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
        <div class="pagination-box">
          <el-pagination
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
      </article>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick } from "vue";
import { useRouter } from "vue-router";
import { getCategoryArticles } from "@/api/articles.js";
import { dateToString } from "@/utils/utils.js";
import TopicSidebar from "@/components/TopicSidebar/Index.vue";
import { tagMap } from "@/utils/tagMap.js";
import TopBanner from "@/components/TopBanner/Index.vue";
import { vSlidIn } from "@/utils/vSlidIn.js";
import { Head } from "@vueuse/head";
import { getStore, setStore } from "@/utils/storage.js";

const router = useRouter();

onMounted(() => {
  tagsList.value = tagMap.map((item) => item.label);
  getData();
  const previousRouteName = getStore("LEVI_PREVIONS_ROUTE_NAME");
  const pageStatus = getStore("LEVI_TECHNOLOGY_PAGE_STATUS");
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

const technologyRef = ref(null);
const tagsList = ref([]);
const page = ref(1);
const pageSize = ref(10);
const isSidebarVisible = ref(false);

const bannerConfig = {
  height: "30vh",
  showArrow: false,
  title: "开发",
  text: "talk is cheap,show me the code",
};

const toArticleDetail = (item) => {
  router.push({
    name: "Topic Detail",
    params: {
      id: item.id,
    },
  });
  setStore("LEVI_TECHNOLOGY_PAGE_STATUS", { page: page.value, scrollY: window.scrollY });
};

const getTableData = () => {
  dataMap.paginationDatas.total = dataMap.tableData.length;
  let firstIndex = pageSize.value * page.value - pageSize.value; // 开始查找的数据下标
  dataMap.data = dataMap.tableData.slice(firstIndex, pageSize.value + firstIndex); // 截取分页数据
};

const handleCurrentChange = (val) => {
  page.value = val;
  getTableData();
  technologyRef.value.scrollIntoView({ behavior: "smooth" });
};

const getData = async () => {
  try {
    const res = await getCategoryArticles({ category: "2" });
    const { code, data } = res.data;
    if (code === 200) {
      dataMap.tableData = data.map((item) => {
        item.updated_at = dateToString(item.updated_at);
        item.published_at = dateToString(item.published_at);
        return item;
      });
      getTableData();
      nextTick(() => {
        isSidebarVisible.value = true;
      });
    } else {
      console.log(message, "message--------------------");
    }
  } catch (error) {
    console.log(error, "error--------------------");
  }
};
</script>

<style lang="scss" scoped>
.technology-content {
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
  background: var(--btn-tag-bg-color);
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

.footer-view {
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
  .footer-update,
  .footer-view .num-text {
    font-size: 12px;
  }

  .footer-tags,
  .footer-info {
    margin-bottom: 10px;
  }

  .footer-tags span {
    margin: 0 2px;
    padding: 2px 3px;
    border-radius: 2px;
    font-size: 12px;
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
