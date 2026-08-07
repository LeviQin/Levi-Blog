<template>
  <div>
    <Head>
      <meta name="keywords" content="友链，友情链接，技术支持，友人帐，好友，交换友链" />
      <meta
        name="description"
        content="下列友链与本博客相互独立，并不代认同并支持友链博客的观点。帅气美丽的小伙伴们，欢迎交换友链"
      />
      <meta
        property="og:description"
        content="下列友链与本博客相互独立，并不代认同并支持友链博客的观点。帅气美丽的小伙伴们，欢迎交换友链"
      />
    </Head>
    <div class="links w">
      <top-banner :bannerConfig="bannerConfig"></top-banner>
      <div
        class="links-container theme-bg-color"
        :class="{ 'sidin-start': true, 'sidin-end': isSidebarVisible }"
      >
        <section class="links-overview links-panel">
          <div class="links-overview-content">
            <span class="section-kicker">~/friends</span>
            <div class="section-title-row">
              <h2>在互联网里，和有趣的人彼此点亮</h2>
              <span class="section-badge">共 {{ friendCount }} 位朋友</span>
            </div>
            <p class="links-overview-text">
              以下友情链接与本博客相互独立，不代表博主 Levi 认同其观点。若发现异常站点内容，请到留言板反馈，我会尽快核查处理。
            </p>
            <div class="links-overview-metrics">
              <div class="metric-card">
                <span class="metric-value">{{ friendCount }}</span>
                <span class="metric-label">已收录友链</span>
              </div>
              <div class="metric-card">
                <span class="metric-value">HTTPS</span>
                <span class="metric-label">安全访问</span>
              </div>
              <div class="metric-card">
                <span class="metric-value">Mutual</span>
                <span class="metric-label">互相友链</span>
              </div>
            </div>
          </div>
          <div class="links-overview-side">
            <div class="site-profile-card">
              <div class="site-profile-head">
                <div
                  class="site-profile-avatar"
                  :style="{ backgroundImage: `url(${blogSettingMap.blog_logo})` }"
                ></div>
                <div class="site-profile-meta">
                  <span class="site-profile-label">本站名片</span>
                  <h3>{{ blogSettingMap.blog_name }}</h3>
                </div>
              </div>
              <p class="site-profile-desc">{{ blogSettingMap.blog_description }}</p>
              <div class="site-profile-tags">
                <span>原创内容</span>
                <span>长期维护</span>
                <span>欢迎交换</span>
              </div>
              <button class="primary-action-btn" type="button" @click="openApplyPage">
                申请友链
              </button>
            </div>
          </div>
        </section>

        <section class="friends-section links-panel">
          <div class="section-header">
            <div>
              <span class="section-kicker">~/friend-list</span>
              <div class="section-title-row">
                <h2>朋友们</h2>
                <span class="section-badge">持续更新</span>
              </div>
            </div>
            <p class="section-desc">
              每位友链伙伴都在认真书写自己的角落，欢迎顺着这些链接继续探索。
            </p>
          </div>

          <div class="links-category-box" v-if="friendCount">
            <a
              v-for="item in dataMap.friendList"
              :key="item.id"
              :href="item.url"
              target="_blank"
              rel="noopener external nofollow noreferrer"
              class="links-category-item"
            >
              <div
                class="links-avatar-bg"
                :style="{ backgroundImage: `url(${item.image})` }"
              ></div>
              <div class="links-category-top">
                <div class="links-category-icon">
                  <img :src="item.image" alt="友链头像" />
                </div>
                <div class="links-category-meta">
                  <div class="links-category-title">
                    <span>{{ item.name }}</span>
                  </div>
                  <span class="links-category-domain">{{ getDomain(item.url) }}</span>
                </div>
                <span class="links-category-link">访问</span>
              </div>
              <div class="links-category-content">
                <div class="links-category-describe">
                  <span>{{ item.description || "这个朋友还没有留下站点描述。" }}</span>
                </div>
              </div>
            </a>
          </div>

          <div v-else class="links-empty-state">
            <div class="empty-icon">#</div>
            <h3>{{ isLoading ? "正在整理友链列表..." : "还没有收录到友链" }}</h3>
            <p>
              {{ isLoading ? "稍等片刻，朋友们正在赶来的路上。" : "如果你也想出现在这里，欢迎先添加本站后前往留言板申请。" }}
            </p>
            <button
              v-if="!isLoading"
              class="primary-action-btn"
              type="button"
              @click="openApplyPage"
            >
              前往申请
            </button>
          </div>
        </section>

        <section class="info-section">
          <div class="site-info-box">
            <div class="info-card links-panel">
              <div class="section-header compact">
                <div>
                  <span class="section-kicker">~/site</span>
                  <div class="section-title-row">
                    <h2>本站信息</h2>
                  </div>
                </div>
              </div>
              <div class="site-info">
                <div
                  v-for="item in siteInfoList"
                  :key="item.label"
                  class="site-info-item"
                >
                  <span class="info-label">{{ item.label }}</span>
                  <span class="info-value">{{ item.value }}</span>
                </div>
              </div>
            </div>

            <div class="info-card links-panel">
              <div class="section-header compact">
                <div>
                  <span class="section-kicker">~/rules</span>
                  <div class="section-title-row">
                    <h2>友链须知</h2>
                  </div>
                </div>
              </div>
              <div class="note-info">
                <div
                  v-for="item in noteList"
                  :key="item"
                  class="note-info-item"
                >
                  <i class="note-icon">✓</i>
                  <span>{{ item }}</span>
                </div>
                <div class="note-info-item">
                  <i class="note-icon">→</i>
                  <span>
                    需要更新友链时请移步到
                    <span class="link-text" @click="openApplyPage">留言板</span>
                    进行留言。
                  </span>
                </div>
              </div>
            </div>

            <div class="apply-section links-panel">
              <span class="section-kicker">~/apply</span>
              <h2>把你的站点也放进这份名单里</h2>
              <p>
                如果你也在认真记录、持续更新，欢迎互换友链。先添加本站后前往留言板，会更方便快速处理。
              </p>
              <div class="apply-btn-box">
                <button class="apply-btn primary" type="button" @click="openApplyPage">
                  前往留言板申请
                </button>
                <button class="apply-btn secondary" type="button" @click="scrollToTop">
                  回到顶部
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount, computed } from "vue";
import { useRouter } from "vue-router";
import TopBanner from "@/components/TopBanner/Index.vue";
import { Head } from "@vueuse/head";
import { getlinkList } from "@/api/links";
import { useMainStore } from "@/stores/mainStore";

const mainStore = useMainStore();

const blogSettingMap = computed(() => {
  return mainStore.blogSettingMap;
});

const router = useRouter();
const isLoading = ref(false);
const bannerHeight = ref("30vh");

onMounted(() => {
  updateBannerHeight();
  window.addEventListener("resize", updateBannerHeight, { passive: true });
  isSidebarVisible.value = true;
  getData();
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateBannerHeight);
});

const dataMap = reactive({
  friendList: [],
});

const isSidebarVisible = ref(false);

const updateBannerHeight = () => {
  if (window.innerWidth <= 576) {
    bannerHeight.value = "20vh";
    return;
  }
  if (window.innerWidth <= 860) {
    bannerHeight.value = "24vh";
    return;
  }
  bannerHeight.value = "30vh";
};

const bannerConfig = computed(() => ({
  height: bannerHeight.value,
  showArrow: false,
  title: "友情链接",
  text: "连接世界，友谊永恒",
}));

const friendCount = computed(() => dataMap.friendList.length);

const siteInfoList = computed(() => [
  {
    label: "名称",
    value: blogSettingMap.value.blog_name || "--",
  },
  {
    label: "地址",
    value: "https://leviqin.top",
  },
  {
    label: "头像",
    value: blogSettingMap.value.blog_logo || "--",
  },
  {
    label: "描述",
    value: blogSettingMap.value.blog_description || "--",
  },
]);

const noteList = [
  "全站使用 HTTPS，定时清理失效链接",
  "站点内容尽量原创，长期维护更佳",
  "建议先添加本站，再申请互换友链",
];

const openApplyPage = () => {
  router.push("/comments");
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const getDomain = (url) => {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch (error) {
    return "友情链接";
  }
};

const getData = async () => {
  isLoading.value = true;
  try {
    const res = await getlinkList();
    const { code, data } = res.data;
    if (code === 200) {
      dataMap.friendList = data;
    }
  } finally {
    isLoading.value = false;
  }
};
</script>

<style lang="scss" scoped>
.links-container {
  border-radius: calc(var(--theme-radius) + 6px);
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: var(--w);
  margin: 0 auto;
  box-shadow: 0 18px 42px rgba(0, 0, 0, 0.18);
}

.links-panel {
  position: relative;
  overflow: hidden;
  border-radius: calc(var(--theme-radius) + 4px);
  background: var(--theme-color);
  border: 1px solid var(--border-color);
  box-shadow: 0 14px 34px rgba(0, 0, 0, 0.16);
}

.section-kicker {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 28px;
  padding: 0 12px;
  border-radius: 999px;
  background: rgba(34, 211, 238, 0.1);
  color: var(--theme-btn-hover-color);
  font-family: var(--mono-font-family);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.section-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 22px;
}

.section-header.compact {
  align-items: center;
  margin-bottom: 18px;
}

.section-title-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 14px;
}

.links h2 {
  color: var(--color);
  margin: 0 !important;
  font-weight: 600;
  line-height: 1.25;
}

.section-badge {
  padding: 6px 12px;
  border-radius: 999px;
  background: rgba(34, 211, 238, 0.08);
  color: var(--theme-btn-hover-color);
  font-family: var(--mono-font-family);
  font-size: 12px;
  box-shadow: inset 0 0 0 1px rgba(34, 211, 238, 0.2);
}

.section-desc,
.links-overview-text,
.apply-section p {
  margin: 0;
  color: var(--color);
  line-height: 1.75;
  font-size: 14px;
  opacity: 0.82;
}

.links-overview {
  display: grid;
  grid-template-columns: minmax(0, 1.5fr) minmax(280px, 0.9fr);
  gap: 24px;
  padding: 28px;
}

.links-overview-content {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.links-overview-metrics {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.metric-card {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 18px 16px;
  border-radius: 20px;
  background: rgba(230, 237, 243, 0.04);
  box-shadow: inset 0 0 0 1px var(--border-color);
}

.metric-value {
  color: var(--black-text-color);
  font-family: var(--mono-font-family);
  font-size: 24px;
  font-weight: 700;
}

.metric-label {
  color: var(--color);
  font-size: 13px;
  opacity: 0.78;
}

.links-overview-side {
  display: flex;
}

.site-profile-card {
  width: 100%;
  padding: 24px;
  border-radius: 24px;
  background: rgba(230, 237, 243, 0.04);
  box-shadow: inset 0 0 0 1px var(--border-color);
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.site-profile-head {
  display: flex;
  align-items: center;
  gap: 16px;
}

.site-profile-avatar {
  width: 70px;
  height: 70px;
  border-radius: 22px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  box-shadow: 0 16px 28px rgba(60, 94, 118, 0.18);
}

.site-profile-meta {
  h3 {
    margin: 6px 0 0;
    color: var(--black-text-color);
    font-size: 20px;
  }
}

.site-profile-label {
  color: var(--color);
  font-size: 12px;
  opacity: 0.72;
}

.site-profile-desc {
  margin: 0;
  color: var(--color);
  font-size: 14px;
  line-height: 1.7;
  opacity: 0.82;
}

.site-profile-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  span {
    padding: 7px 12px;
    border-radius: 999px;
    background: rgba(34, 211, 238, 0.1);
    color: var(--theme-btn-hover-color);
    font-family: var(--mono-font-family);
    font-size: 12px;
  }
}

.primary-action-btn,
.apply-btn {
  border: none;
  outline: none;
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease, background-color 0.25s ease;
  font-family: inherit;
}

.primary-action-btn {
  align-self: flex-start;
  min-height: 44px;
  padding: 0 20px;
  border-radius: 999px;
  background: var(--btn-tag-bg-color);
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  box-shadow: 0 12px 24px rgba(34, 211, 238, 0.25);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 18px 28px rgba(34, 211, 238, 0.3);
  }
}

.friends-section {
  padding: 28px;
}

.links-category-box {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 18px;
}

.links-category-item {
  background: rgba(230, 237, 243, 0.03);
  padding: 20px;
  box-shadow: 0 10px 26px rgba(0, 0, 0, 0.14);
  border-radius: calc(var(--theme-radius) + 2px);
  cursor: pointer;
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
  border: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  gap: 18px;
  min-height: 150px;
  overflow: hidden;
  text-decoration: none;
}

.links-avatar-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  opacity: 0.12;
  filter: blur(0);
  z-index: 0;
}

.links-category-top,
.links-category-content {
  position: relative;
  z-index: 1;
}

.links-category-top {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  gap: 16px;
}

.links-category-icon {
  width: 62px;
  height: 62px;
  border-radius: 20px;
  background: var(--theme-color);
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.18);
  overflow: hidden;
  border: 1px solid var(--border-color);
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s;
  }
}

.links-category-meta {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
}

.links-category-title {
  font-size: 18px;
  color: var(--black-text-color);
  font-weight: 600;
  span {
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
}

.links-category-domain,
.links-category-link {
  color: var(--color);
  font-size: 12px;
  opacity: 0.7;
}

.links-category-link {
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(34, 211, 238, 0.1);
  color: var(--theme-btn-hover-color);
  font-family: var(--mono-font-family);
  opacity: 1;
  font-weight: 600;
}

.links-category-describe {
  color: var(--color);
  font-size: 14px;
  line-height: 1.75;
  flex: 1;
  min-height: 72px;

  span {
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
}

.links-empty-state {
  padding: 42px 24px;
  border-radius: 24px;
  background: rgba(230, 237, 243, 0.03);
  box-shadow: inset 0 0 0 1px var(--border-color);
  text-align: center;

  h3 {
    margin: 12px 0 8px;
    color: var(--black-text-color);
    font-size: 20px;
  }

  p {
    margin: 0 auto;
    max-width: 520px;
    color: var(--color);
    line-height: 1.7;
    opacity: 0.8;
  }

  .primary-action-btn {
    margin-top: 18px;
    align-self: center;
  }
}

.empty-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 58px;
  height: 58px;
  border-radius: 18px;
  background: rgba(34, 211, 238, 0.1);
  color: var(--theme-btn-hover-color);
  font-family: var(--mono-font-family);
  font-size: 22px;
  font-weight: 700;
}

.info-section {
  margin: 0;
}

.site-info-box {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
}

.info-card {
  padding: 24px;
}

.site-info,
.note-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.site-info-item,
.note-info-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 12px 14px;
  border-radius: 16px;
  background: rgba(230, 237, 243, 0.03);
  line-height: 1.65;
  font-size: 14px;
  box-shadow: inset 0 0 0 1px var(--border-color);
}

.info-label {
  font-weight: 600;
  color: var(--black-text-color);
  min-width: 44px;
  flex-shrink: 0;
}

.note-icon {
  display: inline-block;
  width: 18px;
  height: 18px;
  line-height: 18px;
  text-align: center;
  border-radius: 50%;
  background-color: var(--btn-tag-bg-color);
  color: #fff;
  font-size: 11px;
  font-style: normal;
  flex-shrink: 0;
  margin-top: 3px;
}

.link-text {
  color: var(--link-text-color);
  cursor: pointer;
  transition: all 0.25s;
  font-weight: 600;
  text-decoration: underline;
  &:hover {
    opacity: 0.8;
    color: var(--btn-tag-bg-color);
  }
}

.info-value {
  min-width: 0;
  color: var(--color);
  word-break: break-all;
}

.apply-section {
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 18px;

  h2 {
    margin: 4px 0 0 !important;
  }
}

.apply-btn-box {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;

  .apply-btn {
    min-height: 44px;
    padding: 0 18px;
    border-radius: 999px;
    font-weight: 600;
    font-size: 14px;

    &.primary {
      background-color: var(--btn-tag-bg-color);
      color: #fff;
      box-shadow: 0 12px 22px rgba(34, 211, 238, 0.2);
    }

    &.secondary {
      background: rgba(230, 237, 243, 0.03);
      color: var(--color);
      box-shadow: inset 0 0 0 1px var(--border-color);
    }

    &:hover {
      transform: translateY(-2px);
    }
  }
}

@media (hover: hover) {
  .links-category-item:hover {
    transform: translateY(-6px);
    box-shadow: 0 18px 32px rgba(0, 0, 0, 0.22);
    border-color: rgba(34, 211, 238, 0.35);

    .links-category-icon img {
      transform: scale(1.08);
    }
  }
}

@media (max-width: 1200px) {
  .links-overview {
    grid-template-columns: 1fr;
  }

  .site-info-box {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .links-category-box {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 15px;
  }
}

@media (max-width: 1030px) {
  .site-info-box {
    grid-template-columns: 1fr;
  }

  .links-category-box {
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 12px;
  }
}

@media (max-width: 860px) {
  .links-container {
    padding: 15px;
    gap: 16px;
  }

  .links-overview,
  .friends-section,
  .info-card,
  .apply-section {
    padding: 18px;
  }

  .links h2 {
    font-size: 20px;
  }

  .section-header {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 18px;
  }

  .links-overview-metrics {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 10px;
  }

  .links-overview-text,
  .section-desc,
  .apply-section p {
    font-size: 14px;
  }

  .links-overview-content {
    gap: 14px;
  }

  .metric-card {
    gap: 6px;
    padding: 14px 12px;
    border-radius: 16px;
  }

  .metric-value {
    font-size: 18px;
  }

  .metric-label {
    font-size: 12px;
  }

  .site-profile-card {
    padding: 18px;
    gap: 12px;
    border-radius: 20px;
  }

  .site-profile-head {
    gap: 12px;
  }

  .site-profile-avatar {
    width: 58px;
    height: 58px;
    border-radius: 18px;
  }

  .site-profile-meta h3 {
    font-size: 18px;
  }

  .site-profile-desc {
    font-size: 13px;
    line-height: 1.65;
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .site-profile-tags {
    gap: 8px;
  }

  .site-profile-tags span {
    padding: 6px 10px;
    font-size: 11px;
  }

  .primary-action-btn {
    min-height: 40px;
    padding: 0 16px;
    font-size: 13px;
  }

  .links-category-title {
    font-size: 16px;
  }

  .links-category-describe {
    font-size: 13px;
  }

  .links-category-box {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 14px;
  }

  .links-category-item {
    min-height: 200px;
    padding: 18px;
  }

  .links-category-icon {
    width: 52px;
    height: 52px;
  }

  .site-info-item,
  .note-info-item {
    font-size: 13px;
  }
}

@media (max-width: 576px) {
  .links-category-box {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .links-container {
    padding: 8px 6px;
    gap: 12px;
    border-radius: calc(var(--theme-radius) + 2px);
  }

  .links h2 {
    font-size: 18px;
  }

  .section-title-row {
    align-items: flex-start;
    flex-direction: column;
    gap: 8px;
  }

  .links-overview,
  .friends-section,
  .info-card,
  .apply-section {
    padding: 14px;
  }

  .section-kicker,
  .section-badge {
    min-height: 24px;
    padding: 0 10px;
    font-size: 11px;
  }

  .section-header {
    gap: 12px;
    margin-bottom: 14px;
  }

  .links-overview {
    gap: 14px;
  }

  .links-overview-content {
    gap: 12px;
  }

  .links-overview-text {
    line-height: 1.6;
    font-size: 13px;
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }

  .links-overview-metrics {
    gap: 8px;
  }

  .metric-card {
    padding: 12px 10px;
    border-radius: 14px;
  }

  .metric-value {
    font-size: 16px;
  }

  .metric-label {
    font-size: 11px;
  }

  .site-profile-card {
    padding: 14px;
    gap: 10px;
    border-radius: 18px;
  }

  .links-category-item {
    min-height: unset;
    padding: 14px;
    gap: 14px;
  }

  .links-category-icon {
    width: 44px;
    height: 44px;
    border-radius: 14px;
  }

  .links-category-top {
    grid-template-columns: auto minmax(0, 1fr);
    gap: 12px;
  }

  .links-category-link {
    grid-column: 2;
    justify-self: start;
    padding: 6px 10px;
    font-size: 11px;
  }

  .site-profile-head {
    align-items: flex-start;
  }

  .site-profile-avatar {
    width: 50px;
    height: 50px;
    border-radius: 16px;
  }

  .site-profile-meta h3 {
    font-size: 16px;
  }

  .site-profile-tags {
    gap: 6px;
  }

  .site-profile-tags span {
    padding: 5px 9px;
    font-size: 10px;
  }

  .primary-action-btn {
    align-self: stretch;
    width: 100%;
    min-height: 38px;
  }

  .info-label {
    min-width: 38px;
  }

  .note-icon {
    width: 16px;
    height: 16px;
    line-height: 16px;
    font-size: 9px;
  }

  .apply-btn-box {
    flex-direction: column;
    gap: 10px;

    .apply-btn,
    .primary-action-btn {
      width: 100%;
      justify-content: center;
    }
  }

  .site-info-item,
  .note-info-item {
    padding: 10px 12px;
    border-radius: 14px;
    line-height: 1.55;
  }
}
</style>
