<template>
  <div class="topic-detail w">
    <div class="topic-detail-sidebar">
      <ul class="sidebar-ul nav">
        <div class="sidebar-name">
          <span>目录</span>
        </div>
        <el-divider />
        <li
          class="sidebar-li nav-item"
          v-for="anchor in dataMap.titles"
          :style="{
            padding: `10px 0 10px ${anchor.indent * 20}px`,
            fontSize: `${16 - anchor.indent}px`,
          }"
          @click="handleAnchorClick(anchor)"
        >
          <a class="sidebar-a nav-title">{{ anchor.title }}</a>
        </li>
      </ul>
    </div>
    <div class="topic-detail-content">
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
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import { articleDetail } from "@/api/articles.js";
import MarkdownRenderer from "@/components/MarkdownRenderer/Index.vue";

const route = useRoute();

onMounted(() => {
  getArticleDetail();
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
  height: 100%;
}

.page-title {
  padding: 0 2.5rem;
}

.page-title h1 {
  font-size: 40px;
}

.topic-detail-sidebar {
  width: 20%;
  position: relative;
}

.sidebar-ul {
  background: #fff;
  border-radius: 5px;
  padding: 20px;
  margin-right: 20px;
  position: sticky;
  left: 0;
  top: 80px;
}

.sidebar-name {
  font-size: 20px;
}

.nav-title {
  color: #000;
  &:hover {
    color: var(--linkTextColor);
  }
}

.topic-detail-content {
  flex: 1;
  background: #fff;
  padding: 20px;
  border-radius: 5px;
}

:deep(.el-divider) {
  margin: 12px 0;
}
</style>
