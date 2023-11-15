<template>
  <div class="landscape w">
    <top-banner :bannerConfig="bannerConfig"></top-banner>
    <div class="landscape-container page-container" ref="landscapeRef">
      <article class="landscape-main">
        <div class="waterfall-container">
          <wc-waterfall :gap="10" :cols="cols">
            <div
              class="waterfall-item"
              @click="toDetail(item)"
              v-for="item in dataMap.landscapeList"
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

const router = useRouter();

onMounted(() => {
  getData();
  window.addEventListener("resize", setWaterfallCol, true);
});

onUnmounted(() => {
  window.removeEventListener("resize", setWaterfallCol, true);
});

const dataMap = reactive({
  landscapeList: [],
});

let cols = ref(3);
let landscapeRef = ref(null);

const bannerConfig = {
  height: "30vh",
  showArrow: false,
  title: "Levi",
  text: "莫道桑榆晚，为霞尚满天",
};

const setWaterfallCol = () => {
  if (window.innerWidth <= 480) {
    cols.value = 2;
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

const getData = async () => {
  try {
    const res = await getCategoryArticles({ category: "5" });
    const { code, data } = res.data;
    if (code === 200) {
      dataMap.landscapeList = data.map((item) => {
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
.landscape {
  display: flex;

  .landscape-main {
    flex: 1;
  }
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
    top: 3px;
    left: 3px;
    z-index: 10;

    .bi {
      font-size: 16px;
      color: rgb(240, 139, 8);
    }
  }

  .triangle-box {
    position: absolute;
    transform: rotate(45deg);
    top: -10px;
    left: -10px;
    width: 35px;
    height: 35px;
    background: #fff;
    z-index: 9;
  }
}
</style>
