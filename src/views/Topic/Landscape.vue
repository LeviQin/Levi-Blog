<template>
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
      <div class="topic-sidebar">
        <topic-sidebar></topic-sidebar>
      </div>
      <article class="landscape-main">
        <div class="waterfall-container">
          <wc-waterfall :gap="20" :cols="cols">
            <div
              class="waterfall-item"
              @click="toDetail(item)"
              v-for="item in dataMap.data"
              :class="{ 'sidin-start': true, 'sidin-end': isSidebarVisible }"
            >
              <div class="is-top-box" v-if="item.is_top">
                <i class="bi bi-pin-angle-fill"></i>
              </div>
              <img
                class="cover-img"
                v-lazy="item.image"
                fit="scale-down"
                :alt="item.title"
              />
            </div>
          </wc-waterfall>
        </div>
        <div class="pagination-box">
          <el-pagination
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
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted, nextTick } from "vue";
import "wc-waterfall";
import { useRouter } from "vue-router";
import { getCategoryArticles } from "@/api/articles.js";
import dayjs from "dayjs";
import TopicSidebar from "@/components/TopicSidebar/Index.vue";
import TopBanner from "@/components/TopBanner/Index.vue";
import { Head } from "@vueuse/head";

const router = useRouter();

onMounted(() => {
  getData();
  setWaterfallCol();
  window.addEventListener("resize", setWaterfallCol, true);
});

onUnmounted(() => {
  window.removeEventListener("resize", setWaterfallCol, true);
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
const landscapeRef = ref(null);
const page = ref(1);
const pageSize = ref(12);
const isSidebarVisible = ref(false);

const bannerConfig = {
  height: "30vh",
  showArrow: false,
  title: "风景",
  text: "水澈而山青,云洁而心境。",
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
};

const getTableData = () => {
  dataMap.paginationDatas.total = dataMap.tableData.length;
  let firstIndex = pageSize.value * page.value - pageSize.value; // 开始查找的数据下标
  dataMap.data = dataMap.tableData.slice(firstIndex, pageSize.value + firstIndex); // 截取分页数据
};

const handleCurrentChange = (val) => {
  page.value = val;
  getTableData();
  landscapeRef.value.scrollIntoView({ behavior: "smooth" });
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
        isSidebarVisible.value = true;
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

.is-top-box {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;

  .bi {
    font-size: 30px;
    color: var(--btnTagBgColor);
  }
}

.landscape .waterfall-footer {
  justify-content: space-between;
  flex-wrap: wrap;
}

.num-text {
  margin: 5px;
}

.waterfall-item {
  background: transparent !important;
}

@media (max-width: 860px) {
  .landscape-sidebar {
    display: none;
  }

  .num-text {
    margin: 2px;
  }
}
</style>
