<template>
  <section
    class="sidebar-info"
    :class="{ 'sidin-start': true, 'sidin-end': isSidebarVisible }"
    :style="sidebarInfoStyle"
  >
    <div class="sidebar-info-hero">
      <button
        class="avatar-button"
        type="button"
        aria-label="查看关于我"
        @click="goToAbout"
      >
        <span class="avatar-ring"></span>
        <img
          class="avatar"
          :src="blogSettingMap.blog_logo"
          :alt="blogSettingMap.blog_name || 'avatar'"
        />
      </button>

      <div class="sidebar-info-introduce">
        <div class="sidebar-info-status">持续创作中</div>
        <h3 class="sidebar-info-name">{{ blogSettingMap.blog_name }}</h3>
        <p class="sidebar-info-sign">莫道桑榆晚，为霞尚满天</p>
        <button class="profile-entry" type="button" @click="goToAbout">
          <span>了解博主</span>
          <i class="bi bi-arrow-right-short"></i>
        </button>
      </div>
    </div>

    <div class="sidebar-info-body">
      <div class="sidebar-info-data">
        <div
          v-for="item in profileStats"
          :key="item.label"
          class="sidebar-info-data-item"
        >
          <div class="sidebar-info-data-item-title">
            <svg class="icon" aria-hidden="true">
              <use :xlink:href="item.icon"></use>
            </svg>
            <span>{{ item.label }}</span>
          </div>
          <div class="sidebar-info-data-num">
            <span>{{ item.value }}</span>
          </div>
        </div>
      </div>

      <div class="sidebar-info-contact-head">
        <span class="sidebar-info-contact-title">联系与订阅</span>
        <span class="sidebar-info-contact-desc">保持连接，获取最新内容</span>
      </div>

      <div class="sidebar-info-contact">
        <template v-for="item in contactItems">
          <a
            v-if="item.href"
            class="sidebar-contact"
            :class="item.className"
            :href="item.href"
            :target="item.target"
            :rel="item.rel"
            :aria-label="item.label"
            :key="item.key"
            :title="item.label"
          >
            <span class="sidebar-contact-icon">
              <i :class="item.icon"></i>
            </span>
            <span class="sidebar-contact-text">{{ item.label }}</span>
          </a>

          <button
            v-else
            class="sidebar-contact sidebar-contact-button"
            :class="item.className"
            type="button"
            :aria-label="item.label"
            :title="item.label"
            :key="item.key"
            @click="item.action?.()"
          >
            <span class="sidebar-contact-icon">
              <i :class="item.icon"></i>
            </span>
            <span class="sidebar-contact-text">{{ item.label }}</span>
          </button>
        </template>
      </div>
    </div>

    <WXModel ref="wxModelRef" />
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { getStatistics } from "@/api/articles.js";
import { getBaseURL } from "@/utils/judgmentEnv";
import WXModel from "../WXModel/Index.vue";
import { useMainStore } from "@/stores/mainStore";

const mainStore = useMainStore();

const blogSettingMap = computed(() => {
  return mainStore.blogSettingMap;
});

const rssFeedUrl = computed(() => {
  return `${getBaseURL()}/api/articles/rss.xml`;
});

const router = useRouter();
const totalArticles = ref(0);
const wxModelRef = ref(null);
const isSidebarVisible = ref(false);
const categoryCount = 6;

onMounted(() => {
  getData();
  isSidebarVisible.value = true;
});

const sidebarInfoStyle = computed(() => {
  return {
    "--sidebar-hero-bg": blogSettingMap.value?.sidebar_bg_img
      ? `url(${blogSettingMap.value.sidebar_bg_img})`
      : "none",
  };
});

const profileStats = computed(() => {
  return [
    { label: "文章", value: totalArticles.value, icon: "#levi-wenzhang" },
    { label: "分类", value: categoryCount, icon: "#levi-fenlei" },
    {
      label: "标签",
      value: mainStore.tagMap.length,
      icon: "#levi-biaoqian_1",
    },
  ];
});

const contactItems = computed(() => {
  return [
    {
      key: "github",
      label: "GitHub",
      icon: "bi bi-github",
      href: blogSettingMap.value?.blog_connect_github,
      target: "_blank",
      rel: "noopener noreferrer",
      className: "github-box",
    },
    {
      key: "email",
      label: "邮箱",
      icon: "bi bi-envelope-at",
      href: blogSettingMap.value?.blog_connect_email
        ? `mailto:${blogSettingMap.value.blog_connect_email}`
        : "",
      className: "envelope-box",
    },
    {
      key: "wechat",
      label: "微信",
      icon: "bi bi-wechat",
      action: () => showWXModel(blogSettingMap.value?.blog_connect_wx_image),
      className: "wechat-box",
    },
    {
      key: "rss",
      label: "RSS",
      icon: "bi bi-rss-fill",
      href: rssFeedUrl.value,
      target: "_blank",
      rel: "noopener noreferrer",
      className: "rss-box",
    },
  ].filter((item) => item.href || item.action);
});

const goToAbout = () => {
  router.push("/about");
};

const showWXModel = (image) => {
  if (image && wxModelRef.value) {
    wxModelRef.value.show(image);
  }
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
  position: relative;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.24), rgba(255, 255, 255, 0.06)),
    var(--theme-color);
  border-radius: var(--theme-radius);
  margin-bottom: 20px;
  overflow: hidden;
  border: 1px solid rgba(90, 140, 189, 0.14);
  box-shadow: 0 14px 30px rgba(15, 23, 42, 0.08);
  backdrop-filter: blur(10px);
}

.sidebar-info-hero {
  position: relative;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 18px 16px 14px;
  text-align: left;
  isolation: isolate;
}

.sidebar-info-hero::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(180deg, rgba(24, 26, 42, 0.08), rgba(24, 26, 42, 0.56)),
    var(--sidebar-hero-bg);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  z-index: -2;
}

.sidebar-info-hero::after {
  content: "";
  position: absolute;
  inset: auto 0 0;
  height: 62px;
  background: linear-gradient(180deg, rgba(219, 230, 238, 0), var(--theme-color));
  z-index: -1;
}

.avatar-button {
  position: relative;
  width: 84px;
  height: 84px;
  padding: 0;
  margin: 0;
  border: none;
  background: transparent;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-2px);

    .avatar {
      transform: scale(1.03) rotate(4deg);
    }

    .avatar-ring {
      transform: scale(1.04);
      opacity: 1;
    }
  }
}

.avatar-ring {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(90, 140, 189, 0.55));
  box-shadow: 0 10px 20px rgba(15, 23, 42, 0.16);
  opacity: 0.92;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.avatar {
  position: relative;
  width: 74px;
  height: 74px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid rgba(255, 255, 255, 0.92);
  transition: transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.sidebar-info-introduce {
  min-width: 0;
  color: #fff;
  flex: 1;
}

.sidebar-info-status {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.92);
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.18);
  backdrop-filter: blur(10px);

  &::before {
    content: "";
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #7af0b0;
    box-shadow: 0 0 0 3px rgba(122, 240, 176, 0.16);
  }
}

.sidebar-info-name {
  margin: 10px 0 4px;
  font-size: 22px;
  line-height: 1.15;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-shadow: 0 4px 14px rgba(15, 23, 42, 0.24);
}

.sidebar-info-sign {
  margin: 0;
  font-size: 12px;
  line-height: 1.55;
  color: rgba(255, 255, 255, 0.86);
  letter-spacing: 0.5px;
}

.profile-entry {
  margin-top: 10px;
  padding: 6px 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  margin-left: 0;
  margin-right: 0;
  font-size: 12px;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  .bi {
    font-size: 16px;
  }

  &:hover {
    transform: translateY(-2px);
    background: rgba(255, 255, 255, 0.2);
    box-shadow: 0 8px 18px rgba(15, 23, 42, 0.14);
  }
}

.sidebar-info-body {
  padding: 14px 14px 16px;
}

.sidebar-info-data {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
}

.sidebar-info-data-item {
  padding: 10px 8px 9px;
  border-radius: calc(var(--theme-radius) + 2px);
  text-align: center;
  background: rgba(255, 255, 255, 0.42);
  border: 1px solid rgba(90, 140, 189, 0.12);
  transition: transform 0.28s ease, box-shadow 0.28s ease, border-color 0.28s ease;

  &:hover {
    transform: translateY(-2px);
    border-color: rgba(90, 140, 189, 0.28);
    box-shadow: 0 10px 18px rgba(15, 23, 42, 0.08);
  }
}

.sidebar-info-data-item-title {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: #6b7280;
  font-size: 12px;

  .icon {
    width: 1em;
    height: 1em;
  }
}

.sidebar-info-data-num {
  margin-top: 7px;
  font-size: 20px;
  line-height: 1;
  font-weight: 700;
  color: var(--black-text-color);
}

.sidebar-info-contact-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 8px;
  margin: 14px 0 8px;
  padding: 0 2px;
}

.sidebar-info-contact-title {
  font-size: 14px;
  font-weight: 700;
  color: var(--black-text-color);
}

.sidebar-info-contact-desc {
  font-size: 11px;
  color: #7a8191;
}

.sidebar-info-contact {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
}

.sidebar-contact,
.sidebar-contact-button {
  width: 100%;
}

.sidebar-contact {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  border-radius: calc(var(--theme-radius) + 2px);
  color: var(--black-text-color);
  background: rgba(255, 255, 255, 0.46);
  border: 1px solid rgba(90, 140, 189, 0.12);
  box-sizing: border-box;
  transition: transform 0.28s ease, box-shadow 0.28s ease, border-color 0.28s ease;

  &:hover {
    transform: translateY(-2px);
    border-color: rgba(90, 140, 189, 0.24);
    box-shadow: 0 10px 18px rgba(15, 23, 42, 0.08);
    color: var(--black-text-color);
  }
}

.sidebar-contact-button {
  margin: 0;
  border: 1px solid rgba(90, 140, 189, 0.12);
  cursor: pointer;
  font-family: inherit;
}

.sidebar-contact-icon {
  width: 30px;
  height: 30px;
  border-radius: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(90, 140, 189, 0.1);

  .bi {
    font-size: 16px;
  }
}

.sidebar-contact-text {
  font-size: 13px;
  font-weight: 600;
}

.github-box .sidebar-contact-icon {
  background: rgba(24, 26, 42, 0.12);
}

.github-box .bi {
  color: #181a2a;
}

.wechat-box .sidebar-contact-icon {
  background: rgba(40, 196, 69, 0.16);
}

.wechat-box .bi {
  color: #28c445;
}

.envelope-box .sidebar-contact-icon {
  background: rgba(67, 125, 255, 0.14);
}

.envelope-box .bi {
  color: #437dff;
}

.rss-box .sidebar-contact-icon {
  background: rgba(255, 122, 0, 0.14);
}

.rss-box .bi {
  color: #ff7a00;
}

html[data-theme="dark"] .sidebar-info {
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02)),
    var(--theme-color);
  border-color: rgba(122, 161, 209, 0.18);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.28);
}

html[data-theme="dark"] .sidebar-info-hero::after {
  background: linear-gradient(180deg, rgba(0, 0, 0, 0), var(--theme-color));
}

html[data-theme="dark"] .sidebar-info-data-item,
html[data-theme="dark"] .sidebar-contact {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(122, 161, 209, 0.18);
}

html[data-theme="dark"] .sidebar-info-data-item-title,
html[data-theme="dark"] .sidebar-info-contact-desc {
  color: rgba(255, 255, 255, 0.64);
}

html[data-theme="dark"] .sidebar-info-data-num,
html[data-theme="dark"] .sidebar-info-contact-title,
html[data-theme="dark"] .sidebar-contact {
  color: var(--color);
}

html[data-theme="dark"] .github-box .bi {
  color: #fff;
}

@media (max-width: 1200px) {
  .sidebar-info-contact {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 860px) {
  .sidebar-info-hero {
    flex-direction: column;
    align-items: center;
    gap: 12px;
    padding: 18px 16px 14px;
    text-align: center;
  }

  .avatar-button {
    width: 90px;
    height: 90px;
  }

  .avatar {
    width: 80px;
    height: 80px;
  }

  .sidebar-info-introduce {
    flex: initial;
  }

  .sidebar-info-name {
    font-size: 22px;
  }

  .sidebar-info-sign {
    font-size: 12px;
  }

  .sidebar-info-body {
    padding: 14px;
  }

  .sidebar-info-data {
    gap: 8px;
  }

  .sidebar-info-data-item {
    padding: 10px 8px;
  }

  .sidebar-info-data-num {
    font-size: 18px;
  }

  .sidebar-info-contact-head {
    flex-direction: column;
    align-items: flex-start;
    margin-top: 12px;
  }
}

@media (max-width: 420px) {
  .sidebar-info-data {
    grid-template-columns: 1fr;
  }

  .sidebar-contact {
    padding: 8px 10px;
  }

  .bi {
    font-size: 16px;
  }
}
</style>
