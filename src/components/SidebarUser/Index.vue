<template>
  <div
    class="sidebar-info"
    :class="{ 'sidin-start': true, 'sidin-end': isSidebarVisible }"
  >
    <div class="sidebar-info-avatar">
      <div class="avatar-block">
        <img
          class="avatar"
          :src="blogSettingMap.blog_logo"
          fit="scale-dow"
          alt="levi"
          @click="router.push(`/about`)"
        />
      </div>
    </div>
    <div class="sidebar-info-introduce-wrap">
      <div class="sidebar-info-introduce">
        <div class="sidebar-info-introduce-item sidebar-info-introduce-name">
          <p>{{ blogSettingMap.blog_name }}</p>
        </div>
        <div class="sidebar-info-introduce-item sidebar-info-introduce-sign">
          <span>莫道桑榆晚，为霞尚满天</span>
        </div>
      </div>
      <div class="sidebar-info-data">
        <div class="sidebar-info-data-item">
          <div class="sidebar-info-data-item-title">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#levi-wenzhang"></use>
            </svg>
            <span>文章</span>
          </div>
          <div class="sidebar-info-data-num">
            <span>{{ totalArticles }}</span>
          </div>
        </div>
        <div class="sidebar-info-data-item">
          <div class="sidebar-info-data-item-title">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#levi-fenlei"></use>
            </svg>
            <span>分类</span>
          </div>
          <div class="sidebar-info-data-num">
            <span>6</span>
          </div>
        </div>
        <div class="sidebar-info-data-item">
          <div class="sidebar-info-data-item-title">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#levi-biaoqian_1"></use>
            </svg>
            <span>标签</span>
          </div>
          <div class="sidebar-info-data-num">
            <span>{{ mainStore.tagMap.length }}</span>
          </div>
        </div>
      </div>
      <div class="sidebar-info-contact">
        <a :href="blogSettingMap.blog_connect_github" target="_blank">
          <div class="contact-item" title="GitHub">
            <i class="bi bi-github"></i>
          </div>
        </a>
        <a :href="`mailto:${blogSettingMap.blog_connect_email}`">
          <div class="contact-item envelope-box" title="邮箱">
            <i class="bi bi-envelope-at"></i>
          </div>
        </a>
        <div
          class="contact-item wecht-box"
          title="微信"
          @click="showWXModel(blogSettingMap.blog_connect_wx_image)"
        >
          <i class="bi bi-wechat"></i>
        </div>
      </div>
    </div>

    <!-- 微信弹窗 -->
    <WXModel ref="wxModelRef" />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { getStatistics } from "@/api/articles.js";
import WXModel from "../WXModel/Index.vue";
import { useMainStore } from "@/stores/mainStore";

const mainStore = useMainStore();

const blogSettingMap = computed(() => {
  return mainStore.blogSettingMap;
});

const router = useRouter();

onMounted(() => {
  getData();
  isSidebarVisible.value = true;
  setSidebarInfoBgImg();
});

const totalArticles = ref(0);
const wxModelRef = ref(null);
const isSidebarVisible = ref(false);

const showWXModel = (image) => {
  wxModelRef.value.show(image);
};

const setSidebarInfoBgImg = () => {
  const avatar = document.querySelector(".sidebar-info-avatar");
  avatar.style.setProperty("--avatar-bg", `url(${blogSettingMap.value.sidebar_bg_img})`);
};

const getData = async () => {
  try {
    const res = await getStatistics();
    const { code, data } = res.data;
    if (code === 200) {
      totalArticles.value = data.total_articles;
    }
  } catch (error) {
    console.log(error, "error------------------------------");
  }
};
</script>

<style lang="scss" scoped>
.sidebar-info {
  background: var(--theme-color);
  border-radius: var(--theme-radius);
  margin-bottom: 20px;
  overflow: hidden;
}

.sidebar-info-avatar {
  position: relative;
  display: flex;
  justify-content: center;
}

.sidebar-info-avatar::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: var(--avatar-bg, none);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  filter: blur(1px);
  z-index: -1;
}

.avatar-block {
  transform: translateY(50px);
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.6s ease-in-out;
  border: 2px solid #fff;
  &:hover {
    animation: rotate360 1s cubic-bezier(0.33, 1, 0.68, 1);
  }
}

@keyframes rotate360 {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(1080deg);
  }
}

.sidebar-info-introduce-wrap {
  padding: 20px;
  margin-top: 22px;
}

.sidebar-info-introduce-item {
  text-align: center;
}

.sidebar-info-introduce-name {
  font-size: 18px;
  font-weight: 600;
  margin-left: -15px;
}

.sidebar-info-data {
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
}

.sidebar-info-data-num {
  padding: 10px 0;
  display: flex;
  justify-content: center;
  font-weight: 500;
}

.sidebar-info-data-item .sidebar-info-data-item-title {
  display: flex;
  align-items: center;
  .icon {
    width: 1.2em;
    height: 1.2em;
    margin-right: 2px;
  }
}

.sidebar-info-contact {
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
}

.contact-item {
  padding: 2px;
  cursor: pointer;

  .bi {
    font-size: 26px;
    color: var(--black-text-color);
  }

  &:hover {
    animation: eleJitter 2s linear infinite;
  }
}

.wecht-box {
  background: #28c445;
  border-radius: 50%;
  width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;

  .bi {
    font-size: 16px;
    color: #fff;
  }
}

.envelope-box .bi {
  color: #437dff;
}

@media (max-width: 860px) {
  .avatar {
    width: 90px;
    height: 90px;
  }

  .sidebar-info-introduce-wrap {
    padding: 0;
    margin-top: 60px;
  }

  .sidebar-info-avatar {
    padding: 15px;
  }

  .sidebar-info-introduce {
    display: none;
  }

  .sidebar-info-data-item {
    font-size: 17px;
  }

  .sidebar-info-contact {
    display: none;
  }
}

@keyframes accelerate {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
