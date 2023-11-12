<template>
  <div class="home w">
    <top-banner @nextPosition="nextPosition" :bannerConfig="bannerConfig"></top-banner>
    <div class="home-container page-container" ref="homeContainerRef">
      <div class="topic-sidebar">
        <topic-sidebar></topic-sidebar>
      </div>
      <div class="content">
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
            <div class="footer-info">
              <div class="footer-category">
                <i class="bi bi-bookmark"></i>
                <span>{{ categoryList[item.category - 1] }}</span>
              </div>
              <div class="footer-date">
                <i class="bi bi-calendar-heart"></i>
                <span>{{ item.published_at }}</span>
              </div>
              <div class="footer-view">
                <i class="bi bi-eye"
                  ><span class="num-text">{{ item.view_count }}</span></i
                >
              </div>
            </div>
            <div class="footer-tags">
              <i class="bi bi-tags-fill"></i>
              <span v-for="key in item.article_tags">{{ tagsList[key - 1] }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import TopicSidebar from "@/components/TopicSidebar/Index.vue";
import { getArticleList } from "@/api/articles.js";
import dayjs from "dayjs";
import { useRouter, useRoute } from "vue-router";
import { tagMap } from "@/utils/tagMap.js";
import TopBanner from "@/components/TopBanner/Index.vue";

const router = useRouter();
const route = useRoute();

let homeContainerRef = ref(null);
let tagsList = ref([]);
let isScrolling = ref(false);

onMounted(() => {
  window.addEventListener("scroll", scrollWidnow, true);
  tagsList.value = tagMap.map((item) => item.label);
  getData();
});

const dataMap = reactive({
  tableData: [],
});

const bannerConfig = {
  height: "100vh",
  showArrow: true,
  title: "Levi",
  text: "莫道桑榆晚，为霞尚满天",
};

const categoryList = ["日常", "技术", "萌宠", "笔记", "风景", "人物", "游戏", "囧事"];

const scrollWidnow = () => {
  if (!isScrolling.value) {
    requestAnimationFrame(() => {
      const top = window.scrollY;
      const bannerBar = document.querySelector(".banner-bar");
      const threshold = route.path === "/home" ? 500 : 100;
      if (top > threshold) {
        bannerBar.classList.add("container-blur");
      } else {
        bannerBar.classList.remove("container-blur");
      }

      isScrolling.value = false;
    });

    isScrolling.value = true;
  }
};

const nextPosition = () => {
  homeContainerRef.value.scrollIntoView({ behavior: "smooth" });
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
    const res = await getArticleList();
    const { code, data, message } = res.data;
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
.content {
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
  background: rgb(255, 139, 38);
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

.bi {
  margin-right: 10px;
  font-style: normal;
  font-size: 15px;
}

.num-text {
  margin: 5px;
  font-size: 14px;
}

.footer-info {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 10px;
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

.footer-category {
  font-size: 14px;
  margin-right: 20px;
  position: relative;
  color: var(--balckTextColor);

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

.footer-tags {
  margin-bottom: 10px;
}

.footer-tags span {
  margin: 0 5px;
  padding: 4px;
  background: #fff;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
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

  .footer-tags,
  .footer-info {
    margin-bottom: 5px;
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
