<template>
  <Head>
    <meta name="keywords" content="猫咪，萌宠，小狗，动物，宠物，可爱宠物，动物照片" />
    <meta
      name="description"
      content="记录各种可爱的萌宠和小动物，呈现一个充满快乐和温暖的动物照片墙。"
    />
    <meta
      property="og:description"
      content="记录各种可爱的萌宠和小动物，呈现一个充满快乐和温暖的动物照片墙。"
    />
  </Head>

  <div class="cute-pet w">
    <top-banner :bannerConfig="bannerConfig"></top-banner>
    <div class="cute-pet-container page-container" ref="cutePetContainerRef">
      <div class="topic-sidebar">
        <topic-sidebar></topic-sidebar>
      </div>
      <article class="cute-pet-main">
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
              <div class="waterfall-footer">
                <div class="waterfall-footer-date">
                  <span>{{ item.updated_at }}</span>
                </div>
                <div class="waterfall-icon-block">
                  <div class="waterfall-footer-bar">
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#levi-wode_zuijinliulan"></use></svg
                    ><span class="num-text">{{ item.view_count }}</span>
                  </div>
                  <div class="waterfall-footer-bar">
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#levi-yidianzan"></use></svg
                    ><span class="num-text">{{ item.likes }}</span>
                  </div>
                </div>
              </div>
            </div>
          </wc-waterfall>
        </div>
        <div class="pagination-box">
          <el-pagination
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
import { getStore, setStore } from "@/utils/storage.js";

const router = useRouter();

onMounted(() => {
  getData();
  setWaterfallCol();
  window.addEventListener("resize", setWaterfallCol, true);
  const previousRouteName = getStore("LEVI_PREVIONS_ROUTE_NAME");
  const pageStatus = getStore("LEVI_CUTE_PET_PAGE_STATUS");
  if (previousRouteName === `Topic Detail`) {
    page.value = pageStatus.page;
  }
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
const cutePetContainerRef = ref(null);

const bannerConfig = {
  height: "30vh",
  showArrow: false,
  title: "萌宠",
  text: "从此,我拍照,你负责卖萌",
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
  setStore("LEVI_CUTE_PET_PAGE_STATUS", { page: page.value, scrollY: window.scrollY });
};

const getTableData = () => {
  dataMap.paginationDatas.total = dataMap.tableData.length;
  let firstIndex = pageSize.value * page.value - pageSize.value; // 开始查找的数据下标
  dataMap.data = dataMap.tableData.slice(firstIndex, pageSize.value + firstIndex); // 截取分页数据
};

const handleCurrentChange = (val) => {
  page.value = val;
  getTableData();
  cutePetContainerRef.value.scrollIntoView({ behavior: "smooth" });
};

const getData = async () => {
  try {
    const res = await getCategoryArticles({ category: "3" });
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
.cute-pet-main {
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
