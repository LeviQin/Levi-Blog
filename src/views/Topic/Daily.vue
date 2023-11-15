<template>
  <div class="daily-pet w">
    <top-banner :bannerConfig="bannerConfig"></top-banner>
    <div class="daily-container page-container" ref="cutePetContainerRef">
      <article class="daily-main">
        <div class="waterfall-container">
          <wc-waterfall :gap="10" :cols="cols">
            <div
              class="waterfall-item"
              @click="toDetail(item)"
              v-for="item in dataMap.cutePetList"
            >
              <div class="is-top-box" v-if="item.is_top">
                <i class="bi bi-pin-angle-fill"></i>
              </div>
              <img
                class="cover-img"
                v-lazy="`${getBaseURL()}${item.image}`"
                fit="scale-down"
                :alt="item.title"
              />
              <div class="waterfall-title">
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
                </div>
              </div>
            </div>
          </wc-waterfall>
        </div>
      </article>
      <div class="topic-sidebar">
        <topic-sidebar></topic-sidebar>
      </div>
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
import { getBaseURL } from "@/utils/judgmentEnv.js";

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
  cutePetList: [],
});

let cols = ref(2);

const bannerConfig = {
  height: "30vh",
  showArrow: false,
  title: "Levi",
  text: "莫道桑榆晚，为霞尚满天",
};

const setWaterfallCol = () => {
  if (window.innerWidth <= 480) {
    cols.value = 1;
  } else {
    cols.value = 2;
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

const getData = async () => {
  try {
    const res = await getCategoryArticles({ category: "1" });
    const { code, data } = res.data;
    if (code === 200) {
      dataMap.cutePetList = data.map((item) => {
        item.updated_at = dayjs(item.updated_at).format("YYYY-MM-DD hh:mm:ss");
        return item;
      });
    }
  } catch (error) {
    console.log(error, "error---------------------");
  }
};
</script>

<style lang="scss" scoped>
.daily-main {
  flex: 1;
}
.waterfall-item {
  background: var(--themeColor);
  padding: 10px;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
  border-radius: var(--themeRadius);
  cursor: pointer;
}

.is-top-box {
  position: absolute;
  top: -13px;
  left: -13px;
  z-index: 10;
  background: var(--btnTagBgColor);
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

.waterfall-item img {
  width: 100%;
  border-radius: 10px;
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
  .daily-sidebar {
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
