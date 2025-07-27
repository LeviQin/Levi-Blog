<template>
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
      <div class="links-container-box friends-section">
        <div class="links-title">
          <h2>朋友们</h2>
        </div>
        <div class="links-describe">
          <p>
            以下友情链接与本博客相互独立，不代表博主Levi认同其观点。若发现友链内容异常（如涉黄赌毒等违规信息），请留言举报，博主将根据严重程度及时处理。博主会不定期清理失效链接，恕不另行通知。互联网并非法外之地，愿大家保持独立思考，共建清朗网络环境！
          </p>
        </div>
        <div class="links-category-box">
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
            <div class="links-category-icon">
              <img :src="item.image" alt="友链头像" />
            </div>
            <div class="links-category-content">
              <div class="links-category-title">
                <span>{{ item.name }}</span>
              </div>
              <div class="links-category-describe">
                <span>{{ item.description }}</span>
              </div>
            </div>
          </a>
        </div>
      </div>
      <div class="info-section">
        <div class="site-info-box">
          <div class="links-container-box info-card">
            <div class="links-title">
              <h2>本站信息</h2>
            </div>
            <div class="site-info">
              <div class="site-info-item">
                <span class="info-label">名称：</span> {{ blogSettingMap.blog_name }}
              </div>
              <div class="site-info-item">
                <span class="info-label">地址：</span> https://leviqin.top
              </div>
              <div class="site-info-item">
                <span class="info-label">头像：</span>
                {{ blogSettingMap.blog_logo }}
              </div>
              <div class="site-info-item">
                <span class="info-label">描述：</span>
                {{ blogSettingMap.blog_description }}
              </div>
            </div>
          </div>

          <div class="links-container-box info-card">
            <div class="links-title">
              <h2>友链须知</h2>
            </div>
            <div class="note-info">
              <div class="note-info-item">
                <i class="note-icon">✓</i> 全站使用HTTPS, 定时清除无效链接
              </div>
              <div class="note-info-item">
                <i class="note-icon">✓</i> 站点内容最好是原创
              </div>
              <div class="note-info-item">
                <i class="note-icon">✓</i> 最好是先添加本站再申请，互相友链
              </div>
              <div class="note-info-item">
                <i class="note-icon">✓</i> 需要更新友链时请移步到
                <span class="link-text" @click="router.push('/comments')">留言板</span>
                进行留言 (*╹▽╹*)
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="links-container-box apply-section">
        <div class="links-title apply-title">
          <h2>友链申请</h2>
        </div>
        <div class="apply-btn-box">
          <div class="apply-btn" @click="router.push('/comments')">前往留言板申请</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from "vue";
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

onMounted(() => {
  isSidebarVisible.value = true;
  getData();
});

const dataMap = reactive({
  friendList: [],
});

const isSidebarVisible = ref(false);

const bannerConfig = {
  height: "30vh",
  showArrow: false,
  title: "友情链接",
  text: "连接世界，友谊永恒",
};

const getData = async () => {
  const res = await getlinkList();
  const { code, data } = res.data;
  if (code === 200) {
    dataMap.friendList = data;
  }
};
</script>

<style lang="scss" scoped>
.links-container {
  border-radius: var(--theme-radius);
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: var(--w);
  margin: 0 auto;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.links-title {
  display: flex;
}

.links h2 {
  color: var(--color);
  margin-left: 25px !important;
  position: relative;
  transition: all 0.4s;
  font-weight: 600;
  &:hover {
    transition: all 0.4s;
    transform: translateX(15px);
    color: var(--btn-tag-bg-color);
  }
}

.links h1::before,
.links h2::before,
.links h3::before {
  content: "";
  position: absolute;
  top: 0;
  left: -35px;
  width: 30px;
  height: 30px;
  background: url(@/assets/images/md/fengche.svg);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  animation: fengcheMove 1.5s linear infinite;
}

.friends-section {
  margin-bottom: 20px;
  padding: 0 5px;
}

.links-describe {
  padding: 3px 5px 15px 10px;
  color: var(--color);
  line-height: 1.6;
  font-size: 16px;
  max-width: 95%;
  margin: 0 auto;
  p {
    margin: 0;
    text-align: justify;
  }
}

.links-category-box {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
  padding: 10px 5px;
}

.links-category-item {
  background: #fff;
  padding: 18px 20px 18px 65px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.06);
  border-radius: var(--theme-radius);
  cursor: pointer;
  position: relative;
  transition: all 0.3s;
  border: 1px solid rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  position: relative;
  backdrop-filter: blur(5px);
}

.links-avatar-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  opacity: 0.2;
  filter: blur(3px);
  z-index: 0;
}

.links-category-icon {
  position: absolute;
  top: -12px;
  left: -12px;
  width: 65px;
  height: 65px;
  border-radius: 50%;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  border: 2px solid #fff;
  z-index: 1;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s;
  }
  &:hover img {
    transform: scale(1.08);
  }
}

.links-category-content {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.links-category-title {
  font-size: 18px;
  padding: 3px 0;
  color: var(--black-text-color);
  font-weight: 600;
  margin-bottom: 3px;
}

.links-category-describe {
  color: #2e2e2e;
  font-size: 13px;
  line-height: 1.4;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
}

.info-section {
  margin: 15px 0;
  padding: 0 8px;
}

.site-info-box {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-bottom: 20px;
}

.info-card {
  background: #fff;
  border-radius: var(--theme-radius);
  padding: 18px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
  flex: 1;
  transition: all 0.3s;
  border: 1px solid rgba(0, 0, 0, 0.05);
  margin: 3px;
}

.site-info,
.note-info {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px 8px 3px;
}

.site-info-item,
.note-info-item {
  position: relative;
  padding: 6px 3px;
  border-bottom: 1px dashed rgba(0, 0, 0, 0.08);
  line-height: 1.5;
  font-size: 13px;
  &:last-child {
    border-bottom: none;
    padding-bottom: 3px;
  }
  &:first-child {
    padding-top: 3px;
  }
}

.info-label {
  font-weight: 600;
  color: var(--black-text-color);
  margin-right: 4px;
  display: inline-block;
  min-width: 40px;
}

.note-icon {
  margin-right: 5px;
  color: var(--btn-tag-bg-color);
}

.info-title {
  font-size: 17px;
  font-weight: 600;
  color: var(--black-text-color);
  margin-bottom: 10px;
  position: relative;
  padding-left: 12px;
  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 4px;
    height: 16px;
    background: var(--btn-tag-bg-color);
    border-radius: 2px;
  }
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
  margin-right: 6px;
  font-style: normal;
}

.link-text {
  color: var(--link-text-color);
  cursor: pointer;
  transition: all 0.25s;
  font-weight: 600;
  text-decoration: underline;
  font-size: 13px;
  &:hover {
    opacity: 0.8;
    color: var(--btn-tag-bg-color);
  }
}

.apply-section {
  background: #fff;
  border-radius: var(--theme-radius);
  padding: 20px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
  text-align: center;
  border: 1px solid rgba(0, 0, 0, 0.05);
  margin: 5px 8px;
}

.apply-title {
  justify-content: center;
  margin-bottom: 15px;
}

.apply-btn-box {
  display: flex;
  justify-content: center;
  margin: 15px 0 10px;
  .apply-btn {
    background-color: var(--btn-tag-bg-color);
    color: #fff;
    padding: 10px 25px;
    border-radius: 25px;
    cursor: pointer;
    font-weight: 600;
    letter-spacing: 1px;
    font-size: 14px;
    box-shadow: 0 3px 10px rgba(var(--btn-tag-bg-color-rgb, 0, 0, 0), 0.25);
    transition: all 0.3s;
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(var(--btn-tag-bg-color-rgb, 0, 0, 0), 0.3);
    }
    &:active {
      transform: translateY(0);
    }
  }
}

@media (max-width: 1200px) {
  .links-category-box {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 15px;
  }
}

@media (max-width: 1030px) {
  .links-container-box {
    justify-content: space-around !important;
  }

  .links-category-box {
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 12px;
  }
}

@media (max-width: 860px) {
  .links-container {
    padding: 15px;
    gap: 20px;
  }

  .site-info-box {
    flex-direction: column;
    gap: 20px;
  }

  .links h2 {
    font-size: 20px;
    margin-top: 8px;
    margin-bottom: 8px;
  }

  .links-describe {
    font-size: 14px;
    padding: 0 0 12px 3px;
    max-width: 98%;
    line-height: 1.5;
  }

  .links-category-title {
    font-size: 16px;
  }

  .links-category-describe {
    font-size: 12px;
    -webkit-line-clamp: 3;
    line-height: 1.4;
  }

  .links-category-box {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 15px;
    padding: 3px;
  }

  .links-category-item {
    padding: 15px 15px 15px 55px;
  }

  .links-category-icon {
    width: 45px;
    height: 45px;
    top: -8px;
    left: -8px;
  }

  .info-card {
    padding: 15px;
    margin: 2px;
  }

  .site-info-item,
  .note-info-item {
    padding: 6px 2px;
    font-size: 12px;
  }

  .apply-section {
    padding: 18px 15px;
    margin: 3px 5px;
  }

  .apply-btn-box {
    margin: 15px 0 8px;
    .apply-btn {
      padding: 10px 25px;
      font-size: 14px;
      letter-spacing: 0.8px;
    }
  }
}

@media (max-width: 576px) {
  .links-category-box {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .links-container {
    padding: 10px 8px;
    gap: 0;
  }

  .site-info-box {
    gap: 15px;
  }

  .links h2 {
    font-size: 18px;
    margin-left: 15px !important;
  }

  .links h1::before,
  .links h2::before,
  .links h3::before {
    left: -25px;
    width: 20px;
    height: 20px;
  }

  .links-describe {
    padding: 0 0 10px 0;
    max-width: 100%;
    line-height: 1.4;
  }

  .links-category-item {
    padding: 12px 12px 12px 50px;
  }

  .links-category-icon {
    width: 40px;
    height: 40px;
    top: -6px;
    left: -6px;
  }

  .links-category-title {
    font-size: 15px;
    padding: 2px 0;
    margin-bottom: 2px;
  }

  .links-category-describe {
    font-size: 12px;
    line-height: 1.3;
  }

  .info-card {
    padding: 12px;
    margin: 2px 0;
  }

  .site-info,
  .note-info {
    gap: 8px;
    padding: 8px 3px 0;
  }

  .info-label {
    min-width: 35px;
    margin-right: 3px;
  }

  .note-icon {
    width: 16px;
    height: 16px;
    line-height: 16px;
    font-size: 9px;
    margin-right: 4px;
  }

  .apply-section {
    padding: 15px 10px;
    margin: 2px 0;
  }

  .apply-title {
    margin-bottom: 10px;
  }

  .apply-btn-box {
    margin: 10px 0 5px;
  }

  .apply-btn-box .apply-btn {
    padding: 8px 20px;
    font-size: 13px;
    letter-spacing: 0.5px;
    border-radius: 20px;
  }
}

@media (hover: hover) {
  .links-category-item:hover {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
    border-color: var(--btn-tag-bg-color);
  }
}
</style>
