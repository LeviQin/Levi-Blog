<template>
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
      <div class="topic-sidebar">
        <topic-sidebar></topic-sidebar>
      </div>
      <article class="notes-main">
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
              <div class="img-box">
                <img
                  class="cover-img"
                  v-lazy="item.image"
                  fit="scale-down"
                  :alt="item.title"
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
                  <span>{{ item.updated_at }}</span>
                </div>
                <div class="waterfall-footer-bar">
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#levi-wode_zuijinliulan"></use>
                  </svg>
                  <span class="num-text">{{ item.view_count }}</span>
                </div>
              </div>
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
import { getCategoryArticles } from "@/api/articles.js";
import TopicSidebar from "@/components/TopicSidebar/Index.vue";
import TopBanner from "@/components/TopBanner/Index.vue";
import { useRouter } from "vue-router";
import dayjs from "dayjs";
import "wc-waterfall";
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
const page = ref(1);
const pageSize = ref(12);
const isSidebarVisible = ref(false);
const notesContainerRef = ref(null);

const bannerConfig = {
  height: "30vh",
  showArrow: false,
  title: "笔记",
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
  notesContainerRef.value.scrollIntoView({ behavior: "smooth" });
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

  .bi {
    font-size: 26px !important;
    color: #fff;
    margin-right: 0;
  }
}

.notes .waterfall-footer {
  justify-content: space-between;
  flex-wrap: wrap;
  color: #3c3b3b;
}

.waterfall-footer-bar {
  display: flex;
  align-items: center;

  .icon {
    width: 1.2em;
    height: 1.2em;
    margin-right: 5px;
  }
}

@media (max-width: 860px) {
  .cute-pet-sidebar {
    display: none;
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
}
</style>
