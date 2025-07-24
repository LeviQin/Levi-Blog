<template>
  <Head>
    <meta
      name="keywords"
      content="常用网站，网站导航， AI， 开发，设计，博客，论坛，工具服务，社交媒体，新闻资讯"
    />
    <meta
      name="description"
      content="在这里，我们为您汇聚了各种常用网站，包括开发、设计、博客、论坛、工具服务、社交媒体和新闻资讯等，方便您随时一键直达，提升您的上网体验。"
    />
    <meta
      property="og:description"
      content="在这里，我们为您汇聚了各种常用网站，包括开发、设计、博客、论坛、工具服务、社交媒体和新闻资讯等，方便您随时一键直达，提升您的上网体验。"
    />
  </Head>

  <div class="container">
    <top-banner :bannerConfig="bannerConfig"></top-banner>
    <div class="website-card w">
      <div class="select-category-box">
        <ul class="select-category-ul">
          <li
            v-for="category in categories"
            :key="category.value"
            @click="selectCategory(category)"
            :class="{ 'active-category': activeCategory === category.value }"
          >
            {{ category.label }}
          </li>
        </ul>
      </div>
      <div class="nav-container">
        <template v-for="category in categories" :key="category.value">
          <div class="category-box">
            <h2 class="category-title" :id="category.label">{{ category.label }}</h2>
          </div>
          <div
            class="nav-content"
            :class="{ 'sidin-start': true, 'sidin-end': isSidebarVisible }"
          >
            <div
              class="nav-item"
              v-for="item in filteredItems(category.value)"
              :key="item.id"
              @click="toSitePage(item.url)"
            >
              <div class="nav-img">
                <img v-lazy="item.image" :alt="item.title" />
              </div>
              <div class="nav-item-content">
                <div class="nav-title">
                  <h4>{{ item.title }}</h4>
                </div>
                <div class="nav-description">
                  <p>{{ item.description }}</p>
                </div>
              </div>
            </div>
            <div class="empty-category" v-if="filteredItems(category.value).length === 0">
              暂无数据
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { getSiteList } from "@/api/webdev";
import { Head } from "@vueuse/head";
import TopBanner from "@/components/TopBanner/Index.vue";

onMounted(() => {
  getSiteNavList();
  isSidebarVisible.value = true;
});

const dataMap = reactive({
  tableData: [],
});

const activeCategory = ref(1);

const categories = [
  {
    value: 1,
    label: "开发资源",
  },
  {
    value: 2,
    label: "设计资源",
  },
  {
    value: 3,
    label: "博客论坛",
  },
  {
    value: 4,
    label: "工具服务",
  },
  {
    value: 5,
    label: "学习平台",
  },
  {
    value: 6,
    label: "社交媒体",
  },
  {
    value: 7,
    label: "新闻资讯",
  },
  {
    value: 8,
    label: "AI应用",
  },
  {
    value: 9,
    label: "招聘平台",
  },
  {
    value: 10,
    label: "视频剪辑",
  },
  {
    value: 11,
    label: "原型工具",
  },
  {
    value: 12,
    label: "开发软件",
  },
  {
    value: 13,
    label: "云服务器",
  },
];

const isSidebarVisible = ref(false);

const bannerConfig = {
  height: "25vh",
  showArrow: false,
  title: "常用网站",
  text: "整理我常用的网站入口，方便随时快速访问。",
};

const filteredItems = (categoryId) => {
  return dataMap.tableData.filter((item) => item.type === categoryId);
};

const selectCategory = (category) => {
  activeCategory.value = category.value;
  const el = document.getElementById(category.label);
  if (el) {
    const topOffset = el.getBoundingClientRect().top + window.scrollY;
    const finalScrollTop = topOffset - 160;
    window.scrollTo({
      top: finalScrollTop,
      behavior: "smooth",
    });
  }
};

const getSiteNavList = async () => {
  const res = await getSiteList();
  const { code, data } = res.data;
  if (code === 200) {
    dataMap.tableData = data;
  }
};

const toSitePage = (url) => {
  window.open(url);
};
</script>

<style lang="scss" scoped>
.select-category-box {
  position: sticky;
  top: 70px;
  z-index: 10;
  background-color: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  padding: 10px 0;
  margin-bottom: 15px;
  border-radius: var(--theme-radius);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.select-category-ul {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  padding: 8px 10px;
}

.select-category-ul li {
  padding: 10px 16px;
  border-radius: var(--theme-radius);
  background: #fff;
  cursor: pointer;
  font-size: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
  &:hover {
    background: var(--btn-tag-bg-color);
    color: #fff;
    transform: translateY(-2px);
  }
}

.active-category {
  background: var(--btn-tag-bg-color) !important;
  color: #fff !important;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.nav-container {
  background-color: var(--theme-color);
  border-radius: var(--theme-radius);
  padding: 20px;
}

.nav-content {
  display: flex;
  align-items: center;
  align-items: stretch;
  flex-wrap: wrap;
  gap: 20px;
}

.nav-item {
  padding: 15px;
  border-radius: var(--theme-radius);
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  width: 21.5%;
  display: flex;
  align-items: center;
  transition: all 0.3s;
  &:hover {
    transform: translateY(-10px);
    transition: all 0.3s;
  }
}

.nav-item .nav-img {
  width: 60px;
  margin-right: 12px;
}

.nav-item-content {
  flex: 1;
}

.nav-title h4 {
  margin: 5px 0;
}

.nav-description p {
  margin: 0;
  font-size: 14px;
}

.nav-item .nav-img img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

@media (max-width: 1000px) {
  .nav-item {
    width: 27%;
  }
}

@media (max-width: 860px) {
  .select-category-ul {
    gap: 5px;
  }

  .select-category-ul li {
    margin: 5px;
    padding: 8px 10px;
  }
}

@media (max-width: 840px) {
  .nav-item {
    width: 40%;
  }
}

@media (max-width: 550px) {
  .nav-item {
    width: 100%;
  }

  .select-category-ul li {
    padding: 8px 12px;
    font-size: 14px;
  }
}

.category-box {
  margin: 20px 0 10px;
  position: relative;
}

.category-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 15px;
  padding-left: 12px;
  border-left: 4px solid var(--btn-tag-bg-color);
}

.empty-category {
  width: 100%;
  padding: 30px;
  text-align: center;
  background: rgba(255, 255, 255, 0.7);
  border-radius: var(--theme-radius);
  color: #999;
  font-size: 16px;
}
</style>
