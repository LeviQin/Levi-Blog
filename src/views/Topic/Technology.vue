<template>
  <div>
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
        <article class="technology-content">
          <div
            class="article-item"
            v-for="item in dataMap.data"
            :key="item.id"
            @click="toArticleDetail(item)"
            v-slid-in
            :class="{ 'sidin-start': true, 'sidin-end': isSidebarVisible }"
          >
            <div class="is-top-box" v-if="item.is_top">
              <i class="bi bi-pin-angle-fill"></i>
            </div>
            <div class="article-item-top">
              <span class="article-item-kicker"></span>
              <span class="article-item-entry">
                阅读详情
                <i class="bi bi-arrow-right-short"></i>
              </span>
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
                  <i class="bi bi-calendar3 icon" aria-hidden="true"></i>
                  <span>{{ item.published_at }}</span>
                </div>
                <div class="footer-update">
                  <i class="bi bi-arrow-repeat icon" aria-hidden="true"></i>
                  <span>{{ item.updated_at }}</span>
                </div>
              </div>
              <div class="footer-tags">
                <i class="bi bi-tags-fill icon" aria-hidden="true"></i>
                <span class="tags-item" v-for="key in item.article_tags" :key="key">{{
                  tagNameById[key] || ''
                }}</span>
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
        </article>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick, computed } from "vue";
import { useRouter } from "vue-router";
import { getCategoryArticles } from "@/api/articles.js";
import { dateToString } from "@/utils/utils.js";
import TopBanner from "@/components/TopBanner/Index.vue";
import { vSlidIn } from "@/utils/vSlidIn.js";
import { Head } from "@vueuse/head";
import { getStore, setStore } from "@/utils/storage.js";
import { useMainStore } from "@/stores/mainStore";

const tagNameById = computed(() => {
  const map = {};
  mainStore.tagMap.forEach((item) => {
    map[item.id] = item.tag_name;
  });
  return map;
});

const mainStore = useMainStore();

const router = useRouter();

onMounted(() => {
  getData();
  const previousRouteName = getStore("LEVI_PREVIONS_ROUTE_NAME");
  const pageStatus = getStore("LEVI_TECHNOLOGY_PAGE_STATUS");
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

const technologyRef = ref(null);
const page = ref(1);
const pageSize = ref(10);
const isSidebarVisible = ref(false);
const totalArticles = computed(() => dataMap.tableData.length);
const currentPageRange = computed(() => {
  if (!dataMap.data.length) return "暂时还没有内容";
  const start = (page.value - 1) * pageSize.value + 1;
  const end = start + dataMap.data.length - 1;
  return `${start} - ${end}`;
});

const bannerConfig = {
  height: "30vh",
  showArrow: false,
  title: "开发心得",
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
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.technology-overview {
  position: relative;
  overflow: hidden;
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(260px, 0.9fr);
  gap: 24px;
  padding: 26px 28px;
  border-radius: 24px;
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.08);
}

.technology-overview::before,
.technology-overview::after {
  content: "";
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}

.technology-overview::before {
  width: 190px;
  height: 190px;
  top: -74px;
  right: -42px;
  background: radial-gradient(circle, rgba(34, 211, 238, 0.18), transparent 68%);
}

.technology-overview::after {
  width: 132px;
  height: 132px;
  bottom: -58px;
  left: -24px;
  background: radial-gradient(circle, rgba(34, 211, 238, 0.15), transparent 70%);
}

.technology-overview-main,
.technology-overview-stats {
  position: relative;
  z-index: 1;
}

.technology-overview-main {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.technology-overview-kicker {
  display: inline-flex;
  align-items: center;
  width: fit-content;
  min-height: 30px;
  padding: 0 12px;
  border-radius: 999px;
  background: rgba(34, 211, 238, 0.14);
  color: var(--btn-tag-bg-color);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.technology-overview-main h1 {
  margin: 0;
  color: var(--black-text-color);
  font-size: 28px;
  line-height: 1.28;
}

.technology-overview-main p {
  margin: 0;
  max-width: 620px;
  color: var(--color);
  font-size: 15px;
  line-height: 1.85;
  opacity: 0.82;
}

.technology-overview-stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.technology-stat-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 110px;
  padding: 16px 18px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.58);
  border: 1px solid rgba(34, 211, 238, 0.12);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.22);
  backdrop-filter: blur(10px);
}

.technology-stat-label {
  color: var(--color);
  font-size: 12px;
  opacity: 0.72;
}

.technology-stat-card strong {
  margin-top: 8px;
  color: var(--black-text-color);
  font-size: 24px;
  line-height: 1.2;
}

.article-item {
  background: var(--theme-color);
  border-radius: 22px;
  padding: 18px 22px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(34, 211, 238, 0.1);
  box-shadow: 0 14px 32px rgba(15, 23, 42, 0.08);
  transition: transform 0.24s ease, box-shadow 0.24s ease, border-color 0.24s ease;
}

.article-item::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0), rgba(34, 211, 238, 0.04));
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.24s ease;
}

.article-item-top,
.article-item-footer {
  position: relative;
  z-index: 1;
}

.article-item-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 12px;
}

.article-item-entry {
  display: inline-flex;
  align-items: center;
  width: fit-content;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
}

.article-item-entry {
  gap: 2px;
  color: rgba(34, 211, 238, 0.92);
}

@media (hover: hover) {
  .article-item:hover {
    transform: translateY(-4px);
    border-color: rgba(34, 211, 238, 0.2);
    box-shadow: 0 18px 38px rgba(15, 23, 42, 0.12);
  }

  .article-item:hover::after {
    opacity: 1;
  }

  .article-item:hover .article-item-title h2 {
    transform: translateX(8px);
  }

  .article-item:hover .article-item-entry {
    transform: translateX(4px);
    color: var(--theme-btn-hover-color);
  }
}

.is-top-box {
  position: absolute;
  top: 10px;
  left: 10px;
  background: var(--btn-tag-bg-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  box-shadow: 0 12px 24px rgba(34, 211, 238, 0.24);

  .bi {
    font-size: 18px !important;
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
  gap: 12px;
  margin-bottom: 12px;
  color: var(--color);
}

.footer-date {
  font-size: 14px;
  position: relative;
  display: flex;
  align-items: center;
  min-height: 30px;
  padding: 0 12px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.45);

  .icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 1em;
    margin-right: 8px;
  }
}

.footer-update {
  font-size: 14px;
  position: relative;
  display: flex;
  align-items: center;
  min-height: 30px;
  padding: 0 12px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.45);

  .icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 1em;
    margin-right: 8px;
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
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  display: flex;
  margin-bottom: 0;

  .icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 1em;
  }
}

.article-item-title h2 {
  position: relative;
  z-index: 1;
  margin: 0;
  color: var(--black-text-color);
  font-size: 24px;
  line-height: 1.45;
  transition: transform 0.24s ease;
}

.article-item-description {
  position: relative;
  z-index: 1;
  margin-top: 12px;
  line-height: 1.85;
}

.article-item-description p {
  margin: 0;
  color: var(--color);
  font-size: 15px;
  opacity: 0.84;
}

.article-item-footer {
  position: relative;
  z-index: 1;
  margin-top: 18px;
}

@media (max-width: 860px) {
  .technology-content {
    gap: 18px;
  }

  .technology-overview {
    grid-template-columns: 1fr;
    gap: 16px;
    padding: 20px 18px;
  }

  .technology-overview-main h1 {
    font-size: 22px;
  }

  .technology-overview-main p {
    font-size: 14px;
  }

  .technology-overview-stats {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .technology-stat-card {
    min-height: 92px;
    padding: 14px 12px;
    border-radius: 16px;
  }

  .technology-stat-card strong {
    font-size: 18px;
  }

  .article-item {
    padding: 16px;
  }

  .is-top-box {
    top: 12px;
    left: 12px;
    width: 38px;
    height: 38px;

    .bi {
      font-size: 16px !important;
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
    margin: 0;
    padding: 3px 7px;
    border-radius: 10px;
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

@media (max-width: 560px) {
  .technology-overview-stats {
    grid-template-columns: 1fr;
  }

  .article-item-top {
    align-items: flex-start;
    flex-direction: column;
    gap: 10px;
  }
}

html[data-theme="dark"] {
  .technology-overview {
    box-shadow: 0 18px 40px rgba(0, 0, 0, 0.24);
  }

  .technology-stat-card {
    background: rgba(255, 255, 255, 0.06);
    border-color: rgba(122, 162, 204, 0.12);
  }

  .article-item {
    border-color: rgba(122, 162, 204, 0.12);
    box-shadow: 0 14px 32px rgba(0, 0, 0, 0.2);
  }

  .footer-date,
  .footer-update {
    background: rgba(255, 255, 255, 0.06);
  }
}
</style>
