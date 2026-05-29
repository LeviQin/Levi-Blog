<template>
  <div>
    <Head>
      <meta
        name="keywords"
        content="日常，生活日常，工作日常，日常笔记，生活记录，工作记录"
      />
      <meta
        name="description"
        content="分享日常生活和工作的点滴，记录生活中的琐事和工作中的经验，让每一天都变得更有意义。"
      />
      <meta
        property="og:description"
        content="分享日常生活和工作的点滴，记录生活中的琐事和工作中的经验，让每一天都变得更有意义。"
      />
    </Head>

    <div class="daily-pet w">
      <top-banner :bannerConfig="bannerConfig"></top-banner>
      <div class="daily-container page-container" ref="cutePetContainerRef">
        <article class="daily-main">
          <div v-if="dataMap.data.length" class="waterfall-container">
            <div class="daily-waterfall" :style="{ height: waterfallHeight }" ref="waterfallRef">
              <div
                class="waterfall-item daily-card"
                @click="toDetail(item)"
                v-for="item in dataMap.data"
                :key="item.id"
                :class="{ 'sidin-start': true, 'sidin-end': isSidebarVisible }"
                :ref="(el) => setCardRef(el, item.id)"
                v-slid-in
              >
                <div class="is-top-box" v-if="item.is_top">
                  <i class="bi bi-pin-angle-fill"></i>
                </div>
                <div class="img-box">
                  <img
                    class="cover-img"
                    v-lazy="item.image"
                    fit="scale-down"
                    :alt="item.title"
                    @load="scheduleMasonry"
                    @error="scheduleMasonry"
                  />
                </div>
                <div class="waterfall-title">
                  <h2>{{ item.title }}</h2>
                </div>
                <div class="waterfall-desc">
                  <p>{{ item.article_description }}</p>
                </div>
                <div class="waterfall-footer">
                  <div class="waterfall-footer-date">
                    <i class="bi bi-clock-history"></i>
                    <span>{{ item.updated_at }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="daily-empty theme-bg-color">
            <div class="daily-empty-icon">
              <i class="bi bi-journal-richtext"></i>
            </div>
            <h2>内容正在整理中</h2>
            <p>日常随记正在陆续更新，稍后再来看看，也许会遇见新的生活片段。</p>
          </div>
          <div class="pagination-box">
            <el-pagination
              :pager-count="5"
              :current-page="page"
              :page-sizes="dataMap.paginationDatas.pageSizes"
              :default-page-size="pageSize"
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
import { ref, reactive, onMounted, onUnmounted, nextTick, computed } from "vue";
import { useRouter } from "vue-router";
import { getCategoryArticles } from "@/api/articles.js";
import dayjs from "dayjs";
import TopBanner from "@/components/TopBanner/Index.vue";
import { vSlidIn } from "@/utils/vSlidIn.js";
import { Head } from "@vueuse/head";
import { getStore, setStore } from "@/utils/storage.js";

const router = useRouter();
const waterfallRef = ref(null);
const waterfallHeight = ref("0px");
const cardRefs = new Map();
let masonryFrame = 0;

const getGap = () => {
  if (window.innerWidth <= 560) return 14;
  if (window.innerWidth <= 860) return 16;
  return 20;
};

const setCardRef = (el, id) => {
  if (el) {
    cardRefs.set(id, el);
    return;
  }
  cardRefs.delete(id);
};

const scheduleMasonry = () => {
  if (masonryFrame) cancelAnimationFrame(masonryFrame);
  masonryFrame = requestAnimationFrame(layoutWaterfall);
};

const layoutWaterfall = () => {
  masonryFrame = 0;
  const container = waterfallRef.value;
  if (!container) return;

  const items = dataMap.data.map((item) => ({ id: item.id, el: cardRefs.get(item.id) })).filter((item) => item.el);
  if (!items.length) {
    waterfallHeight.value = "0px";
    return;
  }

  const colCount = cols.value;
  const gap = getGap();
  const containerWidth = container.clientWidth;
  const colWidth = colCount === 1 ? containerWidth : (containerWidth - (colCount - 1) * gap) / colCount;
  const colHeights = new Array(colCount).fill(0);

  items.forEach((item) => {
    const el = item.el;
    el.style.width = colWidth + "px";
    el.style.position = "absolute";
    el.style.left = "";
    el.style.top = "";
    el.style.visibility = "";
  });

  if (colCount === 1) {
    let top = 0;
    items.forEach((item) => {
      item.el.style.left = "0px";
      item.el.style.top = top + "px";
      top += item.el.offsetHeight + gap;
    });
    waterfallHeight.value = Math.max(0, top - gap) + "px";
    return;
  }

  items.forEach((item) => {
    const minIndex = colHeights.indexOf(Math.min(...colHeights));
    const left = minIndex * (colWidth + gap);
    const top = colHeights[minIndex];
    item.el.style.left = left + "px";
    item.el.style.top = top + "px";
    colHeights[minIndex] = top + item.el.offsetHeight + gap;
  });

  waterfallHeight.value = Math.max(0, Math.max(...colHeights) - gap) + "px";
};

const handleResize = () => {
  setWaterfallCol();
  nextTick(() => {
    scheduleMasonry();
  });
};

onMounted(() => {
  getData();
  handleResize();
  window.addEventListener("resize", handleResize, true);
  const previousRouteName = getStore("LEVI_PREVIONS_ROUTE_NAME");
  const pageStatus = getStore("LEVI_DAILY_PAGE_STATUS");
  if (previousRouteName === `Topic Detail`) {
    page.value = pageStatus?.page || 1;
  }
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize, true);
  if (masonryFrame) {
    cancelAnimationFrame(masonryFrame);
    masonryFrame = 0;
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

const cols = ref(4);
const page = ref(1);
const pageSize = ref(12);
const isSidebarVisible = ref(false);
const cutePetContainerRef = ref(null);
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
  title: "日常随记",
  text: "一定要站在你所热爱的世界里闪闪发光。",
};

const setWaterfallCol = () => {
  if (window.innerWidth <= 480) {
    cols.value = 1;
  } else if (window.innerWidth <= 960) {
    cols.value = 2;
  } else if (window.innerWidth <= 1200) {
    cols.value = 3;
  } else {
    cols.value = 4;
  }
};

const toDetail = (item) => {
  router.push({
    name: "Topic Detail",
    params: {
      id: item.id,
    },
  });
  setStore("LEVI_DAILY_PAGE_STATUS", { page: page.value, scrollY: window.scrollY });
};

const getTableData = () => {
  dataMap.paginationDatas.total = dataMap.tableData.length;
  let firstIndex = pageSize.value * page.value - pageSize.value;
  dataMap.data = dataMap.tableData.slice(firstIndex, pageSize.value + firstIndex);
  nextTick(() => {
    scheduleMasonry();
    setTimeout(() => scheduleMasonry(), 300);
    setTimeout(() => scheduleMasonry(), 800);
  });
};

const handleCurrentChange = (val) => {
  page.value = val;
  getTableData();
  cutePetContainerRef.value.scrollIntoView({ behavior: "smooth" });
};

const getData = async () => {
  try {
    const res = await getCategoryArticles({ category: "1" });
    const { code, data } = res.data;
    if (code === 200) {
      dataMap.tableData = data.map((item) => {
        item.updated_at = dayjs(item.updated_at).format("YYYY-MM-DD hh:mm:ss");
        return item;
      });
      getTableData();
      nextTick(() => {
        isSidebarVisible.value = true;
      });
    }
  } catch (error) {
    console.log(error, "error---------------------");
  }
};
</script>

<style lang="scss" scoped>
.daily-container {
  align-items: flex-start;
  min-width: 0;
}

.daily-main {
  flex: 1;
  width: 100%;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.daily-overview {
  position: relative;
  overflow: hidden;
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(260px, 0.8fr);
  gap: 24px;
  padding: 26px 28px;
  border-radius: 24px;
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.08);
}

.daily-overview::before,
.daily-overview::after {
  content: "";
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}

.daily-overview::before {
  width: 180px;
  height: 180px;
  right: -40px;
  top: -70px;
  background: radial-gradient(circle, rgba(90, 140, 189, 0.18), transparent 68%);
}

.daily-overview::after {
  width: 120px;
  height: 120px;
  left: -28px;
  bottom: -56px;
  background: radial-gradient(circle, rgba(255, 139, 38, 0.14), transparent 70%);
}

.daily-overview-main,
.daily-overview-stats {
  position: relative;
  z-index: 1;
}

.daily-overview-main {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.daily-overview-kicker {
  display: inline-flex;
  align-items: center;
  width: fit-content;
  min-height: 30px;
  padding: 0 12px;
  border-radius: 999px;
  background: rgba(255, 139, 38, 0.14);
  color: var(--btn-tag-bg-color);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.daily-overview-main h1 {
  margin: 0;
  color: var(--black-text-color);
  font-size: 28px;
  line-height: 1.25;
}

.daily-overview-main p {
  margin: 0;
  max-width: 560px;
  color: var(--color);
  font-size: 15px;
  line-height: 1.85;
  opacity: 0.82;
}

.daily-overview-stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  align-self: stretch;
}

.overview-stat-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 110px;
  padding: 16px 18px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.58);
  border: 1px solid rgba(90, 140, 189, 0.12);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.22);
  backdrop-filter: blur(10px);
}

.overview-stat-label {
  color: var(--color);
  font-size: 12px;
  opacity: 0.72;
}

.overview-stat-card strong {
  margin-top: 8px;
  color: var(--black-text-color);
  font-size: 24px;
  line-height: 1.2;
}

.waterfall-container {
  position: relative;
}

.daily-waterfall {
  position: relative;
  width: 100%;
}

.daily-card {
  position: relative;
  min-width: 0;
  transition: transform 0.24s ease, box-shadow 0.24s ease;
}

@media (hover: hover) {
  .daily-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 32px rgba(15, 23, 42, 0.12);
  }

  .daily-card:hover .cover-img {
    transform: scale(1.04);
  }
}

.is-top-box {
  position: absolute;
  top: -13px;
  left: -13px;
  z-index: 10;
  background: var(--btn-tag-bg-color);
  border-radius: 50%;
  width: 20px;
  height: 20px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 18px rgba(255, 139, 38, 0.2);
}

.is-top-box .bi {
  font-size: 26px !important;
  color: #fff;
  margin-right: 0;
}

.daily-pet .img-box {
  margin: 5px;
}

.daily-pet .cover-img {
  display: block;
  width: 100%;
  transition: transform 0.35s ease;
}

.daily-pet .waterfall-title {
  padding: 0 20px;
}

.daily-pet .waterfall-title h2 {
  margin: 0;
  color: var(--black-text-color);
  font-size: 18px;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.daily-pet .waterfall-desc {
  padding: 0 20px;
}

.daily-pet .waterfall-desc p {
  margin: 0;
  color: var(--color);
  font-size: 14px;
  line-height: 1.8;
  opacity: 0.82;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.daily-pet .waterfall-footer {
  justify-content: space-between;
  flex-wrap: wrap;
  color: #3c3b3b;
  padding: 0 20px 20px;
}

.waterfall-icon-block {
  display: flex;
  align-items: center;
  gap: 8px;
}

.waterfall-footer-bar {
  display: flex;
  align-items: center;

  .icon {
    width: 1em;
    height: 1em;
    margin-right: 5px;
  }
}

.daily-pet .waterfall-footer-date {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: rgba(60, 59, 59, 0.82);
  font-size: 14px;
}

.daily-pet .waterfall-footer-date .bi {
  color: var(--theme-btn-hover-color);
}

.daily-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 320px;
  padding: 32px 24px;
  border-radius: 24px;
  text-align: center;
  box-shadow: 0 18px 36px rgba(15, 23, 42, 0.08);
}

.daily-empty-icon {
  width: 64px;
  height: 64px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  border-radius: 20px;
  background: rgba(90, 140, 189, 0.12);
  color: var(--theme-btn-hover-color);
  font-size: 28px;
}

.daily-empty h2 {
  margin: 0;
  color: var(--black-text-color);
  font-size: 24px;
}

.daily-empty p {
  max-width: 420px;
  margin: 12px 0 0;
  color: var(--color);
  line-height: 1.8;
  opacity: 0.78;
}

@media (max-width: 860px) {
  .daily-main {
    gap: 18px;
  }

  .daily-overview {
    grid-template-columns: 1fr;
    gap: 16px;
    padding: 20px 18px;
  }

  .daily-overview-main h1 {
    font-size: 22px;
  }

  .daily-overview-main p {
    font-size: 14px;
  }

  .daily-overview-stats {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .overview-stat-card {
    min-height: 92px;
    padding: 14px 12px;
    border-radius: 16px;
  }

  .overview-stat-card strong {
    font-size: 18px;
  }

  .daily-pet .waterfall-title {
    padding: 0 16px;
  }

  .daily-pet .waterfall-title h2 {
    font-size: 17px;
  }

  .daily-pet .waterfall-desc {
    padding: 0 16px;
  }

  .daily-pet .waterfall-footer {
    padding: 0 16px 16px;
  }

  .is-top-box {
    top: -10px;
    left: -10px;
    width: 20px;
    height: 20px;
    padding: 8px;
  }

  .is-top-box .bi {
    font-size: 22px !important;
  }
}

@media (max-width: 560px) {
  .daily-overview-stats {
    grid-template-columns: 1fr;
  }

  .daily-empty {
    min-height: 260px;
    padding: 26px 18px;
  }
}

html[data-theme="dark"] {
  .daily-overview,
  .daily-empty {
    box-shadow: 0 18px 40px rgba(0, 0, 0, 0.24);
  }

  .overview-stat-card {
    background: rgba(255, 255, 255, 0.06);
    border-color: rgba(122, 162, 204, 0.12);
  }

  .daily-card {
    border-color: rgba(122, 162, 204, 0.14);
    box-shadow: 0 16px 36px rgba(0, 0, 0, 0.2);
  }

  .daily-pet .waterfall-footer {
    border-top-color: rgba(122, 162, 204, 0.08);
  }

  .daily-pet .waterfall-footer-date {
    color: rgba(243, 246, 251, 0.76);
  }
}
</style>
