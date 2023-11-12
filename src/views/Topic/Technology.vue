<template>
  <div class="technology w">
    <top-banner @nextPosition="nextPosition" :bannerConfig="bannerConfig"></top-banner>
    <div class="technology-container page-container" ref="technologyRef">
      <div class="topic-sidebar">
        <topic-sidebar></topic-sidebar>
      </div>
      <div class="technology-content">
        <div
          class="article-item"
          v-for="item in dataMap.tableData"
          @click="toArticleDetail(item)"
        >
          <div class="is-top-box" v-if="item.is_top">
            <i class="bi bi-pin-angle-fill"></i>
          </div>
          <div class="article-item-title">
            <h2>{{ item.title }}</h2>
          </div>
          <div class="article-item-description">
            <p>
              {{ item.article_description }}
            </p>
          </div>
          <div class="article-item-footer">
            <div class="footer-left">
              <div class="footer-date">
                <i class="bi bi-calendar-heart"></i>
                <span>{{ item.published_at }}</span>
              </div>
              <div class="footer-tags">
                <i class="bi bi-tags-fill"></i>
                <span v-for="key in item.article_tags">{{ tagsList[key - 1] }}</span>
              </div>
            </div>
            <div class="footer-right">
              <i class="bi bi-eye"
                ><span class="num-text">{{ item.view_count }}</span></i
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getCategoryArticles } from "@/api/articles.js";
import dayjs from "dayjs";
import TopicSidebar from "@/components/TopicSidebar/Index.vue";
import { tagMap } from "@/utils/tagMap.js";
import TopBanner from "@/components/TopBanner/Index.vue";

const router = useRouter();

onMounted(() => {
  tagsList.value = tagMap.map((item) => item.label);
  getData();
});

const dataMap = reactive({
  tableData: [],
});

let tagsList = ref([]);
let technologyRef = ref(null);

const bannerConfig = {
  height: "40vh",
  showArrow: false,
  title: "Levi",
  text: "莫道桑榆晚，为霞尚满天",
};

const nextPosition = () => {
  cutePetContainerRef.value.scrollIntoView({ behavior: "smooth" });
};

const toArticleDetail = (item) => {
  router.push({
    name: "Topic Detail",
    params: {
      id: item.id,
    },
  });
};

const getData = async () => {
  try {
    const res = await getCategoryArticles({ category: "2" });
    const { code, data } = res.data;
    if (code === 200) {
      dataMap.tableData = data.map((item) => {
        item.updated_at = dayjs(item.updated_at).format("YYYY-MM-DD");
        item.published_at = dayjs(item.published_at).format("YYYY-MM-DD");
        return item;
      });
    } else {
      console.log(message, "message--------------------");
    }
  } catch (error) {
    console.log(error, "error--------------------");
  }
};
</script>

<style lang="scss" scoped>
.technology-content {
  flex: 1;
}

.article-item {
  background: var(--themeColor);
  border-radius: var(--themeRadius);
  padding: 10px 20px;
  cursor: pointer;
  margin-bottom: 20px;
  position: relative;
  transition: all 0.2s;
  &:hover {
    transform: scale(1.01);
    transition: all 0.2s;
  }
}

.is-top-box {
  position: absolute;
  top: -13px;
  left: -13px;
  background: var(--btnTagBgColor);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  padding: 10px;

  .bi {
    font-size: 26px !important;
    color: #fff;
    margin-right: 0;
  }
}

.article-item-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}

.bi {
  margin-right: 10px;
  font-style: normal;
  font-size: 15px;
}

.num-text {
  margin: 5px;
  font-size: 14px;
}

.footer-left {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.footer-date {
  font-size: 14px;
  margin-right: 20px;
  position: relative;

  &::before {
    content: "";
    width: 1px;
    height: 15px;
    position: absolute;
    top: 50%;
    right: -8px;
    transform: translateY(-50%);
    background-color: rgba(156, 156, 156, 0.816);
  }
}

.footer-tags span {
  margin: 0 5px;
  padding: 4px;
  background: #fff;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
}

.button-arrow {
  display: block;
  position: absolute;
  bottom: 100px;
  left: 50%;
  margin-left: -20px;
  opacity: 0.75;
  z-index: 9999;
  cursor: pointer;
  animation: arrowMove 2s linear infinite;
}

@media (max-width: 860px) {
  .article-item {
    padding: 5px 15px;
    margin-bottom: 15px;
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

  .article-item-title h2 {
    font-size: 20px;
  }

  .article-item-description {
    font-size: 14px;
  }

  .footer-date {
    font-size: 12px;
  }

  .footer-tags span {
    margin: 0 2px;
    padding: 2px 3px;
    border-radius: 2px;
    font-size: 12px;
  }

  .bi {
    margin-right: 5px;
    font-style: normal;
    font-size: 12px;
  }

  .num-tex {
    font-size: 12px;
  }
}
</style>
