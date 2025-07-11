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
      <div class="links-container-box">
        <div class="links-title">
          <h2>朋友们</h2>
        </div>
        <div class="links-describe">
          <span
            >以下友情链接与本博客相互独立，不代表博主Levi认同其观点。若发现友链内容异常（如涉黄赌毒等违规信息），请留言举报，博主将根据严重程度及时处理。博主会不定期清理失效链接，恕不另行通知。互联网并非法外之地，愿大家保持独立思考，共建清朗网络环境！</span
          >
        </div>
        <div class="links-category-box">
          <a
            :href="item.link"
            target="_blank"
            rel="noopener external nofollow noreferrer"
            class="links-category-item"
            v-for="item in dataMap.friendList"
            :key="item.id"
          >
            <div class="links-category-icon">
              <img :src="item.image" />
            </div>
            <div class="links-category-title">
              <span>{{ item.name }}</span>
            </div>
            <div class="links-category-describe">
              <span>{{ item.description }}</span>
            </div>
          </a>
        </div>
      </div>
      <div class="site-info-box">
        <div class="links-container-box">
          <div class="links-title">
            <h2>本站信息</h2>
          </div>
          <div class="site-info">
            <div class="site-info-item">名称： Levi 博客分享</div>
            <div class="site-info-item">地址： https://leviqin.top</div>
            <div class="site-info-item">
              头像： https://leviqin.top/static/jpg/levi2.a8ebab86.jpg
            </div>
            <div class="site-info-item">
              描述： 一个有意思的博客，工作记录，日常分享，欢迎访问
            </div>
          </div>
        </div>
        <div class="links-container-box">
          <div class="links-title">
            <h2>友链须知</h2>
          </div>
          <div class="note-info">
            <div class="note-info-item">全站使用HTTPS, 定时清除无效链接</div>
            <div class="note-info-item">站点内容最好是原创</div>
            <div class="note-info-item">最好是先添加本站再申请，互相友链</div>
            <div class="note-info-item">
              需要更新友链时请移步到
              <span class="link-text" @click="router.push('/comments')">留言板</span>
              进行留言(*╹▽╹*)
            </div>
          </div>
        </div>
      </div>
      <div class="links-container-box">
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
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import TopBanner from "@/components/TopBanner/Index.vue";
import { Head } from "@vueuse/head";
import { getlinkList } from "@/api/links";

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
  title: "Levi",
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
.site-info-box {
  display: flex;
  justify-content: center;
  gap: 40px;
}

.links-container {
  border-radius: var(--theme-radius);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: var(--w);
  margin: 0 auto;
}

.links-title {
  display: flex;
}

.apply-title {
  justify-content: center;
}

.site-info,
.note-info {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.links-category-box {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  box-sizing: border-box;
}

.links-describe {
  padding: 0 0 20px 10px;
  color: var(--color);
}

.links-category-item {
  background: #fff;
  padding: 10px;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
  border-radius: var(--theme-radius);
  cursor: pointer;
  position: relative;
  padding-left: 50px;
  width: 26%;
  margin: 10px;
  transition: all 0.3s;

  &:hover {
    transform: translateY(-5px);
    transition: all 0.3s;
  }
}

.links-category-icon {
  position: absolute;
  top: -10px;
  left: -10px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.links-category-title {
  font-size: 20px;
  padding: 5px 0;
  color: var(--black-text-color);
}

.links-category-describe {
  color: #727272;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.links h2 {
  color: var(--color);
  margin-left: 25px !important;
  position: relative;
  transition: all 0.4s;
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
  background: url(../../assets/images/md/fengche.svg);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  animation: fengcheMove 1.5s linear infinite;
}

.link-text {
  color: var(--link-text-color);
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    opacity: 0.8;
  }
}

.apply-btn-box {
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
  .apply-btn {
    background-color: var(--btn-tag-bg-color);
    color: #fff;
    padding: 8px 25px;
    border-radius: 5px;
    cursor: pointer;
  }
}

@media (max-width: 1280px) {
  .links-category-item {
    width: 40%;
  }
}

@media (max-width: 1030px) {
  .links-container-box {
    justify-content: space-around !important;
  }
}

@media (max-width: 860px) {
  .site-info-box {
    flex-direction: column;
  }

  .links-category-item {
    width: 100%;
    transition: all 0.3s;
  }

  .links h2 {
    font-size: 22px;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .links-describe {
    font-size: 15px;
  }

  .links-category-title {
    font-size: 18px;
  }

  .links-category-describe {
    font-size: 13px;
  }
}
</style>
