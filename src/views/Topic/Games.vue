<template>
  <Head>
    <meta
      name="keywords"
      content="游戏，电子游戏，电脑游戏，手游，网络游戏，RPG，动作游戏，策略游戏，DNF，原神，鸣潮，绝区零，王者荣耀"
    />
    <meta
      name="description"
      content="分享各种自己在玩的游戏相关内容，包括PC游戏和手游，带您体验丰富多彩的虚拟世界。"
    />
    <meta
      property="og:description"
      content="分享各种自己在玩的游戏相关内容，包括PC游戏和手游，带您体验丰富多彩的虚拟世界。"
    />
  </Head>
  <div class="games w">
    <top-banner :bannerConfig="bannerConfig"></top-banner>
    <div class="games-container page-container" ref="gamescContainerRef">
      <div class="topic-sidebar">
        <topic-sidebar></topic-sidebar>
      </div>
      <article class="games-main">
        <div class="waterfall-container">
          <wc-waterfall :gap="20" :cols="cols">
            <div
              class="waterfall-item"
              @click="toDetail(item)"
              v-for="(item, index) in dataMap.data"
              :class="{ 'sidin-start': true, 'sidin-end': isSidebarVisible }"
              v-slid-in
            >
              <template v-if="index % 2 === 0">
                <div class="is-top-box" v-if="item.is_top">
                  <i class="bi bi-pin-angle-fill"></i>
                </div>
                <div class="waterfall-info-block">
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
                <div class="img-box">
                  <img
                    class="cover-img"
                    v-lazy="item.image"
                    fit="scale-down"
                    :alt="item.title"
                  />
                </div>
              </template>
              <template v-else>
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
                <div class="waterfall-info-block">
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
                        <use xlink:href="#levi-wode_zuijinliulan"></use></svg
                      ><span class="num-text">{{ item.view_count }}</span>
                    </div>
                  </div>
                </div>
              </template>
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
import { ref, reactive, onMounted, nextTick } from "vue";
import { getCategoryArticles } from "@/api/articles.js";
import { useRouter } from "vue-router";
import dayjs from "dayjs";
import TopicSidebar from "@/components/TopicSidebar/Index.vue";
import TopBanner from "@/components/TopBanner/Index.vue";
import { Head } from "@vueuse/head";
import "wc-waterfall";
import { vSlidIn } from "@/utils/vSlidIn.js";

const router = useRouter();

onMounted(() => {
  getData();
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

const cols = ref(1);
const gamescContainerRef = ref(null);
const page = ref(1);
const pageSize = ref(10);
const isSidebarVisible = ref(false);

const bannerConfig = {
  height: "30vh",
  showArrow: false,
  title: "游戏",
  text: "畅游游戏海洋，共享无限乐趣",
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
  gamescContainerRef.value.scrollIntoView({ behavior: "smooth" });
};

const getData = async () => {
  try {
    const res = await getCategoryArticles({ category: "7" });
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
.games-main {
  flex: 1;
}

.waterfall-item {
  display: flex;
  gap: 20px;
}

.waterfall-info-block {
  width: 35%;
  display: flex;
  flex-direction: column;
}

.waterfall-desc {
  flex-grow: 1;
}

.waterfall-item .img-box {
  flex: 1;
}

.waterfall-item img {
  max-height: 240px;
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

.daily-pet .waterfall-footer {
  justify-content: space-between;
  flex-wrap: wrap;
  color: #3c3b3b;
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
  .daily-sidebar {
    display: none;
  }

  .waterfall-item {
    flex-direction: column;
  }

  .waterfall-info-block {
    width: 100%;
  }

  .num-text {
    margin: 2px;
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
