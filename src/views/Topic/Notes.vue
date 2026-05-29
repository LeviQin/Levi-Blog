<template>
  <div>
    <Head>
      <meta
        name="keywords"
        content="笔记，理论笔记，工作笔记，开发笔记，前端笔记，学习笔记"
      />
      <meta
        name="description"
        content="记录工作、生活和各种理论相关的笔记，包括前端开发、工作技巧、学习心得等内容。"
      />
      <meta
        property="og:description"
        content="记录工作、生活和各种理论相关的笔记，包括前端开发、工作技巧、学习心得等内容。"
      />
    </Head>

    <div class="notes w">
      <top-banner :bannerConfig="bannerConfig"></top-banner>
      <div class="notes-container page-container" ref="notesContainerRef">
        <article class="notes-main">
          <div class="waterfall-container">
            <div class="notes-waterfall" :style="{ height: waterfallHeight }" ref="waterfallRef">
              <div
                class="waterfall-item notes-card"
                @click="toDetail(item)"
                v-for="(item, index) in dataMap.data"
                :key="item.id"
                :class="{ 'sidin-start': true, 'sidin-end': isSidebarVisible }"
                :style="{ '--i': index }"
                :ref="(el) => setCardRef(el, item.id)"
              >
                <div class="notes-card-shell" :class="{ 'is-loaded': !!loadedMap[item.id] }">
                  <div class="notes-pin" v-if="item.is_top">
                    <i class="bi bi-pin-angle-fill"></i>
                  </div>
                  <div class="img-box">
                    <img
                      class="cover-img"
                      v-lazy="item.image"
                      fit="scale-down"
                      :alt="item.title"
                      @load="onImgLoad(item.id)"
                    />
                    <div class="notes-cover-mask">
                      <div class="notes-cover-meta">
                        <div class="notes-cover-badge">学习笔记</div>
                        <div class="notes-cover-title">{{ item.title || "学习笔记" }}</div>
                        <div class="notes-cover-sub">{{ item.updated_at }}</div>
                      </div>
                      <div class="notes-cover-entry">
                        <i class="bi bi-arrow-up-right"></i>
                      </div>
                    </div>
                    <div class="notes-shimmer"></div>
                  </div>
                  <div class="notes-card-body">
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
            </div>
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
import { getCategoryArticles } from "@/api/articles.js";
import TopBanner from "@/components/TopBanner/Index.vue";
import { useRouter } from "vue-router";
import dayjs from "dayjs";
import { Head } from "@vueuse/head";
import { getStore, setStore } from "@/utils/storage.js";

const router = useRouter();
const waterfallRef = ref(null);
const waterfallHeight = ref("0px");
const loadedMap = reactive({});
const cardRefs = new Map();
let revealObserver = null;
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
    bindRevealObserver();
  });
};

onMounted(() => {
  const previousRouteName = getStore("LEVI_PREVIONS_ROUTE_NAME");
  const pageStatus = getStore("LEVI_NOTES_PAGE_STATUS");
  if (previousRouteName === `Topic Detail`) {
    page.value = pageStatus?.page || 1;
  }
  getData();
  handleResize();
  window.addEventListener("resize", handleResize, true);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize, true);
  revealObserver?.disconnect();
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
const notesContainerRef = ref(null);
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
  title: "学习笔记",
  text: "快乐，不是因为拥有的多，而是计较的少",
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

const onImgLoad = (id) => {
  loadedMap[id] = true;
  scheduleMasonry();
};

const bindRevealObserver = () => {
  revealObserver?.disconnect();
  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver?.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16, rootMargin: "0px 0px -10% 0px" }
  );

  const nodes = waterfallRef.value?.querySelectorAll?.(".notes-card") || [];
  nodes.forEach((el) => revealObserver.observe(el));
};

const toDetail = (item) => {
  router.push({
    name: "Topic Detail",
    params: {
      id: item.id,
    },
  });
  setStore("LEVI_NOTES_PAGE_STATUS", { page: page.value, scrollY: window.scrollY });
};

const getTableData = () => {
  dataMap.paginationDatas.total = dataMap.tableData.length;
  let firstIndex = pageSize.value * page.value - pageSize.value;
  dataMap.data = dataMap.tableData.slice(firstIndex, pageSize.value + firstIndex);
  nextTick(() => {
    scheduleMasonry();
    bindRevealObserver();
  });
};

const handleCurrentChange = (val) => {
  page.value = val;
  getTableData();
  nextTick(() => {
    notesContainerRef.value.scrollIntoView({ behavior: "smooth" });
  });
};

const getData = async () => {
  try {
    const res = await getCategoryArticles({ category: "4" });
    const { code, data } = res.data;
    if (code === 200) {
      dataMap.tableData = data.map((item) => {
        item.updated_at = dayjs(item.updated_at).format("YYYY-MM-DD hh:mm:ss");
        return item;
      });
      getTableData();
      nextTick(() => {
        isSidebarVisible.value = true;
        bindRevealObserver();
      });
    }
  } catch (error) {
    console.log(error, "error---------------------");
  }
};
</script>

<style lang="scss" scoped>
.notes-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.notes-overview {
  position: relative;
  overflow: hidden;
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(260px, 0.9fr);
  gap: 24px;
  padding: 26px 28px;
  border-radius: 24px;
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.08);
}

.notes-overview::before,
.notes-overview::after {
  content: "";
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}

.notes-overview::before {
  width: 180px;
  height: 180px;
  top: -70px;
  right: -40px;
  background: radial-gradient(circle, rgba(90, 140, 189, 0.18), transparent 68%);
}

.notes-overview::after {
  width: 128px;
  height: 128px;
  left: -22px;
  bottom: -56px;
  background: radial-gradient(circle, rgba(255, 139, 38, 0.14), transparent 70%);
}

.notes-overview-main,
.notes-overview-stats {
  position: relative;
  z-index: 1;
}

.notes-overview-main {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.notes-overview-kicker {
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

.notes-overview-main h1 {
  margin: 0;
  color: var(--black-text-color);
  font-size: 28px;
  line-height: 1.28;
}

.notes-overview-main p {
  margin: 0;
  max-width: 620px;
  color: var(--color);
  font-size: 15px;
  line-height: 1.85;
  opacity: 0.82;
}

.notes-overview-stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.notes-stat-card {
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

.notes-stat-label {
  color: var(--color);
  font-size: 12px;
  opacity: 0.72;
}

.notes-stat-card strong {
  margin-top: 8px;
  color: var(--black-text-color);
  font-size: 24px;
  line-height: 1.2;
}

.waterfall-container {
  position: relative;
}

.notes-waterfall {
  position: relative;
  width: 100%;
}

.notes-card {
  position: absolute;
  cursor: pointer;
  transform: translateY(12px) scale(0.98);
  opacity: 0;
  filter: saturate(0.92) contrast(0.96);
  transition:
    transform 0.8s cubic-bezier(0.2, 0.9, 0.2, 1),
    opacity 0.6s ease,
    filter 0.6s ease;
  transition-delay: calc(var(--i) * 24ms);
  will-change: transform;
}

.notes-card.is-visible {
  opacity: 1;
  transform: translateY(0) scale(1);
  filter: saturate(1) contrast(1);
}

.notes-card-shell {
  position: relative;
  overflow: hidden;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.58);
  border: 1px solid rgba(90, 140, 189, 0.12);
  box-shadow:
    0 18px 40px rgba(15, 23, 42, 0.12),
    inset 0 0 0 1px rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
}

@media (hover: hover) {
  .notes-card:hover {
    transform: translateY(-6px) scale(1.015);
  }

  .notes-card:hover .cover-img {
    transform: scale(1.1);
    filter: brightness(1);
  }

  .notes-card:hover .notes-cover-mask {
    opacity: 1;
    transform: translateY(0);
  }

  .notes-card:hover .notes-cover-entry {
    transform: translateY(-2px) scale(1.08);
    background: rgba(255, 255, 255, 0.22);
  }
}

.notes-pin {
  position: absolute;
  top: 12px;
  left: 12px;
  z-index: 10;
  width: 36px;
  height: 36px;
  border-radius: 14px;
  background: rgba(0, 0, 0, 0.34);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.18);
}

.notes-pin .bi {
  font-size: 18px !important;
  color: var(--btn-tag-bg-color);
  margin-right: 0;
}

.notes .img-box {
  position: relative;
  overflow: hidden;
}

.notes .cover-img {
  display: block;
  width: 100%;
  transition: transform 0.9s cubic-bezier(0.2, 0.9, 0.2, 1), filter 0.7s ease;
  transform: scale(1.06);
  filter: brightness(0.95);
}

.notes-cover-mask {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 14px 14px 12px;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.62),
    rgba(0, 0, 0, 0.22) 55%,
    rgba(0, 0, 0, 0)
  );
  opacity: 0;
  transform: translateY(8px);
  transition: all 0.5s cubic-bezier(0.2, 0.9, 0.2, 1);
  pointer-events: none;
}

.notes-cover-meta {
  width: 100%;
  max-width: calc(100% - 44px);
  margin-top: auto;
  color: rgba(255, 255, 255, 0.95);
}

.notes-cover-badge,
.notes-cover-entry {
  display: inline-flex;
  align-items: center;
  width: fit-content;
  color: #fff;
  font-size: 12px;
  font-weight: 600;
}

.notes-cover-badge {
  min-height: 26px;
  margin-bottom: 10px;
  padding: 0 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.16);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.notes-cover-title {
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.3px;
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.35);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.notes-cover-sub {
  margin-top: 4px;
  font-size: 12px;
  opacity: 0.86;
}

.notes-cover-entry {
  width: 36px;
  height: 36px;
  justify-content: center;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.16);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.22);
  transition: transform 0.5s cubic-bezier(0.2, 0.9, 0.2, 1), background 0.3s ease;
}

.notes-cover-entry .bi {
  font-size: 16px;
  margin-right: 0;
}

.notes-shimmer {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.12) 25%,
    rgba(255, 255, 255, 0.04) 55%,
    rgba(255, 255, 255, 0) 100%
  );
  transform: translateX(-120%);
  opacity: 0.9;
  animation: notesShimmer 1.2s ease-in-out infinite;
}

.notes-card-shell.is-loaded .notes-shimmer {
  display: none;
}

.notes-card-body {
  padding: 14px 16px 16px;
}

.notes .waterfall-title {
  padding: 0;
}

.notes .waterfall-title h2 {
  margin: 0;
  color: var(--black-text-color);
  font-size: 18px;
  line-height: 1.45;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.notes .waterfall-desc {
  margin-top: 10px;
}

.notes .waterfall-desc p {
  margin: 0;
  color: var(--color);
  line-height: 1.8;
  opacity: 0.82;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.notes .waterfall-footer {
  margin-top: 14px;
  justify-content: flex-start;
  gap: 8px;
  color: #3c3b3b;
}

.notes .waterfall-footer-date {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: rgba(60, 59, 59, 0.82);
  font-size: 14px;
}

.notes .waterfall-footer-date .bi {
  margin-right: 0;
  color: var(--theme-btn-hover-color);
}

@keyframes notesShimmer {
  0% {
    transform: translateX(-120%);
  }

  100% {
    transform: translateX(120%);
  }
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

@media (max-width: 860px) {
  .notes-main {
    gap: 18px;
  }

  .notes-overview {
    grid-template-columns: 1fr;
    gap: 16px;
    padding: 20px 18px;
  }

  .notes-overview-main h1 {
    font-size: 22px;
  }

  .notes-overview-main p {
    font-size: 14px;
  }

  .notes-overview-stats {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .notes-stat-card {
    min-height: 92px;
    padding: 14px 12px;
    border-radius: 16px;
  }

  .notes-stat-card strong {
    font-size: 18px;
  }

  .notes-pin {
    width: 34px;
    height: 34px;
    border-radius: 12px;
  }

  .notes-pin .bi {
    font-size: 16px !important;
  }
}

@media (max-width: 560px) {
  .notes-overview-stats {
    grid-template-columns: 1fr;
  }

  .notes-cover-mask {
    opacity: 1;
    padding: 14px;
    transform: translateY(0);
  }

  .notes-cover-badge,
  .notes-cover-entry,
  .notes-cover-title,
  .notes-cover-sub {
    font-size: 11px;
  }
}

html[data-theme="dark"] {
  .notes-overview {
    box-shadow: 0 18px 40px rgba(0, 0, 0, 0.24);
  }

  .notes-stat-card {
    background: rgba(255, 255, 255, 0.06);
    border-color: rgba(122, 162, 204, 0.12);
  }

  .notes-card {
    box-shadow: 0 14px 32px rgba(0, 0, 0, 0.2);
  }

  .notes-card-shell {
    background: rgba(255, 255, 255, 0.06);
    border-color: rgba(122, 162, 204, 0.12);
  }
}
</style>
