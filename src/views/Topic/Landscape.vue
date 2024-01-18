<template>
  <div class="landscape w">
    <top-banner :bannerConfig="bannerConfig"></top-banner>
    <div class="landscape-container page-container" ref="landscapeRef">
      <div class="topic-sidebar">
        <topic-sidebar></topic-sidebar>
      </div>
      <article class="landscape-main">
        <div class="waterfall-container">
          <wc-waterfall :gap="10" :cols="cols">
            <div
              class="waterfall-item"
              @click="toDetail(item)"
              v-for="item in dataMap.data"
            >
              <div class="is-top-box" v-if="item.is_top">
                <i class="bi bi-pin-angle-fill"></i>
              </div>
              <div class="triangle-box" v-if="item.is_top"></div>
              <img
                class="cover-img"
                v-lazy="item.image"
                fit="scale-down"
                :alt="item.title"
              />
              <!-- <div class="waterfall-title">
              <span>{{ item.title }}</span>
            </div>
            <div class="waterfall-footer">
              <div class="waterfall-footer-date">
                <span>{{ item.updated_at }}</span>
              </div>
              <div class="waterfall-footer-bar">
                <i class="bi bi-eye"
                  ><span class="num-text">{{ item.view_count }}</span></i
                >
                <i class="bi bi-hand-thumbs-up"
                  ><span class="num-text">{{ item.likes }}</span></i
                >
              </div>
            </div> -->
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
import { ref, reactive, onMounted, onUnmounted } from "vue";
import "wc-waterfall";
import { useRouter } from "vue-router";
import { getCategoryArticles } from "@/api/articles.js";
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
let landscapeRef = ref(null);
let page = ref(1);
let pageSize = ref(10);

const bannerConfig = {
  height: "30vh",
  showArrow: false,
  title: "Levi",
  text: "水澈而山青,云洁而心境。",
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
    const res = await getCategoryArticles({ category: "5" });
    const { code, data } = res.data;
    if (code === 200) {
      dataMap.tableData = data.map((item) => {
        item.updated_at = dayjs(item.updated_at).format("YYYY-MM-DD hh:mm:ss");
        return item;
      });
      getTableData();
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
.waterfall-item {
  background: #fff;
  border-radius: var(--themeRadius);
  cursor: pointer;
  overflow: hidden;
  display: flex;
}

.is-top-box {
  position: absolute;
  top: 5px;
  left: 0;
  z-index: 10;

  .bi {
    font-size: 26px;
    color: var(--btnTagBgColor);
  }
}

.triangle-box {
  position: absolute;
  transform: rotate(45deg);
  top: -40px;
  left: -40px;
  width: 80px;
  height: 80px;
  background: #fff;
  z-index: 9;
}

.waterfall-item img {
  width: 100%;
  border-radius: 5px;
}

.waterfall-title {
  font-size: 16px;
  line-height: 30px;
  padding: 10px 0;
}

.waterfall-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}

.waterfall-footer-bar {
  display: flex;
  align-items: center;
}

.bi {
  margin-right: 10px;
  font-style: normal;
  font-size: 16px;
}

.waterfall-footer-date {
  color: #7f7d7d;
  font-size: 16px;
}

.num-text {
  margin: 5px;
}

@media (max-width: 860px) {
  .landscape-sidebar {
    display: none;
  }

  .waterfall-title {
    font-size: 12px;
    line-height: 20px;
    padding: 5px 0;
  }

  .bi {
    margin-right: 5px;
    font-size: 12px;
  }

  .waterfall-footer-date {
    font-size: 12px;
  }

  .num-text {
    margin: 2px;
  }

  .is-top-box {
    position: absolute;
    top: 5px;
    left: 7px;
    z-index: 10;

    .bi {
      font-size: 16px;
      color: rgb(240, 139, 8);
    }
  }

  .triangle-box {
    position: absolute;
    transform: rotate(45deg);
    top: -30px;
    left: -30px;
    width: 60px;
    height: 60px;
    background: #fff;
    z-index: 9;
  }
}
</style>
