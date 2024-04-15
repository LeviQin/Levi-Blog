<template>
  <div class="figure w">
    <top-banner :bannerConfig="bannerConfig"></top-banner>
    <div class="figure-container page-container">
      <div class="topic-sidebar">
        <topic-sidebar></topic-sidebar>
      </div>
      <article class="figure-main">
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
import { getCategoryArticles } from "@/api/articles.js";
import "wc-waterfall";
import { useRouter } from "vue-router";
import dayjs from "dayjs";
import TopicSidebar from "@/components/TopicSidebar/Index.vue";
import TopBanner from "@/components/TopBanner/Index.vue";

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

let cols = ref(3);
let page = ref(1);
let pageSize = ref(10);
let isSidebarVisible = ref(false);

const bannerConfig = {
  height: "30vh",
  showArrow: false,
  title: "Levi",
  text: "快乐，不是因为拥有的多，而是计较的少",
};

const setWaterfallCol = () => {
  if (window.innerWidth <= 480) {
    cols.value = 1;
  } else {
    cols.value = 3;
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
  technologyRef.value.scrollIntoView({ behavior: "smooth" });
};

const getData = async () => {
  try {
    const res = await getCategoryArticles({ category: "6" });
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
.figure-main {
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

.figure .waterfall-footer {
  justify-content: space-between;
  flex-wrap: wrap;
}

.bi {
  margin-right: 10px;
  font-style: normal;
  font-size: 16px;
}

.num-text {
  margin: 5px;
}

.waterfall-item {
  background: transparent !important;
}

@media (max-width: 860px) {
  .figure-sidebar {
    display: none;
  }

  .num-text {
    margin: 2px;
  }
}
</style>
