<template>
  <div class="topic-detail w">
    <div class="topic-detail-sidebar">
      <sidebar-user></sidebar-user>
      <ul class="sidebar-ul nav" v-if="dataMap.titles.length">
        <div class="sidebar-name">
          <span>文章目录</span>
        </div>
        <el-divider />
        <li
          class="sidebar-li nav-item"
          v-for="anchor in dataMap.titles"
          :style="{
            padding: `10px 0 10px ${anchor.indent ? anchor.indent * 40 : 20}px`,
            fontSize: `${16 - anchor.indent}px`,
          }"
          @click="handleAnchorClick(anchor)"
        >
          <a class="sidebar-a nav-title">{{ anchor.title }}</a>
        </li>
      </ul>
    </div>
    <div class="topic-detail-content">
      <div class="topic-detail-md">
        <div class="page-title">
          <h1>{{ dataMap.articleInfo.title }}</h1>
        </div>
        <div>
          <markdown-renderer
            ref="markdownRendererRef"
            :markdownText="dataMap.articleInfo.content"
            @sendMdTitle="sendMdTitle"
          ></markdown-renderer>
        </div>
        <div class="topic-detail-tags">
          <i class="bi bi-tags-fill"></i>
          <span class="tags-item" v-for="item in dataMap.articleInfo.article_tags">{{
            tagsList[item - 1]
          }}</span>
        </div>
      </div>
      <!-- <div id="qrcode"></div> -->
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { articleDetail } from "@/api/articles.js";
import MarkdownRenderer from "@/components/MarkdownRenderer/Index.vue";
import SidebarUser from "@/components/SidebarUser/Index.vue";
import { tagMap } from "@/utils/tagMap.js";

const route = useRoute();
const router = useRouter();

onMounted(() => {
  tagsList.value = tagMap.map((item) => item.label);
  getArticleDetail();
  var qrcode = new QRCode(document.getElementById("qrcode"), {
    text: "https://leviqin.top", // 替换成你的网站链接
    width: 128,
    height: 128,
  });
  console.log(qrcode, 11111111);
});

const dataMap = reactive({
  articleInfo: {
    category: "",
    content: "",
    image: "",
    is_top: "",
    published_at: "",
    title: "",
    updated_at: "",
    view_count: "",
  },
  titles: [],
});

const markdownRendererRef = ref(null);
let tagsList = ref([]);

const sendMdTitle = (titles) => {
  dataMap.titles = titles;
};

const handleAnchorClick = (anchor) => {
  markdownRendererRef.value.handleAnchorClick(anchor);
};

const getArticleDetail = async () => {
  try {
    const res = await articleDetail(route.params.id);
    const { code, data, message } = res.data;
    if (code === 200) {
      dataMap.articleInfo = data[0];
    } else {
      console.log(message, "------------------------");
    }
  } catch (error) {
    console.log(error, "------------------------");
  }
};
</script>

<style lang="scss" scoped>
.topic-detail {
  display: flex;
  height: calc(100% - 120px);
}

.page-title h1 {
  font-size: 40px;
}

.topic-detail-sidebar {
  width: 22%;
  position: relative;
  margin-right: 20px;
}

.sidebar-ul {
  background: var(--themeColor);
  border-radius: var(--themeRadius);
  position: sticky;
  left: 0;
  top: 80px;
  padding: 20px;
}

.sidebar-name {
  font-size: 20px;
}

.nav-title {
  color: #000;
  &:hover {
    color: var(--themeTextColor);
  }
}

.topic-detail-content {
  flex: 1;
}

.topic-detail-md {
  background: var(--themeColor);
  padding: 20px;
  border-radius: var(--themeRadius);
  height: calc(100% - 60px);
}

.topic-detail-tags {
  padding: 20px 0;
  .bi {
    margin-right: 5px;
  }
}

.tags-item {
  margin: 0 5px;
  font-size: 12px;
  background: #fff;
  padding: 3px 5px;
  border-radius: 2px;
}

@media (max-width: 860px) {
  .topic-detail-sidebar {
    display: none;
  }
  .page-title {
    padding: 0 20px;
  }

  .page-title h1 {
    font-size: 36px;
  }
}
</style>
