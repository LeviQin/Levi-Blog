<template>
  <el-dialog
    v-model="dialogVisible"
    title="Tips"
    :width="dialogWidth"
    lock-scroll
    append-to-body
    :z-index="10002"
  >
    <template #header>
      <span class="search-model-title">全站查询</span>
    </template>
    <div class="search-model-main">
      <div>
        <el-input
          @input="changeSearch"
          v-model="keyword"
          placeholder="查询关键词"
        ></el-input>
      </div>
      <div class="dividing-line">
        <i class="bi bi-rocket-takeoff-fill"></i>
      </div>
      <div class="result-content" v-if="keyword">
        <div v-if="dataMap.articleData.length">
          <div
            class="result-content-item"
            v-for="item in dataMap.articleData"
            @click="toArticleDetail(item)"
          >
            <div class="result-content-item-title">
              <span>{{ item.title }}</span>
            </div>
            <div class="result-content-item-description">
              <span>{{ item.article_description }}</span>
            </div>
          </div>
        </div>
        <div class="no-data-box" v-else></div>
      </div>
    </div>
  </el-dialog>
</template>

<script setup>
import { ref, defineExpose, reactive, nextTick } from "vue";
import { getKeywordResult } from "@/api/articles.js";
import { debounce } from "@/utils/utils.js";
import { ElNotification } from "element-plus";
import { useRouter } from "vue-router";

const router = useRouter();

onMounted(() => {
  setDialogWidth();
  window.addEventListener("resize", setDialogWidth, true);
});

onUnmounted(() => {
  window.removeEventListener("resize", setDialogWidth, true);
});

const dataMap = reactive({
  articleData: [],
});

let dialogVisible = ref(false);
let dialogWidth = ref("500px");
let keyword = ref("");

const setDialogWidth = () => {
  if (window.innerWidth <= 480) {
    dialogWidth.value = "90%";
  } else {
    dialogWidth.value = "500px";
  }
};

const show = () => {
  dialogVisible.value = true;
};

const close = () => {
  dialogVisible.value = false;
  keyword.value = "";
};

const toArticleDetail = (item) => {
  router.push({
    name: "Topic Detail",
    params: {
      id: item.id,
    },
  });
  close();
};

const changeSearch = debounce(() => {
  if (keyword) {
    getData();
  } else {
    dataMap.articleData = [];
  }
}, 500);

const getData = async () => {
  try {
    const res = await getKeywordResult({ keyword: keyword.value });
    const { code, data, message } = res.data;
    if (code === 200) {
      dataMap.articleData = data;
      if (!data.length) {
        nextTick(() => {
          const noDataBox = document.querySelector(".no-data-box");
          if (noDataBox) {
            noDataBox.innerHTML = `<span>未找到与关键词<strong style="color: red">${keyword.value}</strong>相关的内容</span>`;
          }
        });
      }
    } else {
      ElNotification({
        title: "Error",
        message,
        type: "error",
        zIndex: 99999,
      });
    }
  } catch (error) {
    console.log(error, "error---------------------");
  }
};

defineExpose({
  show,
});
</script>

<style lang="scss" scoped>
.search-model-title {
  color: var(--btnTagBgColor);
  font-size: 18px;
}

.search-model-main {
  padding: 20px;
  padding-top: 10px;
}

.dividing-line:hover .bi-rocket-takeoff-fill {
  transition: all 1s;
  transform: translateX(420px);
}

.result-content {
  max-height: 400px;
  overflow: auto;
  margin: 0 -20px;
  padding: 0 20px;
}

.result-content-item {
  border-left: 2px solid var(--btnTagBgColor);
  overflow: hidden;
  margin-bottom: 15px;
  padding: 10px;
  cursor: pointer;

  &:hover .result-content-item-title {
    transition: all 0.4s;
    transform: translateX(10px);
  }
}

.result-content-item-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--balckTextColor);
  transition: all 0.4s;
}

.result-content-item-description {
  font-size: 14px;
  padding-top: 10px;
}

@media (max-width: 860px) {
  .result-content {
    max-height: 250px;
  }

  .result-content-item {
    margin-bottom: 10px;
    padding: 5px;
  }

  .result-content-item-title {
    font-size: 14px;
  }

  .result-content-item-description {
    font-size: 12px;
    padding-top: 5px;
  }
}
</style>
