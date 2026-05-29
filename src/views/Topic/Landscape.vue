<template>
  <div>
    <Head>
      <meta
        name="keywords"
        content="风景，雪山，大海，洱海，苍山，大自然景观，自然风光，森林，河流，海岛"
      />
      <meta
        name="description"
        content="记录分享大自然的绚丽美景，包括雪山、大海、洱海、苍山等，带您领略壮丽的山河风光，感受大自然的魅力。"
      />
      <meta
        property="og:description"
        content="记录分享大自然的绚丽美景，包括雪山、大海、洱海、苍山等，带您领略壮丽的山河风光，感受大自然的魅力。"
      />
    </Head>

    <div class="landscape w">
      <top-banner :bannerConfig="bannerConfig"></top-banner>
      <div class="landscape-container page-container" ref="landscapeRef">
        <article class="landscape-main">
          <div class="photo-wall" ref="wallRef">
            <div
              v-for="(item, index) in dataMap.data"
              :key="item.id"
              class="photo-card"
              :class="[item._tile, { 'is-top': item.is_top }]"
              :style="{ '--i': index }"
              @click="toDetail(item)"
            >
              <div class="photo-frame" :class="{ 'is-loaded': !!loadedMap[item.id] }">
                <div class="photo-pin" v-if="item.is_top">
                  <i class="bi bi-pin-angle-fill"></i>
                </div>
                <img
                  class="photo-img"
                  v-lazy="item.image"
                  :alt="item.title"
                  @load="onImgLoad(item.id)"
                />
                <div class="photo-overlay">
                  <div class="photo-meta">
                    <div class="photo-title">{{ item.title || "光影故事" }}</div>
                    <div class="photo-sub">{{ item.updated_at }}</div>
                  </div>
                  <div class="photo-action">
                    <i class="bi bi-arrow-up-right"></i>
                  </div>
                </div>
                <div class="photo-shimmer"></div>
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
import { ref, reactive, onMounted, onUnmounted, nextTick } from "vue";
import { useRouter } from "vue-router";
import { getCategoryArticles } from "@/api/articles.js";
import dayjs from "dayjs";
import TopBanner from "@/components/TopBanner/Index.vue";
import { Head } from "@vueuse/head";
import { getStore, setStore } from "@/utils/storage.js";

const router = useRouter();

const landscapeRef = ref(null);
const wallRef = ref(null);

const loadedMap = reactive({});
let revealObserver = null;

onMounted(() => {
  getData();
  const previousRouteName = getStore("LEVI_PREVIONS_ROUTE_NAME");
  const pageStatus = getStore("LEVI_LANDSCAPE_PAGE_STATUS");
  if (previousRouteName === `Topic Detail`) {
    page.value = pageStatus?.page || 1;
  }
});

onUnmounted(() => {
  revealObserver?.disconnect();
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
const pageSize = ref(16);

const bannerConfig = {
  height: "30vh",
  showArrow: false,
  title: "光影故事",
  text: "光影交汇间，定格自然壮美与人文温度，每一帧皆是未完的故事。",
};

const getTileType = (absoluteIndex) => {
  const i = absoluteIndex % 16;
  if (i === 0 || i === 9) return "tile-xl";
  if (i === 3 || i === 7 || i === 12) return "tile-wide";
  if (i === 5 || i === 14) return "tile-tall";
  return "tile";
};

const onImgLoad = (id) => {
  loadedMap[id] = true;
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
    { threshold: 0.18, rootMargin: "0px 0px -10% 0px" }
  );

  const nodes = wallRef.value?.querySelectorAll?.(".photo-card") || [];
  nodes.forEach((el) => revealObserver.observe(el));
};

const toDetail = (item) => {
  router.push({
    name: "Topic Detail",
    params: {
      id: item.id,
    },
  });
  setStore("LEVI_LANDSCAPE_PAGE_STATUS", { page: page.value, scrollY: window.scrollY });
};

const getTableData = () => {
  dataMap.paginationDatas.total = dataMap.tableData.length;
  let firstIndex = pageSize.value * page.value - pageSize.value; // 开始查找的数据下标
  dataMap.data = dataMap.tableData
    .slice(firstIndex, pageSize.value + firstIndex)
    .map((item, index) => {
      return {
        ...item,
        _tile: getTileType(firstIndex + index),
      };
    });
};

const handleCurrentChange = (val) => {
  page.value = val;
  getTableData();
  nextTick(() => {
    bindRevealObserver();
    landscapeRef.value?.scrollIntoView({ behavior: "smooth" });
  });
};

const getData = async () => {
  try {
    const res = await getCategoryArticles({ category: "5" });
    const { code, data } = res.data;
    if (code === 200) {
      dataMap.tableData = data.map((item) => {
        item.updated_at = dayjs(item.updated_at).format("YYYY-MM-DD hh:mm:ss");
        return item;
      });
      getTableData();
      nextTick(() => {
        bindRevealObserver();
      });
    }
  } catch (error) {
    console.log(error, "error---------------------");
  }
};
</script>

<style lang="scss" scoped>
.landscape-main {
  flex: 1;
}

.landscape-container {
  position: relative;
}

.photo-wall {
  position: relative;
  padding: 18px 6px 10px;
  border-radius: 18px;
  background:
    radial-gradient(1200px 500px at 30% -10%, rgba(255, 214, 152, 0.22), transparent 60%),
    radial-gradient(900px 460px at 90% 0%, rgba(120, 170, 255, 0.16), transparent 55%),
    radial-gradient(900px 460px at 10% 100%, rgba(120, 255, 214, 0.12), transparent 55%),
    rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 14px 50px rgba(0, 0, 0, 0.12);
  overflow: hidden;

  display: grid;
  gap: 16px;
  grid-template-columns: repeat(21, 1fr);
  grid-auto-flow: dense;
}

.photo-card {
  position: relative;
  grid-column: span 3;
  grid-row: span 3;
  cursor: pointer;
  transform: translateY(12px) scale(0.98);
  opacity: 0;
  filter: saturate(0.92) contrast(0.96);
  transition:
    transform 0.8s cubic-bezier(0.2, 0.9, 0.2, 1),
    opacity 0.6s ease,
    filter 0.6s ease;
  transition-delay: calc(var(--i) * 26ms);
  will-change: transform;

  &.is-visible {
    opacity: 1;
    transform: translateY(0) scale(1);
    filter: saturate(1) contrast(1);
  }

  &:hover {
    transform: translateY(-6px) scale(1.015);
  }

  &.tile-wide {
    grid-column: span 6;
    grid-row: span 3;
  }

  &.tile-tall {
    grid-column: span 3;
    grid-row: span 6;
  }

  &.tile-xl {
    grid-column: span 6;
    grid-row: span 6;
  }
}

.photo-frame {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 18px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.08);
  box-shadow:
    0 18px 45px rgba(0, 0, 0, 0.18),
    inset 0 0 0 1px rgba(255, 255, 255, 0.12);
  transform: translateZ(0);
}

.photo-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transform: scale(1.06);
  transition: transform 0.9s cubic-bezier(0.2, 0.9, 0.2, 1), filter 0.7s ease;
  filter: brightness(0.95);
}

.photo-card:hover .photo-img {
  transform: scale(1.12);
  filter: brightness(1);
}

.photo-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 14px 14px 12px;
  background:
    linear-gradient(
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

.photo-card:hover .photo-overlay {
  opacity: 1;
  transform: translateY(0);
}

.photo-meta {
  color: rgba(255, 255, 255, 0.95);
  max-width: calc(100% - 44px);
}

.photo-title {
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.4px;
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.35);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.photo-sub {
  margin-top: 4px;
  font-size: 12px;
  opacity: 0.86;
  letter-spacing: 0.2px;
}

.photo-action {
  width: 36px;
  height: 36px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.16);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
  transition: transform 0.5s cubic-bezier(0.2, 0.9, 0.2, 1), background 0.3s ease;

  .bi {
    font-size: 16px;
    color: rgba(255, 255, 255, 0.95);
    pointer-events: none;
  }
}

.photo-card:hover .photo-action {
  transform: translateY(-2px) scale(1.08);
  background: rgba(255, 255, 255, 0.22);
}

.photo-pin {
  position: absolute;
  top: 10px;
  left: 10px;
  width: 36px;
  height: 36px;
  border-radius: 14px;
  background: rgba(0, 0, 0, 0.38);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 26px rgba(0, 0, 0, 0.22);

  .bi {
    font-size: 18px;
    color: var(--btn-tag-bg-color);
    filter: drop-shadow(0 3px 10px rgba(0, 0, 0, 0.35));
    pointer-events: none;
  }
}

.photo-shimmer {
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
  animation: shimmer 1.2s ease-in-out infinite;
}

.photo-frame.is-loaded .photo-shimmer {
  display: none;
}

@keyframes shimmer {
  0% { transform: translateX(-120%); }
  100% { transform: translateX(120%); }
}

@media (max-width: 860px) {
  .photo-wall {
    grid-template-columns: repeat(6, 1fr);
    gap: 12px;
    padding: 14px 6px 8px;
  }

  .photo-card {
    grid-column: span 3;
    grid-row: span 3;

    &.tile-wide {
      grid-column: span 6;
      grid-row: span 3;
    }

    &.tile-tall {
      grid-column: span 3;
      grid-row: span 6;
    }

    &.tile-xl {
      grid-column: span 6;
      grid-row: span 6;
    }
  }
}

@media (max-width: 520px) {
  .photo-wall {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }

  .photo-card,
  .photo-card.tile-wide,
  .photo-card.tile-tall,
  .photo-card.tile-xl {
    grid-column: span 2;
    grid-row: span 3;
  }

  .photo-overlay {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
