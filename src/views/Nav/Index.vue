<template>
  <Head>
    <meta
      name="keywords"
      content="常用网站，网站导航，技术，设计，博客，论坛，工具服务，社交媒体，新闻资讯"
    />
    <meta
      name="description"
      content="在这里，我们为您汇聚了各种常用网站，包括技术、设计、博客、论坛、工具服务、社交媒体和新闻资讯等，方便您随时一键直达，提升您的上网体验。"
    />
    <meta
      property="og:description"
      content="在这里，我们为您汇聚了各种常用网站，包括技术、设计、博客、论坛、工具服务、社交媒体和新闻资讯等，方便您随时一键直达，提升您的上网体验。"
    />
  </Head>

  <div class="container">
    <div class="website-card w">
      <div class="select-category-box">
        <ul class="select-category-ul">
          <li
            v-for="category in categories"
            :key="category.value"
            @click="selectCategory(category)"
            :class="{ 'active-category': selectedCategory === category.label }"
          >
            {{ category.label }}
          </li>
        </ul>
      </div>
      <div class="nav-content" :class="{ 'sidin-start': true, 'sidin-end': isSidebarVisible }">
        <div class="nav-item" v-for="item in dataMap.data" @click="toSitePage(item.url)">
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
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { getSiteList } from "@/api/webdev";
import { Head } from "@vueuse/head";

onMounted(() => {
  selectedCategory.value = "技术资源";
  getSiteNavList();
  isSidebarVisible.value = true;
});

const dataMap = reactive({
  tableData: [],
  data: [],
});

let categories = [
  {
    value: 1,
    label: "技术资源",
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
const selectedCategory = ref("");
let isSidebarVisible = ref(false);

const selectCategory = (category) => {
  selectedCategory.value = category.label;
  dataMap.data = dataMap.tableData.filter((item) => item.type === category.value);
};

const getSiteNavList = async () => {
  const res = await getSiteList();
  const { code, data } = res.data;
  if (code === 200) {
    dataMap.tableData = data;
    selectedCategory.value = "技术资源"
    dataMap.data = dataMap.tableData.filter((item) => item.type === 1);
  }
};

const toSitePage = (url) => {
  window.open(url);
};
</script>

<style lang="scss" scoped>
.website-card {
  padding-top: 20px;
}

.select-category-ul {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.select-category-ul li {
  padding: 12px 18px;
  border-radius: var(--themeRadius);
  background: #fff;
  cursor: pointer;
  margin: 10px;
  font-size: 14px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.active-category {
  background: var(--btnTagBgColor) !important;
  color: #fff;
}

.nav-content {
  display: flex;
  align-items: center;
  padding-top: 20px;
  align-items: stretch;
  flex-wrap: wrap;
}

.nav-item {
  padding: 15px;
  border-radius: var(--themeRadius);
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  width: 25%;
  margin: 10px;
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

@media (max-width: 860px) {
  .website-card {
    padding-top: 0;
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
}
</style>
