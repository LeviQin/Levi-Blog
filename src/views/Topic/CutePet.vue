<template>
  <div class="cute-pet w">
    <div class="cute-pet-sidebar">侧栏</div>
    <div class="cute-pet-main">
      <el-skeleton :rows="5" animated v-if="loading"></el-skeleton>
      <div class="waterfall-container" v-else>
        <wc-waterfall :gap="10" :cols="cols">
          <div
            class="waterfall-item"
            @click="toDetail(item)"
            v-for="item in dataMap.cutePetList"
          >
            <div class="is-top-box" v-if="item.is_top">
              <i class="bi bi-pin-angle-fill"></i>
            </div>
            <div class="triangle-box" v-if="item.is_top"></div>
            <el-image class="cover-img" :src="item.image" fit="scale-down">
              <template #error>
                <div class="image-slot">
                  <img src="../../assets/images/banner/banner1.jpeg" alt="" />
                </div>
              </template>
            </el-image>
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
                <i class="bi bi-hand-thumbs-up"
                  ><span class="num-text">{{ item.likes }}</span></i
                >
              </div>
            </div>
          </div>
        </wc-waterfall>
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

const router = useRouter();

onMounted(() => {
  getData();
  window.addEventListener("resize", setWaterfallCol, true);
});

onUnmounted(() => {
  window.removeEventListener("resize", setWaterfallCol, true);
});

const dataMap = reactive({
  cutePetList: [],
});

let loading = ref(false);
let cols = ref(3);

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
    loading.value = true;
    const res = await getCategoryArticles({ category: "2" });
    const { code, data } = res.data;
    if (code === 200) {
      dataMap.cutePetList = data.map((item) => {
        item.updated_at = dayjs(item.updated_at).format("YYYY-MM-DD");
        return item;
      });
    }
  } catch (error) {
    console.log(error, "error---------------------");
  } finally {
    loading.value = false;
  }
};
</script>

<style lang="scss" scoped>
.cute-pet {
  display: flex;

  .cute-pet-sidebar {
    width: 20%;
  }

  .cute-pet-main {
    flex: 1;
  }
}

.waterfall-item {
  background: #fff;
  padding: 10px;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
  border-radius: 5px;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s;

  &:hover {
    transform: scale(1.02);
    transition: all 0.3s;
  }
}

.is-top-box {
  position: absolute;
  top: 5px;
  left: 0;
  z-index: 10;

  .bi {
    font-size: 26px;
    color: rgb(255, 139, 38);
  }
}

.triangle-box {
  position: absolute;
  transform: rotate(45deg);
  top: -15px;
  left: -15px;
  width: 50px;
  height: 50px;
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
  .cute-pet-sidebar {
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
