<template>
  <div>
    <Head>
      <meta
        name="keywords"
        content="前端开发，HTML5、CSS3、ES6、JavaScript，Vue2、Vue3，Flutter，跨平台开发，小程序，Node.js"
      />
      <meta
        name="description"
        content="我是一名Web前端开发，目前就职于深圳市笨鸟软件有限公司，有丰富的前端开发经验，熟练掌握HTML5、CSS3、ES6、JavaScript等Web开发技术，擅长使用Vue2、Vue3全家桶,并有Flutter跨平台开发经验,熟悉小程序和Node.js"
      />
      <meta
        property="og:description"
        content="我是一名Web前端开发，目前就职于深圳市笨鸟软件有限公司，有丰富的前端开发经验，熟练掌握HTML5、CSS3、ES6、JavaScript等Web开发技术，擅长使用Vue2、Vue3全家桶,并有Flutter跨平台开发经验,熟悉小程序和Node.js"
      />
      <meta
        name="twitter:description"
        content="我是一名Web前端开发，目前就职于深圳市笨鸟软件有限公司，有丰富的前端开发经验，熟练掌握HTML5、CSS3、ES6、JavaScript等Web开发技术, 擅长使用Vue2、Vue3全家桶,并有Flutter跨平台开发经验,熟悉小程序和Node.js"
      />
    </Head>
    <div class="about">
      <div class="about-header">
        <div class="about-header-nav w">
          <ul>
            <li class="nav-li about-li active-nav" @click="toPage(0)">关于</li>
            <li class="nav-li work-li" @click="toPage(1)">作品</li>
            <li @click="router.push(`/`)">
              <span
                class="nav-avatar"
                :style="{ backgroundImage: `url(${blogSettingMap.blog_logo})` }"
                >首页</span
              >
            </li>
            <li class="nav-li ability-li" @click="toPage(2)">能力</li>
            <li class="nav-li connect-li" @click="toPage(3)">联系</li>
          </ul>
        </div>
      </div>
      <el-carousel
        class="carousel"
        direction="vertical"
        :autoplay="false"
        trigger="click"
        ref="carouselRef"
        :loop="false"
        @wheel.prevent.stop="rollScroll"
        @change="changeCarousel"
      >
        <el-carousel-item name="0">
          <About @toNextPage="toNextPage" :blogSettingMap="blogSettingMap" />
        </el-carousel-item>
        <el-carousel-item name="1">
          <Work @toNextPage="toNextPage" :blogSettingMap="blogSettingMap" />
        </el-carousel-item>
        <el-carousel-item name="2">
          <Ability @toNextPage="toNextPage" :blogSettingMap="blogSettingMap" />
        </el-carousel-item>
        <el-carousel-item name="3">
          <Connect @toOnePage="toOnePage" :blogSettingMap="blogSettingMap" />
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed, nextTick } from "vue";
import { useRouter } from "vue-router";
import About from "./About.vue";
import Work from "./Work.vue";
import Ability from "./Ability.vue";
import Connect from "./Connect.vue";
import Hammer from "hammerjs";
import { Head } from "@vueuse/head";
import { useMainStore } from "@/stores/mainStore";

const mainStore = useMainStore();
const rootStyle = document.documentElement.style;
const bodyStyle = document.body.style;
const previousHtmlOverflow = ref("");
const previousBodyOverflow = ref("");
const previousBodyOverscroll = ref("");

const blogSettingMap = computed(() => {
  return mainStore.blogSettingMap;
});

onMounted(() => {
  lockPageScroll();
  initCarouselGesture();
});

onBeforeUnmount(() => {
  if (timeId.value) {
    clearTimeout(timeId.value);
    timeId.value = null;
  }

  if (hammerInstance) {
    hammerInstance.destroy();
    hammerInstance = null;
  }

  unlockPageScroll();
});

const timeId = ref(null);
const carouselRef = ref(null);
const router = useRouter();
let hammerInstance = null;

const lockPageScroll = () => {
  previousHtmlOverflow.value = rootStyle.overflow;
  previousBodyOverflow.value = bodyStyle.overflow;
  previousBodyOverscroll.value = bodyStyle.overscrollBehavior;
  rootStyle.overflow = "hidden";
  bodyStyle.overflow = "hidden";
  bodyStyle.overscrollBehavior = "none";
};

const unlockPageScroll = () => {
  rootStyle.overflow = previousHtmlOverflow.value;
  bodyStyle.overflow = previousBodyOverflow.value;
  bodyStyle.overscrollBehavior = previousBodyOverscroll.value;
};

const initCarouselGesture = async () => {
  // 重置非关于我页面的顶部导航栏透明度
  document.documentElement.style.setProperty("--header-bar-color-opacity", 0);
  await nextTick();

  const carouselEl = carouselRef.value?.$el ?? carouselRef.value?.$?.vnode?.el;
  if (!carouselEl) return;

  hammerInstance = new Hammer(carouselEl);
  hammerInstance.get("pan").set({ direction: Hammer.DIRECTION_ALL });
  hammerInstance.get("swipe").set({ direction: Hammer.DIRECTION_VERTICAL });

  hammerInstance.on("panend", (e) => {
    e.preventDefault();
    // 检查是否是垂直方向的移动
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      // 检查移动方向
      if (e.deltaY > 0) {
        // 向下滑动
        carouselRef.value?.prev();
      } else {
        // 向上滑动
        carouselRef.value?.next();
      }
    }
  });
};

const rollScroll = (event) => {
  const scrollVal = event.wheelDelta || -event.deltaY || event.detail;
  // 节流
  if (!timeId.value) {
    timeId.value = setTimeout(() => {
      timeId.value = null;
      scrollVal > 0 ? carouselRef.value?.prev() : carouselRef.value?.next();
    }, 300);
  }
};

const toPage = (val) => {
  changeCarousel(val);
  carouselRef.value?.setActiveItem(val);
};

const toNextPage = () => {
  carouselRef.value?.next();
};

const toOnePage = () => {
  carouselRef.value?.setActiveItem("0");
};

const changeCarousel = (val) => {
  const navLiArr = document.querySelectorAll(".nav-li");
  for (let i = 0; i < navLiArr.length; i++) {
    if (i === val) {
      navLiArr[i].classList.add("active-nav");
    } else {
      navLiArr[i].classList.remove("active-nav");
    }
  }
};
</script>

<style lang="scss" scoped>
@media (max-width: 768px) {
  .about-header-nav ul li {
    font-size: 1rem !important;
  }

  li .nav-avatar {
    width: 4.5rem !important;
    height: 4.5rem !important;
    background-size: 4.5rem 4.5rem !important;
  }
}

.about-header-nav {
  height: 100%;
}

.about {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  height: 100vh;
  overflow: hidden;
  overscroll-behavior: none;

  .carousel {
    flex: 1;
    min-height: calc(100vh - 80px);
    height: calc(100vh - 80px);
    overflow: hidden;
  }
}

.about-header {
  height: 80px;
  background-color: var(--theme-color);
  border-bottom: 1px solid var(--border-color);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);

  .about-header-nav ul {
    height: 100%;
    display: flex;
    justify-content: space-between;

    li {
      width: 20%;
      color: var(--color);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      cursor: pointer;
      transition: all 0.4s;

      .nav-avatar {
        background-size: 100px 100px;
        position: absolute;
        width: 100px;
        height: 100px;
        left: 50%;
        transform: translateX(-50%);
        border-radius: 50%;
        border: 4px solid var(--border-color);
        overflow: hidden;
        text-indent: -9999px;
        padding: 0 !important;
        z-index: 99999;
        top: 20px;
      }
    }

    li.about-li:hover {
      transition: all 0.4s;
      color: var(--about-color);
    }

    li.work-li:hover {
      transition: all 0.4s;
      color: var(--work-color);
    }

    li.ability-li:hover {
      transition: all 0.4s;
      color: var(--ability-color);
    }

    li.connect-li:hover {
      transition: all 0.4s;
      color: var(--connect-color);
    }
  }
}

.active-nav.about-li {
  color: var(--about-color) !important;
}

.active-nav.work-li {
  color: var(--work-color) !important;
}

.active-nav.ability-li {
  color: var(--ability-color) !important;
}

.active-nav.connect-li {
  color: var(--connect-color) !important;
}
</style>
